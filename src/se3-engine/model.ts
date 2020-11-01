import { Object3d } from "../objects/object3d.class";
import { ProgramInfo } from "./../shaders/model";

export interface S3eConfiguration {
  programInfo: ProgramInfo;
  positionsAttribute: string;
  normalAttribute: string;
  worldViewUniform: string;
  projectionUniform: string;
}

export interface SceneObject {
  object: Object3d;
  buffer: WebGLBuffer;
}
