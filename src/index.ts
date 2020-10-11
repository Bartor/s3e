import BindingsManager from "./data-bindings/bindings-manager.class";
import createProgram from "./shaders/create-program";
import getFragmentShader from "./shaders/sources/fragment";
import getVertexShader from "./shaders/sources/vertex";

const canvas = document.createElement("canvas");
const gl = canvas.getContext("webgl");

const fragment = getFragmentShader(gl);
const vertex = getVertexShader(gl);
const program = createProgram(gl, vertex, fragment);

const bindingsManager = new BindingsManager(program, gl);

console.log(bindingsManager);
