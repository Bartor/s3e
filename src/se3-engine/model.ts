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
  positionsBuffer: WebGLBuffer;
  normalsBuffer: WebGLBuffer;
  colorsBuffer: WebGLBuffer;
  object: Object3d;
}
