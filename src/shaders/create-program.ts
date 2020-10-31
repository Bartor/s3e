import { ProgramInfo, ShaderInfo } from "./model";

const createProgram = (
  gl: WebGLRenderingContext,
  vertexShader: ShaderInfo,
  fragmentShader: ShaderInfo
): ProgramInfo => {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader.shader);
  gl.attachShader(program, fragmentShader.shader);
  gl.linkProgram(program);

  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return {
      program,
      uniforms: [...vertexShader.uniforms, ...fragmentShader.uniforms].map(
        (uniformInfo) => ({
          ...uniformInfo,
          location: gl.getUniformLocation(program, uniformInfo.name),
        })
      ),
      attributes: [
        ...vertexShader.attributes,
        ...fragmentShader.attributes,
      ].map((attributeInfo) => ({
        ...attributeInfo,
        location: gl.getAttribLocation(program, attributeInfo.name),
      })),
    };
  } else {
    const err = new Error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    throw err;
  }
};

export { createProgram };
