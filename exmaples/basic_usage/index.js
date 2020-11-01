window.addEventListener("load", main);

function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  const cubeObject = new Object3d(createCuboid(10));

  cubeObject.position.z = -50;

  engine.currentScene.addChild(cubeObject);

  function draw(t) {
    requestAnimationFrame(draw);

    cubeObject.rotation.y = t / 1000;
    cubeObject.rotation.x = t / 1000;

    engine.draw();
  }

  draw();
}
