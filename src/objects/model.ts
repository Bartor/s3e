import { Mat4 } from "./../3d/model";

export interface Vec3<T> {
  x: T;
  y: T;
  z: T;
}

export type Position3d = Vec3<number>;
export type Rotation3d = Vec3<number>;

export interface CameraSettings {
  viewAngle: number;
  aspectRatio: number;
  near: number;
  far: number;
}

export interface Object3d {
  changed: boolean;

  selfMatrix: Mat4;
  absoluteMatrix: Mat4;

  readonly position: Position3d;
  readonly rotation: Rotation3d;

  children: Object3d[];
  parent: Object3d;
}
