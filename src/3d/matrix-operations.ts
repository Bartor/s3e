import { Mat4 } from "./model";

export const multiply = (
  matrixA: Mat4,
  matrixB: Mat4,
  destination: Mat4 = new Float32Array(16)
): Mat4 => {
  const a00 = matrixA[0 * 4 + 0];
  const a01 = matrixA[0 * 4 + 1];
  const a02 = matrixA[0 * 4 + 2];
  const a03 = matrixA[0 * 4 + 3];
  const a10 = matrixA[1 * 4 + 0];
  const a11 = matrixA[1 * 4 + 1];
  const a12 = matrixA[1 * 4 + 2];
  const a13 = matrixA[1 * 4 + 3];
  const a20 = matrixA[2 * 4 + 0];
  const a21 = matrixA[2 * 4 + 1];
  const a22 = matrixA[2 * 4 + 2];
  const a23 = matrixA[2 * 4 + 3];
  const a30 = matrixA[3 * 4 + 0];
  const a31 = matrixA[3 * 4 + 1];
  const a32 = matrixA[3 * 4 + 2];
  const a33 = matrixA[3 * 4 + 3];

  const b00 = matrixB[0 * 4 + 0];
  const b01 = matrixB[0 * 4 + 1];
  const b02 = matrixB[0 * 4 + 2];
  const b03 = matrixB[0 * 4 + 3];
  const b10 = matrixB[1 * 4 + 0];
  const b11 = matrixB[1 * 4 + 1];
  const b12 = matrixB[1 * 4 + 2];
  const b13 = matrixB[1 * 4 + 3];
  const b20 = matrixB[2 * 4 + 0];
  const b21 = matrixB[2 * 4 + 1];
  const b22 = matrixB[2 * 4 + 2];
  const b23 = matrixB[2 * 4 + 3];
  const b30 = matrixB[3 * 4 + 0];
  const b31 = matrixB[3 * 4 + 1];
  const b32 = matrixB[3 * 4 + 2];
  const b33 = matrixB[3 * 4 + 3];

  destination[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
  destination[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
  destination[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
  destination[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
  destination[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
  destination[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
  destination[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
  destination[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
  destination[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
  destination[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
  destination[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
  destination[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
  destination[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
  destination[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
  destination[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
  destination[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

  return destination;
};

export const move = (
  matrix: Mat4,
  dx: number = 0,
  dy: number = 0,
  dz: number = 0,
  destination?: Mat4
): Mat4 =>
  multiply(
    matrix,
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, dx, dy, dz, 1],
    destination
  );

export const scale = (
  matrix: Mat4,
  sx: number = 1,
  sy: number = 1,
  sz: number = 1,
  destination?: Mat4
) =>
  multiply(
    matrix,
    [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1],
    destination
  );

export const rotateX = (
  matrix: Mat4,
  angle: number,
  destination?: Mat4
): Mat4 => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  return multiply(
    matrix,
    [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1],
    destination
  );
};

export const rotateY = (
  matrix: Mat4,
  angle: number,
  destination?: Mat4
): Mat4 => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  return multiply(
    matrix,
    [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1],
    destination
  );
};

export const rotateZ = (
  matrix: Mat4,
  angle: number,
  destination?: Mat4
): Mat4 => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  return multiply(
    matrix,
    [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    destination
  );
};
