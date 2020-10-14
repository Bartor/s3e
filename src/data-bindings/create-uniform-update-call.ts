import { DataSignature, DataUpdateCall } from "./model";

const typeMappings: Record<
  string,
  { functionName: string; matrixType: boolean }
> = {
  float: { functionName: "uniform1f", matrixType: false },
  vec2: { functionName: "uniform2fv", matrixType: false },
  vec3: { functionName: "uniform3fv", matrixType: false },
  vec4: { functionName: "uniform4fv", matrixType: false },
  mat2: { functionName: "uniformMatrix2fv", matrixType: true },
  mat3: { functionName: "uniformMatrix3fv", matrixType: true },
  mat4: { functionName: "uniformMatrix4fv", matrixType: true },
};

const createUniformUpdateCall = (
  signature: DataSignature,
  gl: any
): DataUpdateCall<number | Float32Array> => {
  const mapping = typeMappings[signature.type];

  if (mapping === undefined)
    throw new Error(`Cannot create a binding call for ${signature.type} type`);

  return mapping.matrixType
    ? (newValue, inverse = false) =>
        gl[mapping.functionName](signature.location, inverse, newValue)
    : (newValue) => gl[mapping.functionName](signature.location, newValue);
};

export default createUniformUpdateCall;
