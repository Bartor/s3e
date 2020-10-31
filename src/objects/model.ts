import { Mat4 } from "./../3d/model";

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
}

export interface CameraSettings {
  viewAngle: number;
  aspectRatio: number;
  near: number;
  far: number;
}

export interface Object3d {
  representation: PolygonRepresentation;

  changed: boolean;

  selfMatrix: Mat4;
  absoluteMatrix: Mat4;

  readonly position: Position3d;
  readonly rotation: Rotation3d;
  readonly scale: Scale3d;

  children: Object3d[];
  parent: Object3d;

  updateParent: (parent: Object3d) => void;
  addChild: (child: Object3d) => void;
}
