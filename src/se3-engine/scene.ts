import { identity, normalize } from "./../3d/matrix-operations";
import { Mat4, Vec3 } from "./../3d/model";
import { Camera } from "../objects/camera";
import { Object3d } from "../objects/object3d.class";
import { SceneObject } from "./model";

class Scene extends Object3d {
  public elements: SceneObject[] = [];

  public currentCamera: Camera;

  public ambientLightLevel: number = 0.5;
  private _lightDirection: Vec3 = normalize([-0.5, 0.5, 0.5]);

  constructor(private gl: WebGLRenderingContext, camera: Camera) {
    super();

    this.addChild(camera);
    this.currentCamera = camera;
  }

  public set lightDirection(newDirection: Vec3) {
    normalize(newDirection, this._lightDirection);
  }

  public get lightDirection() {
    return this._lightDirection;
  }

  public connectScene(child: Object3d) {
    if (this.elements.find((element) => element.object === child)) return;

    child.scene = this;

    const positionsBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionsBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      child.representation.pointsArray,
      this.gl.STATIC_DRAW
    );

    const normalsBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalsBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      child.representation.normalsArray,
      this.gl.STATIC_DRAW
    );

    this.elements.push({
      drawable: !(child instanceof Camera),
      positionsBuffer,
      normalsBuffer,
      object: child,
    });

    for (const childChild of child.children) {
      this.connectScene(childChild);
    }
  }

  public disconnectScene(child: Object3d) {
    const idx = this.elements.findIndex((element) => element.object === child);

    if (idx !== -1) {
      this.gl.deleteBuffer(this.elements[idx].positionsBuffer);
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
