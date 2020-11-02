import { compileShader } from "../compile-shader";

const shaderProgram = `
precision mediump float;

uniform vec3 u_reverseLightDirection;
uniform float u_ambient;

varying vec3 v_normal;

void main() {
    vec3 normal = normalize(v_normal);
    float light = dot(normal, u_reverseLightDirection);

    gl_FragColor = vec4(0, 0.44, 1, 1);
    gl_FragColor.rgb *= max(min(light + u_ambient, 1.5), u_ambient);
}
`;

const getFragmentShader = (gl: WebGLRenderingContext) =>
  compileShader(gl, gl.FRAGMENT_SHADER, shaderProgram);

export { getFragmentShader };
