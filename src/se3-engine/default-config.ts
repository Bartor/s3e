import { createProgram } from "../shaders/create-program";
import { getFragmentShader } from "../shaders/sources/fragment";
import { getVertexShader } from "../shaders/sources/vertex";
import { S3eConfiguration } from "./model";

export const getS3eDefaultConfiguration: (
  gl: WebGLRenderingContext
) => S3eConfiguration = (gl: WebGLRenderingContext) => {
  const vertexShader = getVertexShader(gl);
  const fragmentShader = getFragmentShader(gl);

  const programInfo = createProgram(gl, vertexShader, fragmentShader);

  return {
    programInfo,
    positionsAttribute: "a_position",
    normalAttribute: "a_normal",
    worldViewUniform: "u_worldView",
    projectionUniform: "u_projection",
  };
};
