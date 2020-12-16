window.addEventListener("load", main);

function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);

  const cube = new Object3d(
    engine.bufferManager.loadShape(createCuboid(20), [0, 0.44, 1, 1])
  );

  const pyramid1 = new Object3d(
    engine.bufferManager.loadShape(createPyramid(10, 10, 7), [0, 0.66, 0, 1])
  );
  const pyramid2 = new Object3d(
    engine.bufferManager.loadShape(createPyramid(10, 10, 7), [0.8, 0.8, 0, 1])
  );
  const pyramid3 = new Object3d(
    engine.bufferManager.loadShape(createPyramid(5, 5, 3), [1, 0, 0.5, 1])
  );

  pyramid2.rotation.x = Math.PI;

  pyramid1.addChild(pyramid2);
  pyramid1.addChild(pyramid3);

  engine.currentScene.addChild(pyramid1);
  engine.currentScene.addChild(cube);

  engine.currentScene.ambientLightLevel = 0.8;

  engine.currentScene.currentCamera.position = { x: 50, y: 50, z: 100 };
  engine.currentScene.currentCamera.lookAt(cube.position);

  function draw(t) {
    requestAnimationFrame(draw);

    pyramid1.rotation.y = t / 500;

    cube.rotation.y = -t / 1000;

    pyramid1.position.x = 40 * Math.sin(t / 500);
    pyramid1.position.z = 40 * Math.cos(t / 500);

    pyramid3.position.x = -15 * Math.sin(t / 500);
    pyramid3.position.z = -15 * Math.cos(t / 500);

    engine.draw();
  }

  draw();
}
