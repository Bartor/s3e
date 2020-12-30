import { FEATURES } from "../shaders/features";
import {
  BufferData,
  BufferInfo,
  Hash,
  LoadOptions,
  ObjectRepresentation,
  ShapeDefinition,
  TextureInfo,
} from "./model";
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

const DEFAULT_GREY = [160, 160, 160, 255];

interface BufferCounter {
  instances: number;
  bufferInfo: BufferInfo;
}

interface TextureCounter {
  instances: number;
  texture: TextureInfo;
}

type BufferMap = Record<Hash, BufferCounter | undefined>;

class BufferManager {
  private universalBuffersMap: Record<string, BufferMap | undefined> = {};
  private colorsBuffers: BufferMap = {};
  private textures: Record<Hash, TextureCounter | undefined> = {};

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

  private resolveUniversalBuffer(
    buffersType: string,
    dataSource: () => Float32Array,
    itemsPerVertex: number,
    hash: Hash
  ): BufferCounter {
    if (this.universalBuffersMap[buffersType] === undefined) {
      this.universalBuffersMap[buffersType] = {};
    }

    if (this.universalBuffersMap[buffersType][hash] !== undefined) {
      this.universalBuffersMap[buffersType][hash].instances++;
      return this.universalBuffersMap[buffersType][hash];
    } else {
      return this.bufferNewData(
        dataSource(),
        itemsPerVertex,
        this.universalBuffersMap[buffersType],
        hash
      );
    }
  }

  public loadTexture(imageSource: string): TextureInfo {
    if (this.textures[imageSource] === undefined) {
      const texture = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        0,
        this.gl.RGBA,
        1,
        1,
        0,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        // grey-ish
        new Uint8Array(DEFAULT_GREY)
      );

      const image = new Image();
      image.addEventListener("error", () =>
        console.error(`Texture ${imageSource} couldn't be loaded`)
      );
      image.addEventListener("load", () => {
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(
          this.gl.TEXTURE_2D,
          0,
          this.gl.RGBA,
          this.gl.RGBA,
          this.gl.UNSIGNED_BYTE,
          image
        );
        // this checks if the image's dimensions are powers of 2
        if (
          (image.height & (image.height - 1)) === 0 &&
          (image.width & (image.width - 1)) === 0
        ) {
          this.gl.generateMipmap(this.gl.TEXTURE_2D);
        }
      });

      image.src = imageSource;
      return (this.textures[imageSource] = {
        instances: 1,
        texture: { texture, name: imageSource },
      }).texture;
    } else {
      this.textures[imageSource].instances++;
      return this.textures[imageSource].texture;
    }
  }

  public loadObj(
    objFileContents: string,
    options?: LoadOptions
  ): ObjectRepresentation {
    const hash = hashString(objFileContents);

    let positions: Float32Array,
      normals: Float32Array,
      uvs: Float32Array | undefined,
      resolved = false;
    const resolutionFn = () => {
      if (resolved) {
        return { positions, normals, uvs };
      } else {
        ({ positions, normals, uvs } = loadObj(objFileContents));
        return { positions, normals, uvs };
      }
    };

    const representation: ObjectRepresentation = {
      featuresMask: FEATURES.AMBIENT_LIGHTING | FEATURES.DIFFUSE_LIGHTING,
      bufferData: {
        positions: this.resolveUniversalBuffer(
          "positions",
          () => resolutionFn().positions,
          4,
          hash
        ).bufferInfo,
        normals: this.resolveUniversalBuffer(
          "normals",
          () => resolutionFn().normals,
          4,
          hash
        ).bufferInfo,
      },
    };

    if (options?.texture) {
      representation.texture = this.loadTexture(options.texture.source);
      representation.featuresMask |= FEATURES.TEXTURES;
    } else if (options?.color) {
      representation.bufferData.colors = this.resolveColorsBuffer(
        options.color,
        positions.length
      ).bufferInfo;
      representation.featuresMask |= FEATURES.COLOR;
    }

    // this is evaluated by now
    if (options?.texture && uvs) {
      representation.bufferData.uvs = this.resolveUniversalBuffer(
        "uvs",
        () =>
          options.texture.uvs ? new Float32Array(options.texture.uvs) : uvs,
        2,
        hash
      ).bufferInfo;
    }

    return representation;
  }

  public loadShape(
    shape: ShapeDefinition,
    options?: LoadOptions
  ): ObjectRepresentation {
    const representation: ObjectRepresentation = {
      defaultScale: shape.defaultScale,
      featuresMask: FEATURES.AMBIENT_LIGHTING | FEATURES.DIFFUSE_LIGHTING,
      bufferData: {
        positions: this.resolveUniversalBuffer(
          "positions",
          () => new Float32Array(shape.positions),
          4,
          shape.hash
        ).bufferInfo,
        normals: this.resolveUniversalBuffer(
          "normals",
          () => createNormals(shape.positions),
          4,
          shape.hash
        ).bufferInfo,
      },
    };

    if (options?.texture && options.texture.uvs) {
      representation.texture = this.loadTexture(options.texture.source);
      representation.featuresMask |= FEATURES.TEXTURES;

      representation.bufferData.uvs = this.resolveUniversalBuffer(
        "uvs",
        () => new Float32Array(options.texture.uvs),
        2,
        shape.hash
      ).bufferInfo;
    } else if (options?.color) {
      representation.bufferData.colors = this.resolveColorsBuffer(
        options.color,
        shape.positions.length
      ).bufferInfo;
      representation.featuresMask |= FEATURES.COLOR;
    }

    return representation;
  }

  public cloneRepresentation(
    representation: ObjectRepresentation
  ): ObjectRepresentation {
    Object.keys(representation.bufferData).forEach((key) => {
      if (key === "colors") {
        this.colorsBuffers[representation.bufferData.colors.hash].instances++;
      } else {
        this.universalBuffersMap[key][representation.bufferData[key].hash]
          .instances++;
      }
    });

    return { ...representation, bufferData: { ...representation.bufferData } };
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

    Object.keys(data).forEach((key) => {
      if (key === "colors") {
        checkAndUnregister(this.colorsBuffers, data[key].hash);
      } else {
        checkAndUnregister(this.universalBuffersMap[key], data[key].hash);
      }
    });
  }
}

export { BufferManager };
