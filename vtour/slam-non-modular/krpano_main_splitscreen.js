const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjo0ODk0MTcyNTkxLCJpYXQiOjE3NDA1NzI1OTEsImp0aSI6IjU5MDViZmJlYmZmYjRlNGJhMWMxYzQ0MGU2OTFhMGJjIiwidXNlcl9pZCI6IndOOUxDUlhlY0VTUiJ9.MAhUI3jOQw6S6QKh0dofQcjynPFwQ3W6jS9yFn7cWj0";  // Replace with actual access token

// window.addEventListener('message', function (event) {

//     const { userAccesstoken } = event.data;
    
//     if (userAccesstoken) {
//         window.accessToken = userAccesstoken;
//         // console.log("Received token:", userAccesstoken);
//     }
// });

// let right_url = window.location.href;
// let left_url = window.location.href;

let right_url = "https://site-view-ai.s3.us-east-1.amazonaws.com/media/projects/X5WUJyrRqxVZ/D4bPWPwF6ULx/recordings/2025-06-19/10e8effc-bfc1-4060-93fa-621db51e4bb5/tour/vtour/tour.html";
let left_url = "https://site-view-ai.s3.us-east-1.amazonaws.com/media/projects/X5WUJyrRqxVZ/D4bPWPwF6ULx/recordings/2025-06-19/10e8effc-bfc1-4060-93fa-621db51e4bb5/tour/vtour/tour.html";


window.initializeFileSaver = function(krpano) {
    
    //krpano = document.getElementById("krpanoSWFObject");
    krpano.loadFile("../screenshot/FileSaver.js", function(file) {
        eval(file.data.replace("export ",""));
        krpano.screenshotSaveAs = saveAs;
        // count the screenshots (for the filenames)
		krpano.makescreenshot_count = 1;
		// create an empty Object as makeScreenshot cache
		var makeScreenshotCache = {};
	
        // add a 'makescreenshot' action to krpano
        krpano.showscreenshot = function(screenshotwidth,screenshotheight)
        {
            // if there is already a screenshot layer, remove it now
            krpano.call("removelayer(screenshot,true)");

            // make a screenshot as canvas
            var sizeinfo = {w:0, h:0};
            var screenshotcanvas = krpano.webGL.makeScreenshot(screenshotwidth, screenshotheight, true, "canvas", 0, null, sizeinfo, makeScreenshotCache);
 
            if (screenshotcanvas)
            {
                // example - draw something on the canvas, set to 1 to enable
                if (0)
                {
                    var ctx = screenshotcanvas.getContext("2d");
                    ctx.font = "25px Times";
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillText("krpano makeScreenshot() API Test", 50, screenshotcanvas.height-50);
                }

                // add some krpano layers that show the screenshot and allow saving it
                var container = krpano.addlayer("screenshot");
                container.type = "container";
                container.align="center";
                container.registercontentsize(sizeinfo.w+20, sizeinfo.h+20);
                container.width  = sizeinfo.w > sizeinfo.h ? "70%" : "prop";
                container.height = sizeinfo.w > sizeinfo.h ? "prop" : "70%";
                container.bgcolor = 0xFFFFFF;
                container.bgalpha = 1.0;
                container.bgshadow = "0 5 40 0x000000 1.0";
                container.bgroundedge = 3;
                container.bgcapture = true;
                container.zorder = 99;
                container.onclick = "set(enabled,false); tween(alpha,0,0.2,default,removelayer(get(name),true));";

                // Add close button (X)
                var closeButton = krpano.addlayer("screenshot_close");
                closeButton.type = "text";
                closeButton.parent = "screenshot";
                closeButton.html = "×"; // Using × symbol for close
                closeButton.css = "font-size:24px; padding: 5px 12px; color:#666; cursor:pointer;";
                closeButton.align = "rightTop";
                closeButton.x = 12;
                closeButton.y = 12;
                closeButton.zorder = 3;
                closeButton.onclick = "set(layer[screenshot].enabled,false); tween(layer[screenshot].alpha,0,0.2,default,removelayer(screenshot,true));";
                // Add hover effect for close button
                closeButton.onover = "set(css, 'font-size:24px; padding: 5px 12px; color:#000; cursor:pointer;');";
                closeButton.onout = "set(css, 'font-size:24px; padding: 5px 12px; color:#666; cursor:pointer;');";

                var image = krpano.addlayer("screenshotimage");
                image.url = screenshotcanvas.toDataURL();		// convert the screenshot-canvas to a base64 data-url for showing it
                image.parent = "screenshot";
                image.align = "center";
                image.width = -20;
                image.height = -20;
                image.zorder = 1;
                image.enabled = false;

                // saving screenshots will be only possible when Blob and canvas.toBlob is supported by the browser (for more browser support add polyfills)
                if (screenshotcanvas.toBlob)
                {
                    var saveasbutton = krpano.addlayer("screenshotsaveasbutton");
                    saveasbutton.loadstyle("button");
                    saveasbutton.parent = "screenshot";
                    saveasbutton.align = "bottom";
                    saveasbutton.y = 25;
                    saveasbutton.zorder = 2;
                    saveasbutton.alpha = 1.0;
                    saveasbutton.html = "Save Image";
                    // saveasbutton.onclick = function()
                    // {
                    //     // save as JPEG with 95% quality
                    //     screenshotcanvas.toBlob(function(blob) {
                    //         krpano.screenshotSaveAs(blob, "screenshot" + (krpano.makescreenshot_count++) + ".jpg");
                            
                    //         // Close the screenshot viewer after saving
                    //         krpano.call("set(layer[screenshot].enabled,false); " +
                    //                     "tween(layer[screenshot].alpha,0,0.2,default,removelayer(screenshot,true));");
                    //     }, "image/jpeg", 0.95);
                    // };

                    saveasbutton.onclick = function () {
                        screenshotcanvas.toBlob(function (blob) {
                            const filename = "screenshot" + (krpano.makescreenshot_count++) + ".jpg";
                    
                            const reader = new FileReader();
                            reader.onloadend = function () {
                                const base64data = reader.result;
                    
                                function isFlutterWebView() {
                                    return typeof window.ImageSaver === 'object' && typeof window.ImageSaver.postMessage === 'function';
                                }
                    
                                if (isFlutterWebView()) {
                                    console.log("------------It is in isFlutterApp-------")
                                    // Inside Flutter WebView
                                    const payload = {
                                        type: "saveImage",
                                        filename: filename,
                                        base64: base64data
                                    };
                                    console.log(base64data,"----------base64data-------------");
                                    console.log(filename,"-----filename----------");    
                                    window.ImageSaver.postMessage(JSON.stringify(payload));
                                }  else {
                                    // ✅ Not Flutter — fallback to normal desktop/mobile web download
                                    krpano.screenshotSaveAs(blob, filename);
                                }
                    
                                // ✅ Close screenshot layer in both cases
                                krpano.call("set(layer[screenshot].enabled,false); " +
                                    "tween(layer[screenshot].alpha,0,0.2,default,removelayer(screenshot,true));");
                            };
                            reader.readAsDataURL(blob);
                        }, "image/jpeg", 0.95);
                    };

                }
            }
        }
    });
}


// window.handleQRCodeRightViewer = function(QR_URL) {
//     console.log('handleQRCodeRightViewer');
//     const krpano = document.getElementById("krpanoSWFObject2");
//     krpano.call("generateQR(window.location.href)");

//     // Check if QR container already exists
//     let qrContainer = document.getElementById('qr-code-container-right');
    
//     if (qrContainer) {
//         // If container exists, toggle its visibility
//         if (qrContainer.style.display === 'none') {
//             qrContainer.style.display = 'block';
//         } else {
//             qrContainer.style.display = 'none';
//         }
//         return;
//     }

//     // Create QR code container div if it doesn't exist
//     qrContainer = document.createElement('div');
//     qrContainer.id = 'qr-code-container-right';
//     // qrContainer.style.cssText = `
//     //     position: relative;
//     //     bottom: 240px;
//     //     left: 90px; /* Changed from left to right */
//     //     width: 150px;
//     //     height: 150px;
//     //     background: white;
//     //     border-radius: 12px;
//     //     box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//     //     z-index: 1000;
//     //     display: block;
//     // `;

//     if(window.innerWidth < 640){
//         qrContainer.style.cssText = `
//             position: relative;
//             bottom: 240px;
//             left: 90px; /* Changed from left to right */
//             width: 150px;
//             height: 150px;
//             background: white;
//             border-radius: 12px;
//             box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//             z-index: 1000;
//             display: block;
//         `;} else {
//             qrContainer.style.cssText = `
//             position: relative;
//             bottom: 155px;
//             left: 15px; /* Changed from left to right */
//             width: 100px;
//             height: 100px;
//             background: white;
//             border-radius: 12px;
//             box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//             z-index: 1000;
//             display: block;
//         `;
//         }    



//     // Create QR code image
//     const qrImage = document.createElement('img');
//     qrImage.style.cssText = `
//         width: 90%;
//         height: 90%;
//         object-fit: contain;
//         border-radius: 12px;
//         padding: 5%;
//     `;

//     // Get current URL and generate QR code
//     const currentURL = QR_URL;
//     const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentURL)}`;
//     qrImage.src = qrCodeURL;

//     // Add image to container and container to body
//     qrContainer.appendChild(qrImage);
    
//     // Find the right panel and append the QR container to it
//     const rightPanel = document.querySelector('#pano2') || document.body;
//     rightPanel.appendChild(qrContainer);
// }


window.handleQRCodeRightViewer = function (QR_URL) {
    console.log('handleQRCodeRightViewer');
    const krpano = document.getElementById("krpanoSWFObject2");

    const rightPano = document.getElementById("pano2");
    rightPano.style.position = "relative"

    krpano.call("generateQR(window.location.href)");
    // krpano.style.position = 'relative'

    // Check if QR container already exists
    let qrContainer = document.getElementById('qr-code-container-right');

    if (qrContainer) {
        // If container exists, toggle its visibility
        if (qrContainer.style.display === 'none') {
            qrContainer.style.display = 'block';
        } else {
            qrContainer.style.display = 'none';
        }
        return;
    }

    // Create QR code container div if it doesn't exist
    qrContainer = document.createElement('div');
    rightPano.appendChild(qrContainer);
    qrContainer.id = 'qr-code-container-right';
    // ------------------------------------------
    if (window.innerWidth < 640) {
        // Mobile styles
        qrContainer.style.cssText = `
            position: absolute;
            bottom: 185px;
            right: 75px;
            width: 150px;
            height: 150px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            z-index: 1000;
            display: block;
        `;
    } else if (window.innerWidth > 1000) {
        // Styles for width greater than 1000px (currently empty)
        qrContainer.style.cssText = `
            position: absolute;
            bottom: 100px;
            left: 90px;
            width: 150px;
            height: 150px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            z-index: 1000;
            display: block;
        `;
    } else {
        // BOTTOMMM 55 ==+++=++==++=++=++++=+++++==++++++====+++++====++++====++++=====+++
        // Default styles (desktop)
        qrContainer.style.cssText = `
            position: absolute;
            bottom: 60px;
            left: 30px;
            width: 100px;
            height: 100px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            z-index: 1000;
            display: block;
        `;
    }
    // -------------------------------------------

    // Create QR code image
    const qrImage = document.createElement('img');
    qrImage.style.cssText = `
        width: 90%;
        height: 90%;
        object-fit: contain;
        border-radius: 12px;
        padding: 5%;
    `;

    // Get current URL and generate QR code
    const currentURL = QR_URL;
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentURL)}`;
    qrImage.src = qrCodeURL;

    // Add image to container and container to body
    qrContainer.appendChild(qrImage);

    // Find the right panel and append the QR container to it
    const rightPanel = document.querySelector('#pano2') || document.body;
    rightPanel.appendChild(qrContainer);
}



// window.handleQRCodeLeftViewer = function(QR_URL) {
    
//     console.log('handleQRCodeLeftViewer');
//     const krpano = document.getElementById("krpanoSWFObject");
//     krpano.call("generateQR(window.location.href)");

//     // Check if QR container already exists
//     let qrContainer = document.getElementById('qr-code-container');
    
//     if (qrContainer) {
//         // If container exists, toggle its visibility
//         if (qrContainer.style.display === 'none') {
//             qrContainer.style.display = 'block';
//         } else {
//             qrContainer.style.display = 'none';
//         }
//         return;
//     }

//     // Create QR code container div if it doesn't exist
//     qrContainer = document.createElement('div');
//     qrContainer.id = 'qr-code-container';
//     // qrContainer.style.cssText = `
//     //     position: fixed;
//     //     bottom: 90px;
//     //     left: 90px;
//     //     width: 150px;
//     //     height: 150px;
//     //     background: white;
//     //     border-radius: 12px;
//     //     box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//     //     z-index: 1000;
//     //     display: block;
//     // `;

//     if(window.innerWidth < 640) {
//         qrContainer.style.cssText = `
//             position: fixed;
//             bottom: 90px;
//             left: 90px;
//             width: 150px;
//             height: 150px;
//             background: white;
//             border-radius: 12px;
//             box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//             z-index: 1000;
//             display: block;
//         `;}  else {
//             qrContainer.style.cssText = `
//             position: relative;
//             bottom: 155px;
//             left: 15px; /* Changed from left to right */
//             width: 100px;
//             height: 100px;
//             background: white;
//             border-radius: 12px;
//             box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//             z-index: 1000;
//             display: block;
//         `;
//         }

//     // Create QR code image
//     const qrImage = document.createElement('img');
//     qrImage.style.cssText = `
//         width: 90%;
//         height: 90%;
//         object-fit: contain;
//         border-radius: 12px;
//         padding: 5%;
//     `;

//     // Get current URL and generate QR code
//     const currentURL = QR_URL;
//     const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentURL)}`;
//     qrImage.src = qrCodeURL;

//     // Add image to container and container to body
//     qrContainer.appendChild(qrImage);
//     document.body.appendChild(qrContainer);
// }


window.handleQRCodeLeftViewer = function (QR_URL) {

    console.log('handleQRCodeLeftViewer');
    const krpano = document.getElementById("krpanoSWFObject");
    krpano.call("generateQR(window.location.href)");

    const leftPano = document.getElementById("pano1")
    leftPano.style.position = 'relative'

    // Check if QR container already exists
    let qrContainer = document.getElementById('qr-code-container');

    if (qrContainer) {
        // If container exists, toggle its visibility
        if (qrContainer.style.display === 'none') {
            qrContainer.style.display = 'block';
        } else {
            qrContainer.style.display = 'none';
        }
        return;
    }

    // Create QR code container div if it doesn't exist
    qrContainer = document.createElement('div');
    qrContainer.id = 'qr-code-container';
    // -------------------------------------------------------
    if (window.innerWidth < 640) {
        qrContainer.style.cssText = `
            position: absolute;
            bottom: 60px;
            left: 30px;
            width: 150px;
            height: 150px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            z-index: 1000;
            display: block;
        `;
    } else if (window.innerWidth > 1000) {
        // Styles for width greater than 1000px (currently empty)
        qrContainer.style.cssText = `
            position: absolute;
            bottom: 100px;
            left: 90px; 
            width: 150px;
            height: 150px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            z-index: 1000;
            display: block;
    `;
    } else {
        qrContainer.style.cssText = `
            position: absolute;
            bottom: 60px;
            left: 30px; /* Changed from left to right */
            width: 100px;
            height: 100px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            z-index: 1000;
            display: block;
        `;
    }
    // ------------------------------------------------------


    // Create QR code image
    const qrImage = document.createElement('img');
    qrImage.style.cssText = `
        width: 90%;
        height: 90%;
        object-fit: contain;
        border-radius: 12px;
        padding: 5%;
    `;

    // Get current URL and generate QR code
    const currentURL = QR_URL;
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentURL)}`;
    qrImage.src = qrCodeURL;

    // Add image to container and container to body
    qrContainer.appendChild(qrImage);

    const leftPanel = document.querySelector('#pano1') || document.body;
    leftPanel.appendChild(qrContainer);
    // document.body.appendChild(qrContainer);
}


window.handleShareButton = function() {
    const krpano = document.getElementById("krpanoSWFObject");
    
    // Get current scene and view parameters
    const currentScene = krpano.get('scene[get(xml.scene)].name');
    const hlookat = krpano.get('view.hlookat');
    const vlookat = krpano.get('view.vlookat');
    const fov = krpano.get('view.fov');
    
    // Construct base URL with parameters
    const baseUrl = window.location.href.split('?')[0]; // Get URL without existing parameters
    const shareUrl = `${baseUrl}?scene=${currentScene}&h=${hlookat}&v=${vlookat}&f=${fov}`;
    
    // Remove existing dialog if present
    const existingDialog = document.getElementById('share-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }
    
    // Create and show the share dialog
    const shareDialog = document.createElement('div');
    shareDialog.id = 'share-dialog';
    shareDialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 999999;
        width: 400px;
        max-width: 90vw;
        display: block;
        pointer-events: auto;
    `;
    
    shareDialog.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
            <div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="background: #FFF3E0; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                        <span style="color: #FB8C00; font-size: 24px;">⚠</span>
                    </div>
                    <h3 style="margin: 0; font-size: 16px; color: #333;">Share a direct link to this location:</h3>
                </div>
                <p style="margin: 10px 0; color: #666; font-size: 14px;">
                    Note that if you share this link with others, they must have access to this Project.
                </p>
            </div>
            <button data-action="close-share-dialog" style="background: none; border: none; cursor: pointer; font-size: 20px; color: #666;">×</button>
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
            <input type="text" value="${shareUrl}" readonly style="
                flex: 1;
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 14px;
                color: #333;
                background: #f5f5f5;
            ">
            <button onclick="navigator.clipboard.writeText('${shareUrl}').then(() => {
                this.textContent = 'COPIED!';
                setTimeout(() => this.textContent = 'COPY', 2000);
            })" style="
                background: none;
                border: none;
                color: #2196F3;
                font-weight: bold;
                cursor: pointer;
                padding: 8px 12px;
                font-size: 14px;
            ">COPY</button>
        </div>
    `;
    
    document.body.appendChild(shareDialog);
    
    // Click outside or close button to close
    setTimeout(() => {
        document.addEventListener('click', function closeDialog(e) {
            const dialog = document.getElementById('share-dialog');
            const isCloseButton = e.target.closest('button[data-action*="close-share-dialog"]');
            
            if (dialog && (!dialog.contains(e.target) || isCloseButton)) {
                dialog.remove();
                document.removeEventListener('click', closeDialog);
            }
        });
    }, 100);
    
}


// Function to open the split-screen functionality
function openSplitScreen() {
    const krpano = document.getElementById("krpanoSWFObject");
    const currentScene = krpano.get('scene[get(xml.scene)].name') || "default_scene"; // Fallback if scene is undefined
    const hlookat = krpano.get('view.hlookat');
    const vlookat = krpano.get('view.vlookat');
    const fov = krpano.get('view.fov');

    // const currentUrl = "https://site-view-ai.s3.us-east-1.amazonaws.com/media/projects/QyCKfUsfHG8p/8osNUXsMCeJA/recordings/2025-04-02/9746a472-e65a-4e29-b7f9-6cd40945a7a3/tour/vtour/tour.html"
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.substring(0, currentUrl.indexOf('/vtour/'));
    const url = `${baseUrl}/vtour/splitscreen/syncscreen.html?initialScene=${currentScene}&hlookat=${hlookat}&vlookat=${vlookat}&fov=${fov}`;
    window.location.href = url;
}

// Expose openSplitScreen function to the global scope if needed
window.openSplitScreen = openSplitScreen;


// Global variables to track current state
let currentDate = new Date();
let selectedDateLeft = new Date();
let selectedDateRight = new Date();
let availableDatesLeft = []; // You'll need to populate this with your available dates
let availableDatesRight = [];

// Default available dates as fallback
const defaultAvailableDates = [
        new Date(2024, 6, 15), // July 15, 2024
        new Date(2024, 6, 28), // July 28, 2024
        new Date(2024, 7, 5),  // August 5, 2024
        new Date(2024, 7, 19), // August 19, 2024
        new Date(2024, 8, 3),  // September 3, 2024
        new Date(2024, 8, 17), // September 17, 2024
        new Date(2024, 9, 2),  // October 2, 2024
        new Date(2024, 9, 15), // October 15, 2024
        new Date(2024, 9, 29), // October 29, 2024
        new Date(2024, 10, 12), // November 12, 2024
        new Date(2024, 10, 25), // November 25, 2024
        new Date(2024, 11, 8),  // December 8, 2024
        new Date(2024, 11, 21), // December 21, 2024
        new Date(2024, 0, 4),   // January 4, 2024
        new Date(2025, 0, 13), // January 13, 2025
        new Date(2025, 0, 16), // January 16, 2025
        new Date(2025, 0, 17)  // January 17, 2025
];

// Function to extract project and floor IDs from URL
function extractIdsFromUrlRight() {
    const match = right_url.match(/projects\/([^\/]+)\/([^\/]+)/);
    // Extract jobId
    const jobMatch = right_url.match(/recordings\/\d{4}-\d{2}-\d{2}\/([^\/]+)/);

    if (match && jobMatch) {
        return {
            projectId: match[1],
            floorId: match[2],
            jobId: jobMatch[1]
        };
    }
    return null;
}

function extractIdsFromUrlLeft() {
    const match = left_url.match(/projects\/([^\/]+)\/([^\/]+)/);
    // Extract jobId
    const jobMatch = left_url.match(/recordings\/\d{4}-\d{2}-\d{2}\/([^\/]+)/);

    if (match && jobMatch) {
        return {
            projectId: match[1],
            floorId: match[2],
            jobId: jobMatch[1]
        };
    }
    return null;
}

// Function to fetch available dates from API
window.fetchAvailableDatesLeft = async function() {
    try {
        data_ids = extractIdsFromUrlLeft()
        if (!data_ids) {
            throw new Error('Could not extract project and floor IDs from URL');
        }
        const response = await fetch(`https://user.sitepace.ai/api/available_capture_dates/${data_ids.projectId}/${data_ids.floorId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch available dates');
        }

        const data = await response.json();

        // Store the full tour data globally
        window.tourDataLeft = {
            dates: data.tours.map(tour => ({
                ...tour,
                dateObj: new Date(tour.date),
                capture_time: tour.capture_time, // Capture time in ISO format
                captureDateObj: new Date(tour.capture_time) // Capture time as Date object
            })),
            project_id: data.project_id,
            floor_id: data.floor_id,
            total_count: data.total_count
        };

        // Return array of Date objects for backward compatibility
        return window.tourDataLeft.dates.map(tour => ({
            date: tour.dateObj,  // Date object
            capture_time: tour.captureDateObj // Capture time as Date object
        }));

    } catch (error) {
        console.error('Error fetching available dates:', error);
        return [];
    }
}

// Function to fetch available dates from API
window.fetchAvailableDatesRight = async function() {
    try {
        data_ids = extractIdsFromUrlRight()
        if (!data_ids) {
            throw new Error('Could not extract project and floor IDs from URL');
        }
        const response = await fetch(`https://user.sitepace.ai/api/available_capture_dates/${data_ids.projectId}/${data_ids.floorId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch available dates');
        }

        const data = await response.json();

        // Store the full tour data globally
        window.tourDataRight = {
            dates: data.tours.map(tour => ({
                ...tour,
                dateObj: new Date(tour.date),
                capture_time: tour.capture_time, // Capture time in ISO format
                captureDateObj: new Date(tour.capture_time) // Capture time as Date object
            })),
            project_id: data.project_id,
            floor_id: data.floor_id,
            total_count: data.total_count
        };

        // Return array of Date objects for backward compatibility
        return window.tourDataRight.dates.map(tour => ({
            date: tour.dateObj,  // Date object
            capture_time: tour.captureDateObj // Capture time as Date object
        }));

    } catch (error) {
        console.error('Error fetching available dates:', error);
        return [];
    }
}

window.formatDateTime = function(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} | ${formattedHours}:${formattedMinutes} ${ampm}`;
}

window.isDateAvailableLeft = function (dateToCheck) {
    if (!window.tourDataLeft?.dates) {
        console.log('No tour data available');
        return false;
    }

    const isAvailable = window.tourDataLeft.dates.some(tour => {
        const tourDate = tour.dateObj;
        const isSameDate = tourDate.getFullYear() === dateToCheck.getFullYear() &&
            tourDate.getMonth() === dateToCheck.getMonth() &&
            tourDate.getDate() === dateToCheck.getDate();

        if (isSameDate) {
            console.log('Found matching date:', tourDate);
        }
        return isSameDate;
    });

    return isAvailable;
}


window.isDateAvailableRight = function (dateToCheck) {
    if (!window.tourDataRight?.dates) {
        console.log('No tour data available');
        return false;
    }

    const isAvailable = window.tourDataRight.dates.some(tour => {
        const tourDate = tour.dateObj;
        const isSameDate = tourDate.getFullYear() === dateToCheck.getFullYear() &&
            tourDate.getMonth() === dateToCheck.getMonth() &&
            tourDate.getDate() === dateToCheck.getDate();

        if (isSameDate) {
            console.log('Found matching date:', tourDate);
        }
        return isSameDate;
    });

    return isAvailable;
}



window.formatDate = function(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.warn("Invalid date object:", date);
        return null;
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`; // Only return the date part
};

window.isSameDate = function(date1, date2) {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
}




// Left Calendar
window.initializeCalendarLeft = async function(krpano) {
    data_ids = extractIdsFromUrlLeft()
    console.log("777777777777777777777777777777777777777777777777777");
    console.log('Initializing Left Calendar');

    try {
        // Try to get dates from API first
        availableDatesLeft = await fetchAvailableDatesLeft();
    } catch (error) {
        // Fallback to default dates if API fails
        console.log('Falling back to default dates:', error);
        availableDatesLeft = defaultAvailableDates;
    }

    if (!availableDatesLeft.length) {
        console.warn("No available dates found.");
    }


    const response = await fetch(`https://user.sitepace.ai/api/get_capture_created_time/${data_ids.projectId}/${data_ids.jobId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch available dates');
    }

    const data = await response.json();

    selectedDateLeft = new Date(data.created_time);
    console.log("******************", selectedDateLeft);

    // const krpano = document.getElementById("krpanoSWFObject");
    if (krpano) {
        const formattedDate = formatDate(selectedDateLeft);
        krpano.call(`set(layer[datetime_display].html, '${formattedDate}')`);
    }
    updateCalendarGridLeft()

}

// Left toggle calendar
window.toggleCalendarLeft = function() {
    var krpano = document.getElementById("krpanoSWFObject");
    var calendarPopup = krpano.get("layer[calendar_popup].visible");
    krpano.set("layer[calendar_popup].visible", !calendarPopup);
    
    if (!calendarPopup) {
        updateCalendarGridLeft();
    }
}

// Left update calendar grid
window.updateCalendarGridLeft = function() {
    
    const krpano = document.getElementById("krpanoSWFObject");
    if (!krpano) return;

    console.log("========================================================");

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    krpano.call(`set(layer[month_year].html, '${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}')`);

    // console.log('Creating calendar grid for:', monthNames[currentDate.getMonth()], currentDate.getFullYear());
    krpano.call(`removechildren(layer[calendar_grid]);`);

    let position = 0;

    // Previous month days - gray them out
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
        const prevDay = prevMonthDays - i;
        // console.log('Previous month day:', prevDay, 'Position:', position, 'Color: Gray (0xE0E0E0)');
        addDayToGridLeft(krpano, prevDay, position, "0xf2f2f2", false, true); // Using same gray as future dates
        position++;
    }

    // Current month days
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= totalDays; i++) {
        const currentDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        currentDateObj.setHours(0, 0, 0, 0);

        const isPastOrToday = currentDateObj <= today;
        const isAvailable = isPastOrToday && isDateAvailableLeft(currentDateObj);
        const isSelected = isSameDate(currentDateObj, selectedDateLeft);
        const color = isSelected ? "0xFFB6C1" : // Light pink for selected
            !isPastOrToday ? "0xf2f2f2" : // Gray for future dates
                isAvailable ? "0xFFFFFF" : // White for available past dates
                    "0xE0E0E0";               // Gray for unavailable past dates

        // console.log('Current month day:', i, 
        //            'Position:', position, 
        //            'Color:', color,
        //            'Status:', isSelected ? 'Selected' : 
        //                     !isPastOrToday ? 'Future' :
        //                     isAvailable ? 'Available' : 'Unavailable');

        addDayToGridLeft(krpano, i, position, color, isPastOrToday);
        position++;
    }

    // Next month days - gray them out
    let nextMonthDay = 1;
    while (position < 42) {
        // console.log('Next month day:', nextMonthDay, 'Position:', position, 'Color: Gray (0xE0E0E0)');
        addDayToGridLeft(krpano, nextMonthDay, position, "0xf2f2f2", false, true); // Using same gray as future dates
        nextMonthDay++;
        position++;
    }
}

// Left add day to grid
window.addDayToGridLeft = function(krpano, day, position, bgcolor, clickable = true, isDimmed = false) {
    console.log("Left call dates ////////////////////////////////////////");
    const row = Math.floor(position / 7);
    const col = position % 7;
    const x = col * 40;
    const y = row * 40;

    const layerName = `day_${position}`;
    const alpha = isDimmed ? 0.5 : 1.0;

    // Create the container layer (background)
    krpano.call(`
        addlayer(${layerName});
        set(layer[${layerName}].type, container);
        set(layer[${layerName}].parent, calendar_grid);
        set(layer[${layerName}].width, 38);
        set(layer[${layerName}].height, 38);
        set(layer[${layerName}].x, ${x});
        set(layer[${layerName}].y, ${y});
        set(layer[${layerName}].bgcolor, 0xFFFFFF);
        set(layer[${layerName}].bgalpha, ${alpha});
        set(layer[${layerName}].bgroundedge, 19);
        set(layer[${layerName}].enabled, true);
        set(layer[${layerName}].onclick, jscall(handleDateClickLeft(${day})));
    `);

    // Create the text layer (number)
    let textStyle;
    if (bgcolor === "0xFFB6C1") { // Selected date
        textStyle = 'font-family:Arial; color:#000000; font-size:14px; font-weight:bold; text-align:center;background-color:0xABDD05;border-radius:6px;';
    } else if (bgcolor === "0xFFFFFF") { // Available date
        textStyle = 'font-family:Arial; color:#000000; font-size:14px; text-align:center;background-color:0xDFFF60;border-radius:6px;';
    } else if (bgcolor === "0xf2f2f2") { // Future date or outside current month
        textStyle = 'font-family:Arial; color:#D1D5DB; font-size:14px; text-align:center;';
    } else { // Regular date
        textStyle = 'font-family:Arial; color:#000000; font-size:14px; text-align:center;';
    }

    krpano.call(`
        addlayer(${layerName}_text);
        set(layer[${layerName}_text].parent, ${layerName});
        set(layer[${layerName}_text].type, text);
        set(layer[${layerName}_text].html, ${day});
        set(layer[${layerName}_text].css, '${textStyle}');
        set(layer[${layerName}_text].align, center);
        set(layer[${layerName}_text].width, 38);
        set(layer[${layerName}_text].height, 38);
        set(layer[${layerName}_text].vcenter, true);
        set(layer[${layerName}_text].enabled, true);
        set(layer[${layerName}_text].onclick, jscall(handleDateClickLeft(${day})));
    `);

    if (clickable) {
        krpano.call(`
            set(layer[${layerName}].enabled, true);
            set(layer[${layerName}].onclick, "jscall(handleDateClickLeft(${day}))");
            set(layer[${layerName}].onhover, true);
            set(layer[${layerName}].onover, "set(bgcolor, 0xE6E6E6)");
            set(layer[${layerName}].onout, "set(bgcolor, 0xFFFFFF)");
        `);
    }
}

// Left handle prev date time
window.handlePrevDateTimeLeft = async function() {
    const krpano = document.getElementById("krpanoSWFObject");
    if (!krpano || !window.tourDataLeft?.dates) return;
    data_ids = extractIdsFromUrlLeft()
    // Get current displayed date from datetime_display
    const currentDisplayText = krpano.get('layer[datetime_display].html');
    const displayDate = convertToNavigateApiDateFormat(currentDisplayText);

    // console.log("Current Display:", currentDisplayText, "Formatted API Date:", displayDate);

    const apiUrl = `https://user.sitepace.ai/api/navigation_projectcapture/?project_id=${data_ids.projectId}&floor_id=${data_ids.floorId}&created_at=${displayDate}&action=previous`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch previous tour data');
        }

        const data = await response.json();

        if (data.success && data.data?.capture) {
            console.log("Navigating to:", data.data.capture);
            // window.location.href = data.data.capture;  // Navigate to previous capture URL

            // Use static URL for testing
            const staticTourHtmlUrl = data.data.capture;
            // const staticTourHtmlUrl = "http://127.0.0.1:5500/vtour/tour.html";
            const tourXmlUrl = extractXmlPathFromUrl(staticTourHtmlUrl);
            
            // Store the selected tour URL (for later use if needed)
            window.selectedTourUrl = staticTourHtmlUrl;
            
            // Get current view parameters
            const currentHlookat = krpano.get('view.hlookat') || 0;
            const currentVlookat = krpano.get('view.vlookat') || 0;
            const currentFov = krpano.get('view.fov') || 90;
            const currentScene = krpano.get('xml.scene') || "scene1";
            
            console.log("Current view parameters:", {
                hlookat: currentHlookat,
                vlookat: currentVlookat,
                fov: currentFov,
                scene: currentScene
            });
            
            // First, remove the existing krpano instance
            removepano('pano1');
            
            console.log('Loading tour from:', tourXmlUrl);
            
            // Create a new krpano instance
            embedpano({
                xml: tourXmlUrl,
                target: "pano1",
                html5: "prefer",
                passQueryParameters: true,
                onready: function(newKrpano) {
                    // window.krpano1 = newKrpano;
                    window.krpanoWrapper.krpano1 = newKrpano;
                    newKrpano.set("name", "krpano1");
                    syncScenes(newKrpano, window.krpanoWrapper.krpano2);
                    // syncScenes(newKrpano, window.krpano1);
                    
                    console.log("New krpano instance created");
                    
                    // Apply view parameters
                    setTimeout(() => {
                        try {
                            newKrpano.call(`loadscene(${currentScene}, null, MERGE);`);
                            newKrpano.set('view.hlookat', currentHlookat);
                            newKrpano.set('view.vlookat', currentVlookat);
                            newKrpano.set('view.fov', currentFov);
                            console.log("View parameters applied");
                        } catch (e) {
                            console.error("Error applying view parameters:", e);
                        }
                        
                        // Update UI settings
                        try {
                            newKrpano.set('layer[bottom_bar].align', 'bottomleft');
                            newKrpano.set('layer[bottom_bar].width', '60');
                            newKrpano.set('layer[bottom_bar].x', '20');
                            newKrpano.set('layer[bottom_bar].visible', true);
                            newKrpano.set('layer[split_button].visible', false);

                            newKrpano.set('layer[datetime_bar].align', 'topleft');
                            newKrpano.set('layer[datetime_bar].x', '40');
                            newKrpano.set('layer[datetime_bar].y', '50');
                            
                            newKrpano.set('layer[date_tooltip].x', '175');
                            newKrpano.set('layer[date_tooltip].y', '10');
                            newKrpano.set('layer[date_bar].height', '40');
                            newKrpano.set('layer[date_bar].width', '160');

                            newKrpano.set('layer[time_tooltip].x', '175');
                            newKrpano.set('layer[time_tooltip].y', '62');
                            newKrpano.set('layer[time_bar].height', '40');
                            newKrpano.set('layer[time_bar].width', '160'); 
                            newKrpano.set('layer[time_bar].align', 'left');
                            newKrpano.set('layer[time_bar].y', '50');
                            newKrpano.set('layer[time_bar].css', "font-family: Arial; color: #FFFFFF; font-size: 14px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center;");
                            
                            newKrpano.set('layer[bottom_bar].width', '60');
                            newKrpano.set('layer[bottom_bar].height', '225');

                            newKrpano.set('layer[qr_tooltip].x', '70');
                            newKrpano.set('layer[qr_tooltip].y', '20');
                            newKrpano.set('layer[qr_button].x', '0');
                            newKrpano.set('layer[qr_button].y', '10');
                            newKrpano.set('layer[qr_button].align', 'top');

                            newKrpano.set('layer[share_button].y', '65');
                            newKrpano.set('layer[share_button].x', '0');
                            newKrpano.set('layer[share_tooltip].x', '70');
                            newKrpano.set('layer[share_tooltip].y', '75');
                            newKrpano.set('layer[share_button].align', 'top');

                            newKrpano.set('layer[add_button].y', '120');
                            newKrpano.set('layer[add_button].x', '0');
                            newKrpano.set('layer[add_tooltip].x', '70');
                            newKrpano.set('layer[add_tooltip].y', '130');
                            newKrpano.set('layer[add_button].align', 'top');

                            newKrpano.set('layer[screenshot_button].y', '175');
                            newKrpano.set('layer[screenshot_button].x', '0');
                            newKrpano.set('layer[screenshot_tooltip].x', '70');
                            newKrpano.set('layer[screenshot_tooltip].y', '185');
                            newKrpano.set('layer[screenshot_button].align', 'top');
                            
                            
                            newKrpano.set('layer[datetime_bar].visible', true);
                            newKrpano.set('layer[calendar_popup].align', 'topleft');
                            newKrpano.set('layer[calendar_popup].x', '40');
                            newKrpano.set('layer[calendar_popup].y', '180');


                            newKrpano.set('layer[time_dropdown_list].align', 'topleft');
                            newKrpano.set('layer[time_dropdown_list].x', '0');
                            newKrpano.set('layer[time_dropdown_list].y', '102');

                            newKrpano.call(`
                                if(layer[split_screen_button], set(layer[split_screen_button].visible, false););
                                if(layer[close_split_button], set(layer[close_split_button].visible, true););
                                if(layer[chatbot_button], set(layer[chatbot_button].visible, false););
                                if(layer[trajectory_toggle_switch], set(layer[trajectory_toggle_switch].visible, false););
                            `);
                                    
                            if (newKrpano.get('layer[date_bar]')) {
                                newKrpano.set('layer[date_bar].html', formattedDateTime);
                            }
                            console.log("UI settings applied");
                        } catch (e) {
                            console.error("Error updating UI settings:", e);
                        }
                    }, 500);

                    // left_url = "https://site-view-ai.s3.us-east-1.amazonaws.com/media/projects/QyCKfUsfHG8p/8osNUXsMCeJA/recordings/2025-04-02/9746a472-e65a-4e29-b7f9-6cd40945a7a3/tour/vtour/tour.html"
                    left_url = staticTourHtmlUrl
                    
                    // Reinitialize components when the threejs plugin is ready
                    const initInterval = setInterval(() => {
                        const threejsPlugin = newKrpano.get('plugin[threejs]');
                        if (threejsPlugin && threejsPlugin.scene && threejsPlugin.THREE) {
                            clearInterval(initInterval);
                            console.log("ThreeJS plugin is ready");
                            
                            try {
                                initializeThreeJS(newKrpano);
                                initializeFileSaver(newKrpano);
                                initializeCalendarLeft(newKrpano);
                                fetchCaptureTimeFromDateBarLeft(newKrpano);
                                setTimeDropdownIconLeft(newKrpano);
                                updateTimeBarLeft(newKrpano);
                                fetchLeftFloors(newKrpano);
                                setLeftFloorPlanContainerSizeOnLoad(newKrpano);
                                
                                // Reattach event handlers
                                newKrpano.set('layer[qr_svg].onclick', `js(handleQRCodeLeftViewer(${staticTourHtmlUrl}));`);
                                newKrpano.set('layer[share_svg].onclick', `js(handleShareButtonLeftView(${staticTourHtmlUrl}));`);
                                newKrpano.set('layer[datetime_display].onclick', 'js(toggleCalendarLeft());');
                                newKrpano.set('layer[prev_svg].onclick', 'js(handlePrevDateTimeLeft());');
                                newKrpano.set('layer[next_svg].onclick', 'js(handleNextDateTimeLeft());');
                                newKrpano.set('layer[prev_month_svg].onclick', 'js(handlePrevMonthLeft());');
                                newKrpano.set('layer[next_month_svg].onclick', 'js(handleNextMonthLeft());');
                                newKrpano.set('layer[expand_btn].onclick', 'js(expandFloorplanLeft());');
                                newKrpano.set('layer[collapse_btn].onclick', 'js(collapseFloorplanLeft());');
                                newKrpano.set('layer[map].ondown', 'js(handelDragFloorplanImageLeft());');
                                newKrpano.set('layer[close_split_button].onclick', `js(callCloseSplitView(left_url));`);
                                newKrpano.set('layer[dropdown_button].onclick', `js(toggleLeftDropdown());`);
                                newKrpano.set('layer[time_bar].onclick', `js(leftTimeDropdown());`);
                                console.log("Components initialized and event handlers attached");
                            } catch (e) {
                                console.error("Error initializing components:", e);
                            }
                        }
                    }, 100);
                }
            });

        } else {
            console.log("No earlier dates available");
        }
    } catch (error) {
        console.error("Error fetching previous tour data:", error);
    }
}

// Left handle next date time
window.handleNextDateTimeLeft = async function() {
    const krpano = document.getElementById("krpanoSWFObject");
    if (!krpano || !window.tourDataLeft?.dates) return;
    data_ids = extractIdsFromUrlLeft()

    // Get current displayed date from datetime_display
    const currentDisplayText = krpano.get('layer[datetime_display].html');
    const displayDate = convertToNavigateApiDateFormat(currentDisplayText);

    console.log("Current Display:", currentDisplayText, "Formatted API Date:", displayDate);

    const apiUrl = `https://user.sitepace.ai/api/navigation_projectcapture/?project_id=${data_ids.projectId}&floor_id=${data_ids.floorId}&created_at=${displayDate}&action=next`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch previous tour data');
        }

        const data = await response.json();

        if (data.success && data.data?.capture) {
            console.log("Navigating to:", data.data.capture);
            // window.location.href = data.data.capture;  // Navigate to previous capture URL

            // Use static URL for testing
            const staticTourHtmlUrl = data.data.capture;
            // const staticTourHtmlUrl = "http://127.0.0.1:5500/vtour_2/tour.html";
            const tourXmlUrl = extractXmlPathFromUrl(staticTourHtmlUrl);
            
            // Store the selected tour URL (for later use if needed)
            window.selectedTourUrl = staticTourHtmlUrl;
            
            // Get current view parameters
            const currentHlookat = krpano.get('view.hlookat') || 0;
            const currentVlookat = krpano.get('view.vlookat') || 0;
            const currentFov = krpano.get('view.fov') || 90;
            const currentScene = krpano.get('xml.scene') || "scene1";
            
            console.log("Current view parameters:", {
                hlookat: currentHlookat,
                vlookat: currentVlookat,
                fov: currentFov,
                scene: currentScene
            });
            
            // First, remove the existing krpano instance
            removepano('pano1');
            
            console.log('Loading tour from:', tourXmlUrl);
            
            // Create a new krpano instance
            embedpano({
                xml: tourXmlUrl,
                target: "pano1",
                html5: "prefer",
                passQueryParameters: true,
                onready: function(newKrpano) {
                    // window.krpano1 = newKrpano;
                    window.krpanoWrapper.krpano1 = newKrpano;
                    newKrpano.set("name", "krpano1");
                    syncScenes(newKrpano, window.krpanoWrapper.krpano2);
                    // syncScenes(newKrpano, window.krpano1);
                    
                    console.log("New krpano instance created");
                    
                    // Apply view parameters
                    setTimeout(() => {
                        try {
                            newKrpano.call(`loadscene(${currentScene}, null, MERGE);`);
                            newKrpano.set('view.hlookat', currentHlookat);
                            newKrpano.set('view.vlookat', currentVlookat);
                            newKrpano.set('view.fov', currentFov);
                            console.log("View parameters applied");
                        } catch (e) {
                            console.error("Error applying view parameters:", e);
                        }
                        
                        // Update UI settings
                        try {
                            newKrpano.set('layer[bottom_bar].align', 'bottomleft');
                            newKrpano.set('layer[bottom_bar].width', '60');
                            newKrpano.set('layer[bottom_bar].x', '20');
                            newKrpano.set('layer[bottom_bar].visible', true);
                            newKrpano.set('layer[split_button].visible', false);

                            newKrpano.set('layer[datetime_bar].align', 'topleft');
                            newKrpano.set('layer[datetime_bar].x', '40');
                            newKrpano.set('layer[datetime_bar].y', '50');
                            
                            newKrpano.set('layer[date_tooltip].x', '175');
                            newKrpano.set('layer[date_tooltip].y', '10');
                            newKrpano.set('layer[date_bar].height', '40');
                            newKrpano.set('layer[date_bar].width', '160');

                            newKrpano.set('layer[time_tooltip].x', '175');
                            newKrpano.set('layer[time_tooltip].y', '62');
                            newKrpano.set('layer[time_bar].height', '40');
                            newKrpano.set('layer[time_bar].width', '160'); 
                            newKrpano.set('layer[time_bar].align', 'left');
                            newKrpano.set('layer[time_bar].y', '50');
                            newKrpano.set('layer[time_bar].css', "font-family: Arial; color: #FFFFFF; font-size: 14px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center;");
                            
                            newKrpano.set('layer[bottom_bar].width', '60');
                            newKrpano.set('layer[bottom_bar].height', '225');

                            newKrpano.set('layer[qr_tooltip].x', '70');
                            newKrpano.set('layer[qr_tooltip].y', '20');
                            newKrpano.set('layer[qr_button].x', '0');
                            newKrpano.set('layer[qr_button].y', '10');
                            newKrpano.set('layer[qr_button].align', 'top');

                            newKrpano.set('layer[share_button].y', '65');
                            newKrpano.set('layer[share_button].x', '0');
                            newKrpano.set('layer[share_tooltip].x', '70');
                            newKrpano.set('layer[share_tooltip].y', '75');
                            newKrpano.set('layer[share_button].align', 'top');

                            newKrpano.set('layer[add_button].y', '120');
                            newKrpano.set('layer[add_button].x', '0');
                            newKrpano.set('layer[add_tooltip].x', '70');
                            newKrpano.set('layer[add_tooltip].y', '130');
                            newKrpano.set('layer[add_button].align', 'top');

                            newKrpano.set('layer[screenshot_button].y', '175');
                            newKrpano.set('layer[screenshot_button].x', '0');
                            newKrpano.set('layer[screenshot_tooltip].x', '70');
                            newKrpano.set('layer[screenshot_tooltip].y', '185');
                            newKrpano.set('layer[screenshot_button].align', 'top');
                            
                            
                            newKrpano.set('layer[datetime_bar].visible', true);
                            newKrpano.set('layer[calendar_popup].align', 'topleft');
                            newKrpano.set('layer[calendar_popup].x', '40');
                            newKrpano.set('layer[calendar_popup].y', '180');


                            newKrpano.set('layer[time_dropdown_list].align', 'topleft');
                            newKrpano.set('layer[time_dropdown_list].x', '0');
                            newKrpano.set('layer[time_dropdown_list].y', '102');
                            
                            newKrpano.call(`
                                if(layer[split_screen_button], set(layer[split_screen_button].visible, false););
                                if(layer[close_split_button], set(layer[close_split_button].visible, true););
                                if(layer[chatbot_button], set(layer[chatbot_button].visible, false););
                                if(layer[trajectory_toggle_switch], set(layer[trajectory_toggle_switch].visible, false););
                            `);
                            console.log("UI settings applied");
                        } catch (e) {
                            console.error("Error updating UI settings:", e);
                        }
                    }, 500);

                    // left_url = "https://site-view-ai.s3.us-east-1.amazonaws.com/media/projects/QyCKfUsfHG8p/8osNUXsMCeJA/recordings/2025-04-04/55c62786-de0f-4f48-9be2-784decbb48b5/tour/vtour/tour.html"
                    left_url = staticTourHtmlUrl
                    
                    // Reinitialize components when the threejs plugin is ready
                    const initInterval = setInterval(() => {
                        const threejsPlugin = newKrpano.get('plugin[threejs]');
                        if (threejsPlugin && threejsPlugin.scene && threejsPlugin.THREE) {
                            clearInterval(initInterval);
                            console.log("ThreeJS plugin is ready");
                            
                            try {
                                initializeThreeJS(newKrpano);
                                initializeFileSaver(newKrpano);
                                initializeCalendarLeft(newKrpano);
                                fetchCaptureTimeFromDateBarLeft(newKrpano);
                                setTimeDropdownIconLeft(newKrpano);
                                updateTimeBarLeft(newKrpano);
                                fetchLeftFloors(newKrpano);
                                setLeftFloorPlanContainerSizeOnLoad(newKrpano);
                                
                                // Reattach event handlers
                                newKrpano.set('layer[qr_svg].onclick', `js(handleQRCodeLeftViewer(${staticTourHtmlUrl}));`);
                                newKrpano.set('layer[share_svg].onclick', `js(handleShareButtonLeftView(${staticTourHtmlUrl}));`);
                                newKrpano.set('layer[datetime_display].onclick', 'js(toggleCalendarLeft());');
                                newKrpano.set('layer[prev_svg].onclick', 'js(handlePrevDateTimeLeft());');
                                newKrpano.set('layer[next_svg].onclick', 'js(handleNextDateTimeLeft());');
                                newKrpano.set('layer[prev_month_svg].onclick', 'js(handlePrevMonthLeft());');
                                newKrpano.set('layer[next_month_svg].onclick', 'js(handleNextMonthLeft());');
                                newKrpano.set('layer[expand_btn].onclick', 'js(expandFloorplanLeft());');
                                newKrpano.set('layer[collapse_btn].onclick', 'js(collapseFloorplanLeft());');
                                newKrpano.set('layer[map].ondown', 'js(handelDragFloorplanImageLeft());');
                                newKrpano.set('layer[close_split_button].onclick', `js(callCloseSplitView(left_url));`);
                                newKrpano.set('layer[dropdown_button].onclick', `js(toggleLeftDropdown());`);
                                newKrpano.set('layer[time_bar].onclick', `js(leftTimeDropdown());`);
                                console.log("Components initialized and event handlers attached");
                            } catch (e) {
                                console.error("Error initializing components:", e);
                            }
                        }
                    }, 100);
                }
            });
        } else {
            console.log("No next dates available");
        }
    } catch (error) {
        console.error("Error fetching previous tour data:", error);
    }
}


// Left handle prev month
window.handlePrevMonthLeft = function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendarGridLeft();
}

// Left handle next month
window.handleNextMonthLeft = function() {   
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendarGridLeft();
}


// Right Calendar
window.initializeCalendarRight = async function(krpano) {
    console.log("Initializing Right Calendar");
    data_ids = extractIdsFromUrlRight()

    try {
        // Try to get dates from API first
        availableDatesRight = await fetchAvailableDatesRight();
    } catch (error) {
        // Fallback to default dates if API fails
        console.log('Falling back to default dates:', error);
        availableDatesRIght = defaultAvailableDates;
    }

    if (!availableDatesRight.length) {
        console.warn("No available dates found.");
    }


    const response = await fetch(`https://user.sitepace.ai/api/get_capture_created_time/${data_ids.projectId}/${data_ids.jobId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch available dates');
    }

    const data = await response.json();

    selectedDateRight = new Date(data.created_time);
    console.log("******************", selectedDateRight);

    // const krpano = document.getElementById("krpanoSWFObject");
    if (krpano) {
        const formattedDate = formatDate(selectedDateRight);
        krpano.call(`set(layer[datetime_display].html, '${formattedDate}')`);
    }
    updateCalendarGridRight()
}

// Right toggle calendar
window.toggleCalendarRight = function() {
    var krpano = document.getElementById("krpanoSWFObject2");
    var calendarPopup = krpano.get("layer[calendar_popup].visible");
    krpano.set("layer[calendar_popup].visible", !calendarPopup);
    
    if (!calendarPopup) {
        updateCalendarGridRight();
    }
}

// Right update calendar grid
window.updateCalendarGridRight = function() {
    console.log("-----------------------------------------------");
    
    const krpano = document.getElementById("krpanoSWFObject2");
    if (!krpano) return;

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    krpano.call(`set(layer[month_year].html, '${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}')`);

    // console.log('Creating calendar grid for:', monthNames[currentDate.getMonth()], currentDate.getFullYear());
    krpano.call(`removechildren(layer[calendar_grid]);`);

    let position = 0;

    // Previous month days - gray them out
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
        const prevDay = prevMonthDays - i;
        // console.log('Previous month day:', prevDay, 'Position:', position, 'Color: Gray (0xE0E0E0)');
        addDayToGridRight(krpano, prevDay, position, "0xf2f2f2", false, true); // Using same gray as future dates
        position++;
    }

    // Current month days
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= totalDays; i++) {
        const currentDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        currentDateObj.setHours(0, 0, 0, 0);

        const isPastOrToday = currentDateObj <= today;
        const isAvailable = isPastOrToday && isDateAvailableRight(currentDateObj);
        const isSelected = isSameDate(currentDateObj, selectedDateRight);
        const color = isSelected ? "0xFFB6C1" : // Light pink for selected
            !isPastOrToday ? "0xf2f2f2" : // Gray for future dates
                isAvailable ? "0xFFFFFF" : // White for available past dates
                    "0xE0E0E0";               // Gray for unavailable past dates

        // console.log('Current month day:', i, 
        //            'Position:', position, 
        //            'Color:', color,
        //            'Status:', isSelected ? 'Selected' : 
        //                     !isPastOrToday ? 'Future' :
        //                     isAvailable ? 'Available' : 'Unavailable');

        addDayToGridRight(krpano, i, position, color, isPastOrToday);
        position++;
    }

    // Next month days - gray them out
    let nextMonthDay = 1;
    while (position < 42) {
        // console.log('Next month day:', nextMonthDay, 'Position:', position, 'Color: Gray (0xE0E0E0)');
        addDayToGridRight(krpano, nextMonthDay, position, "0xf2f2f2", false, true); // Using same gray as future dates
        nextMonthDay++;
        position++;
    }
}

// Right add day to grid
window.addDayToGridRight = function(krpano, day, position, bgcolor, clickable = true, isDimmed = false) {
    console.log("right calll date++++++++++++++++++++++++++++++++++++++++++");
    const row = Math.floor(position / 7);
    const col = position % 7;
    const x = col * 40;
    const y = row * 40;

    const layerName = `day_${position}`;
    const alpha = isDimmed ? 0.5 : 1.0;

    // Create the container layer (background)
    krpano.call(`
        addlayer(${layerName});
        set(layer[${layerName}].type, container);
        set(layer[${layerName}].parent, calendar_grid);
        set(layer[${layerName}].width, 38);
        set(layer[${layerName}].height, 38);
        set(layer[${layerName}].x, ${x});
        set(layer[${layerName}].y, ${y});
        set(layer[${layerName}].bgcolor, 0xFFFFFF);
        set(layer[${layerName}].bgalpha, ${alpha});
        set(layer[${layerName}].bgroundedge, 19);
        set(layer[${layerName}].enabled, true);
        set(layer[${layerName}].onclick, jscall(handleDateClickRight(${day})));
    `);

    // Create the text layer (number)
    let textStyle;
    if (bgcolor === "0xFFB6C1") { // Selected date
        textStyle = 'font-family:Arial; color:#000000; font-size:14px; font-weight:bold; text-align:center;background-color:0xABDD05;border-radius:6px;';
    } else if (bgcolor === "0xFFFFFF") { // Available date
        textStyle = 'font-family:Arial; color:#000000; font-size:14px; text-align:center;background-color:0xDFFF60;border-radius:6px;';
    } else if (bgcolor === "0xf2f2f2") { // Future date or outside current month
        textStyle = 'font-family:Arial; color:#D1D5DB; font-size:14px; text-align:center;';
    } else { // Regular date
        textStyle = 'font-family:Arial; color:#000000; font-size:14px; text-align:center;';
    }

    krpano.call(`
        addlayer(${layerName}_text);
        set(layer[${layerName}_text].parent, ${layerName});
        set(layer[${layerName}_text].type, text);
        set(layer[${layerName}_text].html, ${day});
        set(layer[${layerName}_text].css, '${textStyle}');
        set(layer[${layerName}_text].align, center);
        set(layer[${layerName}_text].width, 38);
        set(layer[${layerName}_text].height, 38);
        set(layer[${layerName}_text].vcenter, true);
        set(layer[${layerName}_text].enabled, true);
        set(layer[${layerName}_text].onclick, jscall(handleDateClickRight(${day})));
    `);

    if (clickable) {
        krpano.call(`
            set(layer[${layerName}].enabled, true);
            set(layer[${layerName}].onclick, "jscall(handleDateClickRight(${day}))");
            set(layer[${layerName}].onhover, true);
            set(layer[${layerName}].onover, "set(bgcolor, 0xE6E6E6)");
            set(layer[${layerName}].onout, "set(bgcolor, 0xFFFFFF)");
        `);
    }
}

// Right handle prev date time
window.handlePrevDateTimeRight = async function() {
    const krpano = document.getElementById("krpanoSWFObject2");
    if (!krpano || !window.tourDataRight?.dates) return;
    data_ids = extractIdsFromUrlRight()

    // Get current displayed date from datetime_display
    const currentDisplayText = krpano.get('layer[datetime_display].html');
    const displayDate = convertToNavigateApiDateFormat(currentDisplayText);

    // console.log("Current Display:", currentDisplayText, "Formatted API Date:", displayDate);

    const apiUrl = `https://user.sitepace.ai/api/navigation_projectcapture/?project_id=${data_ids.projectId}&floor_id=${data_ids.floorId}&created_at=${displayDate}&action=previous`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch previous tour data');
        }

        const data = await response.json();

        if (data.success && data.data?.capture) {
            console.log("Navigating to:", data.data.capture);
            // window.location.href = data.data.capture;  // Navigate to previous capture URL

            // Use static URL for testing
            const staticTourHtmlUrl = data.data.capture;
            // const staticTourHtmlUrl = "http://127.0.0.1:5500/vtour/tour.html";
            const tourXmlUrl = extractXmlPathFromUrl(staticTourHtmlUrl);
            
            // Store the selected tour URL (for later use if needed)
            window.selectedTourUrl = staticTourHtmlUrl;
            
            // Get current view parameters
            const currentHlookat = krpano.get('view.hlookat') || 0;
            const currentVlookat = krpano.get('view.vlookat') || 0;
            const currentFov = krpano.get('view.fov') || 90;
            const currentScene = krpano.get('xml.scene') || "scene1";
            
            console.log("Current view parameters:", {
                hlookat: currentHlookat,
                vlookat: currentVlookat,
                fov: currentFov,
                scene: currentScene
            });
            
            // First, remove the existing krpano instance
            removepano('pano2');
            
            console.log('Loading tour from:', staticTourHtmlUrl);
            
            // Create a new krpano instance
            embedpano({
                xml: tourXmlUrl,
                target: "pano2",
                html5: "prefer",
                passQueryParameters: true,
                onready: function(newKrpano) {
                    // window.krpano2 = newKrpano;
                    window.krpanoWrapper.krpano1 = newKrpano;
                    newKrpano.set("name", "krpano2");
                    syncScenes(newKrpano, window.krpanoWrapper.krpano1);
                    
                    console.log("New krpano instance created");
                    
                    // Apply view parameters
                    setTimeout(() => {
                        try {
                            newKrpano.call(`loadscene(${currentScene}, null, MERGE);`);
                            newKrpano.set('view.hlookat', currentHlookat);
                            newKrpano.set('view.vlookat', currentVlookat);
                            newKrpano.set('view.fov', currentFov);
                            console.log("View parameters applied");
                        } catch (e) {
                            console.error("Error applying view parameters:", e);
                        }
                        
                        // Update UI settings
                        try {
                            // newKrpano.set('layer[bottom_bar].align', 'bottomleft');
                            // newKrpano.set('layer[bottom_bar].width', '60');
                            // newKrpano.set('layer[bottom_bar].x', '20');
                            // newKrpano.set('layer[bottom_bar].visible', true);
                            newKrpano.set('layer[split_button].visible', false);

                            newKrpano.set('layer[datetime_bar].align', 'topleft');
                            newKrpano.set('layer[datetime_bar].x', '40');
                            newKrpano.set('layer[datetime_bar].y', '50');
                            
                            newKrpano.set('layer[date_tooltip].x', '175');
                            newKrpano.set('layer[date_tooltip].y', '10');
                            newKrpano.set('layer[date_bar].height', '40');
                            newKrpano.set('layer[date_bar].width', '160');

                            newKrpano.set('layer[time_tooltip].x', '175');
                            newKrpano.set('layer[time_tooltip].y', '62');
                            newKrpano.set('layer[time_bar].height', '40');
                            newKrpano.set('layer[time_bar].width', '160'); 
                            newKrpano.set('layer[time_bar].align', 'left');
                            newKrpano.set('layer[time_bar].y', '50');
                            newKrpano.set('layer[time_bar].css', "font-family: Arial; color: #FFFFFF; font-size: 14px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center;");
                            
                            newKrpano.set('layer[bottom_bar].width', '60');
                            newKrpano.set('layer[bottom_bar].height', '225');

                            newKrpano.set('layer[qr_tooltip].x', '70');
                            newKrpano.set('layer[qr_tooltip].y', '20');
                            newKrpano.set('layer[qr_button].x', '0');
                            newKrpano.set('layer[qr_button].y', '10');
                            newKrpano.set('layer[qr_button].align', 'top');

                            newKrpano.set('layer[share_button].y', '65');
                            newKrpano.set('layer[share_button].x', '0');
                            newKrpano.set('layer[share_tooltip].x', '70');
                            newKrpano.set('layer[share_tooltip].y', '75');
                            newKrpano.set('layer[share_button].align', 'top');

                            newKrpano.set('layer[add_button].y', '120');
                            newKrpano.set('layer[add_button].x', '0');
                            newKrpano.set('layer[add_tooltip].x', '70');
                            newKrpano.set('layer[add_tooltip].y', '130');
                            newKrpano.set('layer[add_button].align', 'top');

                            newKrpano.set('layer[screenshot_button].y', '175');
                            newKrpano.set('layer[screenshot_button].x', '0');
                            newKrpano.set('layer[screenshot_tooltip].x', '70');
                            newKrpano.set('layer[screenshot_tooltip].y', '185');
                            newKrpano.set('layer[screenshot_button].align', 'top');
                            
                            
                            newKrpano.set('layer[datetime_bar].visible', true);
                            newKrpano.set('layer[calendar_popup].align', 'topleft');
                            newKrpano.set('layer[calendar_popup].x', '40');
                            newKrpano.set('layer[calendar_popup].y', '180');


                            newKrpano.set('layer[time_dropdown_list].align', 'topleft');
                            newKrpano.set('layer[time_dropdown_list].x', '0');
                            newKrpano.set('layer[time_dropdown_list].y', '102');
                            
                            newKrpano.call(`
                                if(layer[split_screen_button], set(layer[split_screen_button].visible, false););
                                if(layer[close_split_button], set(layer[close_split_button].visible, true););
                                if(layer[chatbot_button], set(layer[chatbot_button].visible, false););
                                if(layer[trajectory_toggle_switch], set(layer[trajectory_toggle_switch].visible, false););
                            `);
                            console.log("UI settings applied");
                        } catch (e) {
                            console.error("Error updating UI settings:", e);
                        }
                    }, 500);

                    // right_url = "https://site-view-ai.s3.us-east-1.amazonaws.com/media/projects/QyCKfUsfHG8p/8osNUXsMCeJA/recordings/2025-04-02/9746a472-e65a-4e29-b7f9-6cd40945a7a3/tour/vtour/tour.html"
                    right_url = staticTourHtmlUrl
                    
                    // Reinitialize components when the threejs plugin is ready
                    const initInterval = setInterval(() => {
                        const threejsPlugin = newKrpano.get('plugin[threejs]');
                        if (threejsPlugin && threejsPlugin.scene && threejsPlugin.THREE) {
                            clearInterval(initInterval);
                            console.log("ThreeJS plugin is ready");
                            
                            try {
                                initializeThreeJS(newKrpano);
                                initializeFileSaver(newKrpano);
                                initializeCalendarRight(newKrpano);
                                fetchCaptureTimeFromDateBarRight(newKrpano);
                                setTimeDropdownIconRight(newKrpano);
                                updateTimeBarRight(newKrpano);
                                fetchRightFloors(newKrpano);
                                setRightFloorPlanContainerSizeOnLoad(newKrpano);
                                
                                // Reattach event handlers
                                newKrpano.set('layer[qr_svg].onclick', `js(handleQRCodeRightViewer(${staticTourHtmlUrl}));`);
                                newKrpano.set('layer[share_svg].onclick', `js(handleShareButtonRightView(${staticTourHtmlUrl}));`);
                                newKrpano.set('layer[datetime_display].onclick', 'js(toggleCalendarRight());');
                                newKrpano.set('layer[prev_svg].onclick', 'js(handlePrevDateTimeRight());');
                                newKrpano.set('layer[next_svg].onclick', 'js(handleNextDateTimeRight());');
                                newKrpano.set('layer[prev_month_svg].onclick', 'js(handlePrevMonthRight());');
                                newKrpano.set('layer[next_month_svg].onclick', 'js(handleNextMonthRight());');
                                newKrpano.set('layer[expand_btn].onclick', 'js(expandFloorplanRight());');
                                newKrpano.set('layer[collapse_btn].onclick', 'js(collapseFloorplanRight());');
                                newKrpano.set('layer[map].ondown', 'js(handelDragFloorplanImageRight());');
                                newKrpano.set('layer[close_split_button].onclick', `js(callCloseSplitView(right_url));`);
                                newKrpano.set('layer[dropdown_button].onclick', `js(toggleRightDropdown());`);
                                newKrpano.set('layer[time_bar].onclick', `js(rightTimeDropdown());`);
                                console.log("Components initialized and event handlers attached");
                            } catch (e) {
                                console.error("Error initializing components:", e);
                            }
                        }
                    }, 100);
                }
            });

        } else {
            console.log("No earlier dates available");
        }
    } catch (error) {
        console.error("Error fetching previous tour data:", error);
    }
}

// Right handle next date time
window.handleNextDateTimeRight = async function() {
    const krpano = document.getElementById("krpanoSWFObject2");
    if (!krpano || !window.tourDataRight?.dates) return;
    data_ids = extractIdsFromUrlRight()

    // Get current displayed date from datetime_display
    const currentDisplayText = krpano.get('layer[datetime_display].html');
    const displayDate = convertToNavigateApiDateFormat(currentDisplayText);

    console.log("Current Display:", currentDisplayText, "Formatted API Date:", displayDate);

    const apiUrl = `https://user.sitepace.ai/api/navigation_projectcapture/?project_id=${data_ids.projectId}&floor_id=${data_ids.floorId}&created_at=${displayDate}&action=next`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch previous tour data');
        }

        const data = await response.json();

        if (data.success && data.data?.capture) {
            console.log("Navigating to:", data.data.capture);
            // window.location.href = data.data.capture;  // Navigate to previous capture URL

            // Use static URL for testing
            const staticTourHtmlUrl = data.data.capture;
            // const staticTourHtmlUrl = "http://127.0.0.1:5500/vtour_2/tour.html";
            const tourXmlUrl = extractXmlPathFromUrl(staticTourHtmlUrl);
            // Store the selected tour URL (for later use if needed)
            window.selectedTourUrl = staticTourHtmlUrl;
            
            // Get current view parameters
            const currentHlookat = krpano.get('view.hlookat') || 0;
            const currentVlookat = krpano.get('view.vlookat') || 0;
            const currentFov = krpano.get('view.fov') || 90;
            const currentScene = krpano.get('xml.scene') || "scene1";
            
            console.log("Current view parameters:", {
                hlookat: currentHlookat,
                vlookat: currentVlookat,
                fov: currentFov,
                scene: currentScene
            });
            
            // First, remove the existing krpano instance
            removepano('pano2');
            
            console.log('Loading tour from:', staticTourHtmlUrl);
            
            // Create a new krpano instance
            embedpano({
                xml: tourXmlUrl,
                target: "pano2",
                html5: "prefer",
                passQueryParameters: true,
                onready: function(newKrpano) {
                    // window.krpano2 = newKrpano;
                    window.krpanoWrapper.krpano1 = newKrpano;
                    newKrpano.set("name", "krpano2");
                    syncScenes(newKrpano, window.krpanoWrapper.krpano1);
                    
                    console.log("New krpano instance created");
                    
                    // Apply view parameters
                    setTimeout(() => {
                        try {
                            newKrpano.call(`loadscene(${currentScene}, null, MERGE);`);
                            newKrpano.set('view.hlookat', currentHlookat);
                            newKrpano.set('view.vlookat', currentVlookat);
                            newKrpano.set('view.fov', currentFov);
                            console.log("View parameters applied");
                        } catch (e) {
                            console.error("Error applying view parameters:", e);
                        }
                        
                        // Update UI settings
                        try {
                            // newKrpano.set('layer[bottom_bar].align', 'bottomleft');
                            // newKrpano.set('layer[bottom_bar].width', '60');
                            // newKrpano.set('layer[bottom_bar].x', '20');
                            // newKrpano.set('layer[bottom_bar].visible', true);
                            newKrpano.set('layer[split_button].visible', false);

                            newKrpano.set('layer[datetime_bar].align', 'topleft');
                            newKrpano.set('layer[datetime_bar].x', '40');
                            newKrpano.set('layer[datetime_bar].y', '50');
                            
                            newKrpano.set('layer[date_tooltip].x', '175');
                            newKrpano.set('layer[date_tooltip].y', '10');
                            newKrpano.set('layer[date_bar].height', '40');
                            newKrpano.set('layer[date_bar].width', '160');

                            newKrpano.set('layer[time_tooltip].x', '175');
                            newKrpano.set('layer[time_tooltip].y', '62');
                            newKrpano.set('layer[time_bar].height', '40');
                            newKrpano.set('layer[time_bar].width', '160'); 
                            newKrpano.set('layer[time_bar].align', 'left');
                            newKrpano.set('layer[time_bar].y', '50');
                            newKrpano.set('layer[time_bar].css', "font-family: Arial; color: #FFFFFF; font-size: 14px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center;");
                            
                            newKrpano.set('layer[bottom_bar].width', '60');
                            newKrpano.set('layer[bottom_bar].height', '225');

                            newKrpano.set('layer[qr_tooltip].x', '70');
                            newKrpano.set('layer[qr_tooltip].y', '20');
                            newKrpano.set('layer[qr_button].x', '0');
                            newKrpano.set('layer[qr_button].y', '10');
                            newKrpano.set('layer[qr_button].align', 'top');

                            newKrpano.set('layer[share_button].y', '65');
                            newKrpano.set('layer[share_button].x', '0');
                            newKrpano.set('layer[share_tooltip].x', '70');
                            newKrpano.set('layer[share_tooltip].y', '75');
                            newKrpano.set('layer[share_button].align', 'top');

                            newKrpano.set('layer[add_button].y', '120');
                            newKrpano.set('layer[add_button].x', '0');
                            newKrpano.set('layer[add_tooltip].x', '70');
                            newKrpano.set('layer[add_tooltip].y', '130');
                            newKrpano.set('layer[add_button].align', 'top');

                            newKrpano.set('layer[screenshot_button].y', '175');
                            newKrpano.set('layer[screenshot_button].x', '0');
                            newKrpano.set('layer[screenshot_tooltip].x', '70');
                            newKrpano.set('layer[screenshot_tooltip].y', '185');
                            newKrpano.set('layer[screenshot_button].align', 'top');
                            
                            
                            newKrpano.set('layer[datetime_bar].visible', true);
                            newKrpano.set('layer[calendar_popup].align', 'topleft');
                            newKrpano.set('layer[calendar_popup].x', '40');
                            newKrpano.set('layer[calendar_popup].y', '180');


                            newKrpano.set('layer[time_dropdown_list].align', 'topleft');
                            newKrpano.set('layer[time_dropdown_list].x', '0');
                            newKrpano.set('layer[time_dropdown_list].y', '102');
                            
                            newKrpano.call(`
                                if(layer[split_screen_button], set(layer[split_screen_button].visible, false););
                                if(layer[close_split_button], set(layer[close_split_button].visible, true););
                                if(layer[chatbot_button], set(layer[chatbot_button].visible, false););
                                if(layer[trajectory_toggle_switch], set(layer[trajectory_toggle_switch].visible, false););
                            `);
                            console.log("UI settings applied");
                        } catch (e) {
                            console.error("Error updating UI settings:", e);
                        }
                    }, 500);

                    // right_url = "https://site-view-ai.s3.us-east-1.amazonaws.com/media/projects/QyCKfUsfHG8p/8osNUXsMCeJA/recordings/2025-04-04/55c62786-de0f-4f48-9be2-784decbb48b5/tour/vtour/tour.html"
                    right_url = staticTourHtmlUrl
                    
                    // Reinitialize components when the threejs plugin is ready
                    const initInterval = setInterval(() => {
                        const threejsPlugin = newKrpano.get('plugin[threejs]');
                        if (threejsPlugin && threejsPlugin.scene && threejsPlugin.THREE) {
                            clearInterval(initInterval);
                            console.log("ThreeJS plugin is ready");
                            
                            try {
                                initializeThreeJS(newKrpano);
                                initializeFileSaver(newKrpano);
                                initializeCalendarRight(newKrpano);
                                fetchCaptureTimeFromDateBarRight(newKrpano);
                                setTimeDropdownIconRight(newKrpano);
                                updateTimeBarRight(newKrpano);
                                fetchRightFloors(newKrpano);
                                setRightFloorPlanContainerSizeOnLoad(newKrpano);
                                
                                // Reattach event handlers
                                newKrpano.set('layer[qr_svg].onclick', `js(handleQRCodeRightViewer(${staticTourHtmlUrl}));`);
                                newKrpano.set('layer[share_svg].onclick', `js(handleShareButtonRightView(${staticTourHtmlUrl}));`);
                                newKrpano.set('layer[datetime_display].onclick', 'js(toggleCalendarRight());');
                                newKrpano.set('layer[prev_svg].onclick', 'js(handlePrevDateTimeRight());');
                                newKrpano.set('layer[next_svg].onclick', 'js(handleNextDateTimeRight());');
                                newKrpano.set('layer[prev_month_svg].onclick', 'js(handlePrevMonthRight());');
                                newKrpano.set('layer[next_month_svg].onclick', 'js(handleNextMonthRight());');
                                newKrpano.set('layer[expand_btn].onclick', 'js(expandFloorplanRight());');
                                newKrpano.set('layer[collapse_btn].onclick', 'js(collapseFloorplanRight());');
                                newKrpano.set('layer[map].ondown', 'js(handelDragFloorplanImageRight());');
                                newKrpano.set('layer[close_split_button].onclick', `js(callCloseSplitView(right_url));`);
                                newKrpano.set('layer[dropdown_button].onclick', `js(toggleRightDropdown());`);
                                newKrpano.set('layer[time_bar].onclick', `js(rightTimeDropdown());`);
                                console.log("Components initialized and event handlers attached");
                            } catch (e) {
                                console.error("Error initializing components:", e);
                            }
                        }
                    }, 100);
                }
            });



        } else {
            console.log("No next dates available");
        }
    } catch (error) {
        console.error("Error fetching previous tour data:", error);
    }
}


// Right handle prev month
window.handlePrevMonthRight = function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendarGridRight();
}

// Left handle next month
window.handleNextMonthRight = function() {   
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendarGridRight();
}


async function updateTimeBarLeft(krpano) {
    ids_data = extractIdsFromUrlLeft()
    const response = await fetch(`https://user.sitepace.ai/api/get_capture_created_time/${ids_data.projectId}/${ids_data.jobId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch available dates');
    }

    try {
        const data = await response.json();

        if (data.success) {
            const utcDate = new Date(data.created_time);
            const localTime = utcDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

            // let krpano = document.getElementById("krpanoSWFObject");
            if (krpano) {
                let currentText = krpano.get("layer[time_bar].html") || "";
                let currentArrow = currentText.includes("▲") ? "▲" : "▼"; // Keep the current arrow state

                let updatedHtml = `<span style='display: flex; justify-content: space-between; width: 98%;'> \
                    <span id='time_bar_text'>${localTime}</span> \
                    <span>${currentArrow}</span> \
                </span>`;

                let safeHtml = updatedHtml.replace(/&/g, "&").replace(/"/g, "'");

                krpano.call(`set(layer[time_bar].html, "${safeHtml}")`);
            }
        }
    } catch (error) {
        console.error("Error fetching or updating time bar:", error);
    }
}


async function updateTimeBarRight(krpano) {
    ids_data = extractIdsFromUrlRight()
    const response = await fetch(`https://user.sitepace.ai/api/get_capture_created_time/${ids_data.projectId}/${ids_data.jobId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch available dates');
    }

    try {
        const data = await response.json();

        if (data.success) {
            const utcDate = new Date(data.created_time);
            const localTime = utcDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

            // let krpano = document.getElementById("krpanoSWFObject");
            if (krpano) {
                let currentText = krpano.get("layer[time_bar].html") || "";
                let currentArrow = currentText.includes("▲") ? "▲" : "▼"; // Keep the current arrow state

                let updatedHtml = `<span style='display: flex; justify-content: space-between; width: 98%;'> \
                    <span id='time_bar_text'>${localTime}</span> \
                    <span>${currentArrow}</span> \
                </span>`;

                let safeHtml = updatedHtml.replace(/&/g, "&").replace(/"/g, "'");

                krpano.call(`set(layer[time_bar].html, "${safeHtml}")`);
            }
        }
    } catch (error) {
        console.error("Error fetching or updating time bar:", error);
    }
}



function setTimeDropdownIconRight(krpano) {

    let currentText = krpano.get("layer[time_bar].html") || "";

    // Extract the current arrow and toggle it
    let currentArrow = currentText.includes("▲") ? "▲" : "▼";
    let newArrow = currentArrow === "▲" ? "▼" : "▲";

    // Ensure only the arrow is replaced
    let updatedHtml = currentText.replace(/▲|▼/g, newArrow);

    let safeHtml = updatedHtml.replace(/&amp;/g, "&").replace(/"/g, "'");

    krpano.call(`set(layer[time_bar].html, "${safeHtml}")`);
}



function setTimeDropdownIconLeft(krpano) {

    let currentText = krpano.get("layer[time_bar].html") || "";

    // Extract the current arrow and toggle it
    let currentArrow = currentText.includes("▲") ? "▲" : "▼";
    let newArrow = currentArrow === "▲" ? "▼" : "▲";

    // Ensure only the arrow is replaced
    let updatedHtml = currentText.replace(/▲|▼/g, newArrow);

    let safeHtml = updatedHtml.replace(/&amp;/g, "&").replace(/"/g, "'");

    krpano.call(`set(layer[time_bar].html, "${safeHtml}")`);
}



window.handleDateClickRight = function(day) {
    const krpano = window.krpanoWrapper.krpano2; // Use the direct reference instead of finding by ID
    // const krpano = window.krpano1;
    if (!krpano) return;

    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    clickedDate.setHours(0, 0, 0, 0);

    // Find the matching tour data
    const matchingTour = window.tourDataRight?.dates.find(tour =>
        isSameDate(tour.dateObj, clickedDate)
    );

    if (matchingTour) {
        selectedDateRight = clickedDate;
        console.log('Selected tour:', matchingTour);

        const captureTimeUTC = new Date(matchingTour.capture_time);
        const formattedDateTime = formatDate(captureTimeUTC)

        // Use static URL for testing
        const staticTourHtmlUrl = matchingTour.full_url;
        // const staticTourHtmlUrl = "http://127.0.0.1:5500/vtour_2/tour.html";
        const tourXmlUrl = extractXmlPathFromUrl(staticTourHtmlUrl);
        
        // Store the selected tour URL (for later use if needed)
        window.selectedTourUrl = staticTourHtmlUrl;
        
        // Get current view parameters
        const currentHlookat = krpano.get('view.hlookat') || 0;
        const currentVlookat = krpano.get('view.vlookat') || 0;
        const currentFov = krpano.get('view.fov') || 90;
        const currentScene = krpano.get('xml.scene') || "scene1";
        
        console.log("Current view parameters:", {
            hlookat: currentHlookat,
            vlookat: currentVlookat,
            fov: currentFov,
            scene: currentScene
        });
        
        // First, remove the existing krpano instance
        removepano('pano2');
        
        console.log('Loading tour from:', staticTourHtmlUrl);
        
        // Create a new krpano instance
        embedpano({
            xml: tourXmlUrl,
            target: "pano2",
            html5: "prefer",
            passQueryParameters: true,
            onready: function(newKrpano) {
                window.krpanoWrapper.krpano2 = newKrpano;
                // window.krpano1 = newKrpano;
                newKrpano.set("name", "krpano2");
                syncScenes(newKrpano, window.krpanoWrapper.krpano1);
                
                console.log("New krpano instance created");
                
                // Apply view parameters
                setTimeout(() => {
                    try {
                        newKrpano.call(`loadscene(${currentScene}, null, MERGE);`);
                        newKrpano.set('view.hlookat', currentHlookat);
                        newKrpano.set('view.vlookat', currentVlookat);
                        newKrpano.set('view.fov', currentFov);
                        console.log("View parameters applied");
                    } catch (e) {
                        console.error("Error applying view parameters:", e);
                    }
                    
                    // Update UI settings
                    try {
                        // newKrpano.set('layer[bottom_bar].align', 'bottomleft');
                        // newKrpano.set('layer[bottom_bar].width', '60');
                        // newKrpano.set('layer[bottom_bar].x', '20');
                        // newKrpano.set('layer[bottom_bar].visible', true);
                        newKrpano.set('layer[split_button].visible', false);

                        newKrpano.set('layer[datetime_bar].align', 'topleft');
                        newKrpano.set('layer[datetime_bar].x', '40');
                        newKrpano.set('layer[datetime_bar].y', '50');
                        
                        newKrpano.set('layer[date_tooltip].x', '175');
                        newKrpano.set('layer[date_tooltip].y', '10');
                        newKrpano.set('layer[date_bar].height', '40');
                        newKrpano.set('layer[date_bar].width', '160');

                        newKrpano.set('layer[time_tooltip].x', '175');
                        newKrpano.set('layer[time_tooltip].y', '62');
                        newKrpano.set('layer[time_bar].height', '40');
                        newKrpano.set('layer[time_bar].width', '160'); 
                        newKrpano.set('layer[time_bar].align', 'left');
                        newKrpano.set('layer[time_bar].y', '50');
                        newKrpano.set('layer[time_bar].css', "font-family: Arial; color: #FFFFFF; font-size: 14px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center;");
                        
                        newKrpano.set('layer[bottom_bar].width', '60');
                        newKrpano.set('layer[bottom_bar].height', '225');

                        newKrpano.set('layer[qr_tooltip].x', '70');
                        newKrpano.set('layer[qr_tooltip].y', '20');
                        newKrpano.set('layer[qr_button].x', '0');
                        newKrpano.set('layer[qr_button].y', '10');
                        newKrpano.set('layer[qr_button].align', 'top');

                        newKrpano.set('layer[share_button].y', '65');
                        newKrpano.set('layer[share_button].x', '0');
                        newKrpano.set('layer[share_tooltip].x', '70');
                        newKrpano.set('layer[share_tooltip].y', '75');
                        newKrpano.set('layer[share_button].align', 'top');

                        newKrpano.set('layer[add_button].y', '120');
                        newKrpano.set('layer[add_button].x', '0');
                        newKrpano.set('layer[add_tooltip].x', '70');
                        newKrpano.set('layer[add_tooltip].y', '130');
                        newKrpano.set('layer[add_button].align', 'top');

                        newKrpano.set('layer[screenshot_button].y', '175');
                        newKrpano.set('layer[screenshot_button].x', '0');
                        newKrpano.set('layer[screenshot_tooltip].x', '70');
                        newKrpano.set('layer[screenshot_tooltip].y', '185');
                        newKrpano.set('layer[screenshot_button].align', 'top');
                        
                        
                        newKrpano.set('layer[datetime_bar].visible', true);
                        newKrpano.set('layer[calendar_popup].align', 'topleft');
                        newKrpano.set('layer[calendar_popup].x', '40');
                        newKrpano.set('layer[calendar_popup].y', '180');


                        newKrpano.set('layer[time_dropdown_list].align', 'topleft');
                        newKrpano.set('layer[time_dropdown_list].x', '0');
                        newKrpano.set('layer[time_dropdown_list].y', '102');

                        newKrpano.call(`
                            if(layer[split_screen_button], set(layer[split_screen_button].visible, false););
                            if(layer[close_split_button], set(layer[close_split_button].visible, true););
                            if(layer[chatbot_button], set(layer[chatbot_button].visible, false););
                            if(layer[trajectory_toggle_switch], set(layer[trajectory_toggle_switch].visible, false););
                        `);
                        
                        if (newKrpano.get('layer[date_bar]')) {
                            newKrpano.set('layer[date_bar].html', formattedDateTime);
                        }
                        console.log("UI settings applied");
                    } catch (e) {
                        console.error("Error updating UI settings:", e);
                    }
                }, 500);

                // right_url = "https://site-view-ai.s3.us-east-1.amazonaws.com/media/projects/QyCKfUsfHG8p/8osNUXsMCeJA/recordings/2025-04-04/55c62786-de0f-4f48-9be2-784decbb48b5/tour/vtour/tour.html"
                right_url = staticTourHtmlUrl
                
                // Reinitialize components when the threejs plugin is ready
                const initInterval = setInterval(() => {
                    const threejsPlugin = newKrpano.get('plugin[threejs]');
                    if (threejsPlugin && threejsPlugin.scene && threejsPlugin.THREE) {
                        clearInterval(initInterval);
                        console.log("ThreeJS plugin is ready");
                        
                        try {
                            initializeThreeJS(newKrpano);
                            initializeFileSaver(newKrpano);
                            initializeCalendarRight(newKrpano);
                            fetchCaptureTimeFromDateBarRight(newKrpano);
                            setTimeDropdownIconRight(newKrpano);
                            updateTimeBarRight(newKrpano);
                            fetchRightFloors(newKrpano);
                            setRightFloorPlanContainerSizeOnLoad(newKrpano);
                            
                            // Reattach event handlers
                            newKrpano.set('layer[qr_svg].onclick', `js(handleQRCodeRightViewer(${staticTourHtmlUrl}));`);
                            newKrpano.set('layer[share_svg].onclick', `js(handleShareButtonRightView(${staticTourHtmlUrl}));`);
                            newKrpano.set('layer[datetime_display].onclick', 'js(toggleCalendarRight());');
                            newKrpano.set('layer[prev_svg].onclick', 'js(handlePrevDateTimeRight());');
                            newKrpano.set('layer[next_svg].onclick', 'js(handleNextDateTimeRight());');
                            newKrpano.set('layer[prev_month_svg].onclick', 'js(handlePrevMonthRight());');
                            newKrpano.set('layer[next_month_svg].onclick', 'js(handleNextMonthRight());');
                            newKrpano.set('layer[expand_btn].onclick', 'js(expandFloorplanRight());');
                            newKrpano.set('layer[collapse_btn].onclick', 'js(collapseFloorplanRight());');
                            newKrpano.set('layer[map].ondown', 'js(handelDragFloorplanImageRight());');
                            newKrpano.set('layer[close_split_button].onclick', `js(callCloseSplitView(right_url));`);
                            newKrpano.set('layer[dropdown_button].onclick', `js(toggleRightDropdown());`);
                            newKrpano.set('layer[time_bar].onclick', `js(rightTimeDropdown());`);
                            console.log("Components initialized and event handlers attached");
                        } catch (e) {
                            console.error("Error initializing components:", e);
                        }
                    }
                }, 100);
            }
        });
    }
}

window.handleDateClickLeft = function(day) {
    const krpano = window.krpanoWrapper.krpano1;
    if (!krpano) return;
    
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    clickedDate.setHours(0, 0, 0, 0);
    
    // Find the matching tour data
    const matchingTour = window.tourDataLeft?.dates.find(tour =>
        isSameDate(tour.dateObj, clickedDate)
    );
    
    if (matchingTour) {
        selectedDateLeft = clickedDate;
        console.log('Selected tour:', matchingTour);
        
        const captureTimeUTC = new Date(matchingTour.capture_time);
        const formattedDateTime = formatDate(captureTimeUTC);
        
        // Use static URL for testing
        const staticTourHtmlUrl = matchingTour.full_url;
        // const staticTourHtmlUrl = "http://127.0.0.1:5500/vtour_2/tour.html";
        const tourXmlUrl = extractXmlPathFromUrl(staticTourHtmlUrl);
        
        // Store the selected tour URL (for later use if needed)
        window.selectedTourUrl = staticTourHtmlUrl;
        
        // Get current view parameters
        const currentHlookat = krpano.get('view.hlookat') || 0;
        const currentVlookat = krpano.get('view.vlookat') || 0;
        const currentFov = krpano.get('view.fov') || 90;
        const currentScene = krpano.get('xml.scene') || "scene1";
        
        console.log("Current view parameters:", {
            hlookat: currentHlookat,
            vlookat: currentVlookat,
            fov: currentFov,
            scene: currentScene
        });
        
        // First, remove the existing krpano instance
        removepano('pano1');
        
        console.log('Loading tour from:', tourXmlUrl);
        
        // Create a new krpano instance
        embedpano({
            xml: tourXmlUrl,
            target: "pano1",
            html5: "prefer",
            passQueryParameters: true,
            onready: function(newKrpano) {
                window.krpanoWrapper.krpano1 = newKrpano;
                newKrpano.set("name", "krpano1");
                syncScenes(newKrpano, window.krpanoWrapper.krpano2);
                // syncScenes(newKrpano, window.krpano1);
                
                console.log("New krpano instance created");
                
                // Apply view parameters
                setTimeout(() => {
                    try {
                        newKrpano.call(`loadscene(${currentScene}, null, MERGE);`);
                        newKrpano.set('view.hlookat', currentHlookat);
                        newKrpano.set('view.vlookat', currentVlookat);
                        newKrpano.set('view.fov', currentFov);
                        console.log("View parameters applied");
                    } catch (e) {
                        console.error("Error applying view parameters:", e);
                    }
                    
                    // Update UI settings
                    try {
                        newKrpano.set('layer[bottom_bar].align', 'bottomleft');
                        newKrpano.set('layer[bottom_bar].width', '60');
                        newKrpano.set('layer[bottom_bar].x', '20');
                        newKrpano.set('layer[bottom_bar].visible', true);
                        newKrpano.set('layer[split_button].visible', false);

                        newKrpano.set('layer[datetime_bar].align', 'topleft');
                        newKrpano.set('layer[datetime_bar].x', '40');
                        newKrpano.set('layer[datetime_bar].y', '50');
                        
                        newKrpano.set('layer[date_tooltip].x', '175');
                        newKrpano.set('layer[date_tooltip].y', '10');
                        newKrpano.set('layer[date_bar].height', '40');
                        newKrpano.set('layer[date_bar].width', '160');

                        newKrpano.set('layer[time_tooltip].x', '175');
                        newKrpano.set('layer[time_tooltip].y', '62');
                        newKrpano.set('layer[time_bar].height', '40');
                        newKrpano.set('layer[time_bar].width', '160'); 
                        newKrpano.set('layer[time_bar].align', 'left');
                        newKrpano.set('layer[time_bar].y', '50');
                        newKrpano.set('layer[time_bar].css', "font-family: Arial; color: #FFFFFF; font-size: 14px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center;");
                        
                        newKrpano.set('layer[bottom_bar].width', '60');
                        newKrpano.set('layer[bottom_bar].height', '225');

                        newKrpano.set('layer[qr_tooltip].x', '70');
                        newKrpano.set('layer[qr_tooltip].y', '20');
                        newKrpano.set('layer[qr_button].x', '0');
                        newKrpano.set('layer[qr_button].y', '10');
                        newKrpano.set('layer[qr_button].align', 'top');

                        newKrpano.set('layer[share_button].y', '65');
                        newKrpano.set('layer[share_button].x', '0');
                        newKrpano.set('layer[share_tooltip].x', '70');
                        newKrpano.set('layer[share_tooltip].y', '75');
                        newKrpano.set('layer[share_button].align', 'top');

                        newKrpano.set('layer[add_button].y', '120');
                        newKrpano.set('layer[add_button].x', '0');
                        newKrpano.set('layer[add_tooltip].x', '70');
                        newKrpano.set('layer[add_tooltip].y', '130');
                        newKrpano.set('layer[add_button].align', 'top');

                        newKrpano.set('layer[screenshot_button].y', '175');
                        newKrpano.set('layer[screenshot_button].x', '0');
                        newKrpano.set('layer[screenshot_tooltip].x', '70');
                        newKrpano.set('layer[screenshot_tooltip].y', '185');
                        newKrpano.set('layer[screenshot_button].align', 'top');
                        
                        
                        newKrpano.set('layer[datetime_bar].visible', true);
                        newKrpano.set('layer[calendar_popup].align', 'topleft');
                        newKrpano.set('layer[calendar_popup].x', '40');
                        newKrpano.set('layer[calendar_popup].y', '180');


                        newKrpano.set('layer[time_dropdown_list].align', 'topleft');
                        newKrpano.set('layer[time_dropdown_list].x', '0');
                        newKrpano.set('layer[time_dropdown_list].y', '102');

                        newKrpano.call(`
                            if(layer[split_screen_button], set(layer[split_screen_button].visible, false););
                            if(layer[close_split_button], set(layer[close_split_button].visible, true););
                            if(layer[chatbot_button], set(layer[chatbot_button].visible, false););
                            if(layer[trajectory_toggle_switch], set(layer[trajectory_toggle_switch].visible, false););
                        `);
                        
                        if (newKrpano.get('layer[date_bar]')) {
                            newKrpano.set('layer[date_bar].html', formattedDateTime);
                        }
                        console.log("UI settings applied");
                    } catch (e) {
                        console.error("Error updating UI settings:", e);
                    }
                }, 500);

                // left_url = "https://site-view-ai.s3.us-east-1.amazonaws.com/media/projects/QyCKfUsfHG8p/8osNUXsMCeJA/recordings/2025-04-04/55c62786-de0f-4f48-9be2-784decbb48b5/tour/vtour/tour.html"
                left_url = staticTourHtmlUrl
                
                // Reinitialize components when the threejs plugin is ready
                const initInterval = setInterval(() => {
                    const threejsPlugin = newKrpano.get('plugin[threejs]');
                    if (threejsPlugin && threejsPlugin.scene && threejsPlugin.THREE) {
                        clearInterval(initInterval);
                        console.log("ThreeJS plugin is ready");
                        
                        try {
                            initializeThreeJS(newKrpano);
                            initializeFileSaver(newKrpano);
                            initializeCalendarLeft(newKrpano);
                            fetchCaptureTimeFromDateBarLeft(newKrpano);
                            setTimeDropdownIconLeft(newKrpano);
                            updateTimeBarLeft(newKrpano);
                            fetchLeftFloors(newKrpano);
                            setLeftFloorPlanContainerSizeOnLoad(newKrpano);
                            
                            // Reattach event handlers
                            newKrpano.set('layer[qr_svg].onclick', `js(handleQRCodeLeftViewer(${staticTourHtmlUrl}));`);
                            newKrpano.set('layer[share_svg].onclick', `js(handleShareButtonLeftView(${staticTourHtmlUrl}));`);
                            newKrpano.set('layer[datetime_display].onclick', 'js(toggleCalendarLeft());');
                            newKrpano.set('layer[prev_svg].onclick', 'js(handlePrevDateTimeLeft());');
                            newKrpano.set('layer[next_svg].onclick', 'js(handleNextDateTimeLeft());');
                            newKrpano.set('layer[prev_month_svg].onclick', 'js(handlePrevMonthLeft());');
                            newKrpano.set('layer[next_month_svg].onclick', 'js(handleNextMonthLeft());');
                            newKrpano.set('layer[expand_btn].onclick', 'js(expandFloorplanLeft());');
                            newKrpano.set('layer[collapse_btn].onclick', 'js(collapseFloorplanLeft());');
                            newKrpano.set('layer[map].ondown', 'js(handelDragFloorplanImageLeft());');
                            newKrpano.set('layer[close_split_button].onclick', `js(callCloseSplitView(left_url));`);
                            newKrpano.set('layer[dropdown_button].onclick', `js(toggleLeftDropdown());`);
                            newKrpano.set('layer[time_bar].onclick', `js(leftTimeDropdown());`);
                            console.log("Components initialized and event handlers attached");
                        } catch (e) {
                            console.error("Error initializing components:", e);
                        }
                    }
                }, 100);
            }
        });
    }
}
function syncScenes(sourceKrpano, targetKrpano) {
    sourceKrpano.set("events.onnewscene", function () {
        const newScene = sourceKrpano.get("xml.scene");
        targetKrpano.call(`loadscene(${newScene}, null, MERGE);`);
    });
}

// Helper function to extract XML path from full URL
function extractXmlPathFromUrl(url) {
    // This is a simplified example - adjust according to your URL structure
    try {
        return url.replace(/\.html$/, '.xml');
    } catch (e) {
        console.error("Error parsing URL:", e);
        return null;
    }
}











window.handleShareButtonLeftView = function(QR_URL) {
    const krpano = document.getElementById("krpanoSWFObject");
    
    // Get current scene and view parameters
    const currentScene = krpano.get('scene[get(xml.scene)].name');
    const hlookat = krpano.get('view.hlookat');
    const vlookat = krpano.get('view.vlookat');
    const fov = krpano.get('view.fov');
    
    // Construct base URL with parameters
    const shareUrl = QR_URL
    
    // Remove existing dialog if present
    const existingDialog = document.getElementById('share-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }
    
    // Create and show the share dialog
    const shareDialog = document.createElement('div');
    shareDialog.id = 'share-dialog';
    // shareDialog.style.cssText = `
    //     position: fixed;
    //     top: 60%;
    //     left: 25%;
    //     transform: translate(-50%, -50%);
    //     background: white;
    //     padding: 20px;
    //     border-radius: 12px;
    //     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    //     z-index: 999999;
    //     width: 400px;
    //     max-width: 90vw;
    //     display: block;
    //     pointer-events: auto;
    // `;

    if(window.innerWidth > 640){
        shareDialog.style.cssText = `
            position: fixed;
            top: 60%;
            left: 25%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 999999;
            width: 400px;
            max-width: 90vw;
            display: block;
            pointer-events: auto;
        `;} else {
            shareDialog.style.cssText = `
            position: fixed;
            top: 60%;
            left: 25%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 999999;
            width: 40vw;
            max-width: 90vw;
            display: block;
            pointer-events: auto;
        `;
        }

    
    shareDialog.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
            <div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="background: #FFF3E0; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                        <span style="color: #FB8C00; font-size: 24px;">⚠</span>
                    </div>
                    <h3 style="margin: 0; font-size: 16px; color: #333;">Share a direct link to this location:</h3>
                </div>
                <p style="margin: 10px 0; color: #666; font-size: 14px;">
                    Note that if you share this link with others, they must have access to this Project.
                </p>
            </div>
            <button data-action="close-share-dialog" style="background: none; border: none; cursor: pointer; font-size: 20px; color: #666;">×</button>
        </div>
        <div style="display: flex; gap: 10px; align-items: center; flex-direction: column;">
            <input type="text" value="${shareUrl}" readonly style="
                flex: 1;
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 12px;
                color: #333;
                background: #f5f5f5;
            ">
            <button onclick="navigator.clipboard.writeText('${shareUrl}').then(() => {
                this.textContent = 'COPIED!';
                setTimeout(() => this.textContent = 'COPY', 2000);
            })" style="
                background: none;
                border: none;
                color: #2196F3;
                font-weight: bold;
                cursor: pointer;
                padding: 8px 12px;
                font-size: 14px;
            ">COPY</button>
        </div>
    `;
    
    document.body.appendChild(shareDialog);
    
    // Click outside or close button to close
    setTimeout(() => {
        document.addEventListener('click', function closeDialog(e) {
            const dialog = document.getElementById('share-dialog');
            const isCloseButton = e.target.closest('button[data-action*="close-share-dialog"]');
            
            if (dialog && (!dialog.contains(e.target) || isCloseButton)) {
                dialog.remove();
                document.removeEventListener('click', closeDialog);
            }
        });
    }, 100);
    
}


window.handleShareButtonRightView = function(QR_URL) {
    const krpano = document.getElementById("krpanoSWFObject");
    
    // Get current scene and view parameters
    const currentScene = krpano.get('scene[get(xml.scene)].name');
    const hlookat = krpano.get('view.hlookat');
    const vlookat = krpano.get('view.vlookat');
    const fov = krpano.get('view.fov');
    
    // Construct base URL with parameters
    const shareUrl = QR_URL
    
    // Remove existing dialog if present
    const existingDialog = document.getElementById('share-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }
    
    // Create and show the share dialog
    const shareDialog = document.createElement('div');
    shareDialog.id = 'share-dialog';
    // shareDialog.style.cssText = `
    //     position: fixed;
    //     top: 60%;
    //     left: 75%;
    //     transform: translate(-50%, -50%);
    //     background: white;
    //     padding: 20px;
    //     border-radius: 12px;
    //     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    //     z-index: 999999;
    //     width: 400px;
    //     max-width: 90vw;
    //     display: block;
    //     pointer-events: auto;
    // `;

    if(window.innerWidth > 640){
        shareDialog.style.cssText = `
            position: fixed;
            top: 60%;
            left: 75%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 999999;
            width: 400px;
            max-width: 90vw;
            display: block;
            pointer-events: auto;
        `;}  else {
            shareDialog.style.cssText = `
            position: fixed;
            top: 60%;
            right: -25%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 999999;
            width: 40vw;
            max-width: 90vw;
            display: block;
            pointer-events: auto;
        `;
        }
    
    shareDialog.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
            <div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="background: #FFF3E0; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                        <span style="color: #FB8C00; font-size: 24px;">⚠</span>
                    </div>
                    <h3 style="margin: 0; font-size: 16px; color: #333;">Share a direct link to this location:</h3>
                </div>
                <p style="margin: 10px 0; color: #666; font-size: 14px;">
                    Note that if you share this link with others, they must have access to this Project.
                </p>
            </div>
            <button data-action="close-share-dialog" style="background: none; border: none; cursor: pointer; font-size: 20px; color: #666;">×</button>
        </div>
        <div style="display: flex; gap: 10px; align-items: center; flex-direction: column;">
            <input type="text" value="${shareUrl}" readonly style="
                flex: 1;
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 12px;
                color: #333;
                background: #f5f5f5;
            ">
            <button onclick="navigator.clipboard.writeText('${shareUrl}').then(() => {
                this.textContent = 'COPIED!';
                setTimeout(() => this.textContent = 'COPY', 2000);
            })" style="
                background: none;
                border: none;
                color: #2196F3;
                font-weight: bold;
                cursor: pointer;
                padding: 8px 12px;
                font-size: 14px;
            ">COPY</button>
        </div>
    `;
    
    document.body.appendChild(shareDialog);
    
    // Click outside or close button to close
    setTimeout(() => {
        document.addEventListener('click', function closeDialog(e) {
            const dialog = document.getElementById('share-dialog');
            const isCloseButton = e.target.closest('button[data-action*="close-share-dialog"]');
            
            if (dialog && (!dialog.contains(e.target) || isCloseButton)) {
                dialog.remove();
                document.removeEventListener('click', closeDialog);
            }
        });
    }, 100);
    
}

function convertToNavigateApiDateFormat(dateString) {
    const months = {
        "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
        "May": "05", "Jun": "06", "Jul": "07", "Aug": "08",
        "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
    };

    // Split the input string (e.g., "Mar 10, 2025")
    const parts = dateString.split(" ");
    if (parts.length !== 3) return null; // Return null for invalid input

    const month = months[parts[0]]; // Convert month abbreviation to number
    const day = parts[1].replace(",", "").padStart(2, "0"); // Remove comma, pad with 0
    const year = parts[2];

    return `${year}-${month}-${day}`;
}



window.handlePrevMonth = function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendarGrid();
}

window.handleNextMonth = function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendarGrid();
}


window.fetchLeftFloors = function(krpano) {
    console.log("9999999999999999999999999999999999999999999999999999999999999999999");
    // function fetchFloors() {
    data_ids = extractIdsFromUrlLeft()
    if (!data_ids) {
        throw new Error('Could not extract project and floor IDs from URL');
    }
    const floorId = data_ids.floorId
    const apiUrl = `https://user.sitepace.ai/api/list_project_floor/${data_ids.projectId}/`;
    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        // let krpano = document.getElementById('krpanoSWFObject');

        // Clear old dropdown options
        let i = 0;
        data.data.sort((a, b) => {
            const dateA = a.last_capture_date ? new Date(a.last_capture_date) : new Date(0);
            const dateB = b.last_capture_date ? new Date(b.last_capture_date) : new Date(0);
            return dateB - dateA; // Sort in descending order (latest first)
        }).forEach((floor, index) => {

            if(floor.capture && floor.capture.trim() !== ""){
                if (floor.floor_id === floorId) {
                    // Set default floor name in the dropdown button
                    krpano.call(`set(layer[dropdown_button].html, "<span style='display: flex; justify-content: space-between; width: 100%;'> 
                        <span id='floor_name_text'>${floor.floor_name}</span> 
                        <span>▼</span> 
                    </span>")`);
                    // krpano.call(`set(layer[selected_floor].html, '${floor.floor_name}')`);
                }else{
                    let layerName = "floor_option_" + floor.floor_id;
                    let yPos = (i * 40) + 8; // Adjust vertical positioning dynamically
                    let boxHeight = (40 * (i+1)) + 16; // Adjust vertical positioning dynamically
                    i=i+1;

                    krpano.call("set(layer[dropdown_list].height, " + boxHeight + ");");

                    // Add new dropdown items dynamically inside existing dropdown
                    krpano.call("addlayer(" + layerName + ");");
                    krpano.call(`set(layer[${layerName}].keep, true);`);
                    krpano.call("set(layer[" + layerName + "].parent, dropdown_list);");
                    krpano.call("set(layer[" + layerName + "].type, text);");
                    krpano.call("set(layer[" + layerName + "].html, " + floor.floor_name + ");");
                    krpano.call("set(layer[" + layerName + "].align, topleft);");
                    krpano.call("set(layer[" + layerName + "].width, 280);");
                    krpano.call("set(layer[" + layerName + "].height, 40);");
                    krpano.call("set(layer[" + layerName + "].y, " + yPos + ");");
                    krpano.call("set(layer[" + layerName + "].x, 8);");
                    krpano.call("set(layer[" + layerName + "].css, font-family:Arial; color:black; font-size:18px; text-align:left; padding:9px 9px 9px 15px; box-shadow: 10px 0px 2px rgba(255, 255, 255, 0.7););");
                    krpano.call("set(layer[" + layerName + "].bgcolor, 0xFFFFFF);");
                    krpano.call("set(layer[" + layerName + "].bgalpha, 1);");
                    krpano.call("set(layer[" + layerName + "].bgroundedge, 36);");
                    krpano.call(`set(layer[${layerName}].onhover, set(bgcolor,0xDFFF60))`);
                    krpano.call(`set(layer[${layerName}].onout, set(bgcolor,0xFFFFFF))`);
                    krpano.call(`set(layer[${layerName}].onclick, js(leftSelectFloor('${floor.floor_name}', '${floor.capture}')))`);
                }
            }
        });
    })
    .catch(error => console.error("Error fetching floors:", error));
}
    
    
window.fetchRightFloors = function(krpano) {
    console.log("888888888888888888888888888888888888888888888888888888");
        data_ids = extractIdsFromUrlRight()
    // function fetchFloors() {
        if (!data_ids) {
            throw new Error('Could not extract project and floor IDs from URL');
        }
        const floorId = data_ids.floorId
        const apiUrl = `https://user.sitepace.ai/api/list_project_floor/${data_ids.projectId}/`;
        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            // let krpano = document.getElementById('krpanoSWFObject');
    
            // Clear old dropdown options
            let i = 0;
            data.data.sort((a, b) => {
                const dateA = a.last_capture_date ? new Date(a.last_capture_date) : new Date(0);
                const dateB = b.last_capture_date ? new Date(b.last_capture_date) : new Date(0);
                return dateB - dateA; // Sort in descending order (latest first)
            }).forEach((floor, index) => {
    
                if(floor.capture && floor.capture.trim() !== ""){
                    if (floor.floor_id === floorId) {
                        // Set default floor name in the dropdown button
                        krpano.call(`set(layer[dropdown_button].html, "<span style='display: flex; justify-content: space-between; width: 100%;'> 
                            <span id='floor_name_text'>${floor.floor_name}</span> 
                            <span>▼</span> 
                        </span>")`);
                        // krpano.call(`set(layer[selected_floor].html, '${floor.floor_name}')`);
                    }else{
                        let layerName = "floor_option_" + floor.floor_id;
                        let yPos = (i * 40) + 8; // Adjust vertical positioning dynamically
                        let boxHeight = (40 * (i+1)) + 16; // Adjust vertical positioning dynamically
                        i=i+1;
    
                        krpano.call("set(layer[dropdown_list].height, " + boxHeight + ");");
    
                        // Add new dropdown items dynamically inside existing dropdown
                        krpano.call("addlayer(" + layerName + ");");
                        krpano.call(`set(layer[${layerName}].keep, true);`);
                        krpano.call("set(layer[" + layerName + "].parent, dropdown_list);");
                        krpano.call("set(layer[" + layerName + "].type, text);");
                        krpano.call("set(layer[" + layerName + "].html, " + floor.floor_name + ");");
                        krpano.call("set(layer[" + layerName + "].align, topleft);");
                        krpano.call("set(layer[" + layerName + "].width, 280);");
                        krpano.call("set(layer[" + layerName + "].height, 40);");
                        krpano.call("set(layer[" + layerName + "].y, " + yPos + ");");
                        krpano.call("set(layer[" + layerName + "].x, 8);");
                        krpano.call("set(layer[" + layerName + "].css, font-family:Arial; color:black; font-size:18px; text-align:left; padding:9px 9px 9px 15px; box-shadow: 10px 0px 2px rgba(255, 255, 255, 0.7););");
                        krpano.call("set(layer[" + layerName + "].bgcolor, 0xFFFFFF);");
                        krpano.call("set(layer[" + layerName + "].bgalpha, 1);");
                        krpano.call("set(layer[" + layerName + "].bgroundedge, 36);");
                        krpano.call(`set(layer[${layerName}].onhover, set(bgcolor,0xDFFF60))`);
                        krpano.call(`set(layer[${layerName}].onout, set(bgcolor,0xFFFFFF))`);
                        krpano.call(`set(layer[${layerName}].onclick, js(rightSelectFloor('${floor.floor_name}', '${floor.capture}')))`);
                    }
                }
            });
        })
        .catch(error => console.error("Error fetching floors:", error));
}


window.rightSelectFloor = async function(floor_name,floor_capture){
    // Use static URL for testing
    krpano = window.krpanoWrapper.krpano2
    // krpano = window.krpano1
    const staticTourHtmlUrl = floor_capture;
    // const staticTourHtmlUrl = "http://127.0.0.1:5500/vtour_2/tour.html";
    const tourXmlUrl = extractXmlPathFromUrl(staticTourHtmlUrl);
    
    // Store the selected tour URL (for later use if needed)
    window.selectedTourUrl = staticTourHtmlUrl;
    
    // Get current view parameters
    const currentHlookat = krpano.get('view.hlookat') || 0;
    const currentVlookat = krpano.get('view.vlookat') || 0;
    const currentFov = krpano.get('view.fov') || 90;
    const currentScene = krpano.get('xml.scene') || "scene1";
    
    console.log("Current view parameters:", {
        hlookat: currentHlookat,
        vlookat: currentVlookat,
        fov: currentFov,
        scene: currentScene
    });
    
    // First, remove the existing krpano instance
    removepano('pano2');
    
    console.log('Loading tour from:', staticTourHtmlUrl);
    
    // Create a new krpano instance
    embedpano({
        xml: tourXmlUrl,
        target: "pano2",
        html5: "prefer",
        passQueryParameters: true,
        onready: function(newKrpano) {
            window.krpanoWrapper.krpano2 = newKrpano;
            // window.krpano1 = newKrpano;
            newKrpano.set("name", "krpano2");
            syncScenes(newKrpano, window.krpanoWrapper.krpano1);
            
            console.log("New krpano instance created");
            
            // Apply view parameters
            setTimeout(() => {
                try {
                    newKrpano.call(`loadscene(${currentScene}, null, MERGE);`);
                    newKrpano.set('view.hlookat', currentHlookat);
                    newKrpano.set('view.vlookat', currentVlookat);
                    newKrpano.set('view.fov', currentFov);
                    console.log("View parameters applied");
                } catch (e) {
                    console.error("Error applying view parameters:", e);
                }
                
                // Update UI settings
                try {
                    // newKrpano.set('layer[bottom_bar].align', 'bottomleft');
                    // newKrpano.set('layer[bottom_bar].width', '60');
                    // newKrpano.set('layer[bottom_bar].x', '20');
                    // newKrpano.set('layer[bottom_bar].visible', true);
                    newKrpano.set('layer[split_button].visible', false);

                    newKrpano.set('layer[datetime_bar].align', 'topleft');
                    newKrpano.set('layer[datetime_bar].x', '40');
                    newKrpano.set('layer[datetime_bar].y', '50');
                    
                    newKrpano.set('layer[date_tooltip].x', '175');
                    newKrpano.set('layer[date_tooltip].y', '10');
                    newKrpano.set('layer[date_bar].height', '40');
                    newKrpano.set('layer[date_bar].width', '160');

                    newKrpano.set('layer[time_tooltip].x', '175');
                    newKrpano.set('layer[time_tooltip].y', '62');
                    newKrpano.set('layer[time_bar].height', '40');
                    newKrpano.set('layer[time_bar].width', '160'); 
                    newKrpano.set('layer[time_bar].align', 'left');
                    newKrpano.set('layer[time_bar].y', '50');
                    newKrpano.set('layer[time_bar].css', "font-family: Arial; color: #FFFFFF; font-size: 14px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center;");
                    
                    newKrpano.set('layer[bottom_bar].width', '60');
                    newKrpano.set('layer[bottom_bar].height', '225');

                    newKrpano.set('layer[qr_tooltip].x', '70');
                    newKrpano.set('layer[qr_tooltip].y', '20');
                    newKrpano.set('layer[qr_button].x', '0');
                    newKrpano.set('layer[qr_button].y', '10');
                    newKrpano.set('layer[qr_button].align', 'top');

                    newKrpano.set('layer[share_button].y', '65');
                    newKrpano.set('layer[share_button].x', '0');
                    newKrpano.set('layer[share_tooltip].x', '70');
                    newKrpano.set('layer[share_tooltip].y', '75');
                    newKrpano.set('layer[share_button].align', 'top');

                    newKrpano.set('layer[add_button].y', '120');
                    newKrpano.set('layer[add_button].x', '0');
                    newKrpano.set('layer[add_tooltip].x', '70');
                    newKrpano.set('layer[add_tooltip].y', '130');
                    newKrpano.set('layer[add_button].align', 'top');

                    newKrpano.set('layer[screenshot_button].y', '175');
                    newKrpano.set('layer[screenshot_button].x', '0');
                    newKrpano.set('layer[screenshot_tooltip].x', '70');
                    newKrpano.set('layer[screenshot_tooltip].y', '185');
                    newKrpano.set('layer[screenshot_button].align', 'top');
                    
                    
                    newKrpano.set('layer[datetime_bar].visible', true);
                    newKrpano.set('layer[calendar_popup].align', 'topleft');
                    newKrpano.set('layer[calendar_popup].x', '40');
                    newKrpano.set('layer[calendar_popup].y', '180');


                    newKrpano.set('layer[time_dropdown_list].align', 'topleft');
                    newKrpano.set('layer[time_dropdown_list].x', '0');
                    newKrpano.set('layer[time_dropdown_list].y', '102');

                    newKrpano.call(`
                        if(layer[split_screen_button], set(layer[split_screen_button].visible, false););
                        if(layer[close_split_button], set(layer[close_split_button].visible, true););
                        if(layer[chatbot_button], set(layer[chatbot_button].visible, false););
                        if(layer[trajectory_toggle_switch], set(layer[trajectory_toggle_switch].visible, false););
                    `);

                    newKrpano.set("layer[selected_floor].html", floor_name);
                    console.log("UI settings applied");
                } catch (e) {
                    console.error("Error updating UI settings:", e);
                }
            }, 500);

            // right_url = "https://site-view-ai.s3.us-east-1.amazonaws.com/media/projects/QyCKfUsfHG8p/8osNUXsMCeJA/recordings/2025-04-04/55c62786-de0f-4f48-9be2-784decbb48b5/tour/vtour/tour.html"
            right_url = staticTourHtmlUrl
            
            // Reinitialize components when the threejs plugin is ready
            const initInterval = setInterval(() => {
                const threejsPlugin = newKrpano.get('plugin[threejs]');
                if (threejsPlugin && threejsPlugin.scene && threejsPlugin.THREE) {
                    clearInterval(initInterval);
                    console.log("ThreeJS plugin is ready");
                    
                    try {
                        initializeThreeJS(newKrpano);
                        initializeFileSaver(newKrpano);
                        initializeCalendarRight(newKrpano);
                        fetchCaptureTimeFromDateBarRight(newKrpano);
                        setTimeDropdownIconRight(newKrpano);
                        updateTimeBarRight(newKrpano);
                        fetchRightFloors(newKrpano);
                        setRightFloorPlanContainerSizeOnLoad(newKrpano);
                        
                        // Reattach event handlers
                        newKrpano.set('layer[qr_svg].onclick', `js(handleQRCodeRightViewer(${staticTourHtmlUrl}));`);
                        newKrpano.set('layer[share_svg].onclick', `js(handleShareButtonRightView(${staticTourHtmlUrl}));`);
                        newKrpano.set('layer[datetime_display].onclick', 'js(toggleCalendarRight());');
                        newKrpano.set('layer[prev_svg].onclick', 'js(handlePrevDateTimeRight());');
                        newKrpano.set('layer[next_svg].onclick', 'js(handleNextDateTimeRight());');
                        newKrpano.set('layer[prev_month_svg].onclick', 'js(handlePrevMonthRight());');
                        newKrpano.set('layer[next_month_svg].onclick', 'js(handleNextMonthRight());');
                        newKrpano.set('layer[expand_btn].onclick', 'js(expandFloorplanRight());');
                        newKrpano.set('layer[collapse_btn].onclick', 'js(collapseFloorplanRight());');
                        newKrpano.set('layer[map].ondown', 'js(handelDragFloorplanImageRight());');
                        newKrpano.set('layer[close_split_button].onclick', `js(callCloseSplitView(right_url));`);
                        newKrpano.set('layer[dropdown_button].onclick', `js(toggleRightDropdown());`);
                        newKrpano.set('layer[time_bar].onclick', `js(rightTimeDropdown());`);
                        console.log("Components initialized and event handlers attached");
                    } catch (e) {
                        console.error("Error initializing components:", e);
                    }
                }
            }, 100);
        }
    });
}


window.leftSelectFloor = async function(floor_name,floor_capture){
    // Use static URL for testing
    // const staticTourHtmlUrl = floor_capture;
    krpano = window.krpanoWrapper.krpano1
    const staticTourHtmlUrl = floor_capture
    // const staticTourHtmlUrl = "http://127.0.0.1:5500/vtour_2/tour.html";
    const tourXmlUrl = extractXmlPathFromUrl(staticTourHtmlUrl);
    
    // Store the selected tour URL (for later use if needed)
    window.selectedTourUrl = staticTourHtmlUrl;
    
    // Get current view parameters
    const currentHlookat = krpano.get('view.hlookat') || 0;
    const currentVlookat = krpano.get('view.vlookat') || 0;
    const currentFov = krpano.get('view.fov') || 90;
    const currentScene = krpano.get('xml.scene') || "scene1";
    
    console.log("Current view parameters:", {
        hlookat: currentHlookat,
        vlookat: currentVlookat,
        fov: currentFov,
        scene: currentScene
    });
    
    // First, remove the existing krpano instance
    removepano('pano1');
    
    console.log('Loading tour from:', tourXmlUrl);
    
    // Create a new krpano instance
    embedpano({
        xml: tourXmlUrl,
        target: "pano1",
        html5: "prefer",
        passQueryParameters: true,
        onready: function(newKrpano) {
            window.krpanoWrapper.krpano1 = newKrpano;
            newKrpano.set("name", "krpano1");
            syncScenes(newKrpano, window.krpanoWrapper.krpano2);
            // syncScenes(newKrpano, window.krpano1);
            
            console.log("New krpano instance created");
            
            // Apply view parameters
            setTimeout(() => {
                try {
                    newKrpano.call(`loadscene(${currentScene}, null, MERGE);`);
                    newKrpano.set('view.hlookat', currentHlookat);
                    newKrpano.set('view.vlookat', currentVlookat);
                    newKrpano.set('view.fov', currentFov);
                    console.log("View parameters applied");
                } catch (e) {
                    console.error("Error applying view parameters:", e);
                }
                
                // Update UI settings
                try {
                    newKrpano.set('layer[bottom_bar].align', 'bottomleft');
                    newKrpano.set('layer[bottom_bar].width', '60');
                    newKrpano.set('layer[bottom_bar].x', '20');
                    newKrpano.set('layer[bottom_bar].visible', true);
                    newKrpano.set('layer[split_button].visible', false);

                    newKrpano.set('layer[datetime_bar].align', 'topleft');
                    newKrpano.set('layer[datetime_bar].x', '40');
                    newKrpano.set('layer[datetime_bar].y', '50');
                    
                    newKrpano.set('layer[date_tooltip].x', '175');
                    newKrpano.set('layer[date_tooltip].y', '10');
                    newKrpano.set('layer[date_bar].height', '40');
                    newKrpano.set('layer[date_bar].width', '160');

                    newKrpano.set('layer[time_tooltip].x', '175');
                    newKrpano.set('layer[time_tooltip].y', '62');
                    newKrpano.set('layer[time_bar].height', '40');
                    newKrpano.set('layer[time_bar].width', '160'); 
                    newKrpano.set('layer[time_bar].align', 'left');
                    newKrpano.set('layer[time_bar].y', '50');
                    newKrpano.set('layer[time_bar].css', "font-family: Arial; color: #FFFFFF; font-size: 14px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center;");
                    
                    newKrpano.set('layer[bottom_bar].width', '60');
                    newKrpano.set('layer[bottom_bar].height', '225');

                    newKrpano.set('layer[qr_tooltip].x', '70');
                    newKrpano.set('layer[qr_tooltip].y', '20');
                    newKrpano.set('layer[qr_button].x', '0');
                    newKrpano.set('layer[qr_button].y', '10');
                    newKrpano.set('layer[qr_button].align', 'top');

                    newKrpano.set('layer[share_button].y', '65');
                    newKrpano.set('layer[share_button].x', '0');
                    newKrpano.set('layer[share_tooltip].x', '70');
                    newKrpano.set('layer[share_tooltip].y', '75');
                    newKrpano.set('layer[share_button].align', 'top');

                    newKrpano.set('layer[add_button].y', '120');
                    newKrpano.set('layer[add_button].x', '0');
                    newKrpano.set('layer[add_tooltip].x', '70');
                    newKrpano.set('layer[add_tooltip].y', '130');
                    newKrpano.set('layer[add_button].align', 'top');

                    newKrpano.set('layer[screenshot_button].y', '175');
                    newKrpano.set('layer[screenshot_button].x', '0');
                    newKrpano.set('layer[screenshot_tooltip].x', '70');
                    newKrpano.set('layer[screenshot_tooltip].y', '185');
                    newKrpano.set('layer[screenshot_button].align', 'top');
                    
                    
                    newKrpano.set('layer[datetime_bar].visible', true);
                    newKrpano.set('layer[calendar_popup].align', 'topleft');
                    newKrpano.set('layer[calendar_popup].x', '40');
                    newKrpano.set('layer[calendar_popup].y', '180');


                    newKrpano.set('layer[time_dropdown_list].align', 'topleft');
                    newKrpano.set('layer[time_dropdown_list].x', '0');
                    newKrpano.set('layer[time_dropdown_list].y', '102');

                    newKrpano.call(`
                        if(layer[split_screen_button], set(layer[split_screen_button].visible, false););
                        if(layer[close_split_button], set(layer[close_split_button].visible, true););
                        if(layer[chatbot_button], set(layer[chatbot_button].visible, false););
                        if(layer[trajectory_toggle_switch], set(layer[trajectory_toggle_switch].visible, false););
                    `);

                    newKrpano.set("layer[selected_floor].html", floor_name);
                    console.log("UI settings applied");
                } catch (e) {
                    console.error("Error updating UI settings:", e);
                }
            }, 500);

            // left_url = "https://site-view-ai.s3.us-east-1.amazonaws.com/media/projects/QyCKfUsfHG8p/8osNUXsMCeJA/recordings/2025-04-04/55c62786-de0f-4f48-9be2-784decbb48b5/tour/vtour/tour.html"
            left_url = staticTourHtmlUrl
            
            // Reinitialize components when the threejs plugin is ready
            const initInterval = setInterval(() => {
                const threejsPlugin = newKrpano.get('plugin[threejs]');
                if (threejsPlugin && threejsPlugin.scene && threejsPlugin.THREE) {
                    clearInterval(initInterval);
                    console.log("ThreeJS plugin is ready");
                    
                    try {
                        initializeThreeJS(newKrpano);
                        initializeFileSaver(newKrpano);
                        initializeCalendarLeft(newKrpano);
                        fetchCaptureTimeFromDateBarLeft(newKrpano);
                        setTimeDropdownIconLeft(newKrpano);
                        updateTimeBarLeft(newKrpano);
                        fetchLeftFloors(newKrpano);
                        setLeftFloorPlanContainerSizeOnLoad(newKrpano);
                        
                        // Reattach event handlers
                        newKrpano.set('layer[qr_svg].onclick', `js(handleQRCodeLeftViewer(${staticTourHtmlUrl}));`);
                        newKrpano.set('layer[share_svg].onclick', `js(handleShareButtonLeftView(${staticTourHtmlUrl}));`);
                        newKrpano.set('layer[datetime_display].onclick', 'js(toggleCalendarLeft());');
                        newKrpano.set('layer[prev_svg].onclick', 'js(handlePrevDateTimeLeft());');
                        newKrpano.set('layer[next_svg].onclick', 'js(handleNextDateTimeLeft());');
                        newKrpano.set('layer[prev_month_svg].onclick', 'js(handlePrevMonthLeft());');
                        newKrpano.set('layer[next_month_svg].onclick', 'js(handleNextMonthLeft());');
                        newKrpano.set('layer[expand_btn].onclick', 'js(expandFloorplanLeft());');
                        newKrpano.set('layer[collapse_btn].onclick', 'js(collapseFloorplanLeft());');
                        newKrpano.set('layer[map].ondown', 'js(handelDragFloorplanImageLeft());');
                        newKrpano.set('layer[close_split_button].onclick', `js(callCloseSplitView(left_url));`);
                        newKrpano.set('layer[dropdown_button].onclick', `js(toggleLeftDropdown());`);
                        newKrpano.set('layer[time_bar].onclick', `js(leftTimeDropdown());`);
                        console.log("Components initialized and event handlers attached");
                    } catch (e) {
                        console.error("Error initializing components:", e);
                    }
                }
            }, 100);
        }
    });
}



window.fetchCaptureTimeFromDateBarLeft = async function(krpano) {
    // let krpano = document.getElementById('krpanoSWFObject');
    data_ids = extractIdsFromUrlLeft()
    const capture_response = await fetch(`https://user.sitepace.ai/api/get_capture_created_time/${data_ids.projectId}/${data_ids.jobId}`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    const capture_data = await capture_response.json();

    // Convert selectedDate to required API format (YYYY-MM-DD)
    let formattedDate = convertToApiDateFormat(capture_data.created_time);

    if (!formattedDate) {
        console.error("Invalid date format!");
        return;
    }

    // API URL with the formatted date
    const response = await fetch(`https://user.sitepace.ai/api/retrieve_capture_time/${data_ids.projectId}/${data_ids.floorId}/${formattedDate}/`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch available dates');
    }

    try {
        const data = await response.json();
        console.log("API Response:", data);


        if (data.success && data.data.length > 0) {
            // Remove existing dropdown items if needed
            krpano.call("remove_layer(time_dropdown_list);");
            krpano.call("addlayer(time_dropdown_list);");
            krpano.call("set(layer[time_dropdown_list].keep, true);");

            let i = 0;
            data.data.forEach((item) => {
                // Convert UTC time to local timezone
                let captureDate = new Date(item.created_at);
                let localTime = captureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

                let layerName = "time_option_left" + i;
                let yPos = (i * 40) + 8; // Adjust vertical positioning dynamically
                let boxHeight = (40 * (i+1)) + 16; // Adjust vertical positioning dynamically
                krpano.call("set(layer[time_dropdown_list].height, " + boxHeight + ");");

                // Add new dropdown items dynamically inside existing dropdown
                krpano.call("addlayer(" + layerName + ");");
                krpano.call(`set(layer[${layerName}].keep, true);`);
                krpano.call("set(layer[" + layerName + "].parent, time_dropdown_list);");
                krpano.call("set(layer[" + layerName + "].type, text);");
                krpano.call(`set(layer[${layerName}].html, "${localTime}");`);
                krpano.call("set(layer[" + layerName + "].align, topleft);");
                krpano.call("set(layer[" + layerName + "].width, 140);");
                krpano.call("set(layer[" + layerName + "].height, 40);");
                krpano.call("set(layer[" + layerName + "].y, " + yPos + ");");
                krpano.call("set(layer[" + layerName + "].x, 8);");
                krpano.call("set(layer[" + layerName + "].css, font-family:Arial; color:#FFFFFF; font-size:18px; text-align:left; padding:9px 9px 9px 15px; color:black;");
                krpano.call("set(layer[" + layerName + "].bgcolor, 0xFFFFFF);");
                krpano.call("set(layer[" + layerName + "].bgalpha, 1);");
                krpano.call("set(layer[" + layerName + "].bgroundedge, 36);");
                krpano.call(`set(layer[${layerName}].onhover, set(bgcolor,0xDFFF60))`);
                krpano.call(`set(layer[${layerName}].onout, set(bgcolor,0xFFFFFF))`);

                // Onclick event to load the selected capture
                krpano.call(`set(layer[${layerName}].onclick, js(leftLoadCapture('${item.capture}')))`);

                i++;
            });
        }
    } catch (error) {
        console.error("Error fetching capture times:", error);
    }
}

window.fetchCaptureTimeFromDateBarRight = async function(krpano) {
    // let krpano = document.getElementById('krpanoSWFObject');
    data_ids = extractIdsFromUrlRight()
    const capture_response = await fetch(`https://user.sitepace.ai/api/get_capture_created_time/${data_ids.projectId}/${data_ids.jobId}`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    const capture_data = await capture_response.json();

    // Convert selectedDate to required API format (YYYY-MM-DD)
    let formattedDate = convertToApiDateFormat(capture_data.created_time);

    if (!formattedDate) {
        console.error("Invalid date format!");
        return;
    }

    // API URL with the formatted date
    const response = await fetch(`https://user.sitepace.ai/api/retrieve_capture_time/${data_ids.projectId}/${data_ids.floorId}/${formattedDate}/`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch available dates');
    }

    try {
        const data = await response.json();
        console.log("API Response:", data);


        if (data.success && data.data.length > 0) {
            // Remove existing dropdown items if needed
            krpano.call("remove_layer(time_dropdown_list);");
            krpano.call("addlayer(time_dropdown_list);");
            krpano.call("set(layer[time_dropdown_list].keep, true);");

            let i = 0;
            data.data.forEach((item) => {
                // Convert UTC time to local timezone
                let captureDate = new Date(item.created_at);
                let localTime = captureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

                let layerName = "time_option_right" + i;
                let yPos = (i * 40) + 8; // Adjust vertical positioning dynamically
                let boxHeight = (40 * (i+1)) + 16; // Adjust vertical positioning dynamically
                krpano.call("set(layer[time_dropdown_list].height, " + boxHeight + ");");

                // Add new dropdown items dynamically inside existing dropdown
                krpano.call("addlayer(" + layerName + ");");
                krpano.call(`set(layer[${layerName}].keep, true);`);
                krpano.call("set(layer[" + layerName + "].parent, time_dropdown_list);");
                krpano.call("set(layer[" + layerName + "].type, text);");
                krpano.call(`set(layer[${layerName}].html, "${localTime}");`);
                krpano.call("set(layer[" + layerName + "].align, topleft);");
                krpano.call("set(layer[" + layerName + "].width, 140);");
                krpano.call("set(layer[" + layerName + "].height, 40);");
                krpano.call("set(layer[" + layerName + "].y, " + yPos + ");");
                krpano.call("set(layer[" + layerName + "].x, 8);");
                krpano.call("set(layer[" + layerName + "].css, font-family:Arial; color:#FFFFFF; font-size:18px; text-align:left; padding:9px 9px 9px 15px; color:black;");
                krpano.call("set(layer[" + layerName + "].bgcolor, 0xFFFFFF);");
                krpano.call("set(layer[" + layerName + "].bgalpha, 1);");
                krpano.call("set(layer[" + layerName + "].bgroundedge, 36);");
                krpano.call(`set(layer[${layerName}].onhover, set(bgcolor,0xDFFF60))`);
                krpano.call(`set(layer[${layerName}].onout, set(bgcolor,0xFFFFFF))`);

                // Onclick event to load the selected capture
                krpano.call(`set(layer[${layerName}].onclick, js(rightLoadCapture('${item.capture}')))`);

                i++;
            });
        }

    } catch (error) {
        console.error("Error fetching capture times:", error);
    }
}


window.rightLoadCapture = async function(floor_capture){
    // Use static URL for testing
    krpano = window.krpanoWrapper.krpano2
    // krpano = window.krpano1
    const staticTourHtmlUrl = floor_capture;
    // const staticTourHtmlUrl = "http://127.0.0.1:5500/vtour_2/tour.html";
    const tourXmlUrl = extractXmlPathFromUrl(staticTourHtmlUrl);
    
    // Store the selected tour URL (for later use if needed)
    window.selectedTourUrl = staticTourHtmlUrl;
    
    // Get current view parameters
    const currentHlookat = krpano.get('view.hlookat') || 0;
    const currentVlookat = krpano.get('view.vlookat') || 0;
    const currentFov = krpano.get('view.fov') || 90;
    const currentScene = krpano.get('xml.scene') || "scene1";
    
    console.log("Current view parameters:", {
        hlookat: currentHlookat,
        vlookat: currentVlookat,
        fov: currentFov,
        scene: currentScene
    });
    
    // First, remove the existing krpano instance
    removepano('pano2');
    
    console.log('Loading tour from:', staticTourHtmlUrl);
    
    // Create a new krpano instance
    embedpano({
        xml: tourXmlUrl,
        target: "pano2",
        html5: "prefer",
        passQueryParameters: true,
        onready: function(newKrpano) {
            window.krpanoWrapper.krpano2 = newKrpano;
            // window.krpano1 = newKrpano;
            newKrpano.set("name", "krpano2");
            syncScenes(newKrpano, window.krpanoWrapper.krpano1);
            
            console.log("New krpano instance created");
            
            // Apply view parameters
            setTimeout(() => {
                try {
                    newKrpano.call(`loadscene(${currentScene}, null, MERGE);`);
                    newKrpano.set('view.hlookat', currentHlookat);
                    newKrpano.set('view.vlookat', currentVlookat);
                    newKrpano.set('view.fov', currentFov);
                    console.log("View parameters applied");
                } catch (e) {
                    console.error("Error applying view parameters:", e);
                }
                
                // Update UI settings
                try {
                    // newKrpano.set('layer[bottom_bar].align', 'bottomleft');
                    // newKrpano.set('layer[bottom_bar].width', '60');
                    // newKrpano.set('layer[bottom_bar].x', '20');
                    // newKrpano.set('layer[bottom_bar].visible', true);
                    newKrpano.set('layer[split_button].visible', false);

                    newKrpano.set('layer[datetime_bar].align', 'topleft');
                    newKrpano.set('layer[datetime_bar].x', '40');
                    newKrpano.set('layer[datetime_bar].y', '50');
                    
                    newKrpano.set('layer[date_tooltip].x', '175');
                    newKrpano.set('layer[date_tooltip].y', '10');
                    newKrpano.set('layer[date_bar].height', '40');
                    newKrpano.set('layer[date_bar].width', '160');

                    newKrpano.set('layer[time_tooltip].x', '175');
                    newKrpano.set('layer[time_tooltip].y', '62');
                    newKrpano.set('layer[time_bar].height', '40');
                    newKrpano.set('layer[time_bar].width', '160'); 
                    newKrpano.set('layer[time_bar].align', 'left');
                    newKrpano.set('layer[time_bar].y', '50');
                    newKrpano.set('layer[time_bar].css', "font-family: Arial; color: #FFFFFF; font-size: 14px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center;");
                    
                    newKrpano.set('layer[bottom_bar].width', '60');
                    newKrpano.set('layer[bottom_bar].height', '225');

                    newKrpano.set('layer[qr_tooltip].x', '70');
                    newKrpano.set('layer[qr_tooltip].y', '20');
                    newKrpano.set('layer[qr_button].x', '0');
                    newKrpano.set('layer[qr_button].y', '10');
                    newKrpano.set('layer[qr_button].align', 'top');

                    newKrpano.set('layer[share_button].y', '65');
                    newKrpano.set('layer[share_button].x', '0');
                    newKrpano.set('layer[share_tooltip].x', '70');
                    newKrpano.set('layer[share_tooltip].y', '75');
                    newKrpano.set('layer[share_button].align', 'top');

                    newKrpano.set('layer[add_button].y', '120');
                    newKrpano.set('layer[add_button].x', '0');
                    newKrpano.set('layer[add_tooltip].x', '70');
                    newKrpano.set('layer[add_tooltip].y', '130');
                    newKrpano.set('layer[add_button].align', 'top');

                    newKrpano.set('layer[screenshot_button].y', '175');
                    newKrpano.set('layer[screenshot_button].x', '0');
                    newKrpano.set('layer[screenshot_tooltip].x', '70');
                    newKrpano.set('layer[screenshot_tooltip].y', '185');
                    newKrpano.set('layer[screenshot_button].align', 'top');
                    
                    
                    newKrpano.set('layer[datetime_bar].visible', true);
                    newKrpano.set('layer[calendar_popup].align', 'topleft');
                    newKrpano.set('layer[calendar_popup].x', '40');
                    newKrpano.set('layer[calendar_popup].y', '180');


                    newKrpano.set('layer[time_dropdown_list].align', 'topleft');
                    newKrpano.set('layer[time_dropdown_list].x', '0');
                    newKrpano.set('layer[time_dropdown_list].y', '102');
                    
                    newKrpano.call(`
                        if(layer[split_screen_button], set(layer[split_screen_button].visible, false););
                        if(layer[close_split_button], set(layer[close_split_button].visible, true););
                        if(layer[chatbot_button], set(layer[chatbot_button].visible, false););
                        if(layer[trajectory_toggle_switch], set(layer[trajectory_toggle_switch].visible, false););
                    `);
                    console.log("UI settings applied");
                } catch (e) {
                    console.error("Error updating UI settings:", e);
                }
            }, 500);

            // right_url = "https://site-view-ai.s3.us-east-1.amazonaws.com/media/projects/QyCKfUsfHG8p/8osNUXsMCeJA/recordings/2025-04-04/55c62786-de0f-4f48-9be2-784decbb48b5/tour/vtour/tour.html"
            right_url = staticTourHtmlUrl
            
            // Reinitialize components when the threejs plugin is ready
            const initInterval = setInterval(() => {
                const threejsPlugin = newKrpano.get('plugin[threejs]');
                if (threejsPlugin && threejsPlugin.scene && threejsPlugin.THREE) {
                    clearInterval(initInterval);
                    console.log("ThreeJS plugin is ready");
                    
                    try {
                        initializeThreeJS(newKrpano);
                        initializeFileSaver(newKrpano);
                        initializeCalendarRight(newKrpano);
                        fetchCaptureTimeFromDateBarRight(newKrpano);
                        setTimeDropdownIconRight(newKrpano);
                        updateTimeBarRight(newKrpano);
                        fetchRightFloors(newKrpano);
                        setRightFloorPlanContainerSizeOnLoad(newKrpano);
                        
                        // Reattach event handlers
                        newKrpano.set('layer[qr_svg].onclick', `js(handleQRCodeRightViewer(${staticTourHtmlUrl}));`);
                        newKrpano.set('layer[share_svg].onclick', `js(handleShareButtonRightView(${staticTourHtmlUrl}));`);
                        newKrpano.set('layer[datetime_display].onclick', 'js(toggleCalendarRight());');
                        newKrpano.set('layer[prev_svg].onclick', 'js(handlePrevDateTimeRight());');
                        newKrpano.set('layer[next_svg].onclick', 'js(handleNextDateTimeRight());');
                        newKrpano.set('layer[prev_month_svg].onclick', 'js(handlePrevMonthRight());');
                        newKrpano.set('layer[next_month_svg].onclick', 'js(handleNextMonthRight());');
                        newKrpano.set('layer[expand_btn].onclick', 'js(expandFloorplanRight());');
                        newKrpano.set('layer[collapse_btn].onclick', 'js(collapseFloorplanRight());');
                        newKrpano.set('layer[map].ondown', 'js(handelDragFloorplanImageRight());');
                        newKrpano.set('layer[close_split_button].onclick', `js(callCloseSplitView(right_url));`);
                        newKrpano.set('layer[dropdown_button].onclick', `js(toggleRightDropdown());`);
                        newKrpano.set('layer[time_bar].onclick', `js(rightTimeDropdown());`);
                        console.log("Components initialized and event handlers attached");
                    } catch (e) {
                        console.error("Error initializing components:", e);
                    }
                }
            }, 100);
        }
    });
}


window.leftLoadCapture = async function(floor_capture){
    // Use static URL for testing
    krpano = window.krpanoWrapper.krpano1
    const staticTourHtmlUrl = floor_capture
    // const staticTourHtmlUrl = "http://127.0.0.1:5500/vtour_2/tour.html";
    const tourXmlUrl = extractXmlPathFromUrl(staticTourHtmlUrl);
    
    // Store the selected tour URL (for later use if needed)
    window.selectedTourUrl = staticTourHtmlUrl;
    
    // Get current view parameters
    const currentHlookat = krpano.get('view.hlookat') || 0;
    const currentVlookat = krpano.get('view.vlookat') || 0;
    const currentFov = krpano.get('view.fov') || 90;
    const currentScene = krpano.get('xml.scene') || "scene1";
    
    console.log("Current view parameters:", {
        hlookat: currentHlookat,
        vlookat: currentVlookat,
        fov: currentFov,
        scene: currentScene
    });
    
    // First, remove the existing krpano instance
    removepano('pano1');
    
    console.log('Loading tour from:', tourXmlUrl);
    
    // Create a new krpano instance
    embedpano({
        xml: tourXmlUrl,
        target: "pano1",
        html5: "prefer",
        passQueryParameters: true,
        onready: function(newKrpano) {
            window.krpanoWrapper.krpano1 = newKrpano;
            newKrpano.set("name", "krpano1");
            syncScenes(newKrpano, window.krpanoWrapper.krpano2);
            // syncScenes(newKrpano, window.krpano1);
            
            console.log("New krpano instance created");
            
            // Apply view parameters
            setTimeout(() => {
                try {
                    newKrpano.call(`loadscene(${currentScene}, null, MERGE);`);
                    newKrpano.set('view.hlookat', currentHlookat);
                    newKrpano.set('view.vlookat', currentVlookat);
                    newKrpano.set('view.fov', currentFov);
                    console.log("View parameters applied");
                } catch (e) {
                    console.error("Error applying view parameters:", e);
                }
                
                // Update UI settings
                try {
                    newKrpano.set('layer[bottom_bar].align', 'bottomleft');
                    newKrpano.set('layer[bottom_bar].width', '60');
                    newKrpano.set('layer[bottom_bar].x', '20');
                    newKrpano.set('layer[bottom_bar].visible', true);
                    newKrpano.set('layer[split_button].visible', false);

                    newKrpano.set('layer[datetime_bar].align', 'topleft');
                    newKrpano.set('layer[datetime_bar].x', '40');
                    newKrpano.set('layer[datetime_bar].y', '50');
                    
                    newKrpano.set('layer[date_tooltip].x', '175');
                    newKrpano.set('layer[date_tooltip].y', '10');
                    newKrpano.set('layer[date_bar].height', '40');
                    newKrpano.set('layer[date_bar].width', '160');

                    newKrpano.set('layer[time_tooltip].x', '175');
                    newKrpano.set('layer[time_tooltip].y', '62');
                    newKrpano.set('layer[time_bar].height', '40');
                    newKrpano.set('layer[time_bar].width', '160'); 
                    newKrpano.set('layer[time_bar].align', 'left');
                    newKrpano.set('layer[time_bar].y', '50');
                    newKrpano.set('layer[time_bar].css', "font-family: Arial; color: #FFFFFF; font-size: 14px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center;");
                    
                    newKrpano.set('layer[bottom_bar].width', '60');
                    newKrpano.set('layer[bottom_bar].height', '225');

                    newKrpano.set('layer[qr_tooltip].x', '70');
                    newKrpano.set('layer[qr_tooltip].y', '20');
                    newKrpano.set('layer[qr_button].x', '0');
                    newKrpano.set('layer[qr_button].y', '10');
                    newKrpano.set('layer[qr_button].align', 'top');

                    newKrpano.set('layer[share_button].y', '65');
                    newKrpano.set('layer[share_button].x', '0');
                    newKrpano.set('layer[share_tooltip].x', '70');
                    newKrpano.set('layer[share_tooltip].y', '75');
                    newKrpano.set('layer[share_button].align', 'top');

                    newKrpano.set('layer[add_button].y', '120');
                    newKrpano.set('layer[add_button].x', '0');
                    newKrpano.set('layer[add_tooltip].x', '70');
                    newKrpano.set('layer[add_tooltip].y', '130');
                    newKrpano.set('layer[add_button].align', 'top');

                    newKrpano.set('layer[screenshot_button].y', '175');
                    newKrpano.set('layer[screenshot_button].x', '0');
                    newKrpano.set('layer[screenshot_tooltip].x', '70');
                    newKrpano.set('layer[screenshot_tooltip].y', '185');
                    newKrpano.set('layer[screenshot_button].align', 'top');
                    
                    
                    newKrpano.set('layer[datetime_bar].visible', true);
                    newKrpano.set('layer[calendar_popup].align', 'topleft');
                    newKrpano.set('layer[calendar_popup].x', '40');
                    newKrpano.set('layer[calendar_popup].y', '180');


                    newKrpano.set('layer[time_dropdown_list].align', 'topleft');
                    newKrpano.set('layer[time_dropdown_list].x', '0');
                    newKrpano.set('layer[time_dropdown_list].y', '102');
                    
                    newKrpano.call(`
                        if(layer[split_screen_button], set(layer[split_screen_button].visible, false););
                        if(layer[close_split_button], set(layer[close_split_button].visible, true););
                        if(layer[chatbot_button], set(layer[chatbot_button].visible, false););
                        if(layer[trajectory_toggle_switch], set(layer[trajectory_toggle_switch].visible, false););
                    `);
                    console.log("UI settings applied");
                } catch (e) {
                    console.error("Error updating UI settings:", e);
                }
            }, 500);

            // left_url = "https://site-view-ai.s3.us-east-1.amazonaws.com/media/projects/QyCKfUsfHG8p/8osNUXsMCeJA/recordings/2025-04-04/55c62786-de0f-4f48-9be2-784decbb48b5/tour/vtour/tour.html"
            left_url = staticTourHtmlUrl
            
            // Reinitialize components when the threejs plugin is ready
            const initInterval = setInterval(() => {
                const threejsPlugin = newKrpano.get('plugin[threejs]');
                if (threejsPlugin && threejsPlugin.scene && threejsPlugin.THREE) {
                    clearInterval(initInterval);
                    console.log("ThreeJS plugin is ready");
                    
                    try {
                        initializeThreeJS(newKrpano);
                        initializeFileSaver(newKrpano);
                        initializeCalendarLeft(newKrpano);
                        fetchCaptureTimeFromDateBarLeft(newKrpano);
                        setTimeDropdownIconLeft(newKrpano);
                        updateTimeBarLeft(newKrpano);
                        fetchLeftFloors(newKrpano);
                        setLeftFloorPlanContainerSizeOnLoad(newKrpano);
                        
                        // Reattach event handlers
                        newKrpano.set('layer[qr_svg].onclick', `js(handleQRCodeLeftViewer(${staticTourHtmlUrl}));`);
                        newKrpano.set('layer[share_svg].onclick', `js(handleShareButtonLeftView(${staticTourHtmlUrl}));`);
                        newKrpano.set('layer[datetime_display].onclick', 'js(toggleCalendarLeft());');
                        newKrpano.set('layer[prev_svg].onclick', 'js(handlePrevDateTimeLeft());');
                        newKrpano.set('layer[next_svg].onclick', 'js(handleNextDateTimeLeft());');
                        newKrpano.set('layer[prev_month_svg].onclick', 'js(handlePrevMonthLeft());');
                        newKrpano.set('layer[next_month_svg].onclick', 'js(handleNextMonthLeft());');
                        newKrpano.set('layer[expand_btn].onclick', 'js(expandFloorplanLeft());');
                        newKrpano.set('layer[collapse_btn].onclick', 'js(collapseFloorplanLeft());');
                        newKrpano.set('layer[map].ondown', 'js(handelDragFloorplanImageLeft());');
                        newKrpano.set('layer[close_split_button].onclick', `js(callCloseSplitView(left_url));`);
                        newKrpano.set('layer[dropdown_button].onclick', `js(toggleLeftDropdown());`);
                        newKrpano.set('layer[time_bar].onclick', `js(leftTimeDropdown());`);
                        console.log("Components initialized and event handlers attached");
                    } catch (e) {
                        console.error("Error initializing components:", e);
                    }
                }
            }, 100);
        }
    });
}



// Function to convert the date bar format to `YYYY-MM-DD`
function convertToApiDateFormat(dateString) {
    try {
        let date = new Date(dateString);
        if (isNaN(date)) return null;
        return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
    } catch (error) {
        return null;
    }
}



// let loaderHidden = false;
// let leftFloorPlanReady = false;
// let rightFloorPlanReady = false;
   
// function hideLoader() {
//     if (loaderHidden) return;
//     const loader = document.getElementById("loader");
//     if (loader) {
//         loader.classList.add("fade-out");
//         loader.style.display = "none";
//         showLandscapePopupIfNeeded(); 
//     }
//     loaderHidden = true;
// }    

function setLeftFloorPlanContainerSizeOnLoad(krpano) {
    // let krpano = document.getElementById(krpano1);

    // const loader = document.getElementById("loader");
    // if (loader) {
    //     loader.style.display = "flex";
    //     loader.classList.remove("fade-out");
    // }
    // loaderHidden = false;

    setTimeout(() => {
        let updatedImage = krpano.get("layer[map]");
        const imageHeight = updatedImage.loaderheight
        const imageWidth = updatedImage.loaderwidth
        if (imageHeight > imageWidth){
            krpano.set("layer[floorplan_container].scale", 0.4);
        }else{
            krpano.set("layer[floorplan_container].scale", 0.4);
        }

        const isMobileLandscape = (
            window.innerWidth > window.innerHeight &&
            window.innerWidth <= 950 &&
            window.innerHeight <= 500
        );

        if(isMobileLandscape){
            console.log("----------Device is in mobile landscape mode----");

            krpano.set("layer[floor_bar].y", 0);
            krpano.set("layer[floorplan_container].y", 40);
            krpano.set("layer[floorplan_container].scale", 0.2);

            // floor options
            krpano.set("layer[dropdown_list].align", 'right');
            krpano.set("layer[dropdown_list].scale", 0.5);
            krpano.set("layer[dropdown_list].x", '-10');
            krpano.set("layer[dropdown_list].y", '78');

            krpano.set("layer[dropdown_button].scale", 0.5);
            krpano.set("layer[dropdown_button].align", 'right');
            krpano.set("layer[dropdown_button].x", '-10');
            krpano.set("layer[dropdown_button].y", '0');
            
            krpano.set('layer[time_bar].align', 'right');
            krpano.set('layer[time_bar].y', '');
            krpano.set('layer[time_bar].x', '12');
            krpano.set('layer[time_bar].css', "font-family: Arial; color: #FFFFFF; font-size: 20px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center; margin-top:4px;");


            //date and time both bar
            krpano.set("layer[datetime_bar].y", 13);
            krpano.set("layer[datetime_bar].x", -55);
            krpano.set("layer[datetime_bar].align", 'topcenter');
            krpano.set("layer[datetime_bar].scale", 0.5);

            krpano.set("layer[time_dropdown_list].align", 'topcenter');
            krpano.set("layer[time_dropdown_list].x", 90);
            krpano.set("layer[time_dropdown_list].y", 55);


            krpano.set("layer[calendar_popup].align", 'topleft');
            krpano.set("layer[calendar_popup].x", 70);
            krpano.set("layer[calendar_popup].y", 60);
            krpano.set("layer[calendar_popup].scale", 0.6);


            krpano.set("layer[bottom_bar].width", 190);
            krpano.set("layer[bottom_bar].height", 45);
            krpano.set("layer[bottom_bar].y", 5);
            krpano.set("layer[bottom_bar].x", 5);

            krpano.set("layer[qr_button].x", 10);
            krpano.set("layer[qr_button].y", 0);
            krpano.set("layer[qr_button].align", 'left');
            krpano.set("layer[qr_button].width", 35);
            krpano.set("layer[qr_button].height", 35);
            krpano.set("layer[qr_button].padding", 3);

            krpano.set("layer[share_button].y", 0);
            krpano.set("layer[share_button].x", 55);
            krpano.set("layer[share_button].align", 'left');
            krpano.set("layer[share_button].width", 35);
            krpano.set("layer[share_button].height", 35);
            krpano.set("layer[share_button].padding", 3);


            krpano.set("layer[add_button].x", 100);
            krpano.set("layer[add_button].y", 0);
            krpano.set("layer[add_button].align", 'left');
            krpano.set("layer[add_button].width", 35);
            krpano.set("layer[add_button].height", 35);
            krpano.set("layer[add_button].padding", 3);


            krpano.set("layer[screenshot_button].x", 145);
            krpano.set("layer[screenshot_button].y", 0);
            krpano.set("layer[screenshot_button].align", 'left');
            krpano.set("layer[screenshot_button].width", 35);
            krpano.set("layer[screenshot_button].height", 35);
            krpano.set("layer[screenshot_button].padding", 3);
        }
        else if (window.innerWidth < 640) {
            krpano.set("layer[floor_bar].y", 0);
            krpano.set("layer[floorplan_container].y", 50);
            krpano.set("layer[floorplan_container].scale", 0.2);


            // floor options
            krpano.set("layer[dropdown_list].align", 'right');
            krpano.set("layer[dropdown_list].scale", 0.3);
            krpano.set("layer[dropdown_list].x", '-10');
            krpano.set("layer[dropdown_list].y", '78');

            krpano.set("layer[dropdown_button].scale", 0.45);
            // 0.45 --------------------------------------------------------------------------
            krpano.set("layer[dropdown_button].align", 'right');
            krpano.set("layer[dropdown_button].x", '-10');
            krpano.set("layer[dropdown_button].y", '0');

            krpano.set('layer[time_bar].align', 'right');
            krpano.set('layer[time_bar].y', '80');
            krpano.set('layer[time_bar].x', '190');
            krpano.set('layer[time_bar].css', "font-family: Arial; color: #FFFFFF; font-size: 20px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center; margin-top:4px;");


            //date and time both bar
            krpano.set("layer[datetime_bar].y", 60);
            krpano.set("layer[datetime_bar].x", -20);
            krpano.set("layer[datetime_bar].align", 'topcenter');
            krpano.set("layer[datetime_bar].scale", 0.4);

            krpano.set("layer[time_dropdown_list].align", 'topcenter');
            krpano.set("layer[time_dropdown_list].x", -95);
            krpano.set("layer[time_dropdown_list].y", 130);


            krpano.set("layer[calendar_popup].align", 'center');
            krpano.set("layer[calendar_popup].x", 0);
            krpano.set("layer[calendar_popup].y", 0);
            krpano.set("layer[calendar_popup].scale", 0.5);

            krpano.set("layer[bottom_bar].width", 45);
            krpano.set("layer[bottom_bar].height", 90);
            // 100==================================================================
            krpano.set("layer[bottom_bar].y", 5);
            krpano.set("layer[bottom_bar].x", 5);
            // 50 ===============================================
            krpano.set("layer[bottom_bar].align", 'bottomright');

            krpano.set("layer[qr_button].x", 10);
            krpano.set("layer[qr_button].y", 0);
            krpano.set("layer[qr_button].align", 'left');
            krpano.set("layer[qr_button].width", 35);
            krpano.set("layer[qr_button].height", 35);
            krpano.set("layer[qr_button].padding", 3);
            krpano.set("layer[qr_button].visible", 'false');

            krpano.set("layer[share_button].y", 22);
            krpano.set("layer[share_button].x", 5);
            krpano.set("layer[share_button].align", 'left');
            krpano.set("layer[share_button].width", 35);
            krpano.set("layer[share_button].height", 35);
            krpano.set("layer[share_button].padding", 3);


            krpano.set("layer[add_button].x", 100);
            krpano.set("layer[add_button].y", 0);
            krpano.set("layer[add_button].align", 'left');
            krpano.set("layer[add_button].width", 35);
            krpano.set("layer[add_button].height", 35);
            krpano.set("layer[add_button].padding", 3);
            krpano.set("layer[add_button].visible", 'false');


            krpano.set("layer[screenshot_button].x", 5);
            krpano.set("layer[screenshot_button].y", -22);
            // -22 ===========================================================
            krpano.set("layer[screenshot_button].align", 'left');
            krpano.set("layer[screenshot_button].width", 35);
            krpano.set("layer[screenshot_button].height", 35);
            krpano.set("layer[screenshot_button].padding", 3);

            krpano.set("layer[chatbot_button].x", 190);
            krpano.set("layer[chatbot_button].y", 0);
            krpano.set("layer[chatbot_button].align", 'left');
            krpano.set("layer[chatbot_button].width", 35);
            krpano.set("layer[chatbot_button].height", 35);
            krpano.set("layer[chatbot_button].padding", 3);
            krpano.set("layer[chatbot_button].visible", 'false');
}
        krpano.set("layer[floorplan_container].width", imageWidth);
        krpano.set("layer[floorplan_container].height", imageHeight);
        krpano.set("layer[map].width", imageWidth);
        krpano.set("layer[map].height", imageHeight);
        krpano.set("layer[floorplan_container].visible", 'true');

        // if (window.rightFloorPlanReady) {
        //     hideLoader();
        // } else {
        //     window.leftFloorPlanReady = true;
        // }

    }, 500);
}

window.addEventListener("orientationchange", function() {
    // Optional delay to ensure orientation is fully applied
    setTimeout(() => {
        window.location.reload();  // Refresh to apply new layout
    }, 300);
});

function setRightFloorPlanContainerSizeOnLoad(krpano) {
    // let krpano = document.getElementById(krpano1);

    // const loader = document.getElementById("loader");
    // if (loader) {
    //     loader.style.display = "flex";
    //     loader.classList.remove("fade-out");
    // }
    // loaderHidden = false;


    setTimeout(() => {
        let updatedImage = krpano.get("layer[map]");
        const imageHeight = updatedImage.loaderheight
        const imageWidth = updatedImage.loaderwidth
        if (imageHeight > imageWidth){
            krpano.set("layer[floorplan_container].scale", 0.4);
        }else{
            krpano.set("layer[floorplan_container].scale", 0.4);
        }

        const isMobileLandscape = (
            window.innerWidth > window.innerHeight &&
            window.innerWidth <= 950 &&
            window.innerHeight <= 500
        );

        if(isMobileLandscape){
            console.log("----------Device is in mobile landscape mode----");

            krpano.set("layer[floor_bar].y", 0);
            krpano.set("layer[floorplan_container].y", 40);
            krpano.set("layer[floorplan_container].scale", 0.2);

            // floor options
            krpano.set("layer[dropdown_list].align", 'right');
            krpano.set("layer[dropdown_list].scale", 0.5);
            krpano.set("layer[dropdown_list].x", '-10');
            krpano.set("layer[dropdown_list].y", '78');

            krpano.set("layer[dropdown_button].scale", 0.5);
            krpano.set("layer[dropdown_button].align", 'right');
            krpano.set("layer[dropdown_button].x", '-10');
            krpano.set("layer[dropdown_button].y", '0');
            
            krpano.set('layer[time_bar].align', 'right');
            krpano.set('layer[time_bar].y', '');
            krpano.set('layer[time_bar].x', '12');
            krpano.set('layer[time_bar].css', "font-family: Arial; color: #FFFFFF; font-size: 20px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center; margin-top:4px;");


            //date and time both bar
            krpano.set("layer[datetime_bar].y", 13);
            krpano.set("layer[datetime_bar].x", -55);
            krpano.set("layer[datetime_bar].align", 'topcenter');
            krpano.set("layer[datetime_bar].scale", 0.5);

            krpano.set("layer[time_dropdown_list].align", 'topcenter');
            krpano.set("layer[time_dropdown_list].x", 90);
            krpano.set("layer[time_dropdown_list].y", 55);


            krpano.set("layer[calendar_popup].align", 'topleft');
            krpano.set("layer[calendar_popup].x", 70);
            krpano.set("layer[calendar_popup].y", 60);
            krpano.set("layer[calendar_popup].scale", 0.6);


            krpano.set("layer[bottom_bar].width", 190);
            krpano.set("layer[bottom_bar].height", 45);
            krpano.set("layer[bottom_bar].y", 5);
            krpano.set("layer[bottom_bar].x", 5);

            krpano.set("layer[qr_button].x", 10);
            krpano.set("layer[qr_button].y", 0);
            krpano.set("layer[qr_button].align", 'left');
            krpano.set("layer[qr_button].width", 35);
            krpano.set("layer[qr_button].height", 35);
            krpano.set("layer[qr_button].padding", 3);

            krpano.set("layer[share_button].y", 0);
            krpano.set("layer[share_button].x", 55);
            krpano.set("layer[share_button].align", 'left');
            krpano.set("layer[share_button].width", 35);
            krpano.set("layer[share_button].height", 35);
            krpano.set("layer[share_button].padding", 3);


            krpano.set("layer[add_button].x", 100);
            krpano.set("layer[add_button].y", 0);
            krpano.set("layer[add_button].align", 'left');
            krpano.set("layer[add_button].width", 35);
            krpano.set("layer[add_button].height", 35);
            krpano.set("layer[add_button].padding", 3);


            krpano.set("layer[screenshot_button].x", 145);
            krpano.set("layer[screenshot_button].y", 0);
            krpano.set("layer[screenshot_button].align", 'left');
            krpano.set("layer[screenshot_button].width", 35);
            krpano.set("layer[screenshot_button].height", 35);
            krpano.set("layer[screenshot_button].padding", 3);
        }
        else if (window.innerWidth < 640) {
            krpano.set("layer[floor_bar].y", 0);
            krpano.set("layer[floorplan_container].y", 50);
            krpano.set("layer[floorplan_container].scale", 0.2);


            // floor options
            krpano.set("layer[dropdown_list].align", 'right');
            krpano.set("layer[dropdown_list].scale", 0.3);
            krpano.set("layer[dropdown_list].x", '-10');
            krpano.set("layer[dropdown_list].y", '78');

            krpano.set("layer[dropdown_button].scale", 0.45);
            // 0.45 --------------------------------------------------------------------------
            krpano.set("layer[dropdown_button].align", 'right');
            krpano.set("layer[dropdown_button].x", '-10');
            krpano.set("layer[dropdown_button].y", '0');

            krpano.set('layer[time_bar].align', 'right');
            krpano.set('layer[time_bar].y', '80');
            krpano.set('layer[time_bar].x', '190');
            krpano.set('layer[time_bar].css', "font-family: Arial; color: #FFFFFF; font-size: 20px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center; margin-top:4px;");


            //date and time both bar
            krpano.set("layer[datetime_bar].y", 60);
            krpano.set("layer[datetime_bar].x", -20);
            krpano.set("layer[datetime_bar].align", 'topcenter');
            krpano.set("layer[datetime_bar].scale", 0.4);

            krpano.set("layer[time_dropdown_list].align", 'topcenter');
            krpano.set("layer[time_dropdown_list].x", -95);
            krpano.set("layer[time_dropdown_list].y", 130);


            krpano.set("layer[calendar_popup].align", 'center');
            krpano.set("layer[calendar_popup].x", 0);
            krpano.set("layer[calendar_popup].y", 0);
            krpano.set("layer[calendar_popup].scale", 0.5);

            krpano.set("layer[bottom_bar].width", 45);
            krpano.set("layer[bottom_bar].height", 90);
            // 100==================================================================
            krpano.set("layer[bottom_bar].y", 5);
            krpano.set("layer[bottom_bar].x", 5);
            // 50 ===============================================
            krpano.set("layer[bottom_bar].align", 'bottomright');

            krpano.set("layer[qr_button].x", 10);
            krpano.set("layer[qr_button].y", 0);
            krpano.set("layer[qr_button].align", 'left');
            krpano.set("layer[qr_button].width", 35);
            krpano.set("layer[qr_button].height", 35);
            krpano.set("layer[qr_button].padding", 3);
            krpano.set("layer[qr_button].visible", 'false');

            krpano.set("layer[share_button].y", 22);
            krpano.set("layer[share_button].x", 5);
            krpano.set("layer[share_button].align", 'left');
            krpano.set("layer[share_button].width", 35);
            krpano.set("layer[share_button].height", 35);
            krpano.set("layer[share_button].padding", 3);


            krpano.set("layer[add_button].x", 100);
            krpano.set("layer[add_button].y", 0);
            krpano.set("layer[add_button].align", 'left');
            krpano.set("layer[add_button].width", 35);
            krpano.set("layer[add_button].height", 35);
            krpano.set("layer[add_button].padding", 3);
            krpano.set("layer[add_button].visible", 'false');


            krpano.set("layer[screenshot_button].x", 5);
            krpano.set("layer[screenshot_button].y", -22);
            // -22 ===========================================================
            krpano.set("layer[screenshot_button].align", 'left');
            krpano.set("layer[screenshot_button].width", 35);
            krpano.set("layer[screenshot_button].height", 35);
            krpano.set("layer[screenshot_button].padding", 3);

            krpano.set("layer[chatbot_button].x", 190);
            krpano.set("layer[chatbot_button].y", 0);
            krpano.set("layer[chatbot_button].align", 'left');
            krpano.set("layer[chatbot_button].width", 35);
            krpano.set("layer[chatbot_button].height", 35);
            krpano.set("layer[chatbot_button].padding", 3);
            krpano.set("layer[chatbot_button].visible", 'false');
        }

        krpano.set("layer[floorplan_container].width", imageWidth);
        krpano.set("layer[floorplan_container].height", imageHeight);
        krpano.set("layer[map].width", imageWidth);
        krpano.set("layer[map].height", imageHeight);
        krpano.set("layer[floorplan_container].visible", 'true');

        // if (window.leftFloorPlanReady) {
        //     hideLoader();
        // } else {
        //     window.rightFloorPlanReady = true;
        // }

    }, 500);
}


function expandFloorplanLeft() {
    const krpano = document.getElementById("krpanoSWFObject");
    let floorPlanImage = krpano.get("layer[map]") || "";
    const imageHeight = floorPlanImage.loaderheight
    const imageWidth = floorPlanImage.loaderwidth

    const isMobileLandscape = (
        window.innerWidth > window.innerHeight &&
        window.innerWidth <= 950 &&
        window.innerHeight <= 500
    );

    if(isMobileLandscape){
        krpano.set("layer[floorplan_container].x", 0);
        krpano.set("layer[floorplan_container].y", 20);
        krpano.set("layer[bottom_bar].visible", 'false');
        krpano.set("layer[floorplan_container].scale", 0.3);
        krpano.set("layer[collapse_btn].css", "font-family:Arial; color:#FFFFFF; font-size:50px; font-weight:bold;");
    }
    else if (window.innerWidth < 640) {
        krpano.set("layer[floorplan_container].x", 0);
        krpano.set("layer[floorplan_container].y", 20);
        krpano.set("layer[bottom_bar].visible", 'false');
        krpano.set("layer[floorplan_container].scale", 0.3);
        krpano.set("layer[collapse_btn].css", "font-family:Arial; color:#FFFFFF; font-size:50px; font-weight:bold;");

    }else{
        if (imageHeight > imageWidth){
            if (window.innerHeight < 690) {
                krpano.set("layer[floorplan_container].scale", 0.7);
            }
            else {
                krpano.set("layer[floorplan_container].scale", 1);
            }
        }else{
            if (window.innerHeight < 690) {
                krpano.set("layer[floorplan_container].scale", 0.7);
            }
            else {
                krpano.set("layer[floorplan_container].scale", 1);
            }
        }
        
    }

    krpano.set("control.usercontrol", "off");
    krpano.set("control.mouse", "off");
    krpano.set("control.touch", "off");
    krpano.set("control.keyboard", "off");
    krpano.set("control.mousetype", "none");
    krpano.set("control.touchtype", "none");
    krpano.set("layer[floorplan_container].align", "center");
    krpano.call(`tween(layer[floorplan_container].height , ${imageHeight}, 0.4)`);
    krpano.call(`tween(layer[floorplan_container].width , ${imageWidth} , 0.4)`);
    krpano.set("layer[map].height", imageHeight);
    krpano.set("layer[map].width", imageWidth);
    krpano.set("layer[expand_btn].visible", false);
    krpano.set("layer[collapse_btn].visible", true);

    // Attach event listener to the container
    const floorplanContainerElement = document.getElementById("krpanoSWFObject");
    if (floorplanContainerElement) {
        floorplanContainerElement.addEventListener("wheel", handelZoomFloorplanImageLeft);
        floorplanContainerElement.addEventListener("touchstart", handleTouchStartLeft, { passive: false });
        floorplanContainerElement.addEventListener("touchmove", handleTouchMoveLeft, { passive: false });
    };

    calculateFitScale()
}

function expandFloorplanRight() {
    const krpano = document.getElementById("krpanoSWFObject2");
    let floorPlanImage = krpano.get("layer[map]") || "";
    const imageHeight = floorPlanImage.loaderheight
    const imageWidth = floorPlanImage.loaderwidth

    const isMobileLandscape = (
        window.innerWidth > window.innerHeight &&
        window.innerWidth <= 950 &&
        window.innerHeight <= 500
    );

    if(isMobileLandscape){
        krpano.set("layer[floorplan_container].x", 0);
        krpano.set("layer[floorplan_container].y", 20);
        krpano.set("layer[bottom_bar].visible", 'false');
        krpano.set("layer[floorplan_container].scale", 0.3);
        krpano.set("layer[collapse_btn].css", "font-family:Arial; color:#FFFFFF; font-size:50px; font-weight:bold;");

    }else if (window.innerWidth < 640) {
        krpano.set("layer[floorplan_container].x", 0);
        krpano.set("layer[floorplan_container].y", 20);
        krpano.set("layer[bottom_bar].visible", 'false');
        krpano.set("layer[floorplan_container].scale", 0.3);
        krpano.set("layer[collapse_btn].css", "font-family:Arial; color:#FFFFFF; font-size:50px; font-weight:bold;");

    }else{
        if (imageHeight > imageWidth){
            if (window.innerHeight < 690) {
                krpano.set("layer[floorplan_container].scale", 0.7);
            }
            else {
                krpano.set("layer[floorplan_container].scale", 1);
            }
        }else{
            if (window.innerHeight < 690) {
                krpano.set("layer[floorplan_container].scale", 0.7);
            }
            else {
                krpano.set("layer[floorplan_container].scale", 1);
            }
        }
        
    }

    krpano.set("control.usercontrol", "off");
    krpano.set("control.mouse", "off");
    krpano.set("control.touch", "off");
    krpano.set("control.keyboard", "off");
    krpano.set("control.mousetype", "none");
    krpano.set("control.touchtype", "none");
    krpano.set("layer[floorplan_container].align", "center");
    krpano.call(`tween(layer[floorplan_container].height , ${imageHeight}, 0.4)`);
    krpano.call(`tween(layer[floorplan_container].width , ${imageWidth} , 0.4)`);
    krpano.set("layer[map].height", imageHeight);
    krpano.set("layer[map].width", imageWidth);
    krpano.set("layer[expand_btn].visible", false);
    krpano.set("layer[collapse_btn].visible", true);

    // Attach event listener to the container
    const floorplanContainerElement = document.getElementById("krpanoSWFObject2");
    if (floorplanContainerElement) {
        floorplanContainerElement.addEventListener("wheel", handelZoomFloorplanImageRight);
        floorplanContainerElement.addEventListener("touchstart", handleTouchStartRight, { passive: false });
        floorplanContainerElement.addEventListener("touchmove", handleTouchMoveRight, { passive: false });
    };

    calculateFitScale()
}


function collapseFloorplanLeft() {
    const krpano = document.getElementById("krpanoSWFObject");
    let floorPlanImage = krpano.get("layer[map]") || "";

    const imageHeight = floorPlanImage.loaderheight
    const imageWidth = floorPlanImage.loaderwidth

    const isMobileLandscape = (
        window.innerWidth > window.innerHeight &&
        window.innerWidth <= 950 &&
        window.innerHeight <= 500
    );

    if(isMobileLandscape){
        krpano.set("layer[floorplan_container].y", 40);
        krpano.set("layer[floorplan_container].x", 10);
        krpano.set("layer[floorplan_container].scale", 0.2);
        krpano.set("layer[bottom_bar].visible", 'true');
    }else if (window.innerWidth < 640) {
        krpano.set("layer[bottom_bar].visible", 'true');
        krpano.set("layer[floorplan_container].y", 50);
        krpano.set("layer[floorplan_container].x", 10);
        krpano.set("layer[floorplan_container].scale", 0.2);
    }else{
        if (imageHeight > imageWidth){
            krpano.set("layer[floorplan_container].scale", 0.4);
        }else{
            krpano.set("layer[floorplan_container].scale", 0.4);
        }
    }

    if (krpano) {
        krpano.set("control.usercontrol", "all");
        krpano.set("control.mouse", "on");
        krpano.set("control.touch", "on");
        krpano.set("control.keyboard", "on");
        krpano.set("control.mousetype", "drag");
        krpano.set("layer[floorplan_container].height" , imageHeight);
        krpano.set("layer[floorplan_container].width" , imageWidth);
        krpano.set("layer[floorplan_container].align", "righttop");
        krpano.set("layer[map].height", "100%");
        krpano.set("layer[map].width", "100%");
        krpano.set("layer[map].scale", 1);
        krpano.set("layer[map].y", 0);
        krpano.set("layer[map].x", 0);
        krpano.set("layer[expand_btn].visible", true);
        krpano.set("layer[collapse_btn].visible", false);

        const floorplanContainerElement = document.getElementById("krpanoSWFObject");
        if (floorplanContainerElement) {
            floorplanContainerElement.removeEventListener("wheel", handelZoomFloorplanImageLeft);
            floorplanContainerElement.addEventListener("touchend", handleTouchEndLeft, { passive: false });
        };
    }
}


function collapseFloorplanRight() {
    const krpano = document.getElementById("krpanoSWFObject2");
    let floorPlanImage = krpano.get("layer[map]") || "";

    const imageHeight = floorPlanImage.loaderheight
    const imageWidth = floorPlanImage.loaderwidth

    const isMobileLandscape = (
        window.innerWidth > window.innerHeight &&
        window.innerWidth <= 950 &&
        window.innerHeight <= 500
    );

    if(isMobileLandscape){
        krpano.set("layer[floorplan_container].y", 40);
        krpano.set("layer[floorplan_container].x", 10);
        krpano.set("layer[floorplan_container].scale", 0.2);
        krpano.set("layer[bottom_bar].visible", 'true');
    }else if (window.innerWidth < 640) {
        krpano.set("layer[bottom_bar].visible", 'true');
        krpano.set("layer[floorplan_container].y", 50);
        krpano.set("layer[floorplan_container].x", 10);
        krpano.set("layer[floorplan_container].scale", 0.2);
    }else{
        if (imageHeight > imageWidth){
            krpano.set("layer[floorplan_container].scale", 0.4);
        }else{
            krpano.set("layer[floorplan_container].scale", 0.4);
        }
    }

    if (krpano) {
        krpano.set("control.usercontrol", "all");
        krpano.set("control.mouse", "on");
        krpano.set("control.touch", "on");
        krpano.set("control.keyboard", "on");
        krpano.set("control.mousetype", "drag");
        krpano.set("layer[floorplan_container].height" , imageHeight);
        krpano.set("layer[floorplan_container].width" , imageWidth);
        krpano.set("layer[floorplan_container].align", "righttop");
        krpano.set("layer[map].height", "100%");
        krpano.set("layer[map].width", "100%");
        krpano.set("layer[map].scale", 1);
        krpano.set("layer[map].y", 0);
        krpano.set("layer[map].x", 0);
        krpano.set("layer[expand_btn].visible", true);
        krpano.set("layer[collapse_btn].visible", false);

        const floorplanContainerElement = document.getElementById("krpanoSWFObject2");
        if (floorplanContainerElement) {
            floorplanContainerElement.removeEventListener("wheel", handelZoomFloorplanImageRight);
            floorplanContainerElement.addEventListener("touchend", handleTouchEndRight, { passive: false });
        };
    }
}




function handelZoomFloorplanImageLeft(event) {
    event.preventDefault(); // Prevent default scrolling behavior
    const krpano = document.getElementById("krpanoSWFObject");
    const floorplanContainer = krpano.get("layer[floorplan_container]");
    const mapLayer = krpano.get("layer[map]");
    if (!floorplanContainer || !mapLayer) return;
    let oldScale = mapLayer.scale;
    let newScale = oldScale;
    const zoomFactor = 1.2;
    const maxScale = 4;
    const minScale = 1;
    if (event.deltaY < 0) {
        // Zoom in
        newScale *= zoomFactor;
        if (newScale > maxScale) newScale = maxScale;
    } else {
        // Zoom out
        newScale /= zoomFactor;
        if (newScale < minScale) newScale = minScale;
    }
    // Update the scale of the map
    krpano.set("layer[map].scale", newScale);
}

function handelZoomFloorplanImageRight(event) {
    event.preventDefault(); // Prevent default scrolling behavior
    const krpano = document.getElementById("krpanoSWFObject2");
    const floorplanContainer = krpano.get("layer[floorplan_container]");
    const mapLayer = krpano.get("layer[map]");
    if (!floorplanContainer || !mapLayer) return;
    let oldScale = mapLayer.scale;
    let newScale = oldScale;
    const zoomFactor = 1.2;
    const maxScale = 4;
    const minScale = 1;
    if (event.deltaY < 0) {
        // Zoom in
        newScale *= zoomFactor;
        if (newScale > maxScale) newScale = maxScale;
    } else {
        // Zoom out
        newScale /= zoomFactor;
        if (newScale < minScale) newScale = minScale;
    }
    // Update the scale of the map
    krpano.set("layer[map].scale", newScale);
}

function handelDragFloorplanImageLeft(event) {
    event = event || window.event; // Ensure event is defined
    // event.preventDefault(); // Prevent default behavior
    const krpano = document.getElementById("krpanoSWFObject");
    const isModalOpen = krpano.get("layer[collapse_btn].visible");
    const floorplanContainer = krpano.get("layer[floorplan_container]");
    const mapLayer = krpano.get("layer[map]");
    if (isModalOpen) {
        if (!floorplanContainer || !mapLayer || mapLayer.scale < 1.0) return;
        let mstartx = event.clientX;
        let mstarty = event.clientY;
        let lstartx = mapLayer.x;
        let lstarty = mapLayer.y;
        let scale = mapLayer.scale;
        let containerWidth = floorplanContainer.width;
        let containerHeight = floorplanContainer.height;
        let imageWidth = mapLayer.width * scale;
        let imageHeight = mapLayer.height * scale;
        let minX = Math.min(0, containerWidth - imageWidth);  // Left limit
        let maxX = 0; // Right limit
        let minY = Math.min(0, containerHeight - imageHeight); // Top limit
        let maxY = 0; // Bottom limit
        function onMouseMove(e) {
            let dx = e.clientX - mstartx;
            let dy = e.clientY - mstarty;
            let new_x = lstartx + dx;
            let new_y = lstarty + dy;

            new_x = Math.max(minX, Math.min(maxX, new_x));
            new_y = Math.max(minY, Math.min(maxY, new_y));
            krpano.set("layer[map].x", new_x);
            krpano.set("layer[map].y", new_y);
        }
        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }
}

function handelDragFloorplanImageRight(event) {
    event = event || window.event; // Ensure event is defined
    console.log("-=-=-=========-==-=-=-=--=-=-=-=-=-=");
    // event.preventDefault(); // Prevent default behavior
    const krpano = document.getElementById("krpanoSWFObject2");
    const isModalOpen = krpano.get("layer[collapse_btn].visible");
    const floorplanContainer = krpano.get("layer[floorplan_container]");
    const mapLayer = krpano.get("layer[map]");
    if (isModalOpen) {
        if (!floorplanContainer || !mapLayer || mapLayer.scale < 1.0) return;
        let mstartx = event.clientX;
        let mstarty = event.clientY;
        let lstartx = mapLayer.x;
        let lstarty = mapLayer.y;
        let scale = mapLayer.scale;
        let containerWidth = floorplanContainer.width;
        let containerHeight = floorplanContainer.height;
        let imageWidth = mapLayer.width * scale;
        let imageHeight = mapLayer.height * scale;
        let minX = Math.min(0, containerWidth - imageWidth);  // Left limit
        let maxX = 0; // Right limit
        let minY = Math.min(0, containerHeight - imageHeight); // Top limit
        let maxY = 0; // Bottom limit
        function onMouseMove(e) {
            let dx = e.clientX - mstartx;
            let dy = e.clientY - mstarty;
            let new_x = lstartx + dx;
            let new_y = lstarty + dy;

            new_x = Math.max(minX, Math.min(maxX, new_x));
            new_y = Math.max(minY, Math.min(maxY, new_y));
            krpano.set("layer[map].x", new_x);
            krpano.set("layer[map].y", new_y);
        }
        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }
}

function calculateFitScale(krpano) {
    const container = krpano.get("tween(layer[floorplan_container]");
    const map = krpano.get("layer[map]");
    // Calculate container ratio (width / height)
    if (!container) return;
    const containerRatio = container.width / container.height;
    console.log("containerRatio", containerRatio);
    // Calculate image ratio (width / height)
    const imageRatio = map.imageWidth / map.imageHeight;
    // Determine the fit scale
    let fitScale;
    if (containerRatio > imageRatio) {
        fitScale = container.height / map.imageHeight;
    } else {
        fitScale = container.width / map.imageWidth;
    }
    // Apply the scale with a smooth transition
    animateScale(map, fitScale, 0.3);
}
function animateScale(map, scale, duration) {
    // Smooth transition using requestAnimationFrame
    const startScale = map.scale;
    const startTime = performance.now();
    function updateScale(currentTime) {
        const elapsedTime = (currentTime - startTime) / (duration * 1000);
        if (elapsedTime < 1) {
            map.scale = startScale + (scale - startScale) * elapsedTime;
            requestAnimationFrame(updateScale);
        } else {
            map.scale = scale; // Ensure final scale is set
        }
    }
    requestAnimationFrame(updateScale);
}

function closeCalendarRight(){
    const krpano = document.getElementById("krpanoSWFObject2");
    krpano.call(`set(layer[calendar_popup].visible, "false")`);
}

function closeCalendarLeft(){
    const krpano = document.getElementById("krpanoSWFObject");
    krpano.call(`set(layer[calendar_popup].visible, "false")`);
}

function toggleLeftDropdown(){
    let krpano = document.getElementById("krpanoSWFObject");
    if(krpano.get("layer[dropdown_list].visible") == true){
        krpano.set("layer[dropdown_list].visible", false);
        setDropdownIconLeft("▼");
        krpano.set("layer[floor_tooltip].css", "color:#ffffff; font-size:16px; font-family:Arial; display:flex;");
        krpano.set("layer[floor_tooltip].bgalpha", 0.8);
    }else{
        krpano.set("layer[dropdown_list].visible", true);
        setDropdownIconLeft("▲");
        krpano.set("layer[floor_tooltip].css", "display:none;");
        krpano.set("layer[floor_tooltip].bgalpha", 0);
    }
}

function setDropdownIconLeft(icon) {
    let krpano = document.getElementById("krpanoSWFObject");
    let currentText = krpano.get("layer[dropdown_button].html");
    if (!currentText) {
        currentText = "<span style='display: flex; justify-content: space-between; width: 98%;'> \
                        <span id='floor_name_text'>Select Floor</span> \
                        <span>▼</span> \
                      </span>";
    }
    // Replace the existing icon (▲ or ▼) with the new one
    let updatedHtml = currentText.replace(/▲|▼/, icon);
    let safeHtml = updatedHtml.replace(/&amp;/g, "&").replace(/"/g, "'");
    krpano.call(`set(layer[dropdown_button].html, "${safeHtml}")`);
}

function toggleRightDropdown(){
    let krpano = document.getElementById("krpanoSWFObject2");
    if(krpano.get("layer[dropdown_list].visible") == true){
        krpano.set("layer[dropdown_list].visible", false);
        setDropdownIconRight("▼");
        krpano.set("layer[floor_tooltip].css", "color:#ffffff; font-size:16px; font-family:Arial; display:flex;");
        krpano.set("layer[floor_tooltip].bgalpha", 0.8);
    }else{
        krpano.set("layer[dropdown_list].visible", true);
        setDropdownIconRight("▲");
        krpano.set("layer[floor_tooltip].css", "display:none;");
        krpano.set("layer[floor_tooltip].bgalpha", 0);
    }
}

function setDropdownIconRight(icon) {
    let krpano = document.getElementById("krpanoSWFObject2");
    let currentText = krpano.get("layer[dropdown_button].html");
    if (!currentText) {
        currentText = "<span style='display: flex; justify-content: space-between; width: 98%;'> \
                        <span id='floor_name_text'>Select Floor</span> \
                        <span>▼</span> \
                      </span>";
    }
    // Replace the existing icon (▲ or ▼) with the new one
    let updatedHtml = currentText.replace(/▲|▼/, icon);
    let safeHtml = updatedHtml.replace(/&amp;/g, "&").replace(/"/g, "'");
    krpano.call(`set(layer[dropdown_button].html, "${safeHtml}")`);
}

function rightTimeDropdown(){
    let krpano = document.getElementById("krpanoSWFObject2");
    if(krpano.get("layer[time_dropdown_list].visible") == true){
        krpano.set("layer[time_dropdown_list].visible", false);
        setTimeDropdownIconRight("▼");
        krpano.set("layer[time_tooltip].css", "color:#ffffff; font-size:16px; font-family:Arial; display:flex;");
        krpano.set("layer[time_tooltip].bgalpha", 0.8);
    }else{
        krpano.set("layer[time_dropdown_list].visible", true);
        setTimeDropdownIconRight("▲");
        krpano.set("layer[time_tooltip].css", "display:none;");
        krpano.set("layer[time_tooltip].bgalpha", 0);
    }
}

function setTimeDropdownIconRight(icon) {
    let krpano = document.getElementById("krpanoSWFObject2");
    let currentText = krpano.get("layer[time_bar].html") || "";

    // Extract the current arrow and toggle it
    let currentArrow = currentText.includes("▲") ? "▲" : "▼";
    let newArrow = currentArrow === "▲" ? "▼" : "▲";

    // Ensure only the arrow is replaced
    let updatedHtml = currentText.replace(/▲|▼/g, newArrow);

    let safeHtml = updatedHtml.replace(/&amp;/g, "&").replace(/"/g, "'");

    krpano.call(`set(layer[time_bar].html, "${safeHtml}")`);
}

function leftTimeDropdown(){
    let krpano = document.getElementById("krpanoSWFObject");
    if(krpano.get("layer[time_dropdown_list].visible") == true){
        krpano.set("layer[time_dropdown_list].visible", false);
        setTimeDropdownIconLeft("▼");
        krpano.set("layer[time_tooltip].css", "color:#ffffff; font-size:16px; font-family:Arial; display:flex;");
        krpano.set("layer[time_tooltip].bgalpha", 0.8);
    }else{
        krpano.set("layer[time_dropdown_list].visible", true);
        setTimeDropdownIconLeft("▲");
        krpano.set("layer[time_tooltip].css", "display:none;");
        krpano.set("layer[time_tooltip].bgalpha", 0);
    }
}

function setTimeDropdownIconLeft(icon) {
    let krpano = document.getElementById("krpanoSWFObject");
    let currentText = krpano.get("layer[time_bar].html") || "";

    // Extract the current arrow and toggle it
    let currentArrow = currentText.includes("▲") ? "▲" : "▼";
    let newArrow = currentArrow === "▲" ? "▼" : "▲";

    // Ensure only the arrow is replaced
    let updatedHtml = currentText.replace(/▲|▼/g, newArrow);

    let safeHtml = updatedHtml.replace(/&amp;/g, "&").replace(/"/g, "'");

    krpano.call(`set(layer[time_bar].html, "${safeHtml}")`);
}

let lastTouchDistance = null;
let lastTouchCenter = null;
let touchStartX = 0;
let touchStartY = 0;
let layerStartX = 0;
let layerStartY = 0;

function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function getCenter(touches) {
    return {
        x: (touches[0].clientX + touches[1].clientX) / 2,
        y: (touches[0].clientY + touches[1].clientY) / 2
    };
}

function handleTouchStartLeft(event) {
    const krpano = document.getElementById("krpanoSWFObject");
    const mapLayer = krpano.get("layer[map]");

    if (event.touches.length === 1) {
        // Start drag
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        layerStartX = mapLayer.x;
        layerStartY = mapLayer.y;
    } else if (event.touches.length === 2) {
        // Start pinch zoom
        lastTouchDistance = getDistance(event.touches);
        lastTouchCenter = getCenter(event.touches);
    }
}

function handleTouchStartRight(event) {
    const krpano = document.getElementById("krpanoSWFObject2");
    const mapLayer = krpano.get("layer[map]");

    if (event.touches.length === 1) {
        // Start drag
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        layerStartX = mapLayer.x;
        layerStartY = mapLayer.y;
    } else if (event.touches.length === 2) {
        // Start pinch zoom
        lastTouchDistance = getDistance(event.touches);
        lastTouchCenter = getCenter(event.touches);
    }
}

function handleTouchMoveLeft(event) {
    event.preventDefault();
    const krpano = document.getElementById("krpanoSWFObject");
    const floorplanContainer = krpano.get("layer[floorplan_container]");
    const mapLayer = krpano.get("layer[map]");
    if (!floorplanContainer || !mapLayer) return;

    if (event.touches.length === 1) {
        // Dragging
        const dx = event.touches[0].clientX - touchStartX;
        const dy = event.touches[0].clientY - touchStartY;

        let new_x = layerStartX + dx;
        let new_y = layerStartY + dy;

        // Limit movement within boundaries
        let scale = mapLayer.scale;
        let containerWidth = floorplanContainer.width;
        let containerHeight = floorplanContainer.height;
        let imageWidth = mapLayer.width * scale;
        let imageHeight = mapLayer.height * scale;
        let minX = Math.min(0, containerWidth - imageWidth);
        let maxX = 0;
        let minY = Math.min(0, containerHeight - imageHeight);
        let maxY = 0;

        new_x = Math.max(minX, Math.min(maxX, new_x));
        new_y = Math.max(minY, Math.min(maxY, new_y));

        krpano.set("layer[map].x", new_x);
        krpano.set("layer[map].y", new_y);

    } else if (event.touches.length === 2) {
        // Pinch to zoom
        const newDistance = getDistance(event.touches);
        const center = getCenter(event.touches);
        const scaleFactor = newDistance / lastTouchDistance;

        let newScale = mapLayer.scale * scaleFactor;
        newScale = Math.max(1, Math.min(4, newScale)); // Keep between 1 and 4

        krpano.set("layer[map].scale", newScale);
        lastTouchDistance = newDistance;
        lastTouchCenter = center;
    }
}

function handleTouchMoveRight(event) {
    event.preventDefault();
    const krpano = document.getElementById("krpanoSWFObject2");
    const floorplanContainer = krpano.get("layer[floorplan_container]");
    const mapLayer = krpano.get("layer[map]");
    if (!floorplanContainer || !mapLayer) return;

    if (event.touches.length === 1) {
        // Dragging
        const dx = event.touches[0].clientX - touchStartX;
        const dy = event.touches[0].clientY - touchStartY;

        let new_x = layerStartX + dx;
        let new_y = layerStartY + dy;

        // Limit movement within boundaries
        let scale = mapLayer.scale;
        let containerWidth = floorplanContainer.width;
        let containerHeight = floorplanContainer.height;
        let imageWidth = mapLayer.width * scale;
        let imageHeight = mapLayer.height * scale;
        let minX = Math.min(0, containerWidth - imageWidth);
        let maxX = 0;
        let minY = Math.min(0, containerHeight - imageHeight);
        let maxY = 0;

        new_x = Math.max(minX, Math.min(maxX, new_x));
        new_y = Math.max(minY, Math.min(maxY, new_y));

        krpano.set("layer[map].x", new_x);
        krpano.set("layer[map].y", new_y);

    } else if (event.touches.length === 2) {
        // Pinch to zoom
        const newDistance = getDistance(event.touches);
        const center = getCenter(event.touches);
        const scaleFactor = newDistance / lastTouchDistance;

        let newScale = mapLayer.scale * scaleFactor;
        newScale = Math.max(1, Math.min(4, newScale)); // Keep between 1 and 4

        krpano.set("layer[map].scale", newScale);
        lastTouchDistance = newDistance;
        lastTouchCenter = center;
    }
}

function handleTouchEndLeft(event) {
    if (event.touches.length < 2) {
        lastTouchDistance = null;
        lastTouchCenter = null;
    }
}

function handleTouchEndRight(event) {
    if (event.touches.length < 2) {
        lastTouchDistance = null;
        lastTouchCenter = null;
    }
}

function showLandscapePopupIfNeeded() {
    const isPortrait = window.innerHeight > window.innerWidth;
    
    if (isPortrait) {
        // Create the popup only if in portrait mode
        const landscapePopup = document.createElement('div');
        landscapePopup.id = 'landscape-popup'; 

        landscapePopup.style.width = '85vw';
        landscapePopup.style.height = 'fit-content';
        landscapePopup.style.maxWidth = '400px';
        landscapePopup.style.maxHeight = '90vh';
        landscapePopup.style.position = 'absolute';
        landscapePopup.style.top = '50%';
        landscapePopup.style.left = '50%';
        landscapePopup.style.transform = 'translate(-50%, -50%)';
        landscapePopup.style.backgroundColor = '#F1F0F0';
        landscapePopup.style.borderRadius = '20px';
        landscapePopup.style.display = 'flex';
        landscapePopup.style.flexDirection = 'column';
        landscapePopup.style.alignItems = 'center';
        landscapePopup.style.justifyContent = 'flex-start';
        landscapePopup.style.padding = '20px';
        landscapePopup.style.paddingBottom = '80px';
        landscapePopup.style.boxSizing = 'border-box';
        landscapePopup.style.color = 'black';
        landscapePopup.style.zIndex = '9999';
        landscapePopup.style.gap = '5px';
        landscapePopup.style.fontFamily = 'Fellix, sans-serif';
        landscapePopup.style.overflow = "hidden";

        const closeButton = document.createElement('div');
        closeButton.innerHTML = `<svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" fill="#F3F4F6"/>
            <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#E5E7EB"/>
            <path d="M29.5 18.5L18.5 29.5M18.5 18.5L29.5 29.5" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.cursor = 'pointer';

        const rotateIcon = document.createElement('div');
        rotateIcon.innerHTML = `<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.583 6.91211H29.167C33.4068 6.91228 36.8377 10.3432 36.8379 14.583V26.25C36.8379 27.2525 36.0025 28.0879 35 28.0879C33.9975 28.0879 33.1621 27.2525 33.1621 26.25V14.583C33.1619 12.3775 31.3725 10.5881 29.167 10.5879H28.0879V13.125C28.0879 14.9441 26.611 16.4207 24.792 16.4209H18.958C17.139 16.4207 15.6621 14.9441 15.6621 13.125V10.5879H14.583C12.3775 10.5881 10.5881 12.3775 10.5879 14.583V49.583C10.5879 50.8748 11.2351 51.964 12.1826 52.6904L12.7461 53.1221V40.833C12.7463 36.5931 16.1771 33.1621 20.417 33.1621H55.417C59.6568 33.1623 63.0877 36.5932 63.0879 40.833V55.417C63.0877 59.6568 59.6568 63.0877 55.417 63.0879H20.417C16.8217 63.0879 13.8357 60.6074 12.998 57.2568L12.9473 57.0527L12.7432 57.002L12.4316 56.917C9.24 55.9769 6.91211 53.0659 6.91211 49.583V14.583C6.91229 10.3432 10.3432 6.91229 14.583 6.91211ZM20.417 36.8379C18.2113 36.8379 16.4211 38.6274 16.4209 40.833V55.417C16.4211 57.6226 18.2113 59.4121 20.417 59.4121H55.417C57.6225 59.4119 59.4119 57.6225 59.4121 55.417V54.3379H56.875C55.0559 54.3379 53.5793 52.861 53.5791 51.042V45.208C53.5793 43.389 55.0559 41.9121 56.875 41.9121H59.4121V40.833C59.4119 38.6275 57.6225 36.8381 55.417 36.8379H20.417ZM57.2539 50.6621H59.4121V45.5879H57.2539V50.6621ZM19.3379 12.7461H24.4121V10.5879H19.3379V12.7461Z" fill="black" stroke="white" stroke-width="0.7"/>
            <path d="M23.3335 44.8418C24.336 44.8418 25.1714 45.6772 25.1714 46.6797V49.5967C25.1712 50.5991 24.3359 51.4336 23.3335 51.4336C22.3311 51.4336 21.4958 50.5991 21.4956 49.5967V46.6797C21.4956 45.6772 22.331 44.8418 23.3335 44.8418Z" fill="black" stroke="white" stroke-width="0.7"/>
            <path d="M42.9941 12.9375C49.5526 12.9375 54.9311 17.9996 55.4299 24.4315H57.5031L53.1445 28.7902L48.7821 24.4315H50.8553C50.5762 19.2577 47.4198 14.873 42.9941 12.9375Z" fill="black"/>
            </svg>`;
        rotateIcon.style.marginTop = "10%";
        rotateIcon.style.maxWidth = '50px';
        rotateIcon.style.maxHeight = '50px';
        rotateIcon.style.width = 'auto';
        rotateIcon.style.height = 'auto';

        const heading = document.createElement('h3');
        heading.innerText = 'Rotate Your Device';
        heading.style.flexShrink = '1';
        heading.style.fontSize = 'clamp(14px, 2vw, 18px)';
        heading.style.textAlign = 'center';
        heading.style.marginTop = '8%';
        heading.style.marginBottom = '2px';

        const paragraph = document.createElement('p');
        paragraph.id = ("popup-p")
        paragraph.innerText = 'For the best experience, please turn your device to landscape mode.';
        paragraph.style.flexShrink = '1';
        paragraph.style.fontSize = 'clamp(12px, 1.8vw, 14px)';
        paragraph.style.textAlign = 'center';
        paragraph.style.marginTop = '2%';
        paragraph.style.lineHeight = '1.4';
        paragraph.style.padding = '5px';

        const okayButton = document.createElement('button');
        okayButton.innerText = 'Okay';
        okayButton.style.width = '80%';
        okayButton.style.padding = '12px';
        okayButton.style.backgroundColor = '#DFFF60';
        okayButton.style.border = 'none';
        okayButton.style.borderRadius = '20px';
        okayButton.style.cursor = 'pointer';
        okayButton.style.fontWeight = 'bold';
        okayButton.style.position = 'absolute';
        okayButton.style.bottom = '15px';

        // Append elements
        landscapePopup.appendChild(closeButton);
        landscapePopup.appendChild(rotateIcon);
        landscapePopup.appendChild(heading);
        landscapePopup.appendChild(paragraph);
        landscapePopup.appendChild(okayButton);

        landscapePopup.style.opacity = '0';
        landscapePopup.style.transform = 'translate(-50%, -60%)';
        landscapePopup.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        document.body.appendChild(landscapePopup);

        // Trigger the fade-in
        setTimeout(() => {
            landscapePopup.style.opacity = '1';
            landscapePopup.style.transform = 'translate(-50%, -50%)';
        }, 50);

        // Fade out and remove
        function closePopup() {
            landscapePopup.style.opacity = '0';
            landscapePopup.style.transform = 'translate(-50%, -60%)';
            setTimeout(() => {
                if (landscapePopup.parentNode) {
                    document.body.removeChild(landscapePopup);
                }
            }, 400); // Match the transition duration
        }

        // Event Listeners
        okayButton.addEventListener('click', closePopup);
        closeButton.addEventListener('click', closePopup);
    }
}