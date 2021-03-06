window.addEventListener("load", main);

function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);

  const cube = new Object3d(
    engine.bufferManager.loadShape(createCuboid(20), { color: [0, 0.44, 1, 1] })
  );

  const pyramid1 = new Object3d(
    engine.bufferManager.loadShape(createPyramid(10, 10, 7), {
      color: [0, 0.66, 0, 1],
    })
  );
  const pyramid2 = new Object3d(
    engine.bufferManager.loadShape(createPyramid(10, 10, 7), {
      color: [0.8, 0.8, 0, 1],
    })
  );
  const pyramid3 = new Object3d(
    engine.bufferManager.loadShape(createPyramid(5, 5, 3), {
      color: [1, 0, 0.5, 1],
    })
  );

  pyramid2.rotation.x = Math.PI;

  pyramid1.addChild(pyramid2);

  setTimeout(() => {
    pyramid1.addChild(pyramid3);
  }, 2000);

  setTimeout(() => {
    pyramid1.removeChild(pyramid3);
  }, 4000);

  engine.currentScene.addChild(pyramid1);
  engine.currentScene.addChild(cube);

  engine.currentScene.ambientLightLevel = 0.8;

  cube.position.z = -20;
  engine.currentScene.currentCamera.position = { x: 50, y: 50, z: 100 };
  // engine.currentScene.currentCamera.position.z = 100;
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
