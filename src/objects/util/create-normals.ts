export const createNormals = (pointsArray: Float32Array): Float32Array => {
  // Normals don't use forth coord
  const normalsArray = new Float32Array((pointsArray.length / 4) * 3);

  // Each triable consist of 12 points
  // 1. vertex: 0, 1, 2, (3)
  // 2. vertex: 4, 5, 6, (7)
  // 3. vertex: 8, 9, 10, (11)
  for (let i = 0; i < pointsArray.length; i += 12) {
    const U = [
      pointsArray[i + 4] - pointsArray[i + 0],
      pointsArray[i + 5] - pointsArray[i + 1],
      pointsArray[i + 6] - pointsArray[i + 2],
    ];
    const V = [
      pointsArray[i + 8] - pointsArray[i + 0],
      pointsArray[i + 9] - pointsArray[i + 1],
      pointsArray[i + 10] - pointsArray[i + 2],
    ];

    const x = U[1] * V[2] - U[2] * V[1];
    const y = U[2] * V[0] - U[0] * V[2];
    const z = U[0] * V[1] - U[1] * V[0];

    // repeat for every vertex of triangle
    for (let j = 0; j < 9; j += 3) {
      normalsArray[(i / 4) * 3 + j] = x;
      normalsArray[(i / 4) * 3 + j + 1] = y;
      normalsArray[(i / 4) * 3 + j + 2] = z;
    }
  }

  return normalsArray;
};
