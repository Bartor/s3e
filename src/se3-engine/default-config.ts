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
    positionsAttributeName: "a_position",
    normalsAttributeName: "a_normal",
    normalMatrixUniformName: "u_normal",
    worldViewUniformName: "u_worldView",
    ambientUniformName: "u_ambient",
    lightDirectionUniformName: "u_reverseLightDirection",
  };
};
