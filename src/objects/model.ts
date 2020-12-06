export interface Vec3<T> {
  x: T;
  y: T;
  z: T;
}

export type Position3d = Vec3<number>;
export type Rotation3d = Vec3<number>;
export type Scale3d = Vec3<number>;

export interface PolygonRepresentation {
  pointsPerFace: number;
  pointsArray: Float32Array;
  normalsArray: Float32Array;
  colorsArray: Float32Array;
}

export interface CameraSettings {
  viewAngle: number;
  aspectRatio: number;
  near: number;
  far: number;
}
