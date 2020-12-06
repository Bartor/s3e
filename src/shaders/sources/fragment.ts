import { compileShader } from "../compile-shader";

const shaderProgram = `
precision mediump float;

uniform vec3 u_reverseLightDirection;
uniform float u_ambient;

varying vec3 v_normal;
varying vec4 v_color;

void main() {
    vec3 normal = normalize(v_normal);
    float light = dot(normal, u_reverseLightDirection);

    gl_FragColor = v_color;
    gl_FragColor.rgb *= max(min(light + u_ambient, 1.5), u_ambient);
}
`;

const getFragmentShader = (gl: WebGLRenderingContext) =>
  compileShader(gl, gl.FRAGMENT_SHADER, shaderProgram);

export { getFragmentShader };
