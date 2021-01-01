import { ShapeDefinition } from "../../model";

const positions = [
  // front high
  1 / 2,
  1 / 2,
  1 / 2,
  1,
  -1 / 2,
  1 / 2,
  1 / 2,
  1,
  -1 / 2,
  -1 / 2,
  1 / 2,
  1,

  // front low
  -1 / 2,
  -1 / 2,
  1 / 2,
  1,
  1 / 2,
  -1 / 2,
  1 / 2,
  1,
  1 / 2,
  1 / 2,
  1 / 2,
  1,

  // right high
  1 / 2,
  -1 / 2,
  -1 / 2,
  1,
  1 / 2,
  1 / 2,
  -1 / 2,
  1,
  1 / 2,
  1 / 2,
  1 / 2,
  1,

  // right low
  1 / 2,
  1 / 2,
  1 / 2,
  1,
  1 / 2,
  -1 / 2,
  1 / 2,
  1,
  1 / 2,
  -1 / 2,
  -1 / 2,
  1,

  // back low
  1 / 2,
  1 / 2,
  -1 / 2,
  1,
  1 / 2,
  -1 / 2,
  -1 / 2,
  1,
  -1 / 2,
  -1 / 2,
  -1 / 2,
  1,

  // back high
  -1 / 2,
  1 / 2,
  -1 / 2,
  1,
  1 / 2,
  1 / 2,
  -1 / 2,
  1,
  -1 / 2,
  -1 / 2,
  -1 / 2,
  1,

  // left high
  -1 / 2,
  1 / 2,
  -1 / 2,
  1,
  -1 / 2,
  -1 / 2,
  -1 / 2,
  1,
  -1 / 2,
  1 / 2,
  1 / 2,
  1,

  // left low
  -1 / 2,
  -1 / 2,
  1 / 2,
  1,
  -1 / 2,
  1 / 2,
  1 / 2,
  1,
  -1 / 2,
  -1 / 2,
  -1 / 2,
  1,

  // bottom close
  1 / 2,
  -1 / 2,
  1 / 2,
  1,
  -1 / 2,
  -1 / 2,
  1 / 2,
  1,
  1 / 2,
  -1 / 2,
  -1 / 2,
  1,

  // bottom far
  -1 / 2,
  -1 / 2,
  -1 / 2,
  1,
  1 / 2,
  -1 / 2,
  -1 / 2,
  1,
  -1 / 2,
  -1 / 2,
  1 / 2,
  1,

  // top close
  -1 / 2,
  1 / 2,
  1 / 2,
  1,
  1 / 2,
  1 / 2,
  1 / 2,
  1,
  1 / 2,
  1 / 2,
  -1 / 2,
  1,

  // top far
  1 / 2,
  1 / 2,
  -1 / 2,
  1,
  -1 / 2,
  1 / 2,
  -1 / 2,
  1,
  -1 / 2,
  1 / 2,
  1 / 2,
  1,
];

const uvs = [
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  0,

  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  0,

  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  0,

  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  0,

  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  0,

  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  0,
];

const createCuboid = (
  xWidth: number,
  yHeight: number = xWidth,
  zDepth: number = yHeight
): ShapeDefinition => ({
  hash: "cuboid",
  defaultScale: { x: xWidth, y: yHeight, z: zDepth },
  positions,
  uvs,
});

export { createCuboid };
