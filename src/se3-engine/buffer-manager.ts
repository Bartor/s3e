import { identity } from "../3d/matrix-operations";
import { BufferData, BufferInfo, Hash, ShapeDefinition } from "./model";
import { createNormals } from "./representation/create-normals";
import { loadObj } from "./representation/obj-loader";

const hashString = function (toHash: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < toHash.length; i++) {
    ch = toHash.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

interface BufferCounter {
  instances: number;
  bufferInfo: BufferInfo;
}

type BufferMap = Record<Hash, BufferCounter | undefined>;

class BufferManager {
  private positionsBuffers: BufferMap = {};
  private normalsBuffers: BufferMap = {};
  private colorsBuffers: BufferMap = {};

  constructor(private gl: WebGLRenderingContext) {}

  private bufferNewData(
    data: Float32Array,
    itemsPerVertex: number,
    at: BufferMap,
    hash: Hash
  ): BufferCounter {
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

    return (at[hash] = {
      instances: 1,
      bufferInfo: { itemsPerVertex, buffer, length: data.length, hash },
    });
  }

  private resolveColorsBuffer(color: number[], length: number): BufferCounter {
    const hash = hashString(color.join(""));

    if (this.colorsBuffers[hash] !== undefined) {
      // This color combinations buffer exits and will be used
      this.colorsBuffers[hash].instances++;

      // Check if the existing buffer is long enough
      if (this.colorsBuffers[hash].bufferInfo.length < length) {
        // This buffer is too short; extend this buffer
        const data = new Float32Array(
          Array.from({ length }).map((_, i) => color[i % color.length])
        );

        this.gl.bindBuffer(
          this.gl.ARRAY_BUFFER,
          this.colorsBuffers[hash].bufferInfo.buffer
        );
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
      } else {
        // This buffer is long enough to serve this
        return this.colorsBuffers[hash];
      }
    } else {
      // This color combination wasn't used before; create a new buffer
      const data = new Float32Array(
        Array.from({ length }).map((_, i) => color[i % color.length])
      );

      return this.bufferNewData(data, 4, this.colorsBuffers, hash);
    }
  }

  public loadObj(objFileContents: string, color: number[]): BufferData {
    const hash = hashString(objFileContents);

    const data: BufferData = {} as BufferData;

    if (
      this.positionsBuffers[hash] !== undefined &&
      this.normalsBuffers[hash] !== undefined
    ) {
      this.positionsBuffers[hash].instances++;
      this.normalsBuffers[hash].instances++;

      data.positions = this.positionsBuffers[hash].bufferInfo;
      data.normals = this.normalsBuffers[hash].bufferInfo;
    } else {
      const { positions, normals } = loadObj(objFileContents);

      data.positions = this.bufferNewData(
        positions,
        4,
        this.positionsBuffers,
        hash
      ).bufferInfo;

      data.normals = this.bufferNewData(
        normals,
        4,
        this.normalsBuffers,
        hash
      ).bufferInfo;
    }

    data.colors = this.resolveColorsBuffer(
      color,
      data.positions.length
    ).bufferInfo;

    return data;
  }

  public loadShape(shape: ShapeDefinition, color: number[]) {
    const data: BufferData = {
      defaultScale: shape.defaultScale,
    } as BufferData;

    if (
      this.positionsBuffers[shape.hash] !== undefined &&
      this.normalsBuffers[shape.hash] !== undefined
    ) {
      this.positionsBuffers[shape.hash].instances++;
      this.normalsBuffers[shape.hash].instances++;

      data.positions = this.positionsBuffers[shape.hash].bufferInfo;
      data.normals = this.normalsBuffers[shape.hash].bufferInfo;
    } else {
      const positions = new Float32Array(shape.positions);
      const normals = createNormals(positions);

      data.positions = this.bufferNewData(
        positions,
        4,
        this.positionsBuffers,
        shape.hash
      ).bufferInfo;

      data.normals = this.bufferNewData(
        normals,
        4,
        this.normalsBuffers,
        shape.hash
      ).bufferInfo;
    }

    data.colors = this.resolveColorsBuffer(
      color,
      data.positions.length
    ).bufferInfo;

    return data;
  }

  public unregisterBuffers(data: BufferData): void {
    const checkAndUnregister = (map: BufferMap, hash: Hash) => {
      if (map[hash] !== undefined) {
        map[hash].instances--;

        if (map[hash].instances === 0) {
          this.gl.deleteBuffer(map[hash].bufferInfo.buffer);
          map[hash] = undefined;
        }
      }
    };

    checkAndUnregister(this.positionsBuffers, data.positions.hash);
    checkAndUnregister(this.normalsBuffers, data.normals.hash);
    checkAndUnregister(this.colorsBuffers, data.colors.hash);
  }
}

export { BufferManager };
