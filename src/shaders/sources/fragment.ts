import { compileShader } from "../util/compile-shader";
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
    featureMask: FEATURES.NORMAL_MAP,
    sourceCode: "varying mat3 v_TBN;\nuniform sampler2D u_normalMap;/*",
  },
  {
    // This is commented out when using normal maps
    featureMask: FEATURES.DIFFUSE_LIGHTING,
    sourceCode: "varying vec3 v_normal;",
  },
  {
    featureMask: FEATURES.NORMAL_MAP,
    sourceCode: "*/",
  },
  {
    featureMask: FEATURES.DIFFUSE_LIGHTING,
    sourceCode: "uniform vec3 u_reverseLightDirection;\n",
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
    featureMask:
      FEATURES.DIFFUSE_LIGHTING |
      FEATURES.AMBIENT_LIGHTING |
      FEATURES.NORMAL_MAP,
    sourceCode: "float light = 0.0;\nvec3 normal = vec3(0.0);",
  },
  {
    featureMask: FEATURES.NORMAL_MAP,
    sourceCode:
      "normal = texture2D(u_normalMap, v_uv).rgb;\n" +
      "normal = normal * 2.0 - 1.0;\n" +
      "normal = normalize(v_TBN * normal);\n/*",
  },
  {
    // This is commented out when using normal maps
    featureMask: FEATURES.DIFFUSE_LIGHTING,
    sourceCode: "normal = v_normal;",
  },
  {
    featureMask: FEATURES.NORMAL_MAP,
    sourceCode: "*/",
  },
  {
    featureMask: FEATURES.DIFFUSE_LIGHTING | FEATURES.NORMAL_MAP,
    sourceCode: "light += dot(normalize(normal), u_reverseLightDirection);",
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
    featureMask:
      FEATURES.AMBIENT_LIGHTING |
      FEATURES.DIFFUSE_LIGHTING |
      FEATURES.NORMAL_MAP,
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
