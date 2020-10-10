import { ParameterDescriptor } from "./model";
const UNIFORM_REGEX = /(uniform) .+ [a-zA-Z0-9_]+;/g;
const ATTRIBUTE_REGEX = /(attribute) .+ [a-zA-Z0-9_]+;/g;

const parseShader = (source: string) => {
  const uniforms: ParameterDescriptor<WebGLUniformLocation>[] = (
    source.match(UNIFORM_REGEX) || []
  ).map((match) => {
    const [_, type, name] = match.slice(0, -1).split(" ");
    return {
      type,
      name,
    };
  });

  const attributes: ParameterDescriptor<number>[] = (
    source.match(ATTRIBUTE_REGEX) || []
  ).map((match) => {
    const [_, type, name] = match.slice(0, -1).split(" ");
    return {
      type,
      name,
    };
  });

  return { attributes, uniforms };
};

export default parseShader;
