window.addEventListener("load", main);

async function main() {
  const canvas = document.getElementById("example");

  const engine = new S3e(canvas);
  window.addEventListener("resize", () => {
    engine.currentScene.currentCamera.updateCameraSettings({
      aspectRatio: canvas.clientWidth / canvas.clientHeight,
    });
  });

  engine.currentScene.ambientLightLevel = 0.2;
  engine.currentScene.lightDirection = [0.5, 0.5, 1];

  const cube1 = new Object3d(
    engine.bufferManager.loadShape(createCuboid(30), {
      texture: {
        main: "blocks2_colors.jpg",
        normalMap: "blocks2_normals.jpg",
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
  engine.currentScene.currentCamera.position.z = 100;
  engine.currentScene.currentCamera.lookAt(engine.currentScene.position);

  function draw(t) {
    requestAnimationFrame(draw);

    engine.draw();
  }

  function refreshCamera(event) {
    cube1.rotation.y = 2 * (1 / 2 - event.offsetX / window.innerWidth);
    cube1.rotation.x = 2 * (1 / 2 - event.offsetY / window.innerHeight);
    cube2.rotation.y = 2 * (1 / 2 - event.offsetX / window.innerWidth);
    cube2.rotation.x = 2 * (1 / 2 - event.offsetY / window.innerHeight);
  }

  window.addEventListener("mousemove", refreshCamera);

  window.addEventListener("mousedown", () => {
    cube1.representation.featuresMask ^= 1 << 4;
    cube2.representation.featuresMask ^= 1 << 4;
  });

  draw(0);
}
