window.addEventListener("load", main);

const GRID_SIZE = 1;

let CAMERA_DISTANCE = 100;

async function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  window.addEventListener("resize", () => {
    engine.currentScene.currentCamera.updateCameraSettings({
      aspectRatio: canvas.clientWidth / canvas.clientHeight,
    });
  });

  engine.currentScene.ambientLightLevel = 0.5;
  engine.currentScene.lightDirection = [-0.5, 0.5, 0.5];

  const text = await fetch("solpol.obj").then(async (data) => data.text());

  const original = new Object3d(
    engine.bufferManager.loadObj(text, { color: [0.8, 0.8, 0.8, 1] })
  );

  original.position.y = -15;
  original.position.x = 0;

  engine.currentScene.addChild(original);

  engine.currentScene.currentCamera.position.z = CAMERA_DISTANCE;

  function draw(t) {
    requestAnimationFrame(draw);

    original.rotation.y = t / 1000;

    engine.draw();
  }

  draw(0);
}
