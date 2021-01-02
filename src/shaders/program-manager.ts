import { createProgram } from "./util/create-program";
import { createBasicCall, FEATURES_PARAMETERS } from "./features";
import { ParameterUpdateFunction, ProgramInfo } from "./model";
import { getFragmentShader } from "./sources/fragment";
import { getVertexShader } from "./sources/vertex";

class ProgramManager {
  private programs: Record<number, ProgramInfo | undefined> = {};

  constructor(private gl: WebGLRenderingContext) {}

  private prepareProgram(featuresMask: number): ProgramInfo {
    const vertex = getVertexShader(this.gl, featuresMask);
    const fragment = getFragmentShader(this.gl, featuresMask);
    const program = createProgram(this.gl, vertex, fragment);

    return (this.programs[featuresMask] = {
      program,
      featuresMask,
      updateFunctions: FEATURES_PARAMETERS.filter(
        (parameter) => (parameter.featureMask & featuresMask) !== 0
      )
        .map((parameter) => parameter.createFeatureCall(this.gl, program))
        .reduce<ParameterUpdateFunction[]>((acc, e) => [...acc, e], []),
      basicCall: createBasicCall(this.gl, program),
    });
  }

  // This should later be converted to Promise to get rid of lag spikes
  public requestProgram(featureMask: number): ProgramInfo {
    return this.programs[featureMask] ?? this.prepareProgram(featureMask);
  }
}

export { ProgramManager };
