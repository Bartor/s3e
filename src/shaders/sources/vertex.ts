import { compileShader } from "../compile-shader";

const shaderProgram = `
attribute vec4 a_position;
attribute vec3 a_normal;

uniform mat4 u_worldView;
uniform mat4 u_projection;

varying vec3 v_normal;

void main() {
    // gl_Position = u_projection * u_worldView * a_position;
    gl_Position = u_projection * a_position;
    v_normal = a_normal;
}
`;

const getVertexShader = (gl: WebGLRenderingContext) =>
  compileShader(gl, gl.VERTEX_SHADER, shaderProgram);

export { getVertexShader };
