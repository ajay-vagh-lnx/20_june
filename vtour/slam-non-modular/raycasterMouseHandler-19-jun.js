// // Define raycasterMouseHandler
// function raycasterMouseHandler(event, krpano, models, raycaster, camera, group, trajectoryPoints, trajectoryMesh, sceneScale, sceneToTrajectoryMapping) {
//     //const mouse = krpano.control.getMousePos(event);
//     const intersects = [];
//     intersectVisibleObjects(models, raycaster, intersects);

//     if (intersects.length > 0) {
//         const hitSphere = intersects[0].object;
//         if (hitSphere.userData.id) {
//            // krpano.call(`loadscene(${hitSphere.userData.id});`);
//             krpano.call(`loadscene(${hitSphere.userData.id}, null, MERGE|KEEPVIEW|KEEPMOVING, BLEND(0.5))`);
//             //console.log(`Scene loaded: ${hitSphere.userData.id}`);
//             //console.log("Sl", loadscene(get(${hitSphere.userData.id}), null, MERGE|KEEPVIEW|KEEPMOVING, BLEND(2.0));)

//             const sceneIndex = parseInt(hitSphere.userData.id.replace("scene_", "")) - 1;
//             console.log("index", sceneIndex);
//             const trajectoryIndex = sceneToTrajectoryMapping[sceneIndex];
//             const targetPoint = trajectoryPoints[trajectoryIndex];

//             if (targetPoint) {
//                 navigateToClickedPoint(targetPoint, camera, group, trajectoryMesh, krpano, sceneScale);
//             }
//         }
//     }
// }


function raycasterMouseHandler(event, krpano, models, raycaster, camera, group, trajectoryPoints, trajectoryMesh, sceneScale, sceneToTrajectoryMapping) {
    //const mouse = krpano.control.getMousePos(event);

    // toogle trajectory click event
    const isShowTrajectory = JSON.parse(localStorage.getItem("isShowTrajectory"));
    if (!isShowTrajectory) {
        return
    }

    const threejsPlugin = krpano.get('plugin[threejs]');
    const THREE = threejsPlugin.THREE;

    const intersects = [];

    raycaster.params.Line.threshold = 0.5;


    const expansionRadius = 0.1;

    const offsetDirections = [
        new THREE.Vector3(0, 0, 0),                         // Center
    
        // Primary axis offsets
        new THREE.Vector3(expansionRadius, 0, 0),           // +X (Right)
        new THREE.Vector3(-expansionRadius, 0, 0),          // -X (Left)
        new THREE.Vector3(0, expansionRadius, 0),           // +Y (Up)
        new THREE.Vector3(0, -expansionRadius, 0),          // -Y (Down)
        new THREE.Vector3(0, 0, expansionRadius),           // +Z (Forward)
        new THREE.Vector3(0, 0, -expansionRadius),          // -Z (Backward)
    
        // XY plane diagonals
        new THREE.Vector3(expansionRadius, expansionRadius, 0),   // +X +Y (Top-right)
        new THREE.Vector3(-expansionRadius, -expansionRadius, 0), // -X -Y (Bottom-left)
        new THREE.Vector3(expansionRadius, -expansionRadius, 0),  // +X -Y (Bottom-right)
        new THREE.Vector3(-expansionRadius, expansionRadius, 0),  // -X +Y (Top-left)
    
        // XZ plane diagonals
        new THREE.Vector3(-expansionRadius, 0, expansionRadius),  // -X +Z (Left-Forward)
        new THREE.Vector3(-expansionRadius, 0, -expansionRadius), // -X -Z (Left-Backward)
        new THREE.Vector3(expansionRadius, 0, -expansionRadius),  // +X -Z (Right-Backward)
        new THREE.Vector3(expansionRadius, 0, expansionRadius),   // +X +Z (Right-Forward)
    
        // YZ plane diagonals
        new THREE.Vector3(0, -expansionRadius, expansionRadius),  // -Y +Z (Down-Forward)
        new THREE.Vector3(0, expansionRadius, -expansionRadius),  // +Y -Z (Up-Backward)
        new THREE.Vector3(0, -expansionRadius, -expansionRadius), // -Y -Z (Down-Backward)
        new THREE.Vector3(0, expansionRadius, expansionRadius),   // +Y +Z (Up-Forward)
    ];
    

        offsetDirections.forEach((offset) => {
            const modifiedDirection = raycaster.ray.direction.clone().add(offset).normalize();
            raycaster.set(raycaster.ray.origin.clone(), modifiedDirection);
            intersectVisibleObjects(models, raycaster, intersects);
        });
        
    // intersectVisibleObjects(models, raycaster, intersects);

    if (intersects.length > 0) {
        const hitSphere = intersects[0].object;
        console.log("Hit Sphere:", hitSphere);
        if (hitSphere.userData.id) {
           // krpano.call(`loadscene(${hitSphere.userData.id});`);
            krpano.call(`loadscene(${hitSphere.userData.id}, null, MERGE|KEEPVIEW|KEEPMOVING, BLEND(0.5))`);
            //console.log(`Scene loaded: ${hitSphere.userData.id}`);
            //console.log("Sl", loadscene(get(${hitSphere.userData.id}), null, MERGE|KEEPVIEW|KEEPMOVING, BLEND(2.0));)
            console.log("userData", hitSphere.userData.id);
            const sceneIndex = parseInt(hitSphere.userData.id.replace("scene_", "")) - 1;
            console.log("index", sceneIndex);
            const trajectoryIndex = sceneToTrajectoryMapping[sceneIndex];
            const targetPoint = trajectoryPoints[trajectoryIndex];
            
            if (targetPoint) {
                navigateToClickedPoint(targetPoint, camera, group, trajectoryMesh, krpano, sceneScale,collapseFloorplan());
                updateSIteNotePin(); //BY LNX
            }
        }
    }
}



function triggerThreeJSClick(sceneIndex) {
    console.log("triggerThreeJSClick called with sceneIndex:", sceneIndex);

    //gobalise the variables krpano, trajectoryPoints, sceneToTrajectoryMapping
    if (!window.krpano || !window.trajectoryPoints || !window.sceneToTrajectoryMapping) {
        console.error("Missing required objects:", {
            krpano: window.krpano,
            trajectoryPoints: window.trajectoryPoints,
            sceneToTrajectoryMapping: window.sceneToTrajectoryMapping
        });
        return;
    }

    // string condition to check if the sceneIndex is a string and starts with scene_
    if (!sceneIndex || typeof sceneIndex !== "string" || !sceneIndex.startsWith("scene_")) {
        console.error("Invalid scene index format:", sceneIndex);
        return;
    }

    // Extract scene number from sceneIndex
    const sceneNum = parseInt(sceneIndex.replace("scene_", ""));
    console.log("Converted sceneNum:", sceneNum);

    if (isNaN(sceneNum) || sceneNum < 0) {
        console.error("Invalid scene number:", sceneNum);
        return;
    }

    const trajectoryIndex = window.sceneToTrajectoryMapping[sceneNum - 1];
    console.log("trajectoryIndex:", trajectoryIndex);

    if (trajectoryIndex === undefined) {
        console.warn("No corresponding trajectory point found for scene index: ${sceneIndex}");
        return;
    }

    const targetPoint = window.trajectoryPoints[trajectoryIndex];

    if (!targetPoint) {
        console.warn("No valid trajectory point found at index ${trajectoryIndex}");
        return;
    }

    console.log("Navigating to trajectory point:", targetPoint);
    krpano.call('loadscene(scene_' + sceneNum + ', null, MERGE|KEEPVIEW|KEEPMOVING, BLEND(0.5))');

    navigateToClickedPoint(targetPoint, window.camera, window.group, window.trajectoryMesh, window.krpano, window.sceneScale,collapseFloorplan());
    updateSIteNotePin(); //BY LNX
}

// Make triggerThreeJSClick globally accessible
window.triggerThreeJSClick = triggerThreeJSClick;

// Expose raycasterMouseHandler globally
window.raycasterMouseHandler = raycasterMouseHandler;
