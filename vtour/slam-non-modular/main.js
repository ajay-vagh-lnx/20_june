import { createTrajectoryPoints } from './trajectoryData.js';
import { createTrajectoryLine } from './createTrajectoryLine.js';
import { createSphere } from './createSphere.js';
import { addKrpanoListeners } from './addKrpanoListeners.js';

let THREE;
let scene;
let camera;
let SCALE_FACTOR;
let sceneToTrajectoryMapping = [];
let sceneScale;

function initializeThreeJS(krpano) {
    console.log('initializeThreeJS function called.');

    const threejsPlugin = krpano.get('plugin[threejs]');
    if (!(threejsPlugin && threejsPlugin.scene && threejsPlugin.THREE)) {
        console.error('ThreeJS plugin is not fully loaded.');
        return;
    }

    THREE = threejsPlugin.THREE;
    scene = threejsPlugin.scene;
    sceneScale = scene.scale.set(0.1, 0.1, 0.1);
    SCALE_FACTOR = 15;

    const raycaster = threejsPlugin.raycaster;
    scene.position.set(0, -300, 0);
    const models = [];

    const group = new THREE.Group();
    scene.add(group);

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.frustumCulled = false;
    scene.add(camera);

    const trajectoryPoints = createTrajectoryPoints(THREE, threejsPlugin).map((point) =>
        point.multiplyScalar(SCALE_FACTOR)
    );
    const rotationMatrix = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, 0, Math.PI / 2));
    trajectoryPoints.forEach((point) => point.applyMatrix4(rotationMatrix));

    const trajectoryMesh = createTrajectoryLine(THREE, trajectoryPoints);
    scene.add(trajectoryMesh); // disable this on click 

    const sceneCount = krpano.get('scene.count');
    if (!sceneCount || sceneCount <= 0) {
        console.error('Invalid scene count.');
        return;
    }

    const stepSize = (trajectoryPoints.length - 1) / (sceneCount - 1);
    for (let i = 0; i < sceneCount; i++) {
        const trajectoryIndex = Math.round(i * stepSize);
        const point = trajectoryPoints[trajectoryIndex];
        const sphere = createSphere(THREE, point, `scene_${i + 1}`);
        models.push(sphere);
        group.add(sphere);
        sphere.frustumCulled = false;
        sceneToTrajectoryMapping.push(trajectoryIndex);
    }

    addKrpanoListeners(
        krpano,
        raycaster,
        models,
        SCALE_FACTOR,
        camera,
        group,
        trajectoryPoints,
        trajectoryMesh,
        sceneScale,
        sceneToTrajectoryMapping
    );
}

export { initializeThreeJS };
