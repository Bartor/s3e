window.addEventListener("load", main);

function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  const cubeObject = new Object3d(
    engine.bufferManager.loadShape(createCuboid(20), [0, 0.44, 1, 1])
  );

  const pyramid = new Object3d(
    engine.bufferManager.loadShape(createPyramid(20, 20, 20), [1, 0.33, 0, 1])
  );
  pyramid.position = { x: 20, y: -20, z: -20 };

  engine.currentScene.addChild(cubeObject);
  engine.currentScene.addChild(pyramid);

  engine.currentScene.ambientLightLevel = 0.8;
  engine.currentScene.currentCamera.position.z = 100;

  const cameraOne = engine.currentScene.currentCamera;
  const cameraTwo = new Camera({
    viewAngle: Math.PI / 6,
    near: 1,
    far: 2000,
    aspectRatio: canvas.clientWidth / canvas.clientHeight,
  });

  cameraTwo.position = { x: 50, y: 50, z: 50 };

  engine.currentScene.addChild(cameraTwo);

  const cameraThree = new Camera({
    viewAngle: Math.PI / 6,
    near: 1,
    far: 2000,
    aspectRatio: canvas.clientWidth / canvas.clientHeight,
  });

  cubeObject.addChild(cameraThree);
  cameraThree.position = { x: 20, y: 20, z: 100 };
  cameraThree.lookAt({ x: 0, y: 0, z: 0 });

  function draw(t) {
    requestAnimationFrame(draw);

    cubeObject.rotation.y = t / 1000;

    if (engine.currentScene.currentCamera === cameraTwo) {
      cameraTwo.lookAt(cubeObject.position);
    }

    engine.draw();
  }

  draw();

  document.getElementById("camera-one").addEventListener("click", () => {
    engine.currentScene.currentCamera = cameraOne;

    console.log(pyramid, cubeObject);
  });

  document.getElementById("camera-two").addEventListener("click", () => {
    engine.currentScene.currentCamera = cameraTwo;
    console.log(pyramid, cubeObject);
  });

  document.getElementById("camera-three").addEventListener("click", () => {
    engine.currentScene.currentCamera = cameraThree;
    console.log(pyramid, cubeObject);
  });
}
