import { createNormals } from "./create-normals";

interface ParsingState {
  vertices: number[][];
  normals: number[][];
  uvs: number[][];
  positionsArray: number[];
  normalsArray: number[];
  uvsArray: number[];
}

const parseVertex = (vertexInformation: string, state: ParsingState) => {
  const [vertex, uv, normal] = vertexInformation
    .split("/")
    .map((value) => Number.parseInt(value, 10) - 1);

  state.positionsArray.push(...state.vertices[vertex], 1);

  if (!isNaN(normal)) {
    state.normalsArray.push(...state.normals[normal]);
  }

  if (!isNaN(uv)) {
    state.uvsArray.push(...state.uvs[uv]);
  }
};

const parsePart = (part: string[], state: ParsingState) => {
  const [command, ...args] = part;

  switch (command) {
    case "v":
      state.vertices.push(args.map(Number.parseFloat));
      break;
    case "vn":
      state.normals.push(args.map(Number.parseFloat));
      break;
    case "vt":
      state.uvs.push(args.map(Number.parseFloat));
    case "f":
      for (let i = 0; i < args.length - 2; i++) {
        parseVertex(args[0], state);
        parseVertex(args[i + 1], state);
        parseVertex(args[i + 2], state);
      }
      break;
    default:
      break;
  }
};

export const loadObj = (objFileContents: string) => {
  const state: ParsingState = {
    vertices: [],
    normals: [],
    uvs: [],
    normalsArray: [],
    positionsArray: [],
    uvsArray: [],
  };

  objFileContents
    .split("\n")
    .filter((line) => !line.startsWith("#"))
    .map((line) => line.trim().split(" "))
    .forEach((line) => parsePart(line, state));

  return {
    positions: new Float32Array(state.positionsArray),
    normals:
      state.normalsArray.length > 0
        ? new Float32Array(state.normalsArray)
        : createNormals(state.positionsArray),
    uvs:
      state.uvsArray.length > 0 ? new Float32Array(state.uvsArray) : undefined,
  };
};
