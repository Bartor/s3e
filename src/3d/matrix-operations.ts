import { Mat4 } from "./model";

export const identity = (): Mat4 =>
  new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

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

export const invert = (
  matrix: Mat4,
  destination: Mat4 = new Float32Array(16)
) => {
  const m00 = matrix[0 * 4 + 0];
  const m01 = matrix[0 * 4 + 1];
  const m02 = matrix[0 * 4 + 2];
  const m03 = matrix[0 * 4 + 3];
  const m10 = matrix[1 * 4 + 0];
  const m11 = matrix[1 * 4 + 1];
  const m12 = matrix[1 * 4 + 2];
  const m13 = matrix[1 * 4 + 3];
  const m20 = matrix[2 * 4 + 0];
  const m21 = matrix[2 * 4 + 1];
  const m22 = matrix[2 * 4 + 2];
  const m23 = matrix[2 * 4 + 3];
  const m30 = matrix[3 * 4 + 0];
  const m31 = matrix[3 * 4 + 1];
  const m32 = matrix[3 * 4 + 2];
  const m33 = matrix[3 * 4 + 3];
  const tmp0 = m22 * m33;
  const tmp1 = m32 * m23;
  const tmp2 = m12 * m33;
  const tmp3 = m32 * m13;
  const tmp4 = m12 * m23;
  const tmp5 = m22 * m13;
  const tmp6 = m02 * m33;
  const tmp7 = m32 * m03;
  const tmp8 = m02 * m23;
  const tmp9 = m22 * m03;
  const tmp10 = m02 * m13;
  const tmp11 = m12 * m03;
  const tmp12 = m20 * m31;
  const tmp13 = m30 * m21;
  const tmp14 = m10 * m31;
  const tmp15 = m30 * m11;
  const tmp16 = m10 * m21;
  const tmp17 = m20 * m11;
  const tmp18 = m00 * m31;
  const tmp19 = m30 * m01;
  const tmp20 = m00 * m21;
  const tmp21 = m20 * m01;
  const tmp22 = m00 * m11;
  const tmp23 = m10 * m01;

  const t0 =
    tmp0 * m11 +
    tmp3 * m21 +
    tmp4 * m31 -
    (tmp1 * m11 + tmp2 * m21 + tmp5 * m31);
  const t1 =
    tmp1 * m01 +
    tmp6 * m21 +
    tmp9 * m31 -
    (tmp0 * m01 + tmp7 * m21 + tmp8 * m31);
  const t2 =
    tmp2 * m01 +
    tmp7 * m11 +
    tmp10 * m31 -
    (tmp3 * m01 + tmp6 * m11 + tmp11 * m31);
  const t3 =
    tmp5 * m01 +
    tmp8 * m11 +
    tmp11 * m21 -
    (tmp4 * m01 + tmp9 * m11 + tmp10 * m21);

  const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

  destination[0] = d * t0;
  destination[1] = d * t1;
  destination[2] = d * t2;
  destination[3] = d * t3;
  destination[4] =
    d *
    (tmp1 * m10 +
      tmp2 * m20 +
      tmp5 * m30 -
      (tmp0 * m10 + tmp3 * m20 + tmp4 * m30));
  destination[5] =
    d *
    (tmp0 * m00 +
      tmp7 * m20 +
      tmp8 * m30 -
      (tmp1 * m00 + tmp6 * m20 + tmp9 * m30));
  destination[6] =
    d *
    (tmp3 * m00 +
      tmp6 * m10 +
      tmp11 * m30 -
      (tmp2 * m00 + tmp7 * m10 + tmp10 * m30));
  destination[7] =
    d *
    (tmp4 * m00 +
      tmp9 * m10 +
      tmp10 * m20 -
      (tmp5 * m00 + tmp8 * m10 + tmp11 * m20));
  destination[8] =
    d *
    (tmp12 * m13 +
      tmp15 * m23 +
      tmp16 * m33 -
      (tmp13 * m13 + tmp14 * m23 + tmp17 * m33));
  destination[9] =
    d *
    (tmp13 * m03 +
      tmp18 * m23 +
      tmp21 * m33 -
      (tmp12 * m03 + tmp19 * m23 + tmp20 * m33));
  destination[10] =
    d *
    (tmp14 * m03 +
      tmp19 * m13 +
      tmp22 * m33 -
      (tmp15 * m03 + tmp18 * m13 + tmp23 * m33));
  destination[11] =
    d *
    (tmp17 * m03 +
      tmp20 * m13 +
      tmp23 * m23 -
      (tmp16 * m03 + tmp21 * m13 + tmp22 * m23));
  destination[12] =
    d *
    (tmp14 * m22 +
      tmp17 * m32 +
      tmp13 * m12 -
      (tmp16 * m32 + tmp12 * m12 + tmp15 * m22));
  destination[13] =
    d *
    (tmp20 * m32 +
      tmp12 * m02 +
      tmp19 * m22 -
      (tmp18 * m22 + tmp21 * m32 + tmp13 * m02));
  destination[14] =
    d *
    (tmp18 * m12 +
      tmp23 * m32 +
      tmp15 * m02 -
      (tmp22 * m32 + tmp14 * m02 + tmp19 * m12));
  destination[15] =
    d *
    (tmp22 * m22 +
      tmp16 * m02 +
      tmp21 * m12 -
      (tmp20 * m12 + tmp23 * m22 + tmp17 * m02));

  return destination;
};

export const perspective = (
  fov: number,
  aspectRatio: number,
  near: number,
  far: number
) => {
  const f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
  const rangeInverse = 1 / (near - far);

  return [
    f / aspectRatio,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (near + far) * rangeInverse,
    -1,
    0,
    0,
    near * far * rangeInverse * 2,
    0,
  ];
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