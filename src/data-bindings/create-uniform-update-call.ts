import { CompiledParameterDescriptor } from "../shaders/model";
import { DataUpdateCall } from "./model";

const typeMappings: Record<
  string,
  { functionName: string; args?: number; matrixType?: boolean }
> = {
  float: { functionName: "uniform1f" },
  vec2: { functionName: "uniform2fv" },
  vec3: { functionName: "uniform3fv" },
  vec4: { functionName: "uniform4fv" },
  mat2: { functionName: "uniformMatrix2fv", matrixType: true },
  mat3: { functionName: "uniformMatrix3fv", matrixType: true },
  mat4: { functionName: "uniformMatrix4fv", matrixType: true },
  sampler2D: { functionName: "uniform1i" },
};

const createUniformUpdateCall = (
  gl: any,
  parameter: CompiledParameterDescriptor<WebGLUniformLocation>
): DataUpdateCall<number | number[] | Float32Array> => {
  const mapping = typeMappings[parameter.type];

  if (mapping === undefined)
    throw new Error(`Cannot create a binding call for ${parameter.type} type`);

  return mapping.matrixType ?? false
    ? (newValue, inverse = false) =>
        gl[mapping.functionName](parameter.location, inverse, newValue)
    : (newValue) => gl[mapping.functionName](parameter.location, newValue);
};

export { createUniformUpdateCall };
