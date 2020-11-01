import { Object3d } from "../objects/object3d.class";
import { ProgramInfo } from "./../shaders/model";

export interface S3eConfiguration {
  programInfo: ProgramInfo;
  positionsAttributeName: string;
  normalAttributeName: string;
  worldViewUniformName: string;
}

export interface SceneObject {
  drawable: boolean;
  buffer: WebGLBuffer;
  object: Object3d;
}
