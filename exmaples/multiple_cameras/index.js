window.addEventListener("load", main);

function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  const cubeObject = new Object3d(createCuboid(20));

  const cubeObject2 = new Object3d(createCuboid(20));
  cubeObject2.position.z = -20;
  cubeObject2.position.x = 20;
  cubeObject2.position.y = -20;

  engine.currentScene.addChild(cubeObject);
  engine.currentScene.addChild(cubeObject2);

  engine.currentScene.ambientLightLevel = 0.8;
  engine.currentScene.currentCamera.position.z = 100;

  const cameraOne = engine.currentScene.currentCamera;
  const cameraTwo = new Camera({
    viewAngle: Math.PI / 6,
    near: 1,
    far: 2000,
    aspectRatio: 1,
  });

  cameraTwo.position.z = 50;
  cameraTwo.position.x = 50;
  cameraTwo.position.y = 50;

  engine.currentScene.addChild(cameraTwo);

  const cameraThree = new Camera({
    viewAngle: Math.PI / 6,
    near: 1,
    far: 2000,
    aspectRatio: 1,
  });

  cubeObject.addChild(cameraThree);
  cameraThree.position.z = 100;
  cameraThree.position.y = 20;
  cameraThree.position.x = 20;
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
  });

  document.getElementById("camera-two").addEventListener("click", () => {
    engine.currentScene.currentCamera = cameraTwo;
  });

  document.getElementById("camera-three").addEventListener("click", () => {
    engine.currentScene.currentCamera = cameraThree;
  });
}
