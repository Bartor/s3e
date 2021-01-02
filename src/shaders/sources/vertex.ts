import { compileShader } from "../util/compile-shader";
import { FEATURES, UNIVERSAL_MASK } from "../features";
import { ShaderPart } from "../model";

const shaderParts: ShaderPart[] = [
  {
    featureMask: UNIVERSAL_MASK,
    sourceCode: "attribute vec4 a_position;\nuniform mat4 u_worldView;",
  },
  {
    featureMask: FEATURES.DIFFUSE_LIGHTING,
    sourceCode: "attribute vec3 a_normal;",
  },
  {
    featureMask: FEATURES.COLOR,
    sourceCode: "attribute vec4 a_color;",
  },
  {
    featureMask: FEATURES.TEXTURES,
    sourceCode: "attribute vec2 a_uv;",
  },
  {
    featureMask: FEATURES.NORMAL_MAP,
    sourceCode:
      "attribute vec3 a_tangent;\nattribute vec3 a_bitangent;\nuniform mat4 u_model;/*",
  },
  {
    // This is commented out when using normal maps
    featureMask: FEATURES.DIFFUSE_LIGHTING,
    sourceCode: "varying vec3 v_normal;",
  },
  {
    // This is commented out when using normal maps
    featureMask: FEATURES.DIFFUSE_LIGHTING,
    sourceCode: "uniform mat4 u_normal;",
  },
  {
    featureMask: FEATURES.NORMAL_MAP,
    sourceCode: "*/",
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
    featureMask: FEATURES.NORMAL_MAP,
    sourceCode: "varying mat3 v_TBN;",
  },
  {
    featureMask: UNIVERSAL_MASK,
    sourceCode: "void main() {\ngl_Position = u_worldView * a_position;",
  },
  {
    featureMask: FEATURES.NORMAL_MAP,
    sourceCode:
      "vec3 T = normalize(vec3(u_model * vec4(a_tangent, 0.0)));\n" +
      "vec3 B = normalize(-vec3(u_model * vec4(a_bitangent, 0.0)));\n" +
      "vec3 N = normalize(vec3(u_model * vec4(a_normal, 0.0)));\n" +
      "v_TBN = mat3(T, B, N);/*",
  },
  {
    // This is commented out when using normal maps
    featureMask: FEATURES.DIFFUSE_LIGHTING,
    sourceCode: "v_normal = mat3(u_normal) * a_normal;",
  },
  {
    featureMask: FEATURES.NORMAL_MAP,
    sourceCode: "*/",
  },
  {
    featureMask: FEATURES.COLOR,
    sourceCode: "v_color = a_color;",
  },
  {
    featureMask: FEATURES.TEXTURES,
    sourceCode: "v_uv = a_uv;",
  },
  {
    featureMask: UNIVERSAL_MASK,
    sourceCode: "}",
  },
];

const getVertexShader = (gl: WebGLRenderingContext, featuresMask: number) =>
  compileShader(
    gl,
    gl.VERTEX_SHADER,
    shaderParts
      .filter((part) => (part.featureMask & featuresMask) !== 0)
      .map((part) => part.sourceCode)
      .join("\n")
  );

export { getVertexShader };
