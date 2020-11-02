import { Object3d } from "../objects/object3d.class";
import { ProgramInfo } from "./../shaders/model";

export interface S3eConfiguration {
  programInfo: ProgramInfo;
  positionsAttributeName: string;
  normalsAttributeName: string;
  worldViewUniformName: string;
  ambientUniformName: string;
  lightDirectionUniformName: string;
}

export interface SceneObject {
  drawable: boolean;
  positionsBuffer: WebGLBuffer;
  normalsBuffer: WebGLBuffer;
  object: Object3d;
}
