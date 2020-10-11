import { DataBindingsValueUpdate } from "./model";
import { ProgramInfo } from "./../shaders/model";
import createUniformUpdateCall from "./create-uniform-update-call";
import createAttributeUpdateCall from "./create-attribute-binding-call";

class BindingsManager {
  private bindings = new Map();

  constructor(program: ProgramInfo, gl: WebGLRenderingContext) {
    program.uniforms.forEach(({ name, location, type }) =>
      this.bindings.set(
        name,
        createUniformUpdateCall(
          {
            location,
            type,
          },
          gl
        )
      )
    );

    program.attributes.forEach(({ name, location, type }) => {
      this.bindings.set(
        name,
        createAttributeUpdateCall(
          {
            location,
            type,
          },
          gl
        )
      );
    });
  }

  // Performance Critical
  public updateValues({ attributes, uniforms }: DataBindingsValueUpdate) {
    if (uniforms) {
      for (const uniform of uniforms) {
        this.bindings.get(uniform[0])(uniform[1]);
      }
    }

    if (attributes) {
      for (const attribute of attributes) {
        this.bindings.get(attribute[0])(attribute[1]);
      }
    }
  }
}

export default BindingsManager;
