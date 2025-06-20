// Define createTrajectoryLine
// Inline createTrajectoryLine function
// function createTrajectoryLine(THREE, points) {
//     const geometry = new THREE.BufferGeometry();
//     const vertices = [];
//     const indices = [];

//     const ribbonWidth = 50;
//     const segments = 2000;
//     const curve = new THREE.CatmullRomCurve3(points);
//     const interpolatedPoints = curve.getPoints(segments);

//     for (let i = 0; i < interpolatedPoints.length - 1; i++) {
//         const start = interpolatedPoints[i];
//         const end = interpolatedPoints[i + 1];
//         const direction = new THREE.Vector3().subVectors(end, start).normalize();
//         const perpendicular = new THREE.Vector3(-direction.z, 0, direction.x).normalize().multiplyScalar(ribbonWidth / 2);

//         vertices.push(
//             start.x - perpendicular.x, start.y, start.z - perpendicular.z,
//             start.x + perpendicular.x, start.y, start.z + perpendicular.z,
//             end.x - perpendicular.x, end.y, end.z - perpendicular.z,
//             end.x + perpendicular.x, end.y, end.z + perpendicular.z
//         );

//         const baseIndex = i * 4;
//         indices.push(
//             baseIndex, baseIndex + 1, baseIndex + 2,
//             baseIndex + 1, baseIndex + 3, baseIndex + 2
//         );
//     }

//     geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
//     geometry.setIndex(indices);
//     geometry.computeVertexNormals();

//     const material = new THREE.MeshBasicMaterial({
//         color: 0x7FFF00,
//         side: THREE.DoubleSide,
//         transparent: true,
//         opacity: 0.4,
//         depthTest: false,
//     });

//     return new THREE.Mesh(geometry, material);
// }

//// ------------------------------------------ BEFORE TOGGLE TRAJECTORY LINE ------------------------------------------ ////

// function createTrajectoryLine(THREE, points) {
//     //const curve = new THREE.CatmullRomCurve3(points);
//     const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
//     const geometry = new THREE.TubeGeometry(curve, 6000, 150, 15, false);

//     geometry.scale(1, 0.001, 1); // compress width (y direction now)

//     const material = new THREE.MeshStandardMaterial({
//         color: 0x7FFF00,
//         emissive: 0x66ff66,
//         emissiveIntensity: 0.5,
//         metalness: 0.1,
//         roughness: 0,
//         transparent: true,
//         opacity: 0.3,
//         side: THREE.DoubleSide,
//         depthWrite: false
//     });

//     const mesh = new THREE.Mesh(geometry, material);
//     mesh.renderOrder = 1;

//     return { mesh, curve };
// }

//// ------------------------------------------ AFTER TOGGLE TRAJECTORY LINE ------------------------------------------ ////
let trajectoryMesh = null;
let toggleState = false;
localStorage.setItem("isShowTrajectory", true); //15 May


function createTrajectoryLine(THREE, points) {

    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
    const geometry = new THREE.TubeGeometry(curve, 6000, 150, 15, false);

    geometry.scale(1, 0.001, 1); // compress width (y direction now)

    const material = new THREE.MeshStandardMaterial({
        color: 0x7FFF00,
        emissive: 0x66ff66,
        emissiveIntensity: 0.5,
        metalness: 0.1,
        roughness: 0,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.renderOrder = 1;

    // Save to global scope
    trajectoryMesh = mesh;

    return { mesh, curve };
}

function handelToggleTrajectoryLine() {
    const krpano = document.getElementById("krpanoSWFObject");

    if (!krpano) {
        console.warn("krpano instance not found");
        return;
    }

    toggleState = !toggleState;

    // Toggle trajectory line visibility
    if (trajectoryMesh) {
        trajectoryMesh.visible = !toggleState;
        localStorage.setItem("isShowTrajectory", !toggleState);
    }

    if (toggleState) {
        // Switch ON (Red)
        krpano.set("layer[toggle_switch].bgcolor", "0xff0000");
        krpano.set("layer[switch_bubble].align", "left");
        krpano.set("layer[switch_bubble].x", 0);
        krpano.set("layer[navigation_line_tooltip].html", "Navigation Line");
    } else {
        // Switch OFF (Green)
        krpano.set("layer[toggle_switch].bgcolor", "0xb0f56d");
        krpano.set("layer[switch_bubble].align", "right");
        krpano.set("layer[switch_bubble].x", 0);
        krpano.set("layer[navigation_line_tooltip].html", "Navigation Line");
    }
}