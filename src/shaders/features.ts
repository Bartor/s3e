import { createUniformUpdateCall } from "../data-bindings/create-uniform-update-call";
import { createAttributeUpdateCall } from "../data-bindings/create-attribute-binding-call";
import { FeatureParameters } from "./model";

const FEATURES = {
  COLOR: 1 << 0,
  AMBIENT_LIGHTING: 1 << 1,
  DIFFUSE_LIGHTING: 1 << 2,
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
            state.renderedObject.bufferData.positions.hash
          ) {
            positionCall(state.renderedObject.bufferData.positions.buffer);
            state.hashes.position =
              state.renderedObject.bufferData.positions.hash;
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
            state.hashes.color !== state.renderedObject.bufferData.colors.hash
          ) {
            call(state.renderedObject.bufferData.colors.buffer);
            state.hashes.color = state.renderedObject.bufferData.colors.hash;
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
            state.renderedObject.bufferData.normals.hash
          ) {
            normalAttribCall(state.renderedObject.bufferData.normals.buffer);
          }
        },
        (state) => normalUniformCall(state.renderedObject.normalMatrix),
        (state) => lightUniformCall(state.engine.currentScene.lightDirection),
      ];
    },
  },
];

export { FEATURES, UNIVERSAL_MASK, FEATURES_PARAMETERS };
