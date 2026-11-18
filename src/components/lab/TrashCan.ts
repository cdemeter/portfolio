import * as THREE from "three";

/**
 * Creates the classic OS X brushed metal wire-mesh trash can.
 */
export function createTrashCan(): THREE.Group {
  const group = new THREE.Group();

  const radiusTop = 1.25;
  const radiusBottom = 0.95;
  const height = 2.4;
  const radialSegments = 36;

  // 1. Procedural wire-mesh texture
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, 64, 64);

    // Diagonal diamond mesh grid
    ctx.strokeStyle = "#8c9ba5";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(0, 32);
    ctx.lineTo(32, 0);
    ctx.lineTo(64, 32);
    ctx.lineTo(32, 64);
    ctx.closePath();
    ctx.stroke();
  }

  const meshTex = new THREE.CanvasTexture(canvas);
  meshTex.wrapS = THREE.RepeatWrapping;
  meshTex.wrapT = THREE.RepeatWrapping;
  meshTex.repeat.set(18, 12);

  const meshMaterial = new THREE.MeshStandardMaterial({
    map: meshTex,
    transparent: true,
    alphaTest: 0.15,
    metalness: 0.85,
    roughness: 0.35,
    side: THREE.DoubleSide,
  });

  const bodyGeo = new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    height,
    radialSegments,
    1,
    true
  );
  const bodyMesh = new THREE.Mesh(bodyGeo, meshMaterial);
  bodyMesh.position.y = height / 2;
  group.add(bodyMesh);

  // 2. Brushed aluminum top rim
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xc8d2dc,
    metalness: 0.92,
    roughness: 0.22,
  });

  const topRimGeo = new THREE.TorusGeometry(radiusTop, 0.065, 12, 48);
  const topRim = new THREE.Mesh(topRimGeo, rimMat);
  topRim.rotation.x = Math.PI / 2;
  topRim.position.y = height;
  group.add(topRim);

  // 3. Brushed aluminum base rim and bottom plate
  const bottomRimGeo = new THREE.TorusGeometry(radiusBottom, 0.05, 12, 48);
  const bottomRim = new THREE.Mesh(bottomRimGeo, rimMat);
  bottomRim.rotation.x = Math.PI / 2;
  bottomRim.position.y = 0.04;
  group.add(bottomRim);

  const bottomPlateGeo = new THREE.CircleGeometry(radiusBottom, 32);
  const bottomPlate = new THREE.Mesh(
    bottomPlateGeo,
    new THREE.MeshStandardMaterial({ color: 0x424850, metalness: 0.8, roughness: 0.4 })
  );
  bottomPlate.rotation.x = -Math.PI / 2;
  bottomPlate.position.y = 0.05;
  group.add(bottomPlate);

  return group;
}