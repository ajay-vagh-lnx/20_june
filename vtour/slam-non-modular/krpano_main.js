const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjo0ODk0MTcyNTkxLCJpYXQiOjE3NDA1NzI1OTEsImp0aSI6IjU5MDViZmJlYmZmYjRlNGJhMWMxYzQ0MGU2OTFhMGJjIiwidXNlcl9pZCI6IndOOUxDUlhlY0VTUiJ9.MAhUI3jOQw6S6QKh0dofQcjynPFwQ3W6jS9yFn7cWj0";  // Replace with actual access token

// window.addEventListener('message', function (event) {

//     const { userAccesstoken } = event.data;
    
//     if (userAccesstoken) {
//         window.accessToken = userAccesstoken;
//         // console.log("Received token:", userAccesstoken);
//     }
// });

let ids = extractIdsFromUrl();
// Function to embed the pano and initialize ThreeJS
function initializeKRPano() {
    embedpano({
        xml: "tour.xml",
        target: "pano",
        html5: "only",
        passQueryParameters: "startscene,startlookat",
        onready: function (krpano) {
            console.log('krpano viewer loaded.');

            // Parse URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const scene = urlParams.get('scene');
            const hlookat = urlParams.get('h');
            const vlookat = urlParams.get('v');
            const fov = urlParams.get('f');

            // If we have parameters, set the view
            if (scene) {
                krpano.call(`loadscene(${scene}, null, MERGE, BLEND(1));`);

                // Wait for scene to load before setting view parameters
                const checkScene = setInterval(() => {
                    if (krpano.get('scene[get(xml.scene)].name') === scene) {
                        clearInterval(checkScene);

                        // Set view parameters if they exist
                        if (hlookat) krpano.set('view.hlookat', parseFloat(hlookat));
                        if (vlookat) krpano.set('view.vlookat', parseFloat(vlookat));
                        if (fov) krpano.set('view.fov', parseFloat(fov));
                    }
                }, 100);
            }

            // Interval check to see if the ThreeJS plugin is ready
            const intervalId = setInterval(() => {
                const threejsPlugin = krpano.get('plugin[threejs]');
                if (threejsPlugin && threejsPlugin.scene && threejsPlugin.THREE) {
                    clearInterval(intervalId); // Stop checking once ready
                    initializeThreeJS(krpano); // Call the initialize function
                    initializeFileSaver(krpano); // Call the initialize function
                    fetchFloors();
                    initializeCalendar();
                    updateTimeBar();
                    fetchCaptureTimeFromDateBar();


                    // ---------------------------------------------------------------------------------
                    setFloorPlanContainerSizeOnLoad();
                    // -------------------------- site note functions -------------------------- //
                    getExistingSiteNoteList();
                    createSiteNotePopup();
                    createSitenoteModal();
                    trackPinPositions();
                    initializeScreenShot(krpano);
                } else {
                    console.log('Waiting for ThreeJS plugin to be ready...');
                }
            }, 100); // Check every 100 milliseconds
        }
    });
}



window.initializeFileSaver = function (krpano) {

    //krpano = document.getElementById("krpanoSWFObject");
    krpano.loadFile("screenshot/FileSaver.js", function (file) {
        eval(file.data.replace("export ", ""));
        krpano.screenshotSaveAs = saveAs;
        // count the screenshots (for the filenames)
        krpano.makescreenshot_count = 1;
        // create an empty Object as makeScreenshot cache
        var makeScreenshotCache = {};

        // add a 'makescreenshot' action to krpano
        krpano.showscreenshot = function (screenshotwidth, screenshotheight) {
            // if there is already a screenshot layer, remove it now
            krpano.call("removelayer(screenshot,true)");

            // make a screenshot as canvas
            var sizeinfo = { w: 0, h: 0 };
            var screenshotcanvas = krpano.webGL.makeScreenshot(screenshotwidth, screenshotheight, true, "canvas", 0, null, sizeinfo, makeScreenshotCache);

            if (screenshotcanvas) {
                // example - draw something on the canvas, set to 1 to enable
                if (0) {
                    var ctx = screenshotcanvas.getContext("2d");
                    ctx.font = "25px Times";
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillText("krpano makeScreenshot() API Test", 50, screenshotcanvas.height - 50);
                }

                // add some krpano layers that show the screenshot and allow saving it
                var container = krpano.addlayer("screenshot");
                container.type = "container";
                container.align = "center";
                container.registercontentsize(sizeinfo.w + 20, sizeinfo.h + 20);
                container.width = sizeinfo.w > sizeinfo.h ? "70%" : "prop";
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
                if (screenshotcanvas.toBlob) {
                    var saveasbutton = krpano.addlayer("screenshotsaveasbutton");
                    saveasbutton.loadstyle("button");
                    saveasbutton.parent = "screenshot";
                    saveasbutton.align = "bottom";
                    saveasbutton.y = 25;
                    saveasbutton.zorder = 2;
                    saveasbutton.alpha = 1.0;
                    saveasbutton.html = "Save Image";
                    // saveasbutton.onclick = function () {
                    //     // save as JPEG with 95% quality
                    //     screenshotcanvas.toBlob(function (blob) {
                    //         krpano.screenshotSaveAs(blob, "screenshot" + (krpano.makescreenshot_count++) + ".jpg");

                    //         // Close the screenshot viewer after saving
                    //         krpano.call("set(layer[screenshot].enabled,false); " +
                    //             "tween(layer[screenshot].alpha,0,0.2,default,removelayer(screenshot,true));");
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
                                } else {
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

window.initializeScreenShot = function (krpano) {
    krpano.loadFile("screenshot/FileSaver.js", function (file) {
        eval(file.data.replace("export ", ""));
        krpano.screenshotSaveAs = saveAs;
        krpano.makescreenshot_count = 1;
        var makeScreenshotCache = {};

        captureUpdatedScreenShot = function () {
            // remove old layer if exists
            krpano.call("removelayer(screenshot,true)");

            // ❗ wait for frame render after drag/rotate
            requestAnimationFrame(() => {
                setTimeout(() => {
                    var sizeinfo = { w: 0, h: 0 };
                    var screenshotcanvas = krpano.webGL.makeScreenshot(
                        window.innerWidth,
                        window.innerHeight,
                        true,
                        "canvas",
                        0,
                        null,
                        sizeinfo,
                        makeScreenshotCache
                    );

                    const captureurl = screenshotcanvas.toDataURL();
                    localStorage.setItem("captureurl", captureurl);
                }, 100);
            });
        }
    });
}

//--------Fore share and QR-------
function isFlutter() {
    return typeof TourChannel !== 'undefined' && typeof TourChannel.postMessage === 'function';
}

// window.handleQRCode = function () {
//     // Request URL from parent via postMessage
//     window.parent.postMessage({
//         type: 'getParentUrlForQR'
//     }, '*'); // Using '*' allows communication with any parent domain
// }

window.handleQRCode = function () {
    const message = 'getParentUrlForQR';
    if (isFlutter()) {
        TourChannel.postMessage(message);
    } else {
        window.parent.postMessage({ type: message }, '*');
    }
};

// Add this event listener alongside your existing one for share URL
window.addEventListener('message', function (event) {
    // Handle the URL response for QR code
    if (event.data && event.data.type === 'parentUrlResponseForQR') {
        const parentUrl = event.data.url;

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
        // qrContainer = document.createElement('div');
        // qrContainer.id = 'qr-code-container';
        // qrContainer.style.cssText = `
        //     position: fixed;
        //     bottom: 100px;
        //     left: 20px;
        //     width: 150px;
        //     height: 150px;
        //     background: white;
        //     border-radius: 12px;
        //     box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        //     z-index: 1000;
        //     display: block;
        // `;

        qrContainer = document.createElement('div');
        qrContainer.id = 'qr-code-container';
        if (window.innerWidth < 640) {
            // Mobile styles
            qrContainer.style.cssText = `
                position: fixed;
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
        } else {
            // Default styles (desktop)
            qrContainer.style.cssText = `
                position: fixed;
                bottom: 100px;
                left: 20px;
                width: 150px;
                height: 150px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                z-index: 1000;
                display: block;
            `;
        }

        // Create close button
        // const closeButton = document.createElement('div');
        // closeButton.style.cssText = `
        //     position: absolute;
        //     top: -10px;
        //     right: -10px;
        //     width: 20px;
        //     height: 20px;
        //     background: #ff4d4d;
        //     border-radius: 50%;
        //     color: white;
        //     text-align: center;
        //     line-height: 20px;
        //     font-size: 12px;
        //     cursor: pointer;
        //     box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        // `;
        // closeButton.innerHTML = '×';
        // closeButton.onclick = function() {
        //     qrContainer.style.display = 'none';
        // };

        // Create QR code image
        const qrImage = document.createElement('img');
        qrImage.style.cssText = `
            width: 90%;
            height: 90%;
            object-fit: contain;
            border-radius: 12px;
            padding: 5%;
        `;

        // Generate QR code using the parent URL
        const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(parentUrl)}`;
        qrImage.src = qrCodeURL;

        // Add image and close button to container and container to body
        qrContainer.appendChild(qrImage);
        // qrContainer.appendChild(closeButton);
        document.body.appendChild(qrContainer);
    }

    // Keep your existing handler for share URL response
    // (The one that handles event.data.type === 'parentUrlResponse')
});

// window.handleShareButton = function () {
//     // Request URL from parent via postMessage
//     window.parent.postMessage({
//         type: 'getParentUrl'
//     }, '*'); // Using '*' allows communication with any parent domain
// }

window.handleShareButton = function () {
    const message = 'getParentUrl';
    if (isFlutter()) {
        TourChannel.postMessage(message);
    } else {
        window.parent.postMessage({ type: message }, '*');
    }
};

// Set up event listener for the parent's response
window.addEventListener('message', function (event) {
    // Check if the message is the URL response
    if (event.data && event.data.type === 'parentUrlResponse') {
        const shareUrl = event.data.url;

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
});



// Function to open the split-screen functionality
function openSplitScreen() {
    const krpano = document.getElementById("krpanoSWFObject");
    const currentScene = krpano.get('scene[get(xml.scene)].name') || "default_scene"; // Fallback if scene is undefined
    const hlookat = krpano.get('view.hlookat');
    const vlookat = krpano.get('view.vlookat');
    const fov = krpano.get('view.fov');

    const currentUrl = window.location.href;
    const baseUrl = currentUrl.substring(0, currentUrl.indexOf('/vtour/'));
    const url = `${baseUrl}/vtour/splitscreen/syncscreen.html?initialScene=${currentScene}&hlookat=${hlookat}&vlookat=${vlookat}&fov=${fov}`;
    window.location.href = url;
}

// Initialize the KRPano viewer on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeKRPano);

// Expose openSplitScreen function to the global scope if needed
window.openSplitScreen = openSplitScreen;


// Global variables to track current state
let currentDate = new Date();
let selectedDate = new Date();
let availableDates = []; // You'll need to populate this with your available dates

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
function extractIdsFromUrl() {
    // const url = window.location.href;
    const url = "https://site-view-ai.s3.us-east-1.amazonaws.com/media/projects/X5WUJyrRqxVZ/D4bPWPwF6ULx/recordings/2025-06-19/10e8effc-bfc1-4060-93fa-621db51e4bb5/tour/vtour/tour.html";
    const match = url.match(/projects\/([^\/]+)\/([^\/]+)/);
    // Extract jobId
    const jobMatch = url.match(/recordings\/\d{4}-\d{2}-\d{2}\/([^\/]+)/);

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
window.fetchAvailableDates = async function () {
    try {
        if (!ids) {
            throw new Error('Could not extract project and floor IDs from URL');
        }
        const response = await fetch(`https://user.sitepace.ai/api/available_capture_dates/${ids.projectId}/${ids.floorId}`, {
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
        window.tourData = {
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
        return window.tourData.dates.map(tour => ({
            date: tour.dateObj,  // Date object
            capture_time: tour.captureDateObj // Capture time as Date object
        }));

    } catch (error) {
        console.error('Error fetching available dates:', error);
        return [];
    }
}

window.updateCalendarGrid = function () {
    const krpano = document.getElementById("krpanoSWFObject");
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
        addDayToGrid(krpano, prevDay, position, "0xf2f2f2", false, true); // Using same gray as future dates
        position++;
    }

    // Current month days
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= totalDays; i++) {
        const currentDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        currentDateObj.setHours(0, 0, 0, 0);

        const isPastOrToday = currentDateObj <= today;
        const isAvailable = isPastOrToday && isDateAvailable(currentDateObj);
        const isSelected = isSameDate(currentDateObj, selectedDate);

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

        addDayToGrid(krpano, i, position, color, isPastOrToday);
        position++;
    }

    // Next month days - gray them out
    let nextMonthDay = 1;
    while (position < 42) {
        // console.log('Next month day:', nextMonthDay, 'Position:', position, 'Color: Gray (0xE0E0E0)');
        addDayToGrid(krpano, nextMonthDay, position, "0xf2f2f2", false, true); // Using same gray as future dates
        nextMonthDay++;
        position++;
    }
}

window.addDayToGrid = function (krpano, day, position, bgcolor, clickable = true, isDimmed = false) {
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
        set(layer[${layerName}].onclick, jscall(handleDateClick(${day})));
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
        set(layer[${layerName}_text].onclick, jscall(handleDateClick(${day})));
    `);

    if (clickable) {
        krpano.call(`
            set(layer[${layerName}].enabled, true);
            set(layer[${layerName}].onclick, "jscall(handleDateClick(${day}))");
            set(layer[${layerName}].onhover, true);
            set(layer[${layerName}].onover, "set(bgcolor, 0xE6E6E6)");
            set(layer[${layerName}].onout, "set(bgcolor, 0xFFFFFF)");
        `);
    }
}

window.handlePrevMonth = function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendarGrid();
}

window.handleNextMonth = function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendarGrid();
}

window.selectDate = function (day) {
    const selectedDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDateObj.setHours(0, 0, 0, 0);

    // Only allow selecting today or past dates
    if (selectedDateObj > today) {
        console.log('Cannot select future date');
        return;
    }

    //console.log('selectDate called with day:', day);
    //console.log('Current date before:', currentDate.toDateString());
    //console.log('Selected date before:', selectedDate.toDateString());

    selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    selectedDate.setHours(new Date().getHours());
    selectedDate.setMinutes(new Date().getMinutes());

    //console.log('Selected date after:', selectedDate.toDateString());

    // Format the selected date
    const formattedDate = formatDateTime(selectedDate);
    //console.log('Formatted date:', formattedDate);

    // Update the display
    const krpano = document.getElementById("krpanoSWFObject");
    krpano.call(`set(layer[datetime_display].html, '${formattedDate}')`);

    // Hide calendar
    krpano.call(`set(layer[calendar_popup].visible, false)`);

    // Update calendar grid to show new selection
    updateCalendarGrid();
}

window.formatDateTime = function (date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} | ${formattedHours}:${formattedMinutes} ${ampm}`;
}

// Function to check if a date is available
window.isDateAvailable = function (dateToCheck) {
    if (!window.tourData?.dates) {
        console.log('No tour data available');
        return false;
    }

    const isAvailable = window.tourData.dates.some(tour => {
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

// Function to show the loading popup
function showLoadPopUp() {
    const popup = document.createElement('div');
    popup.id = 'loadPopUp';
    
    const message = document.createElement('div');
    message.textContent = 'Loading high-resolution view… This may take few seconds.';
    message.style.color = '#333'; // Black text for contrast
    message.style.fontWeight = '600';
    message.style.lineHeight = '1.2';
    message.style.display = 'inline-block';

    // Base styling (pill-shaped container)
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.backgroundColor = 'rgba(207, 255, 177, 0.5)'; // Vibrant green (unchanged)
    popup.style.padding = '10px 25px'; // Wider padding for pill shape
    popup.style.borderRadius = '100px'; // Pill shape (high value)
    popup.style.fontFamily = 'Arial, sans-serif';
    // popup.style.fontWeight = '700';
    popup.style.zIndex = '9999';
    // popup.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'; // Softer shadow
    popup.style.transition = 'opacity 0.3s ease';
    popup.style.opacity = '0';
    popup.style.animation = 'fadeIn 0.5s forwards';
    popup.style.textAlign = 'center';
    popup.style.display = 'inline-block';
    popup.style.whiteSpace = 'nowrap';
    // popup.style.opacity = '0.10'; // Added semi-transparency (you can adjust 0.85 to your liking)

    // Mobile adjustments
    if (window.innerWidth <= 576) {
        popup.style.bottom = '15%';
        popup.style.fontSize = '13px';
        popup.style.whiteSpace = 'normal';
        popup.style.padding = '8px 20px'; // Slightly smaller padding on mobile
        message.style.fontWeight = '700';
        
        // Split text into two lines (your existing logic)
        const text = message.textContent;
        const spaceIndices = [];
        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') spaceIndices.push(i);
        }
        const middle = text.length / 2;
        let bestSplit = 0;
        let minDiff = Infinity;
        spaceIndices.forEach(pos => {
            const diff = Math.abs(pos - middle);
            if (diff < minDiff) {
                minDiff = diff;
                bestSplit = pos;
            }
        });
        message.innerHTML = text.substring(0, bestSplit) + '<br>' + text.substring(bestSplit + 1);
        
        // Measure width for responsiveness
        const temp = document.createElement('div');
        temp.style.position = 'absolute';
        temp.style.visibility = 'hidden';
        temp.style.whiteSpace = 'nowrap';
        temp.style.fontSize = '13px';
        temp.style.fontFamily = 'Arial, sans-serif';
        temp.style.fontWeight = '700';
        const line1 = text.substring(0, bestSplit);
        const line2 = text.substring(bestSplit + 1);
        temp.textContent = line1.length > line2.length ? line1 : line2;
        document.body.appendChild(temp);
        const requiredWidth = temp.offsetWidth + 40; // Extra padding
        document.body.removeChild(temp);
        popup.style.width = Math.min(requiredWidth, window.innerWidth * 0.85) + 'px';
    } else {
        // Desktop styling
        popup.style.bottom = '20%';
        popup.style.fontSize = '14px';
    }

    // Add fade animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes fadeOut { to { opacity: 0; } }
    `;
    document.head.appendChild(style);
    
    // Append and show
    popup.appendChild(message);
    document.body.appendChild(popup);
    setTimeout(() => popup.style.opacity = '1', 10);
    
    // Auto-dismiss after 15 seconds
    setTimeout(() => {
        popup.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => popup.remove(), 500);
    }, 15000);
}







window.handlePrevDateTime = async function () {
    const krpano = document.getElementById("krpanoSWFObject");
    if (!krpano || !window.tourData?.dates) return;

    // Get current displayed date from datetime_display
    const currentDisplayText = krpano.get('layer[datetime_display].html');
    const displayDate = convertToNavigateApiDateFormat(currentDisplayText);

    // console.log("Current Display:", currentDisplayText, "Formatted API Date:", displayDate);

    const apiUrl = `https://user.sitepace.ai/api/navigation_projectcapture/?project_id=${ids.projectId}&floor_id=${ids.floorId}&created_at=${displayDate}&action=previous`;

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
            window.location.href = data.data.capture;  // Navigate to previous capture URL
        } else {
            console.log("No earlier dates available");
        }
    } catch (error) {
        console.error("Error fetching previous tour data:", error);
    }
};


window.handleNextDateTime = async function () {
    const krpano = document.getElementById("krpanoSWFObject");
    if (!krpano || !window.tourData?.dates) return;

    // Get current displayed date from datetime_display
    const currentDisplayText = krpano.get('layer[datetime_display].html');
    const displayDate = convertToNavigateApiDateFormat(currentDisplayText);

    console.log("Current Display:", currentDisplayText, "Formatted API Date:", displayDate);

    const apiUrl = `https://user.sitepace.ai/api/navigation_projectcapture/?project_id=${ids.projectId}&floor_id=${ids.floorId}&created_at=${displayDate}&action=next`;

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
            window.location.href = data.data.capture;  // Navigate to previous capture URL
        } else {
            console.log("No next dates available");
        }
    } catch (error) {
        console.error("Error fetching previous tour data:", error);
    }
};


window.formatDate = function (date) {
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


// Helper function to compare dates (ignoring time)
window.isSameDate = function (date1, date2) {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

window.initializeCalendar = async function () {
    try {
        // Try to get dates from API first
        availableDates = await fetchAvailableDates();
    } catch (error) {
        // Fallback to default dates if API fails
        console.log('Falling back to default dates:', error);
        availableDates = defaultAvailableDates;
    }

    if (!availableDates.length) {
        console.warn("No available dates found.");
        return;
    }

    const response = await fetch(`https://user.sitepace.ai/api/get_capture_created_time/${ids.projectId}/${ids.jobId}`, {
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
    window.tourData = {
        ...window.tourData,
        capture_id: data.capture_id,
    };

    selectedDate = new Date(data.created_time);
    console.log("******************", selectedDate);

    const krpano = document.getElementById("krpanoSWFObject");
    if (krpano) {
        const formattedDate = formatDate(selectedDate);
        krpano.call(`set(layer[datetime_display].html, '${formattedDate}')`);
    }

    updateCalendarGrid();
}


// Update handleDateClick to use the new date structure
window.handleDateClick = function (day) {
    const krpano = document.getElementById("krpanoSWFObject");
    if (!krpano) return;

    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    clickedDate.setHours(0, 0, 0, 0);

    // Find the matching tour data
    const matchingTour = window.tourData?.dates.find(tour =>
        isSameDate(tour.dateObj, clickedDate)
    );

    if (matchingTour) {
        selectedDate = clickedDate;
        console.log('Selected tour:', matchingTour);

        // Convert UTC capture_time to local time
        const captureTimeUTC = new Date(matchingTour.capture_time);
        const localTime = captureTimeUTC.toLocaleString();  // Converts to user's timezone
        console.log("localTime================", localTime);

        // Update the display with date & time
        const formattedDateTime = `${formatDate(clickedDate)} ${localTime.split(", ")[1]}`;
        console.log("formattedDateTime================", formattedDateTime);
        krpano.call(`set(layer[datetime_display].html, '${formattedDateTime}')`);

        // // Update the display
        // const formattedDate = formatDate(clickedDate);
        // krpano.call(`set(layer[datetime_display].html, '${formattedDate}')`);

        // Store the selected tour URL
        window.selectedTourUrl = matchingTour.full_url;
        if (window.selectedTourUrl) {
            window.location.href = window.selectedTourUrl; // Redirect to the tour
        }

        // Update the calendar display
        updateCalendarGrid();
    }
}


// After 05-03-25 made Floor drop-down dynamic By LNX Team

function fetchFloors() {
    if (!ids) {
        throw new Error('Could not extract project and floor IDs from URL');
    }
    const floorId = ids.floorId
    const apiUrl = `https://user.sitepace.ai/api/list_project_floor/${ids.projectId}/`;
    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            let krpano = document.getElementById('krpanoSWFObject');

            // Clear old dropdown options
            let i = 0;
            data.data.sort((a, b) => {
                const dateA = a.last_capture_date ? new Date(a.last_capture_date) : new Date(0);
                const dateB = b.last_capture_date ? new Date(b.last_capture_date) : new Date(0);
                return dateB - dateA; // Sort in descending order (latest first)
            }).forEach((floor, index) => {

                // if (floor.capture && floor.capture.trim() !== "") {
                    if (floor.capture && floor.capture.trim() !== "" && floor.capture !== null) {
                        if (floor.floor_id === floorId) {
                            ids = {
                                ...ids,
                                floor_name: floor?.floor_name
                            }
                            // Set default floor name in the dropdown button
                            krpano.call(`set(layer[dropdown_button].html, "<span style='display: flex; justify-content: space-between; width: 100%;'> 
                            <span id='floor_name_text'>${floor.floor_name}</span> 
                            <span>▼</span> 
                        </span>")`);
                            // krpano.call(`set(layer[selected_floor].html, '${floor.floor_name}')`);
                            krpano.call("set(layer[dropdown_list].height, " + 0 + ");");
                        } else {
                            let layerName = "floor_option_" + floor.floor_id;
                            let yPos = (i * 40) + 8; // Adjust vertical positioning dynamically
                            let boxHeight = (40 * (i + 1)) + 16; // Adjust vertical positioning dynamically
                            i = i + 1;
    
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
                            // krpano.call("set(layer[" + layerName + "].css, font-family:Arial; color:black; font-size:18px; text-align:left; padding:9px 9px 9px 15px; box-shadow: 10px 0px 2px rgba(255, 255, 255, 0.7););");
                            krpano.call("set(layer[" + layerName + "].css, font-family:Arial; color:black; font-size:18px; text-align:left; padding:9px 9px 9px 15px;);");
                            krpano.call("set(layer[" + layerName + "].bgcolor, 0xFFFFFF);");
                            krpano.call("set(layer[" + layerName + "].bgalpha, 1);");
                            krpano.call("set(layer[" + layerName + "].bgroundedge, 36);");
                            krpano.call(`set(layer[${layerName}].onhover, set(bgcolor,0xDFFF60))`);
                            krpano.call(`set(layer[${layerName}].onout, set(bgcolor,0xFFFFFF))`);
                            krpano.call(`set(layer[${layerName}].onclick, select_floor('${layerName}', '${floor.floor_name}', '${floor.capture}'))`);
                        }
                    }
            });
        })
        .catch(error => console.error("Error fetching floors:", error));
}

function setDropdownIcon(icon) {
    let krpano = document.getElementById("krpanoSWFObject");

    // Get current HTML inside dropdown_button
    let currentText = krpano.get("layer[dropdown_button].html");
    // console.log(icon, "==============", currentText);
    // Ensure `currentText` is not empty or undefined
    if (!currentText) {
        currentText = "<span style='display: flex; justify-content: space-between; width: 98%;'> \
                        <span id='floor_name_text'>Select Floor</span> \
                        <span>▼</span> \
                      </span>";
    }
    // Replace the existing icon (▲ or ▼) with the new one
    let updatedHtml = currentText.replace(/▲|▼/, icon);

    // Escape double quotes properly
    // let safeHtml = updatedHtml.replace(/"/g, "'");
    let safeHtml = updatedHtml.replace(/&amp;/g, "&").replace(/"/g, "'");


    // Apply the updated HTML
    krpano.call(`set(layer[dropdown_button].html, "${safeHtml}")`);
}


async function fetchCaptureTimeFromDateBar() {
    let krpano = document.getElementById('krpanoSWFObject');

    const capture_response = await fetch(`https://user.sitepace.ai/api/get_capture_created_time/${ids.projectId}/${ids.jobId}`, {
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
    const response = await fetch(`https://user.sitepace.ai/api/retrieve_capture_time/${ids.projectId}/${ids.floorId}/${formattedDate}/`, {
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


        if (data.success && data.data.length > 0) {
            // Remove existing dropdown items if needed
            krpano.call("remove_layer(time_dropdown_list);");
            krpano.call("addlayer(time_dropdown_list);");
            krpano.call("set(layer[time_dropdown_list].keep, true);");


            let i = 0;
            data.data.forEach((item) => {
                if (item.capture && item.capture.trim() !== "" && item.capture !== null) {
                // Convert UTC time to local timezone
                let captureDate = new Date(item.created_at);
                let localTime = captureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

                let layerName = "time_option_" + i;
                let yPos = (i * 40) + 8; // Adjust vertical positioning dynamically
                let boxHeight = (40 * (i + 1)) + 16; // Adjust vertical positioning dynamically
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
                krpano.call(`set(layer[${layerName}].onclick, load_capture('${item.capture}'))`);

                i++;
                }
            });
        }
    } catch (error) {
        console.error("Error fetching capture times:", error);
    }
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

function setTimeDropdownIcon() {
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

async function updateTimeBar() {
    const response = await fetch(`https://user.sitepace.ai/api/get_capture_created_time/${ids.projectId}/${ids.jobId}`, {
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

            let krpano = document.getElementById("krpanoSWFObject");
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










// ----------------------------------------------------------------------------------------
function setFloorPlanContainerSizeOnLoad() {
    let krpano = document.getElementById("krpanoSWFObject");

    setTimeout(() => {
        let updatedImage = krpano.get("layer[map]");
        const imageHeight = updatedImage.loaderheight
        const imageWidth = updatedImage.loaderwidth
        if (imageHeight > imageWidth){
            krpano.set("layer[floorplan_container].scale", 0.55);
        }else{
            krpano.set("layer[floorplan_container].scale", 0.48);
        }

        const isMobileLandscape = (
            window.innerWidth > window.innerHeight &&
            window.innerWidth <= 950 &&
            window.innerHeight <= 500
        );

        if(isMobileLandscape){
            console.log("----------Device is in mobile landscape mode----");

            krpano.set("layer[floor_bar].y", 0);
            krpano.set("layer[floorplan_container].y", 50);
            krpano.set("layer[floorplan_container].scale", 0.2);

            // floor options
            krpano.set("layer[dropdown_list].x", 0);

            //toggle switch
            krpano.set("layer[trajectory_toggle_switch].y", 5);

            //date and time both bar
            krpano.set("layer[datetime_bar].y", -1);
            krpano.set("layer[datetime_bar].x", 5);
            krpano.set("layer[datetime_bar].align", 'topleft');

            krpano.set("layer[time_dropdown_list].x", 100);

            krpano.set("layer[calendar_popup].align", 'topleft');
            krpano.set("layer[calendar_popup].x", 70);
            krpano.set("layer[calendar_popup].y", 60);
            krpano.set("layer[calendar_popup].scale", 0.6);


            krpano.set("layer[bottom_bar].width", 235);
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


            krpano.set("layer[split_button].x", 190);
            krpano.set("layer[split_button].y", 0);
            krpano.set("layer[split_button].align", 'left');
            krpano.set("layer[split_button].width", 35);
            krpano.set("layer[split_button].height", 35);
            krpano.set("layer[split_button].padding", 3);

            // krpano.set("layer[chatbot_button].x", 235);
            // krpano.set("layer[chatbot_button].y", 0);
            // krpano.set("layer[chatbot_button].align", 'left');
            // krpano.set("layer[chatbot_button].width", 35);
            // krpano.set("layer[chatbot_button].height", 35);
            // krpano.set("layer[chatbot_button].padding", 3);
            krpano.set("layer[chatbot_button].visible", 'false');

            krpano.set("layer[expand_btn].css", "font-family:Arial; color:#FFFFFF; font-size:50px; font-weight:bold;");
        }
        else if (window.innerWidth < 640) {
            krpano.set("layer[datetime_bar].width", 350);
            krpano.set("layer[datetime_bar].height", 150);
            krpano.set("layer[datetime_bar].align", 'topleft');
            krpano.set("layer[datetime_bar].y", 30);
            krpano.set("layer[datetime_bar].x", 20);

            krpano.set("layer[date_bar].height", 40);
            krpano.set("layer[date_bar].width", 157);
            krpano.set("layer[datetime_display].css", "font-family: Arial; color: #FFFFFF; font-size: 14px;text-align: center; background: transparent !important;");

            krpano.set("layer[time_bar].height", 40);
            krpano.set("layer[time_bar].width", 160);
            krpano.set("layer[time_bar].align", 'left');
            krpano.set("layer[time_bar].y", 50);
            krpano.set("layer[time_bar].css", "font-family: Arial; color: #FFFFFF; font-size: 14px; padding: 8px 15px; display: flex; align-items: center; height:100%; justify-content:center;");
            krpano.set("layer[dropdown_button].height", 40);
            krpano.set("layer[dropdown_button].width", 310);
            krpano.set("layer[dropdown_button].x", -20);

            krpano.set("layer[bottom_bar].align", 'bottomright');
            krpano.set("layer[bottom_bar].width", 45);
            krpano.set("layer[bottom_bar].height", 280);
            krpano.set("layer[bottom_bar].y", 60);

            krpano.set("layer[qr_button].x", 0);
            krpano.set("layer[qr_button].y", 10);
            krpano.set("layer[qr_button].align", 'top');
            krpano.set("layer[qr_button].width", 35);
            krpano.set("layer[qr_button].height", 35);
            krpano.set("layer[qr_button].padding", 3);

            krpano.set("layer[share_button].y", 55);
            krpano.set("layer[share_button].x", 0);
            krpano.set("layer[share_button].align", 'top');
            krpano.set("layer[share_button].width", 35);
            krpano.set("layer[share_button].height", 35);
            krpano.set("layer[share_button].padding", 3);


            krpano.set("layer[add_button].y", 100);
            krpano.set("layer[add_button].x", 0);
            krpano.set("layer[add_button].align", 'top');
            krpano.set("layer[add_button].width", 35);
            krpano.set("layer[add_button].height", 35);
            krpano.set("layer[add_button].padding", 3);


            krpano.set("layer[screenshot_button].y", 145);
            krpano.set("layer[screenshot_button].x", 0);
            krpano.set("layer[screenshot_button].align", 'top');
            krpano.set("layer[screenshot_button].width", 35);
            krpano.set("layer[screenshot_button].height", 35);
            krpano.set("layer[screenshot_button].padding", 3);


            krpano.set("layer[split_button].y", 190);
            krpano.set("layer[split_button].x", 0);
            krpano.set("layer[split_button].align", 'top');
            krpano.set("layer[split_button].width", 35);
            krpano.set("layer[split_button].height", 35);
            krpano.set("layer[split_button].padding", 3);

            krpano.set("layer[chatbot_button].y", 235);
            krpano.set("layer[chatbot_button].x", 0);
            krpano.set("layer[chatbot_button].align", 'top');
            krpano.set("layer[chatbot_button].width", 35);
            krpano.set("layer[chatbot_button].height", 35);
            krpano.set("layer[chatbot_button].padding", 3);

            krpano.set("layer[time_dropdown_list].align", 'topleft');
            krpano.set("layer[time_dropdown_list].y", 150);
            krpano.set("layer[time_dropdown_list].x", '');

            krpano.set("layer[calendar_popup].align", 'center');
            krpano.set("layer[calendar_popup].y", 75);
            krpano.set("layer[floorplan_container].y", 60);
            krpano.set("layer[floorplan_container].x", 20);
            krpano.set("layer[floorplan_container].scale", 0.2);
            krpano.set("layer[expand_btn].css", "font-family:Arial; color:#FFFFFF; font-size:50px; font-weight:bold;");

            //toggle switch
            krpano.set("layer[trajectory_toggle_switch].x", 20);
            krpano.set("layer[trajectory_toggle_switch].align", 'bottomright');
        }

        if(imageHeight>imageWidth){
            krpano.set("layer[floorplan_container].width", 480);
            krpano.set("layer[floorplan_container].height", 621);
        }else {
            krpano.set("layer[floorplan_container].width", 542);
            krpano.set("layer[floorplan_container].height", 383);
        }

        krpano.set("layer[map].width", "100%");
        krpano.set("layer[map].height", "100%");

        krpano.set("layer[floorplan_container].visible", 'true');

        hideLoader();
        setTimeout(() => showLoadPopUp(), 300);
    }, 900);
}

function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }
  }

window.addEventListener("orientationchange", function() {
    // Optional delay to ensure orientation is fully applied
    setTimeout(() => {
        window.location.reload();  // Refresh to apply new layout
    }, 300);
});



function expandFloorplan() {
    const krpano = document.getElementById("krpanoSWFObject");
    let floorPlanImage = krpano.get("layer[map]") || "";
    // const imageHeight = floorPlanImage.loaderheight
    // const imageWidth = floorPlanImage.loaderwidth
    const imageHeight = floorPlanImage.loaderheight
    const imageWidth = floorPlanImage.loaderwidth

    const isMobileLandscape = (
        window.innerWidth > window.innerHeight &&
        window.innerWidth <= 950 &&
        window.innerHeight <= 500
    );
    krpano.set("layer[floorplan_container].y", 23);
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
        krpano.set("layer[floorplan_container].scale", 0.4);
        krpano.set("layer[collapse_btn].css", "font-family:Arial; color:#FFFFFF; font-size:50px; font-weight:bold;");
        krpano.call('tween(layer[floorplan_container].scale, 0.6, 0.4);');

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
                krpano.set("layer[floorplan_container].scale", 1.2);
            }
            else {
                krpano.set("layer[floorplan_container].scale", 1.8);
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
    




    // krpano.call(`tween(layer[floorplan_container].height , ${976}, 0.4)`);
    // krpano.call(`tween(layer[floorplan_container].width , ${689} , 0.4)`);
    // krpano.set("layer[map].height", 450);
    // krpano.set("layer[map].width", 340);
    krpano.set("layer[expand_btn].visible", false);
    krpano.set("layer[collapse_btn].visible", true);

    // Attach event listener to the container
    const floorplanContainerElement = document.getElementById("krpanoSWFObject");
    if (floorplanContainerElement) {
        floorplanContainerElement.addEventListener("wheel", handelZoomFloorplanImagePrecise);
        // floorplanContainerElement.addEventListener("touchstart", handleTouchStart, { passive: false });
        floorplanContainerElement.addEventListener("touchmove", handleTouchMove, { passive: false });
    };

    calculateFitScale()
}


function collapseFloorplan() {
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
        krpano.set("layer[floorplan_container].x", 10);
        krpano.set("layer[floorplan_container].y", 50);
        krpano.set("layer[bottom_bar].visible", 'true');
        krpano.set("layer[floorplan_container].scale", 0.2);
    }
    else if (window.innerWidth < 640) {
        krpano.set("layer[bottom_bar].visible", 'true');
        krpano.set("layer[floorplan_container].y", 80);
        krpano.set("layer[floorplan_container].x", 20);
        krpano.set("layer[floorplan_container].scale", 0.2);
    }else{
        if (imageHeight > imageWidth){
            krpano.set("layer[floorplan_container].scale", 0.55);
        }else{
            krpano.set("layer[floorplan_container].scale", 0.48);
        }
    }

    if (krpano) {
        krpano.set("control.usercontrol", "all");
        krpano.set("control.mouse", "on");
        krpano.set("control.touch", "on");
        krpano.set("control.keyboard", "on");
        krpano.set("control.mousetype", "drag");
        
        if(imageHeight>imageWidth){
            krpano.set("layer[floorplan_container].width", 480);
            krpano.set("layer[floorplan_container].height", 621);
        }else {
            krpano.set("layer[floorplan_container].width", 542);
            krpano.set("layer[floorplan_container].height", 383);
        }
    


        krpano.set("layer[floorplan_container].y", 60);
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
            floorplanContainerElement.removeEventListener("wheel", handelZoomFloorplanImagePrecise);
            floorplanContainerElement.addEventListener("touchend", handleTouchEnd, { passive: false });
        };
    }
}



// Global variables for touch handling
let touchStartX, touchStartY, layerStartX, layerStartY;
let lastTouchDistance = null;
let lastTouchCenter = null;
let initialTouchScale = 1;
let initialTouchX = 0;
let initialTouchY = 0;



function handelZoomFloorplanImagePrecise(event) {
    event.preventDefault();
    const krpano = document.getElementById("krpanoSWFObject");
    const floorplanContainer = krpano.get("layer[floorplan_container]");
    const mapLayer = krpano.get("layer[map]");
    if (!floorplanContainer || !mapLayer) return;
    // Get current values
    const currentScale = parseFloat(mapLayer.scale) || 1;
    const currentX = parseFloat(mapLayer.x) || 0;
    const currentY = parseFloat(mapLayer.y) || 0;
    const zoomFactor = 1.15; // Slightly smoother zoom
    const maxScale = 4;
    const minScale = 1; // Allow zooming out more
    // Calculate new scale
    let newScale = currentScale;
    if (event.deltaY < 0) {
        newScale = Math.min(currentScale * zoomFactor, maxScale);
    } else {
        newScale = Math.max(currentScale / zoomFactor, minScale);
    }
    if (newScale === currentScale) return;
    // Get precise mouse position
    const rect = document.getElementById("krpanoSWFObject").getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    // Calculate container position (handle centering)
    const containerX = parseFloat(floorplanContainer.x) || 0;
    const containerY = parseFloat(floorplanContainer.y) || 0;
    const containerWidth = parseFloat(floorplanContainer.width);
    const containerHeight = parseFloat(floorplanContainer.height);
    // Adjust mouse position relative to container
    let relativeMouseX = mouseX - containerX;
    let relativeMouseY = mouseY - containerY;
    // Handle center alignment
    if (floorplanContainer.align === "center") {
        const rectWidth = rect.width;
        const rectHeight = rect.height;
        relativeMouseX = mouseX - (rectWidth - containerWidth) / 2;
        relativeMouseY = mouseY - (rectHeight - containerHeight) / 2;
    }
    // Calculate zoom point in image coordinates
    const zoomPointX = (relativeMouseX - currentX) / currentScale;
    const zoomPointY = (relativeMouseY - currentY) / currentScale;
    // Calculate new position
    const newX = relativeMouseX - zoomPointX * newScale;
    const newY = relativeMouseY - zoomPointY * newScale;
    // Apply changes
    krpano.set("layer[map].scale", newScale);
    krpano.set("layer[map].x", newX);
    krpano.set("layer[map].y", newY);
    // Constrain to bounds
    constrainImagePosition();
}

function constrainImagePosition() {
    const krpano = document.getElementById("krpanoSWFObject");
    const floorplanContainer = krpano.get("layer[floorplan_container]");
    const mapLayer = krpano.get("layer[map]");
    
    if (!floorplanContainer || !mapLayer) return;
    
    const scale = parseFloat(mapLayer.scale) || 1;
    const containerWidth = parseFloat(floorplanContainer.width);
    const containerHeight = parseFloat(floorplanContainer.height);
    
    // Get original image dimensions
    const originalImageWidth = parseFloat(mapLayer.loaderwidth) || parseFloat(mapLayer.width);
    const originalImageHeight = parseFloat(mapLayer.loaderheight) || parseFloat(mapLayer.height);
    
    // Calculate scaled image dimensions
    const scaledImageWidth = originalImageWidth * scale;
    const scaledImageHeight = originalImageHeight * scale;
    
    // Get current position
    let x = parseFloat(mapLayer.x) || 0;
    let y = parseFloat(mapLayer.y) || 0;
    
    // Calculate bounds - image should not go beyond container edges
    const minX = Math.min(0, containerWidth - scaledImageWidth);
    const maxX = Math.max(0, containerWidth - scaledImageWidth);
    const minY = Math.min(0, containerHeight - scaledImageHeight);
    const maxY = Math.max(0, containerHeight - scaledImageHeight);
    
    // Constrain position
    if (scaledImageWidth > containerWidth) {
        x = Math.max(minX, Math.min(maxX, x));
    } else {
        x = (containerWidth - scaledImageWidth) / 2; // Center if image is smaller than container
    }
    
    if (scaledImageHeight > containerHeight) {
        y = Math.max(minY, Math.min(maxY, y));
    } else {
        y = (containerHeight - scaledImageHeight) / 2; // Center if image is smaller than container
    }
    
    // Apply constrained position
    krpano.set("layer[map].x", x);
    krpano.set("layer[map].y", y);
}


function handelDragFloorplanImage(event) {
    event = event || window.event; // Ensure event is defined
    event.preventDefault(); // Prevent default behavior
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

function calculateFitScale() {
    const krpano = document.getElementById("krpanoSWFObject");
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

// function handleTouchStart(event) {
//     const krpano = document.getElementById("krpanoSWFObject");
//     const mapLayer = krpano.get("layer[map]");

//     if (event.touches.length === 1) {
//         // Start drag
//         touchStartX = event.touches[0].clientX;
//         touchStartY = event.touches[0].clientY;
//         layerStartX = mapLayer.x;
//         layerStartY = mapLayer.y;
//     } else if (event.touches.length === 2) {
//         // Start pinch zoom
//         lastTouchDistance = getDistance(event.touches);
//         lastTouchCenter = getCenter(event.touches);
//     }
// }

function handleTouchStart(event) {
    const krpano = document.getElementById("krpanoSWFObject");
    const mapLayer = krpano.get("layer[map]");
    
    if (!mapLayer) return;

    if (event.touches.length === 1) {
        // Start drag
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        layerStartX = parseFloat(mapLayer.x) || 0;
        layerStartY = parseFloat(mapLayer.y) || 0;
    } else if (event.touches.length === 2) {
        // Start pinch zoom
        lastTouchDistance = getDistance(event.touches);
        lastTouchCenter = getCenter(event.touches);
        initialTouchScale = parseFloat(mapLayer.scale) || 1;
        initialTouchX = parseFloat(mapLayer.x) || 0;
        initialTouchY = parseFloat(mapLayer.y) || 0;
    }
}


// UNDOOO ----------

// function handleTouchMove(event) {
//     event.preventDefault();
//     const krpano = document.getElementById("krpanoSWFObject");
//     const floorplanContainer = krpano.get("layer[floorplan_container]");
//     const mapLayer = krpano.get("layer[map]");
//     if (!floorplanContainer || !mapLayer) return;

//     if (event.touches.length === 1) {
//         // Dragging
//         const dx = event.touches[0].clientX - touchStartX;
//         const dy = event.touches[0].clientY - touchStartY;

//         let new_x = layerStartX + dx;
//         let new_y = layerStartY + dy;

//         // Limit movement within boundaries
//         let scale = mapLayer.scale;
//         let containerWidth = floorplanContainer.width;
//         let containerHeight = floorplanContainer.height;
//         let imageWidth = mapLayer.width * scale;
//         let imageHeight = mapLayer.height * scale;
//         let minX = Math.min(0, containerWidth - imageWidth);
//         let maxX = 0;
//         let minY = Math.min(0, containerHeight - imageHeight);
//         let maxY = 0;

//         new_x = Math.max(minX, Math.min(maxX, new_x));
//         new_y = Math.max(minY, Math.min(maxY, new_y));

//         krpano.set("layer[map].x", new_x);
//         krpano.set("layer[map].y", new_y);

//     } else if (event.touches.length === 2) {
//         // Pinch to zoom
//         const newDistance = getDistance(event.touches);
//         const center = getCenter(event.touches);
//         const scaleFactor = newDistance / lastTouchDistance;

//         let newScale = mapLayer.scale * scaleFactor;
//         newScale = Math.max(1, Math.min(4, newScale)); // Keep between 1 and 4

//         krpano.set("layer[map].scale", newScale);
//         lastTouchDistance = newDistance;
//         lastTouchCenter = center;
//     }
// }

function handleTouchMove(event) {
    event.preventDefault();
    const krpano = document.getElementById("krpanoSWFObject");
    const floorplanContainer = krpano.get("layer[floorplan_container]");
    const mapLayer = krpano.get("layer[map]");
    
    if (!floorplanContainer || !mapLayer) return;

    if (event.touches.length === 1) {
        // Single finger drag
        const dx = event.touches[0].clientX - touchStartX;
        const dy = event.touches[0].clientY - touchStartY;

        let newX = layerStartX + dx;
        let newY = layerStartY + dy;

        // Apply constraints
        const constrainedPosition = constrainPosition(newX, newY, mapLayer, floorplanContainer);
        
        krpano.set("layer[map].x", constrainedPosition.x);
        krpano.set("layer[map].y", constrainedPosition.y);

    } else if (event.touches.length === 2) {
        // Two finger pinch zoom
        const newDistance = getDistance(event.touches);
        const newCenter = getCenter(event.touches);
        
        if (lastTouchDistance && lastTouchCenter) {
            // Calculate scale change
            const scaleFactor = newDistance / lastTouchDistance;
            let newScale = (parseFloat(mapLayer.scale) || 1) * scaleFactor;
            
            // Constrain scale
            const maxScale = 4;
            const minScale = 1;
            newScale = Math.max(minScale, Math.min(maxScale, newScale));
            
            // Calculate zoom center relative to container
            const rect = document.getElementById("krpanoSWFObject").getBoundingClientRect();
            const containerX = parseFloat(floorplanContainer.x) || 0;
            const containerY = parseFloat(floorplanContainer.y) || 0;
            const containerWidth = parseFloat(floorplanContainer.width);
            const containerHeight = parseFloat(floorplanContainer.height);
            
            // Adjust center position relative to container
            let relativeCenterX = newCenter.x - rect.left - containerX;
            let relativeCenterY = newCenter.y - rect.top - containerY;
            
            // Handle center alignment
            if (floorplanContainer.align === "center") {
                relativeCenterX = newCenter.x - rect.left - (rect.width - containerWidth) / 2;
                relativeCenterY = newCenter.y - rect.top - (rect.height - containerHeight) / 2;
            }
            
            // Calculate current position
            const currentScale = parseFloat(mapLayer.scale) || 1;
            const currentX = parseFloat(mapLayer.x) || 0;
            const currentY = parseFloat(mapLayer.y) || 0;
            
            // Calculate the point in the image that should stay under the center
            const imagePointX = (relativeCenterX - currentX) / currentScale;
            const imagePointY = (relativeCenterY - currentY) / currentScale;
            
            // Calculate new position to keep the image point under center
            const newX = relativeCenterX - imagePointX * newScale;
            const newY = relativeCenterY - imagePointY * newScale;
            
            // Apply new scale and position
            krpano.set("layer[map].scale", newScale);
            krpano.set("layer[map].x", newX);
            krpano.set("layer[map].y", newY);
            
            // Constrain to bounds
            constrainImagePosition();
        }
        
        lastTouchDistance = newDistance;
        lastTouchCenter = newCenter;
    }
}



// function handleTouchEnd(event) {
//     if (event.touches.length < 2) {
//         lastTouchDistance = null;
//         lastTouchCenter = null;
//     }
// }

function handleTouchEnd(event) {
    if (event.touches.length < 2) {
        lastTouchDistance = null;
        lastTouchCenter = null;
    }
    if (event.touches.length === 0) {
        touchStartX = null;
        touchStartY = null;
        layerStartX = null;
        layerStartY = null;
    }
}



// Helper function to get distance between two touches
function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

// Helper function to get center point between two touches
function getCenter(touches) {
    return {
        x: (touches[0].clientX + touches[1].clientX) / 2,
        y: (touches[0].clientY + touches[1].clientY) / 2
    };
}

// Helper function to constrain position within bounds
function constrainPosition(x, y, mapLayer, floorplanContainer) {
    const scale = parseFloat(mapLayer.scale) || 1;
    const containerWidth = parseFloat(floorplanContainer.width);
    const containerHeight = parseFloat(floorplanContainer.height);
    
    // Get original image dimensions
    const originalImageWidth = parseFloat(mapLayer.loaderwidth) || parseFloat(mapLayer.width);
    const originalImageHeight = parseFloat(mapLayer.loaderheight) || parseFloat(mapLayer.height);
    
    // Calculate scaled image dimensions
    const scaledImageWidth = originalImageWidth * scale;
    const scaledImageHeight = originalImageHeight * scale;
    
    // Calculate bounds
    const minX = Math.min(0, containerWidth - scaledImageWidth);
    const maxX = Math.max(0, containerWidth - scaledImageWidth);
    const minY = Math.min(0, containerHeight - scaledImageHeight);
    const maxY = Math.max(0, containerHeight - scaledImageHeight);
    
    // Constrain position
    let constrainedX = x;
    let constrainedY = y;
    
    if (scaledImageWidth > containerWidth) {
        constrainedX = Math.max(minX, Math.min(maxX, x));
    } else {
        constrainedX = (containerWidth - scaledImageWidth) / 2;
    }
    
    if (scaledImageHeight > containerHeight) {
        constrainedY = Math.max(minY, Math.min(maxY, y));
    } else {
        constrainedY = (containerHeight - scaledImageHeight) / 2;
    }
    
    return { x: constrainedX, y: constrainedY };
}

function closeCalendar(){
    let krpano = document.getElementById("krpanoSWFObject");
    krpano.call(`set(layer[calendar_popup].visible, "false")`);
}


// let lastTouchDistance = null;
// let lastTouchCenter = null;
// let touchStartX = 0;
// let touchStartY = 0;
// let layerStartX = 0;
// let layerStartY = 0;

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

