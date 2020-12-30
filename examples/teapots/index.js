window.addEventListener("load", main);

const TEAPOTS = 1000;
let CAMERA_DISTANCE = TEAPOTS;

async function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  engine.currentScene.ambientLightLevel = 0.5;
  engine.currentScene.lightDirection = [-0.5, 0.5, 0.5];

  const teapotContents = await fetch("teapot.obj").then((response) =>
    response.text()
  );

  const original = new Object3d(
    engine.bufferManager.loadObj(teapotContents, { color: [0.9, 0.9, 0.9, 1] })
  );

  const teapots = Array.from({ length: TEAPOTS }).map((_) => {
    const object = new Object3d(
      engine.bufferManager.cloneRepresentation(original.representation)
    );

    const volume = 10 * TEAPOTS ** (1 / 3);

    object.position = {
      x: volume / 2 - Math.random() * volume,
      y: volume / 2 - Math.random() * volume,
      z: volume / 2 - Math.random() * volume,
    };

    const offsetRotation = {
      x: Math.random() * 2 * Math.PI,
      y: Math.random() * 2 * Math.PI,
      z: Math.random() * 2 * Math.PI,
    };

    const rotationSpeed = {
      x: 1 / 2 - Math.random(),
      y: 1 / 2 - Math.random(),
      z: 1 / 2 - Math.random(),
    };

    engine.currentScene.addChild(object);

    engine.currentScene.currentCamera.position.z = CAMERA_DISTANCE;

    return { object, offsetRotation, rotationSpeed };
  });

  function refreshCamera(event) {
    engine.currentScene.currentCamera.position.x =
      CAMERA_DISTANCE *
      Math.sin((2 * Math.PI * event.offsetX) / window.innerWidth);

    engine.currentScene.currentCamera.position.z =
      CAMERA_DISTANCE *
      Math.cos((2 * Math.PI * event.offsetX) / window.innerWidth);

    engine.currentScene.currentCamera.position.y =
      CAMERA_DISTANCE *
      Math.sin((Math.PI * event.offsetY) / window.innerHeight - Math.PI / 2);
  }

  window.addEventListener("mousemove", refreshCamera);

  window.addEventListener("wheel", (event) => {
    CAMERA_DISTANCE = Math.max(1, CAMERA_DISTANCE - event.deltaY / 10);
    refreshCamera(event);
  });

  function draw(t) {
    requestAnimationFrame(draw);

    teapots.forEach((teapot) => {
      teapot.object.rotation.x =
        teapot.offsetRotation.x + (t / 500) * teapot.rotationSpeed.x;
      teapot.object.rotation.y =
        teapot.offsetRotation.y + (t / 500) * teapot.rotationSpeed.y;
      teapot.object.rotation.z =
        teapot.offsetRotation.z + (t / 500) * teapot.rotationSpeed.z;
    });

    engine.currentScene.currentCamera.lookAt({ x: 0, y: 0, z: 0 });

    engine.draw();
  }

  draw(0);
}
