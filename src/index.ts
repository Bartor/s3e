import getFragmentShader from "./shaders/sources/fragment";
import getVertexShader from "./shaders/sources/vertex";

const canvas = document.createElement("canvas");
const gl = canvas.getContext("webgl");

console.log(getFragmentShader(gl));
console.log(getVertexShader(gl));
