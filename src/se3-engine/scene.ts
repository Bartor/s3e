import { Object3d } from "../objects/object3d.class";
import { SceneObject } from "./model";

class Scene extends Object3d {
  public elements: SceneObject[] = [];

  constructor(private gl: WebGLRenderingContext) {
    super();
  }

  public connectScene(child: Object3d) {
    child.scene = this;

    const childBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, childBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      child.representation.pointsArray,
      this.gl.STATIC_DRAW
    );

    this.elements.push({ object: child, buffer: childBuffer });
  }

  public disconnectScene(child: Object3d) {
    const idx = this.elements.findIndex((element) => element.object === child);

    if (idx !== -1) {
      this.gl.deleteBuffer(this.elements[idx].buffer);
      this.elements.splice(idx, 1);
    }
  }

  public addChild(child: Object3d) {
    child.updateParent(this);
    this.connectScene(child);
    this.children.push(child);
  }
}

export { Scene };
