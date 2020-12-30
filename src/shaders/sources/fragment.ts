import { compileShader } from "../compile-shader";
import { FEATURES, UNIVERSAL_MASK } from "../features";
import { ShaderPart } from "../model";

const shaderParts: ShaderPart[] = [
  {
    featureMask: UNIVERSAL_MASK,
    sourceCode: "precision mediump float;",
  },
  {
    featureMask: FEATURES.COLOR,
    sourceCode: "varying vec4 v_color;",
  },
  {
    featureMask: FEATURES.TEXTURES,
    sourceCode: "varying vec2 v_uv;",
  },
  {
    featureMask: FEATURES.AMBIENT_LIGHTING,
    sourceCode: "uniform float u_ambient;",
  },
  {
    featureMask: FEATURES.DIFFUSE_LIGHTING,
    sourceCode: "uniform vec3 u_reverseLightDirection;varying vec3 v_normal;",
  },
  {
    featureMask: FEATURES.TEXTURES,
    sourceCode: "uniform sampler2D u_texture;",
  },
  {
    featureMask: UNIVERSAL_MASK,
    sourceCode: "void main() {",
  },
  {
    featureMask: FEATURES.DIFFUSE_LIGHTING | FEATURES.AMBIENT_LIGHTING,
    sourceCode: "float light = 0.0;",
  },
  {
    featureMask: FEATURES.DIFFUSE_LIGHTING,
    sourceCode: "light += dot(normalize(v_normal), u_reverseLightDirection);",
  },
  {
    featureMask: FEATURES.AMBIENT_LIGHTING,
    sourceCode: "light += u_ambient;",
  },
  {
    featureMask: FEATURES.DIFFUSE_LIGHTING,
    sourceCode: "light = min(light, 1.5);",
  },
  {
    featureMask: FEATURES.AMBIENT_LIGHTING,
    sourceCode: "light = max(light, u_ambient);",
  },
  {
    featureMask: FEATURES.COLOR,
    sourceCode: "gl_FragColor = v_color;",
  },
  {
    featureMask: FEATURES.TEXTURES,
    sourceCode: "gl_FragColor = texture2D(u_texture, v_uv);",
  },
  {
    featureMask: FEATURES.AMBIENT_LIGHTING | FEATURES.DIFFUSE_LIGHTING,
    sourceCode: "gl_FragColor.rgb *= light;",
  },
  {
    featureMask: UNIVERSAL_MASK,
    sourceCode: "}",
  },
];

const getFragmentShader = (gl: WebGLRenderingContext, featuresMask: number) =>
  compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    shaderParts
      .filter((part) => (part.featureMask & featuresMask) !== 0)
      .map((part) => part.sourceCode)
      .join("\n")
  );

export { getFragmentShader };
