import { Scale3d } from "../objects/model";
import { Object3d } from "../objects/object3d.class";
import { S3e } from "./engine";

export interface SceneObject {
  drawable: boolean;
  object: Object3d;
}

export type Hash = string | number;

export type Hashes = Record<string, Hash>;

export interface BufferInfo {
  buffer: WebGLBuffer;
  hash: Hash;
  itemsPerVertex: number;
  length: number;
}

export interface BufferData {
  colors: BufferInfo;
  defaultScale?: Scale3d;
  normals: BufferInfo;
  positions: BufferInfo;
  featuresMask: number;
}

export interface ShapeDefinition {
  positions: number[];
  hash: string;
  defaultScale: Scale3d;
}

export interface RenderState {
  engine: S3e;
  renderedObject: Object3d;
  hashes: Hashes;
}
