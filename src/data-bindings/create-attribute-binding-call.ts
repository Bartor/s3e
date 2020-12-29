import { CompiledParameterDescriptor } from "../shaders/model";
import { DataUpdateCall } from "./model";

const typeMappings: Record<string, { size: number }> = {
  float: { size: 1 },
  vec2: { size: 2 },
  vec3: { size: 3 },
  vec4: { size: 4 },
  mat2: { size: 4 },
  mat3: { size: 9 },
  mat4: { size: 16 },
};

const createAttributeUpdateCall = (
  gl: WebGLRenderingContext,
  parameter: CompiledParameterDescriptor<number>,
  customSize?: number,
  normalize = false,
  stride = 0,
  offset = 0
): DataUpdateCall<WebGLBuffer> => {
  const mapping = typeMappings[parameter.type];

  if (mapping === undefined)
    throw new Error(`Cannot create a binding call for ${parameter.type} type`);

  const size = customSize ?? mapping.size;

  return (newValue) => {
    gl.enableVertexAttribArray(parameter.location);
    gl.bindBuffer(gl.ARRAY_BUFFER, newValue);
    gl.vertexAttribPointer(
      parameter.location,
      size,
      gl.FLOAT,
      normalize,
      stride,
      offset
    );
  };
};

export { createAttributeUpdateCall };
