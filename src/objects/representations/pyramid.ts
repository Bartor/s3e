import { createNormals } from "../util/create-normals";
import { Vec4 } from "./../../3d/model";
import { PolygonRepresentation } from "./../model";
function createPyramid(
  color: Vec4,
  xBase: number,
  zBase: number = xBase,
  height: number = Math.sqrt(xBase)
): PolygonRepresentation {
  const pointsArray = new Float32Array([
    // base front
    -xBase / 2,
    0,
    zBase / 2,
    1,
    xBase / 2,
    0,
    -zBase / 2,
    1,
    xBase / 2,
    0,
    zBase / 2,
    1,

    // base back
    xBase / 2,
    0,
    -zBase / 2,
    1,
    -xBase / 2,
    0,
    zBase / 2,
    1,

    -xBase / 2,
    0,
    -zBase / 2,
    1,

    // front
    -xBase / 2,
    0,
    zBase / 2,
    1,
    xBase / 2,
    0,
    zBase / 2,
    1,
    0,
    height,
    0,
    1,

    // left
    -xBase / 2,
    0,
    -zBase / 2,
    1,
    -xBase / 2,
    0,
    zBase / 2,
    1,
    0,
    height,
    0,
    1,

    // back
    xBase / 2,
    0,
    -zBase / 2,
    1,
    -xBase / 2,
    0,
    -zBase / 2,
    1,
    0,
    height,
    0,
    1,

    // right
    xBase / 2,
    0,
    zBase / 2,
    1,
    xBase / 2,
    0,
    -zBase / 2,
    1,
    0,
    height,
    0,
    1,
  ]);

  const normalsArray = createNormals(pointsArray);

  return {
    pointsPerFace: 4,
    pointsArray,
    normalsArray,
    colorsArray: new Float32Array(pointsArray.length).map(
      (_, i) => color[i % color.length]
    ),
  };
}

export { createPyramid };
