import { compileShader } from "../compile-shader";
import { FEATURES, UNIVERSAL_MASK } from "../features";
import { ShaderPart } from "../model";

const shaderParts: ShaderPart[] = [
  {
    featureMask: UNIVERSAL_MASK,
    sourceCode: "attribute vec4 a_position;uniform mat4 u_worldView;",
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
    featureMask: FEATURES.DIFFUSE_LIGHTING,
    sourceCode: "uniform mat4 u_normal;",
  },
  {
    featureMask: FEATURES.DIFFUSE_LIGHTING,
    sourceCode: "varying vec3 v_normal;",
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
    featureMask: UNIVERSAL_MASK,
    sourceCode: "void main() { gl_Position = u_worldView * a_position;",
  },
  {
    featureMask: FEATURES.DIFFUSE_LIGHTING,
    sourceCode: "v_normal = mat3(u_normal) * a_normal;",
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
