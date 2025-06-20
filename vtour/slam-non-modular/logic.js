// Load dependencies (trajectoryData.js, createTrajectoryLine.js, createSphere.js should be included via <script> in your HTML)

let THREE;
let scene;
let camera;
let SCALE_FACTOR;
let sceneToTrajectoryMapping = [];
let sceneScale;

function initializeThreeJS(krpano) {
    console.log('initializeThreeJS function called.');

    window.krpano = krpano;
    const threejsPlugin = krpano.get('plugin[threejs]');
    if (!(threejsPlugin && threejsPlugin.scene && threejsPlugin.THREE)) {
        console.error('ThreeJS plugin is not fully loaded.');
        return;
    }

    THREE = threejsPlugin.THREE;
    scene = threejsPlugin.scene;
    sceneScale = scene.scale.set(1, 1, 1);
    SCALE_FACTOR = 25;

    const raycaster = threejsPlugin.raycaster;
    //scene.position.set(0, -300, 0);
    const models = [];

    const group = new THREE.Group();
    scene.add(group);

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.frustumCulled = false;
    scene.add(camera);

    // Generate trajectory points
    const trajectoryPoints = createTrajectoryPoints(THREE, threejsPlugin).map((point) =>
        point.multiplyScalar(SCALE_FACTOR)
    );
    const rotationMatrix = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, 0, Math.PI / 2));
    trajectoryPoints.forEach((point) => point.applyMatrix4(rotationMatrix));

    // Create trajectory line and add to scene
    // const trajectoryMesh = createTrajectoryLine(THREE, trajectoryPoints);
    // trajectoryMesh.position.set(0, -1500, 0);
    //scene.add(trajectoryMesh);

    // Create trajectory line and add to scene V2
    const { mesh: trajectoryMesh, curve } = createTrajectoryLine(THREE, trajectoryPoints, scene);

    trajectoryMesh.position.set(0, -1500, 0);
    trajectoryMesh.renderOrder = 0;
    trajectoryMesh.material.depthWrite = false;
    trajectoryMesh.material.depthTest = true;
    scene.add(trajectoryMesh);

    const sceneCount = krpano.get('scene.count');
    if (!sceneCount || sceneCount <= 0) {
        console.error('Invalid scene count.');
        return;
    }

    // Create spheres for each scene and add to the group
    const stepSize = (trajectoryPoints.length - 1) / (sceneCount - 1);
    for (let i = 0; i < sceneCount; i++) {
        const trajectoryIndex = Math.round(i * stepSize);
        const point = trajectoryPoints[trajectoryIndex];
        const t = trajectoryIndex / (trajectoryPoints.length - 1); // normalize index to 0–1
        // const sphere = createSphere(THREE, point, `scene_${i + 1}`);
        // models.push(sphere);
        // group.add(sphere);

        const cone = createSphere(THREE, null, curve, t, 150, `scene_${i + 1}`);
        cone.renderOrder = 1;
        models.push(cone);
        group.add(cone);
        //sphere.frustumCulled = false;
        sceneToTrajectoryMapping.push(trajectoryIndex);
    }

    group.position.set(0, -1500, 0);

    // Add event listeners
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

    window.trajectoryPoints = trajectoryPoints;
    window.sceneToTrajectoryMapping = sceneToTrajectoryMapping;
    window.sceneScale = sceneScale;
    window.camera = camera;
    window.group = group;
    window.trajectoryMesh = trajectoryMesh;
}

// Attach initializeThreeJS to the global namespace
window.initializeThreeJS = initializeThreeJS;
