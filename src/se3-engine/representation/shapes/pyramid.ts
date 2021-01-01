import { ShapeDefinition } from "../../model";

const positions = [
  // base front
  -1 / 2,
  0,
  1 / 2,
  1,
  1 / 2,
  0,
  -1 / 2,
  1,
  1 / 2,
  0,
  1 / 2,
  1,

  // base back
  1 / 2,
  0,
  -1 / 2,
  1,
  -1 / 2,
  0,
  1 / 2,
  1,

  -1 / 2,
  0,
  -1 / 2,
  1,

  // front
  -1 / 2,
  0,
  1 / 2,
  1,
  1 / 2,
  0,
  1 / 2,
  1,
  0,
  1,
  0,
  1,

  // left
  -1 / 2,
  0,
  -1 / 2,
  1,
  -1 / 2,
  0,
  1 / 2,
  1,
  0,
  1,
  0,
  1,

  // back
  1 / 2,
  0,
  -1 / 2,
  1,
  -1 / 2,
  0,
  -1 / 2,
  1,
  0,
  1,
  0,
  1,

  // right
  1 / 2,
  0,
  1 / 2,
  1,
  1 / 2,
  0,
  -1 / 2,
  1,
  0,
  1,
  0,
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
  1 / 2,

  0,
  0,
  0,
  1,
  1,
  1 / 2,

  0,
  0,
  0,
  1,
  1,
  1 / 2,

  0,
  0,
  0,
  1,
  1,
  1 / 2,
];

const createPyramid = (
  xBase: number,
  zBase: number = xBase,
  height: number = Math.sqrt(xBase)
): ShapeDefinition => ({
  hash: "pyramid",
  defaultScale: { x: xBase, y: height, z: zBase },
  positions,
  uvs,
});

export { createPyramid };
