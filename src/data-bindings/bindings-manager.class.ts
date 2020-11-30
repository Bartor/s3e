import { DataBindingsValueUpdate, DataUpdateCall } from "./model";
import { ProgramInfo } from "./../shaders/model";
import { createUniformUpdateCall } from "./create-uniform-update-call";
import { createAttributeUpdateCall } from "./create-attribute-binding-call";

class BindingsManager {
  public bindings: Record<
    string,
    {
      call: DataUpdateCall<number | Float32Array | WebGLBuffer>;
      type: string;
    }
  > = {};

  constructor(gl: WebGLRenderingContext, program: ProgramInfo) {
    program.uniforms.forEach(
      ({ name, location, type }) =>
        (this.bindings[name] = {
          call: createUniformUpdateCall(
            {
              location,
              type,
            },
            gl
          ),
          type,
        })
    );

    program.attributes.forEach(({ name, location, type }) => {
      this.bindings[name] = {
        call: createAttributeUpdateCall(
          {
            location,
            type,
          },
          gl
        ),
        type,
      };
    });
  }

  // Performance Critical
  public updateValues({ attributes, uniforms }: DataBindingsValueUpdate) {
    if (uniforms) {
      for (const uniform of uniforms) {
        this.bindings[uniform[0]].call(uniform[1]);
      }
    }

    if (attributes) {
      for (const attribute of attributes) {
        this.bindings[attribute[0]].call(attribute[1]);
      }
    }
  }
}

export { BindingsManager };
