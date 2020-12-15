import { identity, multiply, scale } from "./../3d/matrix-operations";
import { DataUpdateCall } from "./../data-bindings/model";
import { BindingsManager } from "../data-bindings/bindings-manager.class";
import { Camera } from "../objects/camera";
import { Scene } from "./scene";
import { getS3eDefaultConfiguration } from "./default-config";
import { Hash, S3eConfiguration } from "./model";
import { Mat4, Vec3 } from "../3d/model";
import { BufferManager } from "./buffer-manager";

class S3e {
  private worldView: Mat4 = identity();

  private config: S3eConfiguration;
  private bindingsManager: BindingsManager;

  private positionUpdateCall: DataUpdateCall<WebGLBuffer>;
  private normalsUpdateCall: DataUpdateCall<WebGLBuffer>;
  private colorsUpdateCall: DataUpdateCall<WebGLBuffer>;
  private worldViewUpdateCall: DataUpdateCall<Mat4>;
  private normalMatrixUpdateCall: DataUpdateCall<Mat4>;
  private ambientUpdateCall: DataUpdateCall<number>;
  private lightDirectionUpdateCall: DataUpdateCall<Vec3>;

  public gl: WebGLRenderingContext;
  public currentScene: Scene;

  public bufferManager;

  constructor(
    private canvasElement: HTMLCanvasElement,
    config?: S3eConfiguration
  ) {
    this.gl = canvasElement.getContext("webgl");
    this.updateCanvasSize();

    this.bufferManager = new BufferManager(this.gl);

    this.config = config ?? getS3eDefaultConfiguration(this.gl);
    this.bindingsManager = new BindingsManager(
      this.gl,
      this.config.programInfo
    );

    this.positionUpdateCall = this.bindingsManager.bindings[
      this.config.positionsAttributeName
    ].call;

    this.normalsUpdateCall = this.bindingsManager.bindings[
      this.config.normalsAttributeName
    ].call;

    this.colorsUpdateCall = this.bindingsManager.bindings[
      this.config.colorsAttributeName
    ].call;

    this.worldViewUpdateCall = this.bindingsManager.bindings[
      this.config.worldViewUniformName
    ].call;

    this.normalMatrixUpdateCall = this.bindingsManager.bindings[
      this.config.normalMatrixUniformName
    ].call;

    this.ambientUpdateCall = this.bindingsManager.bindings[
      this.config.ambientUniformName
    ].call;

    this.lightDirectionUpdateCall = this.bindingsManager.bindings[
      this.config.lightDirectionUniformName
    ].call;

    this.currentScene = new Scene(
      this,
      new Camera({
        viewAngle: Math.PI / 4,
        near: 1,
        far: 2000,
        aspectRatio: canvasElement.width / canvasElement.height,
      })
    );
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
    this.gl.useProgram(this.config.programInfo.program);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);

    // tslint:disable-next-line: no-bitwise
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    const hashes = {
      positions: null as Hash,
      normals: null as Hash,
      colors: null as Hash,
    };

    for (const element of this.currentScene.elements) {
      if (element.drawable === false) continue;

      if (element.object.bufferData.positions.hash !== hashes.positions) {
        this.positionUpdateCall(element.object.bufferData.positions.buffer);
        hashes.positions = element.object.bufferData.positions.hash;
      }

      if (element.object.bufferData.normals.hash !== hashes.normals) {
        this.normalsUpdateCall(element.object.bufferData.normals.buffer);
        hashes.normals = element.object.bufferData.normals.hash;
      }

      if (element.object.bufferData.colors.hash !== hashes.colors) {
        this.colorsUpdateCall(element.object.bufferData.colors.buffer);
        hashes.colors = element.object.bufferData.colors.hash;
      }

      if (element.object.bufferData.defaultScale !== undefined) {
        scale(
          element.object.absoluteMatrix,
          element.object.bufferData.defaultScale.x,
          element.object.bufferData.defaultScale.y,
          element.object.bufferData.defaultScale.z,
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

      this.worldViewUpdateCall(this.worldView);

      this.normalMatrixUpdateCall(element.object.normalMatrix);

      this.ambientUpdateCall(this.currentScene.ambientLightLevel);
      this.lightDirectionUpdateCall(this.currentScene.lightDirection);

      this.gl.drawArrays(
        this.gl.TRIANGLES,
        0,
        element.object.bufferData.positions.length /
          element.object.bufferData.positions.itemsPerVertex
      );
    }

    for (const element of this.currentScene.elements) {
      element.object.changed = false;
    }
  }
}

export { S3e };
