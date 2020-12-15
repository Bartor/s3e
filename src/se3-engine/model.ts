import { Scale3d } from "../objects/model";
import { Object3d } from "../objects/object3d.class";
import { ProgramInfo } from "./../shaders/model";

export interface S3eConfiguration {
  programInfo: ProgramInfo;
  colorsAttributeName: string;
  positionsAttributeName: string;
  normalsAttributeName: string;
  normalMatrixUniformName: string;
  worldViewUniformName: string;
  ambientUniformName: string;
  lightDirectionUniformName: string;
}

export interface SceneObject {
  drawable: boolean;
  object: Object3d;
}

export type Hash = string | number;

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
}

export interface ShapeDefinition {
  positions: number[];
  hash: string;
  defaultScale: Scale3d;
}
