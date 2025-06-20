let trajectoryMesh = null;
let toggleState = false;
localStorage.setItem("isShowTrajectory", true); //15 May


// function createTrajectoryLine(THREE, points) {

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
//         depthWrite: false,
//     });

//     const mesh = new THREE.Mesh(geometry, material);
//     mesh.renderOrder = 1;

//     // Save to global scope
//     trajectoryMesh = mesh;

//     return { mesh, curve };
// }




function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
}

function createTrajectoryLine(THREE, points) {
    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);

    // Check if it's a mobile device
    const mobile = isMobileDevice();

    const tubeSegments = mobile ? 30 : 30;
    const tubeRadius = mobile ? 100 : 150; // thinner on mobile
    const radialSegments = mobile ? 10 : 15;

    const geometry = new THREE.TubeGeometry(curve, tubeSegments, tubeRadius, radialSegments, false);
    geometry.scale(1, 0.001, 1); // flatten in Y for ribbon-like appearance

    const material = new THREE.MeshStandardMaterial({
        color: 0x7FFF00,
        emissive: 0x66ff66,
        emissiveIntensity: 0.5,
        metalness: 0.1,
        roughness: 0,
        transparent: true,
        opacity: mobile ? 0.4 : 0.4, // slightly lighter on mobile
        side: THREE.DoubleSide,
        depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.renderOrder = 1;

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