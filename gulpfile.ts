import { task, src, dest } from "gulp";
import { createProject } from "gulp-typescript";
import compileToWasm from "./tools/assemblyscripts";

const tsProject = createProject("tsconfig.json");

task("scripts", async () =>
  src("src/**/*.ts").pipe(tsProject()).pipe(dest("dist"))
);

task("wasm", async () =>
  src("asm/**/*.ts").pipe(compileToWasm()).pipe(dest("dist"))
);

const defaultTask = (callback: () => void) => callback();

export default defaultTask;
