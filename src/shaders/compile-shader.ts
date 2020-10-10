import { ShaderInfo } from "./model";
import parseShader from "./parse-shader";

const compileShader = (
  gl: WebGLRenderingContext,
  shaderType: any,
  source: string
): ShaderInfo => {
  const { attributes, uniforms } = parseShader(source);

  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return {
      shader,
      shaderType,
      attributes,
      uniforms,
    };
  } else {
    gl.deleteShader(shader);
    throw new Error("Shader could not be compiled");
  }
};

export default compileShader;
