import { identity, multiply, scale } from "./../3d/matrix-operations";
import { Camera } from "../objects/camera";
import { Scene } from "./scene";
import { RenderState } from "./model";
import { Mat4 } from "../3d/model";
import { BufferManager } from "./buffer-manager";
import { ProgramManager } from "../shaders/program-manager";

class S3e {
  private programManager: ProgramManager;

  public gl: WebGLRenderingContext;
  public currentScene: Scene;
  public worldView: Mat4 = identity();
  public bufferManager;

  constructor(private canvasElement: HTMLCanvasElement) {
    this.gl = canvasElement.getContext("webgl");
    this.updateCanvasSize();

    this.programManager = new ProgramManager(this.gl);
    this.bufferManager = new BufferManager(this.gl);

    this.currentScene = new Scene(
      this,
      new Camera({
        viewAngle: Math.PI / 4,
        near: 1,
        far: 2000,
        aspectRatio: canvasElement.width / canvasElement.height,
      })
    );

    window.addEventListener("resize", () => this.updateCanvasSize());
  }

  public updateCanvasSize() {
    this.canvasElement.width = this.canvasElement.clientWidth;
    this.canvasElement.height = this.canvasElement.clientHeight;

    this.gl.viewport(
      0,
      0,
      this.canvasElement.clientWidth,
      this.canvasElement.clientHeight
    );
  }

  public draw() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    const renderState: RenderState = {
      engine: this,
      renderedObject: null,
      drawable: false,
      currentProgram: {
        program: null,
        featuresMask: null,
        basicCall: null,
        updateFunctions: [],
      },
      hashes: {},
    };

    for (const element of this.currentScene.elements) {
      renderState.renderedObject = element.object;
      renderState.drawable = element.drawable;

      if (
        element.drawable &&
        element.object.representation.featuresMask !==
          renderState.currentProgram.featuresMask
      ) {
        renderState.currentProgram = this.programManager.requestProgram(
          element.object.representation.featuresMask
        );
        // Clear hashes, new programs require new bind calls
        renderState.hashes = {};
        this.gl.useProgram(renderState.currentProgram.program);
      }

      this.gl.enable(this.gl.DEPTH_TEST);
      this.gl.enable(this.gl.CULL_FACE);

      if (element.object.representation.defaultScale !== undefined) {
        scale(
          element.object.absoluteMatrix,
          element.object.representation.defaultScale.x,
          element.object.representation.defaultScale.y,
          element.object.representation.defaultScale.z,
          this.worldView
        );

        multiply(
          this.currentScene.currentCamera.viewProjection,
          this.worldView,
          this.worldView
        );
      } else {
        multiply(
          this.currentScene.currentCamera.viewProjection,
          element.object.absoluteMatrix,
          this.worldView
        );
      }

      for (let updateFunction of renderState.currentProgram.updateFunctions) {
        updateFunction(renderState);
      }

      if (element.drawable) {
        this.gl.drawArrays(
          this.gl.TRIANGLES,
          0,
          element.object.representation.bufferData.positions.length /
            element.object.representation.bufferData.positions.itemsPerVertex
        );
      }
    }

    for (const element of this.currentScene.elements) {
      element.object.changed = false;
    }
  }
}

export { S3e };
