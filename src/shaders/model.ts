import { RenderState } from "../se3-engine/model";

export interface CompiledParameterDescriptor<T> {
  type: string;
  location: T;
}

export type ParameterUpdateFunction = (renderState: RenderState) => void;

export interface FeatureParameters {
  featureMask: number;
  createFeatureCall: (
    gl: WebGLRenderingContext,
    program: WebGLProgram
  ) => ParameterUpdateFunction;
}

export interface ShaderPart {
  featureMask: number;
  sourceCode: string;
}

export interface ProgramInfo {
  program: WebGLProgram;
  featuresMask: number;
  updateFunctions: ParameterUpdateFunction[];
  basicCall: ParameterUpdateFunction;
}
