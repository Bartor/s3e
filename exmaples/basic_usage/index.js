window.addEventListener("load", main);

function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  const cubeObject = new Object3d(createCuboid([0, 0.44, 1, 1], 20));

  const cubeChild = new Object3d(createPyramid([1, 0.66, 0, 1], 10, 10, 15));
  cubeChild.position.y = 15;

  cubeObject.addChild(cubeChild);
  engine.currentScene.addChild(cubeObject);

  engine.currentScene.ambientLightLevel = 0.8;
  engine.currentScene.currentCamera.position.z = 100;

  cubeChild.rotation.y = Math.PI / 4;

  function draw(t) {
    requestAnimationFrame(draw);

    cubeChild.scale.y = Math.abs(Math.sin(t / 500)) + 0.5;
    cubeChild.position.y = 20 - 15 * Math.sin(t / 500);

    cubeChild.rotation.y = t / 666;

    cubeObject.position.y = 20 * Math.sin(t / 500);
    cubeObject.position.x = 20 * Math.sin(t / 500);

    engine.currentScene.currentCamera.lookAt(cubeObject.position);

    engine.draw();
  }

  draw();
}
