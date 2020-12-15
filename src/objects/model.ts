export interface Vec3<T> {
  x: T;
  y: T;
  z: T;
}

export type Position3d = Vec3<number>;
export type Rotation3d = Vec3<number>;
export type Scale3d = Vec3<number>;

export interface CameraSettings {
  viewAngle: number;
  aspectRatio: number;
  near: number;
  far: number;
}