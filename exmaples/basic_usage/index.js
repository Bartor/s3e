window.addEventListener("load", main);

function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  const cubeObject = new Object3d(createCuboid(20));

  const cubeChild = new Object3d(createCuboid(10));
  cubeChild.position.y = 30;

  cubeObject.addChild(cubeChild);
  engine.currentScene.addChild(cubeObject);

  engine.currentScene.ambientLightLevel = 0.8;

  engine.currentScene.currentCamera.position.z = 100;

  function draw(t) {
    requestAnimationFrame(draw);

    cubeObject.rotation.z = t / 1000;
    cubeObject.rotation.x = t / 1000;

    cubeChild.scale.y = Math.abs(Math.sin(t / 500)) + 0.5;
    cubeChild.position.y = 30 - 10 * Math.sin(t / 500);

    engine.draw();
  }

  draw();
}
