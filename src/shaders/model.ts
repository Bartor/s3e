export interface ParameterDescriptor {
  name: string;
  type: string;
}

export interface CompiledParameterDescriptor<T> extends ParameterDescriptor {
  location: T;
}

export interface ShaderInfo {
  shader: WebGLShader;
  shaderType: any;
  attributes: ParameterDescriptor[];
  uniforms: ParameterDescriptor[];
}

export interface ProgramInfo {
  program: WebGLProgram;
  attributes: CompiledParameterDescriptor<number>[];
  uniforms: CompiledParameterDescriptor<WebGLUniformLocation>[];
}
