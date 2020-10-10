export interface ParameterDescriptor<T> {
  name: string;
  type: string;
  location?: T;
}

export interface ShaderInfo {
  shader: WebGLShader;
  shaderType: any;
  attributes: ParameterDescriptor<number>[];
  uniforms: ParameterDescriptor<WebGLUniformLocation>[];
}
