import { compileShader } from "../compile-shader";

const shaderProgram = `
attribute vec4 a_position;
attribute vec3 a_normal;
attribute vec4 a_color;

uniform mat4 u_worldView;
uniform mat4 u_normal;

varying vec3 v_normal;
varying vec4 v_color;

void main() {
    gl_Position = u_worldView * a_position;
    v_normal = mat3(u_normal) * a_normal;
    v_color = a_color;
}
`;

const getVertexShader = (gl: WebGLRenderingContext) =>
  compileShader(gl, gl.VERTEX_SHADER, shaderProgram);

export { getVertexShader };
