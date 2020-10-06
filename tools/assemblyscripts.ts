import { ready, compileString } from "assemblyscript/cli/asc";

import { Transform } from "stream";
import File from "vinyl";

const compileToWasm = () =>
  new Transform({
    readableObjectMode: true,
    async transform(
      file: File,
      _,
      callback: (error?: Error, next?: File) => void
    ) {
      await ready;
      const { binary } = compileString(file.contents.toString("utf-8"));

      const transformedFile = file.clone();
      transformedFile.contents = Buffer.from(binary);
      transformedFile.extname = ".wasm";

      callback(null, transformedFile);
    },
    writableObjectMode: true,
  });

export default compileToWasm;
