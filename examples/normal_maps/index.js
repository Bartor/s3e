window.addEventListener("load", main);
CAMERA_DISTANCE = 200;

async function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  engine.currentScene.ambientLightLevel = 0.1;
  engine.currentScene.lightDirection = [0.5, 0.3, -1];

  const cube1 = new Object3d(
    engine.bufferManager.loadShape(createCuboid(30), {
      texture: {
        main: "blocks_colors.jpg",
      },
    })
  );

  const cube2 = new Object3d(
    engine.bufferManager.loadShape(createCuboid(30), {
      texture: {
        main: "blocks_colors.jpg",
        normalMap: "blocks_normals.jpg",
      },
    })
  );

  cube1.position.x = 30;
  cube2.position.x = -30;

  engine.currentScene.addChild(cube1);
  engine.currentScene.addChild(cube2);
  engine.currentScene.currentCamera.position.z = -CAMERA_DISTANCE;

  function draw(t) {
    requestAnimationFrame(draw);

    engine.currentScene.currentCamera.lookAt(engine.currentScene.position);

    cube1.rotation = { x: t / 3000, y: t / 3000, z: t / 3000 };
    cube2.rotation = { x: t / 3000, y: t / 3000, z: t / 3000 };

    engine.draw();
  }

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

  draw(0);
}
