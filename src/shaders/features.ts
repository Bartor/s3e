import { createUniformUpdateCall } from "../data-bindings/create-uniform-update-call";
import { createAttributeUpdateCall } from "../data-bindings/create-attribute-binding-call";
import { FeatureParameters } from "./model";

const FEATURES = {
  COLOR: 1 << 0,
  AMBIENT_LIGHTING: 1 << 1,
  DIFFUSE_LIGHTING: 1 << 2,
  TEXTURES: 1 << 3,
};

const UNIVERSAL_MASK = Object.values(FEATURES).reduce((acc, e) => acc | e, 0);

const FEATURES_PARAMETERS: FeatureParameters[] = [
  {
    featureMask: UNIVERSAL_MASK,
    createFeatureCalls: (gl, program) => {
      const positionsLocation = gl.getAttribLocation(program, "a_position");
      const worldViewLocation = gl.getUniformLocation(program, "u_worldView");

      const positionCall = createAttributeUpdateCall(gl, {
        type: "vec4",
        location: positionsLocation,
      });
      const worldViewCall = createUniformUpdateCall(gl, {
        type: "mat4",
        location: worldViewLocation,
      });

      return [
        (state) => {
          if (
            state.hashes.position !==
            state.renderedObject.representation.bufferData.positions.hash
          ) {
            positionCall(
              state.renderedObject.representation.bufferData.positions.buffer
            );
            state.hashes.position =
              state.renderedObject.representation.bufferData.positions.hash;
          }
        },
        (state) => worldViewCall(state.engine.worldView),
      ];
    },
  },
  {
    featureMask: FEATURES.COLOR,
    createFeatureCalls: (gl, program) => {
      const location = gl.getAttribLocation(program, "a_color");
      const call = createAttributeUpdateCall(gl, {
        type: "vec4",
        location,
      });

      return [
        (state) => {
          if (
            state.hashes.color !==
            state.renderedObject.representation.bufferData.colors.hash
          ) {
            call(state.renderedObject.representation.bufferData.colors.buffer);
            state.hashes.color =
              state.renderedObject.representation.bufferData.colors.hash;
          }
        },
      ];
    },
  },
  {
    featureMask: FEATURES.AMBIENT_LIGHTING,
    createFeatureCalls: (gl, program) => {
      const location = gl.getUniformLocation(program, "u_ambient");
      const call = createUniformUpdateCall(gl, {
        type: "float",
        location,
      });

      return [(state) => call(state.engine.currentScene.ambientLightLevel)];
    },
  },
  {
    featureMask: FEATURES.DIFFUSE_LIGHTING,
    createFeatureCalls: (gl, program) => {
      const normalAttribLocation = gl.getAttribLocation(program, "a_normal");
      const normalUniformLocation = gl.getUniformLocation(program, "u_normal");
      const lightUniformLocation = gl.getUniformLocation(
        program,
        "u_reverseLightDirection"
      );

      const normalAttribCall = createAttributeUpdateCall(gl, {
        type: "vec3",
        location: normalAttribLocation,
      });
      const normalUniformCall = createUniformUpdateCall(gl, {
        type: "mat4",
        location: normalUniformLocation,
      });
      const lightUniformCall = createUniformUpdateCall(gl, {
        type: "vec3",
        location: lightUniformLocation,
      });

      return [
        (state) => {
          if (
            state.hashes.normals !==
            state.renderedObject.representation.bufferData.normals.hash
          ) {
            normalAttribCall(
              state.renderedObject.representation.bufferData.normals.buffer
            );
            state.hashes.normals =
              state.renderedObject.representation.bufferData.normals.hash;
          }
        },
        (state) => normalUniformCall(state.renderedObject.normalMatrix),
        (state) => lightUniformCall(state.engine.currentScene.lightDirection),
      ];
    },
  },
  {
    featureMask: FEATURES.TEXTURES,
    createFeatureCalls: (gl, program) => {
      const uvAttribLocation = gl.getAttribLocation(program, "a_uv");
      const textureUniformLocation = gl.getUniformLocation(
        program,
        "u_texture"
      );

      const uvAttribCall = createAttributeUpdateCall(gl, {
        type: "vec2",
        location: uvAttribLocation,
      });
      const textureUniformCall = createUniformUpdateCall(gl, {
        type: "sampler2D",
        location: textureUniformLocation,
      });

      return [
        (state) => {
          if (
            state.hashes.uvs !==
            state.renderedObject.representation.bufferData.uvs.hash
          ) {
            uvAttribCall(
              state.renderedObject.representation.bufferData.uvs.buffer
            );
            state.hashes.uvs =
              state.renderedObject.representation.bufferData.uvs.hash;
          }
        },
        (state) => {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(
            gl.TEXTURE_2D,
            state.renderedObject.representation.texture.texture
          );
          textureUniformCall(0);
        },
      ];
    },
  },
];

export { FEATURES, UNIVERSAL_MASK, FEATURES_PARAMETERS };
