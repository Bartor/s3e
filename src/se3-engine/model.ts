import { Scale3d } from "../objects/model";
import { Object3d } from "../objects/object3d.class";
import { S3e } from "./engine";

export interface SceneObject {
  drawable: boolean;
  object: Object3d;
}

export type Hash = string | number;

export type Hashes = Record<string, Hash>;

export interface LoadOptions {
  color?: number[];
  texture?: {
    source: string;
    uvs?: number[];
  };
}

export interface BufferInfo {
  buffer: WebGLBuffer;
  hash: Hash;
  itemsPerVertex: number;
  length: number;
}

export interface TextureInfo {
  texture: WebGLTexture;
  name: string;
}

export interface BufferData {
  positions: BufferInfo;
  [bufferName: string]: BufferInfo;
}

export interface ObjectRepresentation {
  bufferData: BufferData;
  defaultScale?: Scale3d;
  featuresMask: number;
  texture?: TextureInfo;
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
