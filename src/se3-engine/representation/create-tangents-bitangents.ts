const subtractVector = (a: number[], b: number[]) => a.map((e, i) => e - b[i]);

export const createTangentsBitangents = (
  pointsArray: number[] | Float32Array,
  uvsArray: number[] | Float32Array
): { tangents: Float32Array; bitangents: Float32Array } => {
  const tangents = new Float32Array((pointsArray.length / 4) * 3);
  const bitangents = new Float32Array((pointsArray.length / 4) * 3);

  for (let i = 0; i < pointsArray.length; i += 12) {
    const vertex1 = [pointsArray[i], pointsArray[i + 1], pointsArray[i + 2]];
    const vertex2 = [
      pointsArray[i + 4],
      pointsArray[i + 5],
      pointsArray[i + 6],
    ];
    const vertex3 = [
      pointsArray[i + 8],
      pointsArray[i + 9],
      pointsArray[i + 10],
    ];

    const uv1 = [uvsArray[i / 2], uvsArray[i / 2 + 1]];
    const uv2 = [uvsArray[i / 2 + 2], uvsArray[i / 2 + 3]];
    const uv3 = [uvsArray[i / 2 + 4], uvsArray[i / 2 + 5]];

    const edge1 = subtractVector(vertex2, vertex1);
    const edge2 = subtractVector(vertex3, vertex1);

    const deltaUV1 = subtractVector(uv2, uv1);
    const deltaUV2 = subtractVector(uv3, uv1);

    const f = 1 / (deltaUV1[0] * deltaUV2[1] - deltaUV2[0] * deltaUV1[1]);

    for (let j = 0; j < 9; j += 3) {
      tangents[(i / 4) * 3 + j] =
        f * (deltaUV2[1] * edge1[0] - deltaUV1[1] * edge2[0]);
      tangents[(i / 4) * 3 + j + 1] =
        f * (deltaUV2[1] * edge1[1] - deltaUV1[1] * edge2[1]);
      tangents[(i / 4) * 3 + j + 2] =
        f * (deltaUV2[1] * edge1[2] - deltaUV1[1] * edge2[2]);

      bitangents[(i / 4) * 3 + j] =
        f * (-deltaUV2[0] * edge1[0] + deltaUV1[0] * edge2[0]);
      bitangents[(i / 4) * 3 + j + 1] =
        f * (-deltaUV2[0] * edge1[1] + deltaUV1[0] * edge2[1]);
      bitangents[(i / 4) * 3 + j + 2] =
        f * (-deltaUV2[0] * edge1[2] + deltaUV1[0] * edge2[2]);
    }
  }

  console.log(tangents, bitangents);

  return { tangents, bitangents };
};
