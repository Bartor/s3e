import { PolygonRepresentation } from "./../model";
function createCuboid(
  xWidth: number,
  yHeight: number = xWidth,
  zDepth: number = yHeight
): PolygonRepresentation {
  return {
    pointsPerFace: 4,
    pointsArray: new Float32Array([
      // front high
      xWidth / 2,
      yHeight / 2,
      zDepth / 2,
      1,
      -xWidth / 2,
      yHeight / 2,
      zDepth / 2,
      1,
      xWidth / 2,
      -yHeight / 2,
      zDepth / 2,
      1,

      // front low
      -xWidth / 2,
      -yHeight / 2,
      zDepth / 2,
      1,

      xWidth / 2,
      -yHeight / 2,
      zDepth / 2,
      1,

      xWidth / 2,
      yHeight / 2,
      zDepth / 2,
      1,

      // right high
      xWidth / 2,
      yHeight / 2,
      zDepth / 2,
      1,

      xWidth / 2,
      yHeight / 2,
      -zDepth / 2,
      1,

      xWidth / 2,
      -yHeight / 2,
      -zDepth / 2,
      1,

      // right low
      xWidth / 2,
      -yHeight / 2,
      -zDepth / 2,
      1,

      xWidth / 2,
      -yHeight / 2,
      zDepth / 2,
      1,

      xWidth / 2,
      yHeight / 2,
      -zDepth / 2,
      1,

      // back low
      xWidth / 2,
      -yHeight / 2,
      -zDepth / 2,
      1,

      xWidth / 2,
      yHeight / 2,
      -zDepth / 2,
      1,

      -xWidth / 2,
      -yHeight / 2,
      -zDepth / 2,
      1,

      // back high
      xWidth / 2,
      yHeight / 2,
      -zDepth / 2,
      1,

      -xWidth / 2,
      yHeight / 2,
      -zDepth / 2,
      1,

      -xWidth / 2,
      -yHeight / 2,
      -zDepth / 2,
      1,

      // left high
      -xWidth / 2,
      -yHeight / 2,
      -zDepth / 2,
      1,

      -xWidth / 2,
      yHeight / 2,
      -zDepth / 2,
      1,

      -xWidth / 2,
      yHeight / 2,
      zDepth / 2,
      1,

      // left low
      -xWidth / 2,
      yHeight / 2,
      zDepth / 2,
      1,

      -xWidth / 2,
      -yHeight / 2,
      zDepth / 2,
      1,

      -xWidth / 2,
      -yHeight / 2,
      -zDepth / 2,
      1,

      // bottom close
      xWidth / 2,
      -yHeight / 2,
      zDepth / 2,
      1,

      -xWidth / 2,
      -yHeight / 2,
      zDepth / 2,
      1,

      xWidth / 2,
      -yHeight / 2,
      -zDepth / 2,
      1,

      // bottom far
      -xWidth / 2,
      -yHeight / 2,
      -zDepth / 2,
      1,

      xWidth / 2,
      -yHeight / 2,
      -zDepth / 2,
      1,

      -xWidth / 2,
      -yHeight / 2,
      zDepth / 2,
      1,

      // top close
      xWidth / 2,
      yHeight / 2,
      zDepth / 2,
      1,

      -xWidth / 2,
      yHeight / 2,
      zDepth / 2,
      1,

      xWidth / 2,
      yHeight / 2,
      -zDepth / 2,
      1,

      // top far
      -xWidth / 2,
      yHeight / 2,
      -zDepth / 2,
      1,

      xWidth / 2,
      yHeight / 2,
      -zDepth / 2,
      1,

      -xWidth / 2,
      yHeight / 2,
      zDepth / 2,
      1,
    ]),
  };
}

export { createCuboid };
