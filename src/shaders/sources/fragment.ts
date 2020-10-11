import compileShader from "../compile-shader";

const shaderProgram = `
precision mediump float;

varying vec3 v_normal;

void main() {
    gl_FragColor = vec4(0.0, 0.4, 1.0, 1.0);
}
`;

const getFragmentShader = (gl: WebGLRenderingContext) =>
  compileShader(gl, gl.FRAGMENT_SHADER, shaderProgram);

export default getFragmentShader;
