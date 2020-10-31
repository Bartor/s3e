import { DataSignature, DataUpdateCall } from "./model";

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
  signature: DataSignature,
  gl: WebGLRenderingContext,
  customSize?: number,
  normalize = false,
  stride = 0,
  offset = 0
): DataUpdateCall<WebGLBuffer> => {
  const mapping = typeMappings[signature.type];

  if (mapping === undefined)
    throw new Error(`Cannot create a binding call for ${signature.type} type`);

  const size = customSize ?? mapping.size;

  return (newValue) => {
    gl.enableVertexAttribArray(signature.location as number);
    gl.bindBuffer(gl.ARRAY_BUFFER, newValue);
    gl.vertexAttribPointer(
      signature.location as number,
      size,
      gl.FLOAT,
      normalize,
      stride,
      offset
    );
  };
};

export { createAttributeUpdateCall };
