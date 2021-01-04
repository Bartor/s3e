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

/**
 * Creates a function which updates a webgl attribute
 * @param {WebGLRenderingContext} gl WebGL context
 * @param {CompiledParameterDescriptor} parameter A descriptor of the attribute
 * @param {number} customSize Overrides size per vertex of the attribute
 * @param {boolean} normalize If the values should be normalized
 * @param {number} stride If there's some stride
 * @param {number} offset if there's some offset
 */
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
    gl.bindBuffer(gl.ARRAY_BUFFER, newValue);
    gl.vertexAttribPointer(
      parameter.location,
      size,
      gl.FLOAT,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(parameter.location);
  };
};

export { createAttributeUpdateCall };
