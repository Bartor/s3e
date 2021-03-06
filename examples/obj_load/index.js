window.addEventListener("load", main);

const GRID_SIZE = 5;

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

  const text = await fetch("LunarLander.obj").then(async (data) => data.text());

  const original = new Object3d(
    engine.bufferManager.loadObj(text, { color: [0, 0.44, 1, 1] })
  );

  const objects = Array.from({ length: GRID_SIZE ** 2 }).map((_, i) => {
    const object = new Object3d(
      engine.bufferManager.cloneRepresentation(original.representation)
    );

    object.rotation.x = -Math.PI / 2;
    object.position.y = -2;

    object.position.x = 7 * (Math.floor(i / GRID_SIZE) - GRID_SIZE / 2);
    object.position.z = 7 * ((i % GRID_SIZE) - GRID_SIZE / 2);

    engine.currentScene.addChild(object);

    return object;
  });

  engine.currentScene.currentCamera.position.z = 300;

  function draw(t) {
    requestAnimationFrame(draw);

    objects.forEach((object) => (object.rotation.z = t / 1000));

    engine.currentScene.currentCamera.position.z = 60 * Math.sin(t / 5000);
    engine.currentScene.currentCamera.position.x = -60 * Math.cos(t / 5000);
    engine.currentScene.currentCamera.lookAt({ x: 0, y: 0, z: 0 });

    engine.draw();
  }

  draw(0);
}
