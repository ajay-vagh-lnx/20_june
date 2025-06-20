

// Helper to create a new session
async function createSession(captureId, name) {
    const url = `https://user.sitepace.ai/api/chat/sessions/`;
    const payload = {
        capture_id: captureId,
        session_name: name,
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify(payload)
    });
    return await response.json();
}

// Helper to get list of sessions for a capture
async function getSessions(captureId) {
    const url = `https://user.sitepace.ai/api/chat/sessions/?capture_id=${encodeURIComponent(captureId)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        }
    });
    return await response.json();
}

// Helper to delete a session by ID
async function deleteSession(sessionId) {
    const url = `https://user.sitepace.ai/api/chat/sessions/${sessionId}/`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    });
    return response.status === 204;
}

// Helper to update session name a session by ID
async function renameSession(sessionId, name) {
    const url = `https://user.sitepace.ai/api/chat/sessions/${sessionId}/`;
    const payload = { name };

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Failed to rename session ${sessionId}`);
    }

    return await response.json();
}

// UNDO ------

const sendArrow = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5131 7.49341L9.26662 12.7959L3.29948 9.0637C2.44452 8.5288 2.62237 7.23015 3.58941 6.94735L17.757 2.79837C18.6425 2.53883 19.4632 3.36676 19.2001 4.25516L15.0087 18.4129C14.7215 19.3813 13.4303 19.5543 12.9004 18.6957L9.26384 12.7969" stroke="#DFFF60" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const closeButton = `<svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="47" height="47" rx="23.5" fill="#F3F4F6"/>
<rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#E5E7EB"/>
<path d="M29.5 18.5L18.5 29.5M18.5 18.5L29.5 29.5" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`



// const exportBtn = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-up-icon lucide-file-up"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/></svg>`
const exportBtn = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 2V6C14 6.53043 14.2107 7.03914 14.5858 7.41421C14.9609 7.78929 15.4696 8 16 8H20" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 18V12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 15L12 18L15 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const opensidebarIcon = `<svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#000000" stroke-width="1.5"/>
<line x1="9" y1="3" x2="9" y2="21" stroke="#000000" stroke-width="1"/>
<circle cx="6" cy="8" r="1.25" fill="#000000"/>
<circle cx="6" cy="12" r="1.25" fill="#000000"/>
<circle cx="6" cy="16" r="1.25" fill="#000000"/>
</svg>`;

const closesidebarIcon = `<svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#000000" stroke-width="1.5"/>
<!-- Move line from x=9 to x=15 (24 - 9) -->
<line x1="15" y1="3" x2="15" y2="21" stroke="#000000" stroke-width="1"/>
<!-- Circles move from cx=6 to cx=18 (24 - 6) -->
<circle cx="18" cy="8" r="1.25" fill="#000000"/>
<circle cx="18" cy="12" r="1.25" fill="#000000"/>
<circle cx="18" cy="16" r="1.25" fill="#000000"/>
</svg>`;

const threeDotsVerticalIcon = `<svg width="30" height="30" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16.5C13.1046 16.5 14 17.3954 14 18.5C14 19.6046 13.1046 20.5 12 20.5C10.8954 20.5 10 19.6046 10 18.5C10 17.3954 10.8954 16.5 12 16.5ZM12 10.5C13.1046 10.5 14 11.3954 14 12.5C14 13.6046 13.1046 14.5 12 14.5C10.8954 14.5 10 13.6046 10 12.5C10 11.3954 10.8954 10.5 12 10.5ZM12 4.5C13.1046 4.5 14 5.39543 14 6.5C14 7.60457 13.1046 8.5 12 8.5C10.8954 8.5 10 7.60457 10 6.5C10 5.39543 10.8954 4.5 12 4.5Z"/>
</svg>`;

const newChatIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const expandbtnIcon = `<svg width="15" height="15" viewBox="0 0 32 32" fill="#000000" xmlns="http://www.w3.org/2000/svg">
<path d="M339.685,1191.3 C339.503,1191.12 339.251,1191 338.972,1191 L330,1191 C329.447,1191 329,1191.45 329,1192 C329,1192.55 329.447,1193 330,1193 L336.629,1193 L325.83,1203.8 L327.244,1205.21 L338.031,1194.42 L338,1201 C338,1201.55 338.447,1202 339,1202 C339.553,1202 340,1201.55 340,1201 L340,1192 C340,1191.7 339.878,1191.46 339.685,1191.3 L339.685,1191.3 Z M320.756,1208.79 L309.969,1219.58 L310,1213 C310,1212.45 309.553,1212 309,1212 C308.447,1212 308,1212.45 308,1213 L308,1222 C308,1222.3 308.122,1222.54 308.315,1222.7 C308.497,1222.88 308.749,1223 309.028,1223 L318,1223 C318.553,1223 319,1222.55 319,1222 C319,1221.45 318.553,1221 318,1221 L311.371,1221 L322.17,1210.2 L320.756,1208.79 L320.756,1208.79 Z" transform="translate(-308, -1191)"/>
</svg>`


const squeezeIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter" xmlns="http://www.w3.org/2000/svg">
<line x1="10" y1="14" x2="3" y2="21"/>
<polyline points="4 14 10 14 10 20"/>
<line x1="21" y1="3" x2="14" y2="10"/>
<polyline points="20 10 14 10 14 4"/>
</svg>`




// Add this at the TOP of your script (outside openChatBot)
let isInitialized = false;
let currentSessionId = null;

function openChatBot() {

    const isMobilePortrait = (
        window.innerWidth < 640 &&
        window.innerHeight > window.innerWidth
    );
    

    // const krpano = document.getElementById("krpanoSWFObject");

    if (isMobilePortrait) {
        krpano.set("layer[bottom_bar].visible", 'false');
        krpano.set("layer[trajectory_toggle_switch].visible", 'false');
        krpano.set("layer[datetime_bar].visible", 'false');
        krpano.set("layer[date_bar].visible", 'false');
        krpano.set("layer[time_bar].visible", 'false');
        krpano.set("layer[floorplan_container].visible", 'false');
        krpano.set("layer[floor_bar].visible", 'false');
    }

    const chatContainer = document.getElementById('chat-container');
    // let sidebarPanel = document.querySelector('.sidebar-panel');
    const captureId = window?.tourData?.capture_id;

    // Toggle UI immediately
    if (chatContainer) {
        const shouldShow = chatContainer.style.display === 'none';
        chatContainer.style.display = shouldShow ? 'flex' : 'none';
        // if (sidebarPanel) sidebarPanel.style.display = chatContainer.style.display;

        // Run init logic once, when first showing
        if (shouldShow && !isInitialized) {
            isInitialized = true;
            initializeChatLogic(captureId);
        }
        return;
    }

    // If no chatContainer exists yet (first time)
    isInitialized = true;
    initializeChatLogic(captureId);

    const chat_container = document.createElement('div');
    chat_container.classList.add('chat-container');
    chat_container.id = 'chat-container';


    // Create a wrapper div for the two-column layout
    const innerWrapper = document.createElement('div');
    innerWrapper.classList.add('chat-inner-wrapper');
    innerWrapper.style.display = 'flex';
    innerWrapper.style.flex = '1';
    innerWrapper.style.width = '100%';

    // POP UP ALERT 
    const popupAlert = document.createElement('div')
    popupAlert.classList.add("popup-alert");

    // DELETE HISTORY CONFIRM POP UP
    const deletePopUp = document.createElement('div')
    deletePopUp.classList.add("delete-popup")

    // MOBILE POP UP FOR MOBILES ONLY
    const mobilePopup = document.createElement('div')
    mobilePopup.classList.add('mobile-popup')


    // Create left column for sidebar
    const leftColumn = document.createElement('div');
    leftColumn.classList.add('chat-left-column');
    leftColumn.style.width = '180px'; // Initial width
    leftColumn.style.flexShrink = '0'; // Prevent shrinking
    leftColumn.style.transition = 'width 0.3s ease';

    // Create right column for chat content
    const rightColumn = document.createElement('div');
    rightColumn.classList.add('chat-right-column');
    rightColumn.style.flex = '1'; // Take remaining space
    rightColumn.style.minWidth = '0'; // Important for flex items
    rightColumn.style.transition = 'width 0.3s ease'; // Smooth transition



    ['click', 'touchstart', 'touchend', 'mousedown', 'mouseup', 'keydown'].forEach(eventType => {
        chat_container.addEventListener(eventType, (e) => {
            e.stopPropagation();
        });
    });

    // Create sidebar panel (modified to be inside left column)
    let sidebarPanel = document.createElement('div');
    sidebarPanel.classList.add('sidebar-panel');
    leftColumn.appendChild(sidebarPanel);



    // Header container for title + close button
    const chat_header = document.createElement('div');
    chat_header.classList.add('chat-header');

    // left div for title and side bar svg
    const headerLeft = document.createElement("div");
    headerLeft.classList.add("header-left");

    const chat_container_title = document.createElement("h6");
    chat_container_title.classList.add('chat-title');
    chat_container_title.textContent = "SitePace IntelliViz™";

    // BETAAA (BETAA)
    const beta = document.createElement('div')
    beta.classList.add('beta-wrapper')

    const betaText = document.createElement('p')
    betaText.classList.add('beta-text')
    betaText.innerText = '(Beta)'

    beta.appendChild(betaText);

    // CHAT CONTAINER ICON FOR CLOSE AND OPE
    const sideBar = document.createElement("span")
    sideBar.classList.add("sidebar");
    sideBar.innerHTML = opensidebarIcon;

    headerLeft.appendChild(sideBar)
    headerLeft.appendChild(chat_container_title);
    // headerLeft.appendChild(beta);

    const headerRight = document.createElement('div');
    headerRight.classList.add("header-right");

    // ---------------------------------------
    // Create a new container for the button header
    const buttonHeader = document.createElement('div');
    buttonHeader.classList.add('button-header');

    // Create Full Tour button
    const fullTourButton = document.createElement("button");
    fullTourButton.classList.add("header-button");
    fullTourButton.textContent = "Full Tour";
    fullTourButton.dataset.value = "full";

    // Create This Scene button
    const thisSceneButton = document.createElement("button");
    thisSceneButton.classList.add("header-button", "active");
    thisSceneButton.textContent = "This Frame";
    thisSceneButton.dataset.value = "scene";

    // Add buttons to the button header with space between
    buttonHeader.appendChild(thisSceneButton);
    buttonHeader.appendChild(fullTourButton);

    // Button click handlers - mutually exclusive active state
    const headerButtons = [fullTourButton, thisSceneButton];

    headerButtons.forEach(button => {
        button.addEventListener("click", () => {
            headerButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });




    // ---------------------------------------


    // expand btn
    const expandBtn = document.createElement("span")
    expandBtn.classList.add("expand-btn")
    expandBtn.innerHTML = expandbtnIcon

    const close_button = document.createElement("span");
    close_button.classList.add('chat-close');
    close_button.innerHTML = closeButton;

    const export_btn = document.createElement("span");
    export_btn.classList.add('export-btn');
    export_btn.innerHTML = exportBtn;


    headerRight.appendChild(expandBtn)
    headerRight.appendChild(export_btn)
    headerRight.appendChild(close_button)

    chat_header.appendChild(headerLeft);
    chat_header.appendChild(headerRight);

    headerLeft.appendChild(beta);



    // SIDE BAR 
    // let sidebarPanel = document.querySelector('.sidebar-panel');

    const sidebarHeader = document.createElement('div');
    sidebarHeader.classList.add('sidebar-header');

    // SIDEBAR FOOTER FOR USERNAME
    // const sidebarFooter = document.createElement('div')
    // sidebarFooter.classList.add('sidebar-footer')
    // sidebarFooter.innerText = 'Username';

    const logo = document.createElement('img');
    logo.src = "icons/Group 12.png";
    logo.alt = 'SitePace Logo';
    logo.classList.add('sidebar-logo');




    // // TO TOGGLE SIDEBAR ICON ----------------
    const sidebarHide = document.createElement('span')
    sidebarHide.classList.add('sidebar-hide')
    sidebarHide.innerHTML = closesidebarIcon;

    sidebarHeader.appendChild(logo);

    sidebarHeader.appendChild(sidebarHide);
    sidebarPanel.appendChild(sidebarHeader);



    // Create New Chat button
    const newChatButton = document.createElement('div');
    newChatButton.classList.add('new-chat-button');

    const newChatContent = document.createElement('div');
    newChatContent.classList.add('new-chat-content');

    const newChatIconContainer = document.createElement('span');
    newChatIconContainer.classList.add('new-chat-icon');
    newChatIconContainer.innerHTML = newChatIcon;

    const newChatText = document.createElement('span');
    newChatText.classList.add('new-chat-text');
    newChatText.textContent = 'New Chat';

    newChatContent.appendChild(newChatIconContainer);
    newChatContent.appendChild(newChatText);
    newChatButton.appendChild(newChatContent);

    // Create history container
    const historyContainer = document.createElement('div');
    historyContainer.classList.add('history-container');
    sidebarPanel.appendChild(historyContainer);

    // FOOTER FOR SIDEBAR APPENDING
    // sidebarPanel.appendChild(sidebarFooter);

    newChatButton.addEventListener('click', async function () {
        // sidebarHide.click();


        document.querySelectorAll('.history-dropdown-menu').forEach(menu => {
            menu.style.display = "none";
        });

        const captureId = window?.tourData?.capture_id;
        if (!captureId) {
            console.error('No capture ID found');
            return;
        }

        // Add skeleton class and clear chat body to prevent overlap
        const chatBody = document.getElementById("chat-body");
        if (chatBody) {
            chatBody.classList.add('skeleton');
            chatBody.innerHTML = ''; // Clear content immediately
        }

        try {
            // Get current sessions
            const sessions = await getSessions(captureId);


            // Create new session
            // const newChatName = `Chat ${new Date().toLocaleString().replace(/[/,:\s]/g, '-')}`;
            const newChatName = "New Chat"
            const createdSession = await createSession(captureId, newChatName);

            if (!createdSession?.id) {
                console.error('Failed to create new chat session');
                chatBody.classList.remove('skeleton'); // Remove skeleton on failure
                return;
            }

            // Set current session
            currentSessionId = createdSession.id;

            const chatBody = document.getElementById("chat-body");
            if (chatBody) chatBody.innerHTML = '';

            // Clear previous chat messages
            const chatMessages = document.querySelector('.chat-messages');
            if (chatMessages) chatMessages.innerHTML = '';

            // Update sidebar
            await updateSidebarSessions(captureId);



            showIntroMessage();

            // Remove skeleton class after content is loaded
            chatBody.classList.remove('skeleton');

            console.log('New chat session created and sidebar updated');
        } catch (error) {
            console.error('Error handling new chat session:', error);
            if (chatBody) chatBody.classList.remove('skeleton');
        }
    });



    sidebarPanel.appendChild(newChatButton);

    // -----------------------------------------------------------------

    function isMobileView() {
        return window.matchMedia("(max-width: 576px)").matches;
    }

    sidebarPanel.appendChild(historyContainer);

    // Sidebar toggle functionality
    sideBar.style.display = 'none'

    sideBar.addEventListener('click', function () {

        document.querySelectorAll('.history-dropdown-menu').forEach(menu => {
            menu.style.display = "none";
        });


        const leftColumn = document.querySelector('.chat-left-column');
        leftColumn.style.display = 'block';
        // Force reflow to ensure the element is rendered before animation starts
        void leftColumn.offsetWidth;
        sidebarPanel.classList.remove('hidden');
        leftColumn.style.width = '180px';
        sideBar.style.display = 'none';
        sidebarHide.style.display = 'inline-block';

        if (window.innerWidth < 576) {
            document.querySelector('.header-left').style.visibility = 'hidden'; leftColumn.style.position = 'absolute';
            leftColumn.style.zIndex = '1001';
            leftColumn.style.height = '100%';
            leftColumn.style.boxShadow = '2px 0 5px rgba(0,0,0,0.1)';
            rightColumn.style.marginLeft = '0';
        }
    });

    sidebarHide.addEventListener('click', function () {

        document.querySelectorAll('.history-dropdown-menu').forEach(menu => {
            menu.style.display = "none";
        });


        const leftColumn = document.querySelector('.chat-left-column');
        sidebarPanel.classList.add('hidden');
        leftColumn.style.width = '0';
        sidebarHide.style.display = 'none';
        sideBar.style.display = 'inline-block';

        if (window.innerWidth < 576) {
            document.querySelector('.header-left').style.visibility = 'visible';
            leftColumn.style.position = '';
            leftColumn.style.zIndex = '';
            leftColumn.style.height = '';
            leftColumn.style.boxShadow = '';
        }


        setTimeout(() => {
            leftColumn.style.display = 'none';
        }, 300); // Match transition duration
    });







    // +++++++=====++++====++++===+++++===+++===+++===++===+++===+++===+++====+++==++===+++====++++===++====++===+++=
    // Then update the sidebar event listeners to maintain this behavior:
    // sideBar.addEventListener('click', function () {
    //     const leftColumn = document.querySelector('.chat-left-column');
    //     leftColumn.style.display = 'block';
    //     leftColumn.style.width = '180px';
    //     sideBar.style.display = 'none'; // Hide open button
    //     sidebarHide.style.display = 'inline-block'; // Show close button
    // });

    // sidebarHide.addEventListener('click', function () {
    //     const leftColumn = document.querySelector('.chat-left-column');
    //     leftColumn.style.display = 'none';
    //     leftColumn.style.width = '0';
    //     sidebarHide.style.display = 'none'; // Hide close button
    //     sideBar.style.display = 'inline-block'; // Show open button
    // });
    // +++++++=====++++====++++===+++++===+++===+++===++===+++===+++===+++====+++==++===+++====++++===++====++===+++=
    // Finally, ensure the sidebar is initially open by adding this after creating the elements:
    // leftColumn.style.display = 'block'; // Show sidebar initially
    // sideBar.style.display = 'none'; // Initially hidden (sidebar is open by default)
    // sidebarHide.style.display = 'inline-block'

    // Replace this:
    leftColumn.style.display = 'block'; // Show sidebar initially
    sideBar.style.display = 'none'; // Initially hidden (sidebar is open by default)
    sidebarHide.style.display = 'inline-block'

    // +++++++=====++++====++++===+++++===+++===+++===++===+++===+++===+++====+++==++===+++====++++===++====++===+++=
    // With this:
    // if (isMobileView()) {
    //     // Mobile - start with sidebar closed
    //     leftColumn.style.display = 'none';
    //     sideBar.style.display = 'inline-block';
    //     sidebarHide.style.display = 'none';
    // } else {
    //     // Desktop - start with sidebar open
    //     leftColumn.style.display = 'block';
    //     sideBar.style.display = 'none';
    //     sidebarHide.style.display = 'inline-block';
    // }
    // +++++++=====++++====++++===+++++===+++===+++===++===+++===+++===+++====+++==++===+++====++++===++====++===+++=
    // Update the initial state logic
    if (isMobileView()) {
        // Mobile - start with sidebar closed
        leftColumn.style.display = 'none';
        sideBar.style.display = 'inline-block';
        sidebarHide.style.display = 'none';
        sidebarPanel.classList.add('hidden');
    } else {
        // Desktop - start with sidebar open
        leftColumn.style.display = 'block';
        sideBar.style.display = 'none';
        sidebarHide.style.display = 'inline-block';
        sidebarPanel.classList.remove('hidden');
    }

    // export button dropdown 
    export_btn.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent bubbling

        const existing = document.getElementById("export-dropdown");
        if (existing) {
            existing.remove();
            return;
        }

        const dropdown = document.createElement("div");
        dropdown.id = "export-dropdown";
        dropdown.classList.add("export-dropdown");

        dropdown.innerHTML = `
        <div class="export-icon" id="export-docx">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1976D2" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm1 15h-2v-2h2v2zm0-4h-2v-4h2v4zm-4 4H9v-6h2v6zm0-8H9V9h2v2z"/></svg>
        Export as DOC
        </div>
        <div class="export-icon" id="export-pdf">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#D32F2F" viewBox="0 0 24 24"><path d="M19 2H8c-1.1 0-2 .9-2 2v5H4v8h2v5c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 14H9v-2h7v2zm0-4H9V10h7v2zm0-4H9V6h7v2z"/></svg>
            Export as PDF
        </div>
        `;

        export_btn.appendChild(dropdown);

        document.getElementById("export-docx").addEventListener("click", exportAsDocx);
        document.getElementById("export-pdf").addEventListener("click", exportAsPdf);

    });


    // Add title and close button to header

    // chat_container.appendChild(chat_header);
    rightColumn.appendChild(chat_header);
    // rightColumn.appendChild(buttonHeader)

    const chat_body = document.createElement('div');
    chat_body.classList.add('chat-body');
    chat_body.id = "chat-body"

    chat_body.classList.add('skeleton');
    historyContainer.classList.add('skeleton');

    rightColumn.appendChild(chat_body);


    // Expand functionality
    let isExpanded = false;
    const initialChatContainerStyles = {
        height: '530px',
        width: '480px',
        zIndex: '999'
    };

    const expandedChatContainerStyles = {
        height: '700px',
        width: '800px',
        zIndex: '9999'
    };

    // Store initial chat body height
    const initialChatBodyHeight = '450px';
    const expandedChatBodyHeight = '614px';

    // SIDEBAR PANEL HISROTY ITEMS
    const historyContainerHeightInitial = '440px'
    const historyContainerHeightExpanded = '610px'

    function toggleExpand() {
        const chatContainer = document.querySelector('.chat-container');
        const leftColumn = document.querySelector('.chat-left-column');
        const chatBody = document.querySelector('.chat-body');
        const historyContainer = document.querySelector('.history-container');

        if (!isExpanded) {
            // Store initial values before expanding
            initialChatContainerStyles.height = chatContainer.style.height || getComputedStyle(chatContainer).height;
            initialChatContainerStyles.width = chatContainer.style.width || getComputedStyle(chatContainer).width;

            // Apply expanded styles
            chatContainer.style.height = expandedChatContainerStyles.height;
            chatContainer.style.width = expandedChatContainerStyles.width;
            chatContainer.style.zIndex = expandedChatContainerStyles.zIndex;

            // Adjust columns
            leftColumn.style.width = '180px'; // Wider sidebar when expanded
            chatBody.style.height = expandedChatBodyHeight; // Set expanded height

            historyContainer.style.maxHeight = historyContainerHeightExpanded;

            // LOADING SKELTON 
            chatContainer.classList.add('expanded');


            // Update icon
            expandBtn.innerHTML = squeezeIcon;
            isExpanded = true;

        } else {
            // Revert to initial styles
            chatContainer.style.height = initialChatContainerStyles.height;
            chatContainer.style.width = initialChatContainerStyles.width;
            chatContainer.style.zIndex = initialChatContainerStyles.zIndex;

            // Reset columns and chat body height
            leftColumn.style.width = '180px';
            chatBody.style.height = initialChatBodyHeight;

            historyContainer.style.maxHeight = historyContainerHeightInitial;

            // LOADING SKELTON 
            chatContainer.classList.remove('expanded');


            // Update icon
            expandBtn.innerHTML = expandbtnIcon;
            isExpanded = false;
        }
    }

    expandBtn.addEventListener('click', toggleExpand);


    // ===========================================================================================================

    // ===========================================================================================================



    // WRAPPER DIV (Suggestions and input div)
    const wrapper_div = document.createElement("div")
    wrapper_div.classList.add("wrapper-div")

    // suggestion dropdown div
    const suggestions = document.createElement("div");
    suggestions.classList.add("suggestions")


    // prompts bubble inside suggestions
    const prompt_ul = document.createElement("ul");
    // const prompt_li = document.createElement("li");

    prompt_ul.classList.add("prompt-ul");
    prompt_ul.id = "prompt-ul"


    // Input + button wrapper | footer
    const chat_input_group = document.createElement('div');
    chat_input_group.classList.add('chat-input-group');

    // Input field
    const chat_input = document.createElement("textarea");
    chat_input.type = "text";
    chat_input.placeholder = "Type your message ...";
    chat_input.classList.add('chat-input');
    chat_input.rows = 1;


    // Keydown event for Enter and Shift+Enter
    // chat_input.addEventListener('keydown', function (e) {
    //     if (e.key === 'Enter') {
    //         if (e.shiftKey) {
    //             // Allow newline
    //             chat_input.rows = 2;
    //             return;
    //         } else {
    //             e.preventDefault(); // Prevent newline
    //             chat_button.click(); // Trigger send
    //         }
    //     }
    // });


    chat_input.addEventListener('keydown', function (e) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (e.key === 'Enter') {
            if (!isMobile && e.shiftKey) {
                // Desktop + Shift+Enter → allow newline
                return;
            }

            if (!isMobile && !e.shiftKey) {
                // Desktop + Enter → send
                e.preventDefault();
                chat_button.click();
            }

            if (isMobile) {
                // Mobile + Enter → allow newline (default behavior)
            }
        }
    });



    chat_input.addEventListener('input', function (e) {
        // Reset height to auto to properly calculate the new height
        this.style.height = 'auto';

        // Set the height to scrollHeight, but with a minimum height
        this.style.height = Math.min(this.scrollHeight, 80) + 'px'; // 80px is your max-height

        // Alternatively, if you want it to shrink completely:
        // this.style.height = this.scrollHeight + 'px';
    });

    // Send button
    const chat_button = document.createElement("button");
    chat_button.innerHTML = sendArrow;
    chat_button.classList.add("chat-button");


    // Append input and button to group
    chat_input_group.appendChild(chat_input);
    chat_input_group.appendChild(chat_button);

    // append input to wrapper div
    wrapper_div.appendChild(suggestions);
    wrapper_div.appendChild(chat_input_group);


    // Prevent scroll propagation in mobile (and desktop)
    suggestions.addEventListener("touchstart", (e) => {
        e.stopPropagation();
    }, { passive: true });

    suggestions.addEventListener("touchmove", (e) => {
        e.stopPropagation();
    }, { passive: true });

    suggestions.addEventListener("wheel", (e) => {
        e.stopPropagation();
    });



    // Append wrapper div to chat container
    rightColumn.appendChild(wrapper_div);


    innerWrapper.appendChild(deletePopUp); // DELETE POP UP FOR HISTORY DELETE
    innerWrapper.appendChild(mobilePopup);      // FOR MOBILE POP UP


    innerWrapper.appendChild(leftColumn);
    innerWrapper.appendChild(rightColumn);
    rightColumn.appendChild(popupAlert)
    chat_container.appendChild(innerWrapper);

    // Append modal to body
    document.body.appendChild(chat_container);

    // Close dropdowns when clicking outside them inside chat_container
    chat_container.addEventListener("click", function (event) {
        const exportDropdown = document.getElementById("export-dropdown");

        if (
            exportDropdown &&
            !exportDropdown.contains(event.target) &&
            !event.target.closest('.export-btn')
        ) {
            exportDropdown.remove();
        }

        document.querySelectorAll(".history-dropdown-menu").forEach(menu => {
            if (!menu.contains(event.target) && !event.target.closest(".three-dots-button")) {
                menu.style.display = "none";
            }
        });
    });


    chat_button.onclick = function () {
        const message = chat_input.value.trim();
        if (!message) return;

        // Manually add timestamp above user's message
        const now = new Date();
        const date = now.toLocaleDateString('en-US');
        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });

        const chatBody = document.getElementById("chat-body");
        const time_stamp = document.createElement("div");
        time_stamp.classList.add("message-timestamp");
        time_stamp.innerText = `${date}, ${time}`;
        chatBody.appendChild(time_stamp);

        // Add user message
        addMessage(message, "user");

        // Reset input
        chat_input.value = "";
        chat_input.rows = 1;
        chat_input.style.height = "auto";
        chat_input.focus();

        // Show typing loader
        const loadingBubble = document.createElement("div");
        loadingBubble.classList.add("chat-message", "bot", "loading");
        loadingBubble.innerHTML = `
        <div class="skeleton-card default-state">
            <div class="skeleton-title"></div>
            <div class="skeleton-text"></div>
        </div>
    `;

        loadingBubble.id = "loading-bubble";
        chatBody.appendChild(loadingBubble);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Use the new Promise-based screenshot capture function:
        if (typeof captureChatbotScreenshot === 'function') {
            captureChatbotScreenshot()
                .then(blob => {
                    const formData = new FormData();
                    formData.append("prompt", message);
                    formData.append("project", ids.projectId);
                    formData.append("capture", window?.tourData?.capture_id);
                    formData.append("session", currentSessionId);
                    // formData.append("screenshot", blob, "screenshot.png");
                    formData.append("screenshot", blob, "screenshot.webp");

                    return fetch("https://user.sitepace.ai/api/chat/", {
                        method: "POST",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        body: formData
                    });
                })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to send chat.");
                    return res.json();
                })
                .then(() => {
                    const loader = document.getElementById("loading-bubble");
                    if (loader) loader.remove();

                    chatBody.innerHTML = ""; // Clear old messages

                    // Use your helper function here
                    const captureId = window?.tourData?.capture_id;
                    return fetchChatHistory(currentSessionId, captureId);
                })
                .catch(err => {
                    console.error("Chat error:", err);
                    const loader = document.getElementById("loading-bubble");
                    if (loader) loader.remove();
                });
        } else {
            console.error("Screenshot function not initialized.");
        }
    };


    // Handle close

    close_button.onclick = function () {

        document.body.removeChild(document.getElementById("chat-container"));


        // const sidebarPanel = document.querySelector('.sidebar-panel');

        if (chatContainer) document.body.removeChild(chatContainer);
        // if (sidebarPanel) document.body.removeChild(sidebarPanel);

        if (isMobilePortrait) {
            krpano.set("layer[bottom_bar].visible", 'true');
            krpano.set("layer[trajectory_toggle_switch].visible", 'true');
            krpano.set("layer[datetime_bar].visible", 'true');
            krpano.set("layer[date_bar].visible", 'true');
            krpano.set("layer[time_bar].visible", 'true');
            krpano.set("layer[floorplan_container].visible", 'true');
            krpano.set("layer[floor_bar].visible", 'true');
        }
    };



    // =============================================================
    // function captureChatbotScreenshot() {
    //     return new Promise((resolve, reject) => {
    //         if (!window.krpano || !krpano.webGL || !krpano.webGL.makeScreenshot) {
    //             return reject(new Error("krpano or screenshot API not initialized"));
    //         }

    //         // Remove old screenshot overlay
    //         krpano.call("removelayer(screenshot,true)");

    //         // ✅ Force krpano to redraw the view (important)
    //         krpano.call("invalidateview();");

    //         // ✅ Wait two frames before capturing
    //         requestAnimationFrame(() => {
    //             requestAnimationFrame(() => {
    //                 setTimeout(() => {
    //                     try {
    //                         const sizeinfo = { w: 0, h: 0 };
    //                         const screenshotcanvas = krpano.webGL.makeScreenshot(
    //                             window.innerWidth,
    //                             window.innerHeight,
    //                             true,
    //                             "canvas",
    //                             0,
    //                             null,
    //                             sizeinfo,
    //                             {} // fresh cache
    //                         );

    //                         if (!screenshotcanvas) {
    //                             return reject(new Error("Screenshot canvas not created"));
    //                         }

    //                         screenshotcanvas.toBlob(blob => {
    //                             if (!blob) return reject(new Error("Failed to convert screenshot to Blob"));
    //                             resolve(blob);
    //                             // }, "image/png");
    //                         }, "image/webp", 0.85); // Use WebP with quality 0.85
    //                     } catch (err) {
    //                         reject(err);
    //                     }
    //                 }, 50); // short safety delay
    //             });
    //         });
    //     });
    // }

    // =============================================================


    function captureChatbotScreenshot() {
        return new Promise((resolve, reject) => {
            if (!window.krpano || !krpano.webGL || !krpano.webGL.makeScreenshot) {
                return reject(new Error("krpano or screenshot API not initialized"));
            }

            // Remove old screenshot overlay
            krpano.call("removelayer(screenshot,true)");

            // ✅ Force krpano to redraw the view (important)
            krpano.call("invalidateview();");

            // ✅ Wait two frames before capturing
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        try {
                            const desktopWidth = 1920; // Fixed desktop width
                            const desktopHeight = 1080; // Fixed desktop height
                            const sizeinfo = { w: 0, h: 0 };

                            // Store original viewport size
                            const originalWidth = krpano.view.stagewidth;
                            const originalHeight = krpano.view.stageheight;

                            // Temporarily set to desktop size
                            krpano.call(`setsize(${desktopWidth},${desktopHeight},force);`);

                            const screenshotcanvas = krpano.webGL.makeScreenshot(
                                desktopWidth,
                                desktopHeight,
                                true,
                                "canvas",
                                0,
                                null,
                                sizeinfo,
                                {}
                            );

                            // Restore original size
                            krpano.call(`setsize(${originalWidth},${originalHeight},force);`);

                            if (!screenshotcanvas) {
                                return reject(new Error("Screenshot canvas not created"));
                            }

                            screenshotcanvas.toBlob(blob => {
                                if (!blob) return reject(new Error("Failed to convert screenshot to Blob"));
                                resolve(blob);
                                // }, "image/png");
                            }, "image/webp", 0.85); // Use WebP with quality 0.85
                        } catch (err) {
                            reject(err);
                        }
                    }, 50); // short safety delay
                });
            });
        });
    }



    // async function exportAsDocx() {
    //     console.log("==================== DOCX EXPORT =======================");

    //     const {
    //         Document,
    //         Paragraph,
    //         TextRun,
    //         HeadingLevel,
    //         Packer,
    //         Header,
    //         Footer,
    //         AlignmentType,
    //         BorderStyle,
    //         ImageRun,
    //         Table,
    //         TableRow,
    //         TableCell,
    //         WidthType,
    //         PageNumber
    //     } = docx;

    //     let projectName = "Unknown Project";
    //     const captureId = window?.tourData?.capture_id;
    //     const tourLink = `https://user.sitepace.ai/catalogue?cId=${captureId}`;
    //     const exportTime = new Date().toLocaleString('en-US');

    //     try {
    //         const res = await fetch(`https://user.sitepace.ai/api/chat/history/?session_id=${currentSessionId}`, {
    //             headers: { 'Authorization': 'Bearer ' + accessToken }
    //         });
    //         const responseData = await res.json();
    //         projectName = responseData.project_name || projectName;
    //     } catch (err) {
    //         console.error("Failed to fetch project name:", err);
    //     }

    //     const chatContainer = document.querySelector("#chat-container");
    //     if (!chatContainer) {
    //         alert("Chat container not found.");
    //         return;
    //     }

    //     const chatBody = chatContainer.querySelector("#chat-body");
    //     if (!chatBody) {
    //         alert("No chat content found to export.");
    //         return;
    //     }

    //     const logoData = await fetch("icons/main-black-icon.png");
    //     const logoBlob = await logoData.blob();
    //     const logoArrayBuffer = await logoBlob.arrayBuffer();

    //     // Helper to parse markdown tables from text block - ADDED FROM SECOND FUNCTION
    //     function parseMarkdownTable(textBlock) {
    //         const lines = textBlock.trim().split("\n");
    //         const tableLines = lines.filter(line => line.trim().startsWith("|") && line.includes("|"));
    //         if (tableLines.length < 2) return null;

    //         // Check second line is separator line like | --- | --- |
    //         const separatorLine = tableLines[1].trim();
    //         if (!/^(\|\s*:?-+:?\s*)+\|?$/.test(separatorLine)) return null;

    //         // Extract headers and rows
    //         const headers = tableLines[0].split("|").map(h => h.trim()).filter(Boolean);
    //         const rows = tableLines.slice(2).map(row => row.split("|").map(cell => cell.trim()).filter(Boolean));

    //         return { headers, rows };
    //     }

    //     const headerTable = new Table({
    //         width: {
    //             size: 100,
    //             type: WidthType.PERCENTAGE,
    //         },
    //         layout: "fixed",
    //         rows: [
    //             new TableRow({
    //                 children: [
    //                     // LEFT cell: Header info
    //                     new TableCell({
    //                         width: { size: 70, type: WidthType.PERCENTAGE },
    //                         children: [
    //                             new Paragraph({
    //                                 children: [
    //                                     new TextRun({
    //                                         text: "SitePace IntelliView™ – Virtual Tour Chat Transcript",
    //                                         bold: true,
    //                                         size: 24,
    //                                         color: "1A5276",
    //                                     }),
    //                                 ],
    //                                 spacing: { after: 100 },
    //                             }),
    //                             new Paragraph({
    //                                 children: [
    //                                     new TextRun({
    //                                         text: `Project Name: ${projectName}`,
    //                                         bold: true,
    //                                         size: 20,
    //                                         color: "1A5276",
    //                                     }),
    //                                 ],
    //                                 spacing: { after: 100 },
    //                             }),
    //                             new Paragraph({
    //                                 children: [
    //                                     new TextRun({
    //                                         text: `Date & Time of Export: ${exportTime}`,
    //                                         size: 20,
    //                                         color: "1A5276",
    //                                     }),
    //                                 ],
    //                                 spacing: { after: 100 },
    //                             }),
    //                             new Paragraph({
    //                                 children: [
    //                                     new TextRun({
    //                                         text: "Generated by: SitePace IntelliView™ (AI Assistant)",
    //                                         size: 20,
    //                                         color: "1A5276",
    //                                     }),
    //                                 ],
    //                                 spacing: { after: 100 },
    //                             }),
    //                             new Paragraph({
    //                                 children: [
    //                                     new TextRun({
    //                                         text: "Tour Reference: ",
    //                                         size: 20,
    //                                     }),
    //                                     new TextRun({
    //                                         text: tourLink,
    //                                         style: "Hyperlink",
    //                                         size: 20,
    //                                     }),
    //                                 ],
    //                                 spacing: { after: 100 },
    //                             }),
    //                         ],
    //                         borders: {
    //                             top: { style: BorderStyle.NONE },
    //                             bottom: { style: BorderStyle.NONE },
    //                             left: { style: BorderStyle.NONE },
    //                             right: { style: BorderStyle.NONE },
    //                         },
    //                     }),

    //                     // RIGHT cell: nested table with logo + IntelliViz
    //                     new TableCell({
    //                         width: { size: 30, type: WidthType.PERCENTAGE },
    //                         children: [
    //                             new Table({
    //                                 width: { size: 100, type: WidthType.PERCENTAGE },
    //                                 layout: "fixed",
    //                                 rows: [
    //                                     new TableRow({
    //                                         children: [
    //                                             new TableCell({
    //                                                 width: { size: 1500, type: WidthType.DXA },
    //                                                 children: [
    //                                                     new Paragraph({
    //                                                         children: [
    //                                                             new ImageRun({
    //                                                                 data: logoArrayBuffer,
    //                                                                 transformation: {
    //                                                                     width: 60,
    //                                                                     height: 60,
    //                                                                 },
    //                                                             }),
    //                                                         ],
    //                                                         alignment: AlignmentType.RIGHT,
    //                                                     }),
    //                                                 ],
    //                                                 borders: {
    //                                                     top: { style: BorderStyle.NONE },
    //                                                     bottom: { style: BorderStyle.NONE },
    //                                                     left: { style: BorderStyle.NONE },
    //                                                     right: { style: BorderStyle.NONE },
    //                                                 },
    //                                             }),
    //                                             new TableCell({
    //                                                 children: [
    //                                                     new Paragraph({
    //                                                         children: [
    //                                                             new TextRun({
    //                                                                 text: "IntelliViz™",
    //                                                                 bold: true,
    //                                                                 color: "1A5276",
    //                                                                 size: 18,
    //                                                             }),
    //                                                         ],
    //                                                         alignment: AlignmentType.LEFT,
    //                                                     }),
    //                                                 ],
    //                                                 borders: {
    //                                                     top: { style: BorderStyle.NONE },
    //                                                     bottom: { style: BorderStyle.NONE },
    //                                                     left: { style: BorderStyle.NONE },
    //                                                     right: { style: BorderStyle.NONE },
    //                                                 },
    //                                             }),
    //                                         ],
    //                                     }),
    //                                 ],
    //                             }),
    //                         ],
    //                         borders: {
    //                             top: { style: BorderStyle.NONE },
    //                             bottom: { style: BorderStyle.NONE },
    //                             left: { style: BorderStyle.NONE },
    //                             right: { style: BorderStyle.NONE },
    //                         },
    //                     }),
    //                 ],
    //             }),
    //         ],
    //         margins: {
    //             bottom: 0, // No bottom margin for the entire table
    //         },
    //     });


    //     const mainContent = [];
    //     let lastMessageType = null;

    //     Array.from(chatBody.children).forEach((el) => {
    //         if (el.classList.contains("chat-message")) {
    //             const isUser = el.classList.contains("user");
    //             const role = isUser ? "User" : "SitePace";

    //             let content = el.innerHTML;

    //             // Strip html tags but preserve line breaks as \n - MODIFIED TO USE TABLE PARSING
    //             const paragraphs = content
    //                 .replace(/<br\s*\/?>/gi, "\n")
    //                 .replace(/<[^>]*>/g, "")
    //                 .split("\n")
    //                 .filter((p) => p.trim());

    //             // Join paragraphs back into single text block for table parsing - ADDED FROM SECOND FUNCTION
    //             const messageText = paragraphs.join("\n");

    //             // Check if message contains a markdown table, if so add as table, else normal paragraphs - ADDED FROM SECOND FUNCTION
    //             const parsedTable = parseMarkdownTable(messageText);
    //             if (parsedTable) {
    //                 // Add space before table if last message was from user (for formatting)
    //                 if (!isUser && lastMessageType === "user") {
    //                     mainContent.push(new Paragraph({ text: "", spacing: { before: 50 } }));
    //                 }

    //                 // Add role heading
    //                 mainContent.push(
    //                     new Paragraph({
    //                         text: `${role}:`,
    //                         style: isUser ? "userMessage" : "botMessage",
    //                         spacing: { before: 0, after: 0 },
    //                     })
    //                 );

    //                 // Build DOCX table rows
    //                 const tableRows = [];

    //                 // Header row with bold text
    //                 const headerCells = parsedTable.headers.map(headerText =>
    //                     new TableCell({
    //                         children: [new Paragraph({ children: [new TextRun({ text: headerText, bold: true, size: 18 })] })],
    //                         margins: { top: 50, bottom: 50, left: 50, right: 50 },
    //                     })
    //                 );
    //                 tableRows.push(new TableRow({ children: headerCells }));

    //                 // Data rows
    //                 parsedTable.rows.forEach(row => {
    //                     const rowCells = row.map(cellText =>
    //                         new TableCell({
    //                             children: [new Paragraph({ children: [new TextRun({ text: cellText, size: 18 })] })],
    //                             margins: { top: 50, bottom: 50, left: 50, right: 50 },
    //                         })
    //                     );
    //                     tableRows.push(new TableRow({ children: rowCells }));
    //                 });

    //                 mainContent.push(
    //                     new Table({
    //                         rows: tableRows,
    //                         width: { size: 100, type: WidthType.PERCENTAGE },
    //                         layout: "fixed",
    //                     }),
    //                     new Paragraph({
    //                         text: "",
    //                         spacing: { after: 100 } // Adjust this value as needed
    //                     })
    //                 );

    //                 lastMessageType = isUser ? "user" : "bot";

    //                 // Skip normal paragraph output for this message because table was inserted
    //                 return;
    //             }

    //             if (!isUser && lastMessageType === "user") {
    //                 mainContent.push(new Paragraph({ text: "", spacing: { before: 50 } }));
    //             }

    //             mainContent.push(
    //                 new Paragraph({
    //                     text: `${role}:`,
    //                     style: isUser ? "userMessage" : "botMessage",
    //                     spacing: { before: 20, after: 20 },
    //                 })
    //             );

    //             paragraphs.forEach((text, index) => {
    //                 const textParts = text.split("\n");
    //                 mainContent.push(
    //                     new Paragraph({
    //                         children: textParts.map((part, i) => new TextRun({
    //                             text: part,
    //                             break: i < textParts.length - 1 ? 1 : 0
    //                         })),
    //                         style: "messageContent",
    //                         spacing: {
    //                             after: (index === paragraphs.length - 1 && !isUser) ? 300 : 0,
    //                         },
    //                     })
    //                 );
    //             });

    //             lastMessageType = isUser ? "user" : "bot";
    //         }
    //     });


    //     const doc = new Document({
    //         styles: {
    //             paragraphStyles: [
    //                 {
    //                     id: "userMessage",
    //                     name: "User Message",
    //                     run: {
    //                         bold: true,
    //                         color: "1A5276",
    //                         size: 20,
    //                     },
    //                     paragraph: {
    //                         spacing: { line: 200 },
    //                     },
    //                 },
    //                 {
    //                     id: "botMessage",
    //                     name: "Bot Message",
    //                     run: {
    //                         bold: true,
    //                         color: "000000",
    //                         size: 20,
    //                     },
    //                     paragraph: {
    //                         spacing: { line: 200 },
    //                     },
    //                 },
    //                 {
    //                     id: "messageContent",
    //                     name: "Message Content",
    //                     run: {
    //                         size: 18,
    //                     },
    //                 },
    //                 {
    //                     id: "footer",
    //                     name: "Footer",
    //                     run: {
    //                         color: "666666",
    //                         size: 18,
    //                     },
    //                 },
    //                 {
    //                     id: "Hyperlink",
    //                     name: "Hyperlink",
    //                     run: {
    //                         color: "0563C1",
    //                         underline: {},
    //                     },
    //                 },
    //             ],
    //         },
    //         sections: [
    //             {
    //                 properties: {
    //                     page: {
    //                         margin: {
    //                             top: 1440,    // 1 inch
    //                             right: 1440,
    //                             bottom: 1440,
    //                             left: 1440,
    //                             header: 720,  // 0.5 inch
    //                             footer: 720,  // 0.5 inch
    //                         },
    //                         pageBorders: {
    //                             display: "all",
    //                             offsetFrom: "page",
    //                             zOrder: "back",
    //                             top: {
    //                                 style: BorderStyle.DOUBLE,  // Changed to DOUBLE for thick border
    //                                 size: 12,  // Increased size for better visibility
    //                                 color: "000000",
    //                                 space: 24
    //                             },
    //                             right: {
    //                                 style: BorderStyle.DOUBLE,
    //                                 size: 12,
    //                                 color: "000000",
    //                                 space: 24
    //                             },
    //                             bottom: {
    //                                 style: BorderStyle.DOUBLE,
    //                                 size: 12,
    //                                 color: "000000",
    //                                 space: 24
    //                             },
    //                             left: {
    //                                 style: BorderStyle.DOUBLE,
    //                                 size: 12,
    //                                 color: "000000",
    //                                 space: 24
    //                             },
    //                         },
    //                     },
    //                 },
    //                 headers: {
    //                     default: new Header({
    //                         children: [
    //                             headerTable,
    //                             new Paragraph({
    //                                 children: [],
    //                                 border: {
    //                                     bottom: {
    //                                         style: BorderStyle.SINGLE,
    //                                         size: 4,
    //                                         color: "000000",
    //                                     },
    //                                 },
    //                                 spacing: {
    //                                     before: 0,
    //                                     after: 100,
    //                                 },
    //                             }),
    //                         ],
    //                     }),
    //                 },
    //                 footers: {
    //                     default: new Footer({
    //                         children: [
    //                             new Paragraph({
    //                                 border: {
    //                                     top: {
    //                                         style: BorderStyle.SINGLE,
    //                                         size: 4,
    //                                         color: "000000",
    //                                     },
    //                                 },
    //                                 spacing: {
    //                                     after: 0,
    //                                 },
    //                             }),
    //                             new Table({
    //                                 width: { size: 100, type: WidthType.PERCENTAGE },
    //                                 rows: [
    //                                     new TableRow({
    //                                         children: [
    //                                             new TableCell({
    //                                                 width: { size: 70, type: WidthType.PERCENTAGE },
    //                                                 children: [
    //                                                     new Paragraph({
    //                                                         children: [
    //                                                             new TextRun({
    //                                                                 text: "Generated using SitePace.ai's proprietary IntelliView™ platform.",
    //                                                                 style: "footer",
    //                                                                 size: 16,
    //                                                                 color: "666666",
    //                                                             }),
    //                                                             new TextRun({
    //                                                                 text: "\nThis document is confidential and intended for internal use only.",
    //                                                                 style: "footer",
    //                                                                 size: 16,
    //                                                                 color: "666666",
    //                                                                 break: 1,
    //                                                             }),
    //                                                         ],
    //                                                         alignment: AlignmentType.LEFT,
    //                                                     }),
    //                                                 ],
    //                                                 borders: {
    //                                                     top: { style: BorderStyle.NONE },
    //                                                     bottom: { style: BorderStyle.NONE },
    //                                                     left: { style: BorderStyle.NONE },
    //                                                     right: { style: BorderStyle.NONE },
    //                                                 },
    //                                             }),
    //                                             new TableCell({
    //                                                 width: { size: 30, type: WidthType.PERCENTAGE },
    //                                                 children: [
    //                                                     new Paragraph({
    //                                                         children: [
    //                                                             new TextRun({
    //                                                                 text: "Page ",
    //                                                                 style: "footer",
    //                                                                 size: 16,
    //                                                             }),
    //                                                             new TextRun({
    //                                                                 children: [PageNumber.CURRENT],
    //                                                                 style: "footer",
    //                                                             }),
    //                                                             new TextRun({
    //                                                                 text: " of ",
    //                                                                 style: "footer",
    //                                                                 size: 16,
    //                                                             }),
    //                                                             new TextRun({
    //                                                                 children: [PageNumber.TOTAL_PAGES],
    //                                                                 style: "footer",
    //                                                             }),
    //                                                         ],
    //                                                         alignment: AlignmentType.RIGHT,
    //                                                     }),
    //                                                 ],
    //                                                 borders: {
    //                                                     top: { style: BorderStyle.NONE },
    //                                                     bottom: { style: BorderStyle.NONE },
    //                                                     left: { style: BorderStyle.NONE },
    //                                                     right: { style: BorderStyle.NONE },
    //                                                 },
    //                                             }),
    //                                         ],
    //                                     }),
    //                                 ],
    //                             }),
    //                         ],
    //                     }),
    //                 },
    //                 children: [
    //                     new Table({
    //                         width: { size: 100, type: WidthType.PERCENTAGE },
    //                         borders: {
    //                             top: { style: BorderStyle.NONE },
    //                             bottom: { style: BorderStyle.NONE },
    //                             left: { style: BorderStyle.NONE },
    //                             right: { style: BorderStyle.NONE },
    //                         },
    //                         rows: [
    //                             new TableRow({
    //                                 children: [
    //                                     new TableCell({
    //                                         children: [
    //                                             ...mainContent,
    //                                         ],
    //                                         margins: {
    //                                             top: 0,
    //                                             bottom: 100,
    //                                             left: 100,
    //                                             right: 100,
    //                                         },
    //                                     }),
    //                                 ],
    //                             }),
    //                         ],
    //                     }),
    //                 ],
    //             },
    //         ],
    //     });

    //     try {
    //         const blob = await Packer.toBlob(doc);
    //         const safeName = projectName.replace(/[^a-z0-9]/gi, "_").substring(0, 50);
    //         const filename = `SitePace_Chat_${safeName}_${Date.now()}.docx`;
    //         saveAs(blob, filename);
    //         console.log("✅ DOCX export complete:", filename);
    //     } catch (err) {
    //         console.error("❌ DOCX export failed:", err);
    //         alert("Export failed. See console for details.");
    //     }
    // }

    function showNotification(message, duration = 3000) {
        const popup = document.querySelector(".delete-popup");

        // Configure as notification
        popup.innerHTML = `
            <div class="delete-popup-content">
                <div class="delete-popup-text">${message}</div>
            </div>
        `;

        popup.classList.add("notification");
        popup.style.display = 'block';

        // Auto-hide after duration
        setTimeout(() => {
            popup.style.display = 'none';
            popup.classList.remove("notification");
        }, duration);
    }


    let cachedLogoArrayBuffer = null;

    async function exportAsDocx() {
        console.log("==================== DOCX EXPORT =======================");
        showNotification("Please wait, your DOC download will start shortly");

        const {
            Document,
            Paragraph,
            TextRun,
            HeadingLevel,
            Packer,
            Header,
            Footer,
            AlignmentType,
            BorderStyle,
            ImageRun,
            Table,
            TableRow,
            TableCell,
            WidthType,
            PageNumber
        } = docx;

        let projectName = "Unknown Project";
        const captureId = window?.tourData?.capture_id;
        const tourLink = `https://user.sitepace.ai/catalogue?cId=${captureId}`;
        const exportTime = new Date().toLocaleString('en-US');

        let chatData = [];
        try {
            const res = await fetch(`https://user.sitepace.ai/api/chat/history/?session_id=${currentSessionId}`, {
                headers: { 'Authorization': 'Bearer ' + accessToken }
            });
            const responseData = await res.json();
            chatData = responseData.chat_history || [];
            projectName = responseData.project_name || projectName;
        } catch (err) {
            console.error("Failed to fetch chat data:", err);
            return;
        }

        // Fetch or use cached logo
        if (!cachedLogoArrayBuffer) {
            try {
                const logoData = await fetch("icons/Group 12.png");
                const logoBlob = await logoData.blob();
                cachedLogoArrayBuffer = await logoBlob.arrayBuffer();
            } catch (err) {
                console.error("Failed to fetch logo:", err);
                cachedLogoArrayBuffer = null;
            }
        }

        // Helper to parse markdown tables from text block
        function parseMarkdownTable(textBlock) {
            const lines = textBlock.trim().split("\n");
            const tableLines = lines.filter(line => line.trim().startsWith("|") && line.includes("|"));
            if (tableLines.length < 2) return null;

            const separatorLine = tableLines[1].trim();
            if (!/^(\|\s*:?-+:?\s*)+\|?$/.test(separatorLine)) return null;

            const headers = tableLines[0].split("|").map(h => h.trim()).filter(Boolean);
            const rows = tableLines.slice(2).map(row => row.split("|").map(cell => cell.trim()).filter(Boolean));

            return { headers, rows };
        }

        // Function to convert WEBP to PNG using Canvas
        function convertWebpToPng(webpArrayBuffer) {
            return new Promise((resolve, reject) => {
                try {
                    const blob = new Blob([webpArrayBuffer], { type: 'image/webp' });
                    const img = new Image();

                    img.onload = function () {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        canvas.toBlob(async (pngBlob) => {
                            if (pngBlob) {
                                const pngArrayBuffer = await pngBlob.arrayBuffer();
                                resolve(pngArrayBuffer);
                            } else {
                                reject(new Error('Failed to convert to PNG'));
                            }
                        }, 'image/png', 0.95);
                    };

                    img.onerror = () => reject(new Error('Failed to load WEBP image'));
                    const objectUrl = URL.createObjectURL(blob);
                    img.src = objectUrl;
                } catch (error) {
                    reject(error);
                }
            });
        }

        // Function to fetch and convert screenshot to PNG array buffer
        async function getScreenshotImage(screenshotUrl) {
            try {
                console.log("Fetching screenshot:", screenshotUrl);
                const response = await fetch(screenshotUrl);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const arrayBuffer = await response.arrayBuffer();
                console.log("Screenshot fetched, size:", arrayBuffer.byteLength);

                const contentType = response.headers.get('content-type');
                const isWebp = contentType?.includes('webp') || screenshotUrl.includes('.webp');

                if (isWebp) {
                    console.log("Converting WEBP to PNG...");
                    const pngArrayBuffer = await convertWebpToPng(arrayBuffer);
                    console.log("Conversion complete, PNG size:", pngArrayBuffer.byteLength);
                    return pngArrayBuffer;
                }
                return arrayBuffer;
            } catch (err) {
                console.error("Failed to fetch/convert screenshot:", err);
                return null;
            }
        }

        // Pre-fetch all screenshots in parallel
        const screenshotPromises = chatData
            .filter(chat => chat.screenshot)
            .map(chat => getScreenshotImage(chat.screenshot)
                .then(result => ({ url: chat.screenshot, data: result }))
                .catch(err => ({ url: chat.screenshot, data: null, error: err }))
            );

        const screenshotResults = await Promise.all(screenshotPromises);
        const screenshotMap = new Map(screenshotResults.map(result => [result.url, result.data]));

        const headerTable = new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            layout: "fixed",
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            width: { size: 70, type: WidthType.PERCENTAGE },
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "SitePace IntelliViz™ – Virtual Tour Chat Transcript",
                                            bold: true,
                                            size: 24,
                                            color: "1A5276",
                                        }),
                                    ],
                                    spacing: { after: 100 },
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Project Name: ${projectName}`,
                                            bold: true,
                                            size: 20,
                                            color: "1A5276",
                                        }),
                                    ],
                                    spacing: { after: 100 },
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `Date & Time of Export: ${exportTime}`,
                                            size: 20,
                                            color: "1A5276",
                                        }),
                                    ],
                                    spacing: { after: 100 },
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "Generated by: SitePace IntelliViz™ (AI Assistant)",
                                            size: 20,
                                            color: "1A5276",
                                        }),
                                    ],
                                    spacing: { after: 100 },
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "Tour Reference: ",
                                            size: 20,
                                        }),
                                        new TextRun({
                                            text: tourLink,
                                            style: "Hyperlink",
                                            size: 20,
                                        }),
                                    ],
                                    spacing: { after: 100 },
                                }),
                            ],
                            borders: {
                                top: { style: BorderStyle.NONE },
                                bottom: { style: BorderStyle.NONE },
                                left: { style: BorderStyle.NONE },
                                right: { style: BorderStyle.NONE },
                            },
                        }),
                        new TableCell({
                            width: { size: 30, type: WidthType.PERCENTAGE },
                            children: [
                                new Table({
                                    width: { size: 100, type: WidthType.PERCENTAGE },
                                    layout: "fixed",
                                    rows: [
                                        new TableRow({
                                            children: [
                                                new TableCell({
                                                    width: { size: 1500, type: WidthType.DXA },
                                                    children: [
                                                        new Paragraph({
                                                            children: [
                                                                new ImageRun({
                                                                    data: cachedLogoArrayBuffer,
                                                                    transformation: {
                                                                        width: 60,
                                                                        height: 60,
                                                                    },
                                                                }),
                                                            ],
                                                            alignment: AlignmentType.RIGHT,
                                                        }),
                                                    ],
                                                    borders: {
                                                        top: { style: BorderStyle.NONE },
                                                        bottom: { style: BorderStyle.NONE },
                                                        left: { style: BorderStyle.NONE },
                                                        right: { style: BorderStyle.NONE },
                                                    },
                                                }),
                                                new TableCell({
                                                    children: [
                                                        new Paragraph({
                                                            children: [
                                                                new TextRun({
                                                                    text: "IntelliViz™",
                                                                    bold: true,
                                                                    color: "1A5276",
                                                                    size: 18,
                                                                }),
                                                            ],
                                                            alignment: AlignmentType.LEFT,
                                                        }),
                                                    ],
                                                    borders: {
                                                        top: { style: BorderStyle.NONE },
                                                        bottom: { style: BorderStyle.NONE },
                                                        left: { style: BorderStyle.NONE },
                                                        right: { style: BorderStyle.NONE },
                                                    },
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                            borders: {
                                top: { style: BorderStyle.NONE },
                                bottom: { style: BorderStyle.NONE },
                                left: { style: BorderStyle.NONE },
                                right: { style: BorderStyle.NONE },
                            },
                        }),
                    ],
                }),
            ],
            margins: { bottom: 0 },
        });

        const mainContent = [];
        let lastMessageType = null;

        // Process chat data
        for (const chat of chatData) {
            if (!chat.prompt?.trim() || !chat.response?.trim()) continue;

            const userContent = chat.prompt
                .replace(/<br\s*\/?>/gi, "\n")
                .replace(/<[^>]*>/g, "")
                .replace(/\*\*/g, "")
                .split("\n")
                .filter((p) => p.trim());

            const userText = userContent.join("\n");
            const userParsedTable = parseMarkdownTable(userText);

            if (userParsedTable) {
                if (lastMessageType === "bot") {
                    mainContent.push(new Paragraph({ text: "", spacing: { before: 50 } }));
                }
                mainContent.push(
                    new Paragraph({
                        text: "User:",
                        style: "userMessage",
                        spacing: { before: 0, after: 0 },
                    })
                );

                const tableRows = [];
                const headerCells = userParsedTable.headers.map(headerText =>
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: headerText, bold: true, size: 18 })] })],
                        margins: { top: 50, bottom: 50, left: 50, right: 50 },
                    })
                );
                tableRows.push(new TableRow({ children: headerCells }));

                userParsedTable.rows.forEach(row => {
                    const rowCells = row.map(cellText =>
                        new TableCell({
                            children: [new Paragraph({ children: [new TextRun({ text: cellText, size: 18 })] })],
                            margins: { top: 50, bottom: 50, left: 50, right: 50 },
                        })
                    );
                    tableRows.push(new TableRow({ children: rowCells }));
                });

                mainContent.push(
                    new Table({
                        rows: tableRows,
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        layout: "fixed",
                    }),
                    new Paragraph({ text: "", spacing: { after: 100 } })
                );
            } else {
                if (lastMessageType === "bot") {
                    mainContent.push(new Paragraph({ text: "", spacing: { before: 50 } }));
                }
                mainContent.push(
                    new Paragraph({
                        text: "User:",
                        style: "userMessage",
                        spacing: { before: 20, after: 20 },
                    })
                );
                userContent.forEach((text, index) => {
                    const textParts = text.split("\n");
                    mainContent.push(
                        new Paragraph({
                            children: textParts.map((part, i) => new TextRun({
                                text: part,
                                break: i < textParts.length - 1 ? 1 : 0
                            })),
                            style: "messageContent",
                            spacing: { after: 0 },
                        })
                    );
                });
            }

            lastMessageType = "user";

            // Add screenshot if it exists
            if (chat.screenshot) {
                const screenshotArrayBuffer = screenshotMap.get(chat.screenshot);
                if (screenshotArrayBuffer) {
                    console.log("Adding screenshot to document");
                    mainContent.push(
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: screenshotArrayBuffer,
                                    transformation: {
                                        width: 280,
                                        height: 150,
                                    },
                                }),
                            ],
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 100, after: 100 },
                        })
                    );
                } else {
                    console.log("Screenshot not available, adding placeholder text");
                    mainContent.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "[Screenshot could not be loaded]",
                                    italics: true,
                                    color: "666666",
                                }),
                            ],
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 100, after: 100 },
                        })
                    );
                }
            }

            const botContent = chat.response
                .replace(/<br\s*\/?>/gi, "\n")
                .replace(/<[^>]*>/g, "")
                .replace(/\*\*/g, "")
                .split("\n")
                .filter((p) => p.trim());

            const botText = botContent.join("\n");
            const botParsedTable = parseMarkdownTable(botText);

            if (botParsedTable) {
                if (lastMessageType === "user") {
                    mainContent.push(new Paragraph({ text: "", spacing: { before: 50 } }));
                }
                mainContent.push(
                    new Paragraph({
                        text: "SitePace:",
                        style: "botMessage",
                        spacing: { before: 0, after: 0 },
                    })
                );

                const tableRows = [];
                const headerCells = botParsedTable.headers.map(headerText =>
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: headerText, bold: true, size: 18 })] })],
                        margins: { top: 50, bottom: 50, left: 50, right: 50 },
                    })
                );
                tableRows.push(new TableRow({ children: headerCells }));

                botParsedTable.rows.forEach(row => {
                    const rowCells = row.map(cellText =>
                        new TableCell({
                            children: [new Paragraph({ children: [new TextRun({ text: cellText, size: 18 })] })],
                            margins: { top: 50, bottom: 50, left: 50, right: 50 },
                        })
                    );
                    tableRows.push(new TableRow({ children: rowCells }));
                });

                mainContent.push(
                    new Table({
                        rows: tableRows,
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        layout: "fixed",
                    }),
                    new Paragraph({ text: "", spacing: { after: 100 } })
                );
            } else {
                if (lastMessageType === "user") {
                    mainContent.push(new Paragraph({ text: "", spacing: { before: 50 } }));
                }
                mainContent.push(
                    new Paragraph({
                        text: "SitePace:",
                        style: "botMessage",
                        spacing: { before: 20, after: 20 },
                    })
                );
                botContent.forEach((text, index) => {
                    const textParts = text.split("\n");
                    mainContent.push(
                        new Paragraph({
                            children: textParts.map((part, i) => new TextRun({
                                text: part,
                                break: i < textParts.length - 1 ? 1 : 0
                            })),
                            style: "messageContent",
                            spacing: { after: (index === botContent.length - 1) ? 300 : 0 },
                        })
                    );
                });
            }

            lastMessageType = "bot";
        }

        const doc = new Document({
            styles: {
                paragraphStyles: [
                    {
                        id: "userMessage",
                        name: "User Message",
                        run: {
                            bold: true,
                            color: "1A5276",
                            size: 20,
                        },
                        paragraph: {
                            spacing: { line: 200 },
                        },
                    },
                    {
                        id: "botMessage",
                        name: "Bot Message",
                        run: {
                            bold: true,
                            color: "000000",
                            size: 20,
                        },
                        paragraph: {
                            spacing: { line: 200 },
                        },
                    },
                    {
                        id: "messageContent",
                        name: "Message Content",
                        run: {
                            size: 18,
                        },
                    },
                    {
                        id: "footer",
                        name: "Footer",
                        run: {
                            color: "666666",
                            size: 18,
                        },
                    },
                    {
                        id: "Hyperlink",
                        name: "Hyperlink",
                        run: {
                            color: "0563C1",
                            underline: {},
                        },
                    },
                ],
            },
            sections: [
                {
                    properties: {
                        page: {
                            margin: {
                                top: 1440,
                                right: 1440,
                                bottom: 1440,
                                left: 1440,
                                header: 720,
                                footer: 720,
                            },
                            pageBorders: {
                                display: "all",
                                offsetFrom: "page",
                                zOrder: "back",
                                top: {
                                    style: BorderStyle.DOUBLE,
                                    size: 12,
                                    color: "000000",
                                    space: 24
                                },
                                right: {
                                    style: BorderStyle.DOUBLE,
                                    size: 12,
                                    color: "000000",
                                    space: 24
                                },
                                bottom: {
                                    style: BorderStyle.DOUBLE,
                                    size: 12,
                                    color: "000000",
                                    space: 24
                                },
                                left: {
                                    style: BorderStyle.DOUBLE,
                                    size: 12,
                                    color: "000000",
                                    space: 24
                                },
                            },
                        },
                    },
                    headers: {
                        default: new Header({
                            children: [
                                headerTable,
                                new Paragraph({
                                    children: [],
                                    border: {
                                        bottom: {
                                            style: BorderStyle.SINGLE,
                                            size: 4,
                                            color: "000000",
                                        },
                                    },
                                    spacing: {
                                        before: 0,
                                        after: 100,
                                    },
                                }),
                            ],
                        }),
                    },
                    footers: {
                        default: new Footer({
                            children: [
                                new Paragraph({
                                    border: {
                                        top: {
                                            style: BorderStyle.SINGLE,
                                            size: 4,
                                            color: "000000",
                                        },
                                    },
                                    spacing: {
                                        after: 0,
                                    },
                                }),
                                new Table({
                                    width: { size: 100, type: WidthType.PERCENTAGE },
                                    rows: [
                                        new TableRow({
                                            children: [
                                                new TableCell({
                                                    width: { size: 70, type: WidthType.PERCENTAGE },
                                                    children: [
                                                        new Paragraph({
                                                            children: [
                                                                new TextRun({
                                                                    text: "Generated using SitePace.ai's proprietary IntelliViz™ platform.",
                                                                    style: "footer",
                                                                    size: 16,
                                                                    color: "666666",
                                                                }),
                                                                new TextRun({
                                                                    text: "\nThis document is confidential and intended for internal use only.",
                                                                    style: "footer",
                                                                    size: 16,
                                                                    color: "666666",
                                                                    break: 1,
                                                                }),
                                                            ],
                                                            alignment: AlignmentType.LEFT,
                                                        }),
                                                    ],
                                                    borders: {
                                                        top: { style: BorderStyle.NONE },
                                                        bottom: { style: BorderStyle.NONE },
                                                        left: { style: BorderStyle.NONE },
                                                        right: { style: BorderStyle.NONE },
                                                    },
                                                }),
                                                new TableCell({
                                                    width: { size: 30, type: WidthType.PERCENTAGE },
                                                    children: [
                                                        new Paragraph({
                                                            children: [
                                                                new TextRun({
                                                                    text: "Page ",
                                                                    style: "footer",
                                                                    size: 16,
                                                                }),
                                                                new TextRun({
                                                                    children: [PageNumber.CURRENT],
                                                                    style: "footer",
                                                                }),
                                                                new TextRun({
                                                                    text: " of ",
                                                                    style: "footer",
                                                                    size: 16,
                                                                }),
                                                                new TextRun({
                                                                    children: [PageNumber.TOTAL_PAGES],
                                                                    style: "footer",
                                                                }),
                                                            ],
                                                            alignment: AlignmentType.RIGHT,
                                                        }),
                                                    ],
                                                    borders: {
                                                        top: { style: BorderStyle.NONE },
                                                        bottom: { style: BorderStyle.NONE },
                                                        left: { style: BorderStyle.NONE },
                                                        right: { style: BorderStyle.NONE },
                                                    },
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    },
                    children: [
                        new Table({
                            width: { size: 100, type: WidthType.PERCENTAGE },
                            borders: {
                                top: { style: BorderStyle.NONE },
                                bottom: { style: BorderStyle.NONE },
                                left: { style: BorderStyle.NONE },
                                right: { style: BorderStyle.NONE },
                            },
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                ...mainContent,
                                            ],
                                            margins: {
                                                top: 0,
                                                bottom: 100,
                                                left: 100,
                                                right: 100,
                                            },
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                },
            ],
        });

        try {
            const blob = await Packer.toBlob(doc);
            const safeName = projectName.replace(/[^a-z0-9]/gi, "_").substring(0, 50);
            const filename = `SitePace_Chat_${safeName}_${Date.now()}.docx`;

            // Only modification: Flutter app detection wrapper
            if (window.flutterInAppWebView) {
                const reader = new FileReader();
                reader.onloadend = function () {
                    const base64data = reader.result.split(',')[1];
                    window.flutterInAppWebView.callHandler('saveFile', {
                        filename: filename,
                        data: base64data,
                        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    });
                };
                reader.readAsDataURL(blob);
            } else {
                // Original save behavior remains unchanged
                saveAs(blob, filename);
            }

            document.querySelector(".delete-popup").style.display = 'none';
            console.log("✅ DOCX export complete:", filename);
        } catch (err) {
            console.error("❌ DOCX export failed:", err);
        }
    }


    // =====================================
    function showErrorAlert(message, duration = 3000) {
        const popup = document.querySelector(".delete-popup");

        // Configure as error alert
        popup.innerHTML = `
            <div class="delete-popup-content">
                <div class="error-icon">⚠️</div>
                <div class="delete-popup-text">${message}</div>
            </div>
        `;

        popup.classList.add("error-alert");
        popup.style.display = 'block';

        // Auto-hide after duration
        setTimeout(() => {
            popup.style.display = 'none';
            popup.classList.remove("error-alert");
        }, duration);
    }
    // =====================================



    async function exportAsPdf() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            unit: "pt",
            format: "a4",
            hotfixes: ["px_scaling"]
        });

        showNotification("Please wait, your PDF download will start shortly");

        const margin = 40;
        const lineHeight = 16;
        const paragraphGap = 5;
        const footerGap = 5;
        const pageHeight = pdf.internal.pageSize.getHeight();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const contentWidth = pageWidth - 2 * margin;
        const borderPadding = 15;

        const captureId = window?.tourData?.capture_id;
        const tourLink = `https://user.sitepace.ai/catalogue?cId=${captureId}&pId=${ids.projectId}`;
        const exportTime = new Date().toLocaleString('en-US');


        let y = margin;

        let chatData = [];
        try {
            const res = await fetch(`https://user.sitepace.ai/api/chat/history/?session_id=${currentSessionId}`, {
                headers: { 'Authorization': 'Bearer ' + accessToken }
            });

            const responseData = await res.json();
            chatData = responseData.chat_history || [];
            projectName = responseData.project_name || projectName;


        } catch (err) {
            showErrorAlert("Failed to fetch chat data.");
            console.error("Failed to fetch chat data:", err);
            return;
        }

        const logo = new Image();
        logo.src = "icons/Group 12.png";
        await logo.decode();

        function addHeader() {
            pdf.setDrawColor(0);
            pdf.rect(
                margin - borderPadding,
                margin - borderPadding,
                contentWidth + 2 * borderPadding,
                pageHeight - 2 * margin + 2 * borderPadding
            );

            y = margin;

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(12);
            pdf.text("SitePace IntelliViz™ – Virtual Tour Chat Transcript", margin, y);
            y += lineHeight;

            pdf.setFontSize(10);
            pdf.text(`Project: ${projectName}`, margin, y); y += lineHeight;
            pdf.text(`Date & Time of Export: ${exportTime}`, margin, y); y += lineHeight;
            pdf.text(`Generated by: SitePace IntelliViz™ (AI Assistant)`, margin, y); y += lineHeight;

            const tourRefLabel = "Tour Reference: ";
            pdf.text(tourRefLabel, margin, y);
            const labelWidth = pdf.getTextWidth(tourRefLabel);

            pdf.setTextColor(0, 0, 255);
            pdf.textWithLink(tourLink, margin + labelWidth, y, { url: tourLink });
            pdf.setTextColor(0);
            y += lineHeight;

            const logoWidth = 40;
            const logoHeight = 40;
            const logoX = pageWidth - margin - logoWidth - 50;
            const logoY = margin;

            pdf.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
            pdf.setFontSize(10);
            pdf.text("IntelliViz™", logoX + logoWidth + 6, logoY + logoHeight / 2 + 3);

            pdf.setDrawColor(150);
            pdf.line(margin, y + 2, pageWidth - margin, y + 2);
            y += 12;
        }

        function addFooter(pageNum, totalPages) {
            const footerY = pageHeight - 40;
            pdf.setDrawColor(150);
            pdf.line(margin, footerY - 10, pageWidth - margin, footerY - 10);

            pdf.setFontSize(8);
            pdf.setFont("helvetica", "normal");
            pdf.text("Generated using SitePace.ai's proprietary IntelliViz™ platform.", margin, footerY);
            pdf.text("This document is confidential and intended for internal use only.", margin, footerY + 12);
            pdf.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin - 40, footerY + 12);
        }

        function cleanText(text) {
            if (!text) return "";
            return text
                .replace(/\*\*/g, '')
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<\/?(ul|ol|li|strong|em)>/gi, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/<\/?[^>]+(>|$)/g, '')
                .replace(/([^\s]{60,})/g, '$1\n') // break long unbroken strings
                .trim();
        }

        function safeAddText(text, options = {}) {
            const {
                isBold = false,
                x = margin,
                wrapWidth = contentWidth - (x - margin)
            } = options;

            const clean = cleanText(text);
            const lines = pdf.splitTextToSize(clean, wrapWidth);
            let fontStyle = isBold ? "bold" : "normal";
            pdf.setFont("helvetica", fontStyle);

            for (let i = 0; i < lines.length; i++) {
                if (y + lineHeight > pageHeight - margin - footerGap) {
                    pdf.addPage();
                    addHeader();
                    pdf.setFont("helvetica", fontStyle);
                }

                const line = lines[i];
                const isBullet = /^[-*•]\s+/.test(line);

                if (isBullet) {
                    const bullet = "•";
                    const content = line.replace(/^[-*•]\s+/, '');
                    pdf.text(bullet, x, y);
                    pdf.text(content, x + 10, y);
                } else {
                    pdf.text(line, x, y);
                }

                y += lineHeight;
            }
        }

        function safeAddTable(tableText) {
            const rows = tableText
                .trim()
                .split('\n')
                .filter(row => !/^\s*\|?\s*-+\s*(\|\s*-+\s*)+\|?\s*$/.test(row)) // Skip markdown-style separators
                .map(row => row.split(/\s*\|\s*/).map(cell => cleanText(cell)))
                .map(row => {
                    // Remove empty first and last cells caused by leading/trailing pipes
                    if (row[0] === "") row.shift();
                    if (row[row.length - 1] === "") row.pop();
                    return row;
                });
            if (rows.length === 0) return;

            const numCols = Math.max(...rows.map(row => row.length));
            const colPadding = 4;
            const cellPadding = 3;
            const colWidths = new Array(numCols).fill(0);

            // Measure max text width for each column
            for (let i = 0; i < numCols; i++) {
                let maxWidth = 0;
                for (let row of rows) {
                    if (row[i]) {
                        const lines = pdf.splitTextToSize(row[i], contentWidth / numCols);
                        for (const line of lines) {
                            maxWidth = Math.max(maxWidth, pdf.getTextWidth(line));
                        }
                    }
                }
                colWidths[i] = maxWidth + colPadding * 2;
            }

            // Normalize to fit contentWidth if too wide
            const totalWidth = colWidths.reduce((a, b) => a + b, 0);
            if (totalWidth !== contentWidth) {
                const scale = contentWidth / totalWidth;
                for (let i = 0; i < colWidths.length; i++) {
                    colWidths[i] *= scale;
                }
            }

            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                const row = rows[rowIndex];
                // Measure row height
                let rowHeight = 0;
                const cellLines = [];

                for (let i = 0; i < numCols; i++) {
                    const text = row[i] || "";
                    const lines = pdf.splitTextToSize(text, colWidths[i] - colPadding * 2);
                    cellLines.push(lines);
                    rowHeight = Math.max(rowHeight, lines.length * lineHeight + cellPadding * 2);
                }

                // Page break if needed
                if (y + rowHeight > pageHeight - margin - footerGap - 10) {
                    pdf.addPage();
                    addHeader();
                    pdf.setFont("helvetica", "normal");
                }

                // Draw the row
                let x = margin;
                for (let i = 0; i < numCols; i++) {
                    const cellX = x;
                    const cellY = y;

                    // Draw border
                    pdf.rect(cellX, cellY, colWidths[i], rowHeight);

                    // Draw text
                    if (rowIndex === 0) {
                        pdf.setFont("helvetica", "bold");
                    } else {
                        pdf.setFont("helvetica", "normal");
                    }

                    // Draw text
                    const lines = cellLines[i];
                    let textY = cellY + cellPadding + lineHeight * 0.9;

                    for (const line of lines) {
                        if (textY > pageHeight - margin - footerGap - lineHeight) {
                            pdf.addPage();
                            addHeader();
                            if (rowIndex === 0) {
                                pdf.setFont("helvetica", "bold");
                            } else {
                                pdf.setFont("helvetica", "normal");
                            }
                            textY = margin + cellPadding + lineHeight * 0.9;
                            y = margin;
                        }
                        pdf.text(line, cellX + colPadding, textY);
                        textY += lineHeight;
                    }

                    x += colWidths[i];
                }

                y += rowHeight;
            }
        }

        addHeader();


        for (const chat of chatData) {
            if (!chat.prompt?.trim() || !chat.response?.trim()) continue;

            // Prompt
            pdf.setFont("helvetica", "bold");
            safeAddText(`User : ${chat.prompt}`, { isBold: true });
            y += paragraphGap;

            // Screenshot
            if (chat.screenshot) {
                try {
                    const imageData = await fetch(chat.screenshot)
                        .then(res => res.blob())
                        .then(blob => new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = reject;
                            reader.readAsDataURL(blob);
                        }));

                    const imgProps = {
                        width: 280,
                        height: 150
                    };

                    if (y + imgProps.height > pageHeight - margin - footerGap) {
                        pdf.addPage();
                        addHeader();
                        // y = initialY;
                    }

                    // Calculate centered X position
                    const pageWidth = pdf.internal.pageSize.getWidth();
                    const centeredX = (pageWidth - imgProps.width) / 2;

                    pdf.addImage(imageData, 'WEBP', centeredX, y, imgProps.width, imgProps.height);
                    y += imgProps.height + paragraphGap + 15;
                } catch (err) {
                    console.warn('Failed to load image:', err);
                }
            }

            // Response
            const label = "SitePace : ";
            const labelWidth = pdf.getTextWidth(label);

            if (y + lineHeight > pageHeight - margin - footerGap) {
                pdf.addPage();
                addHeader();
            }

            pdf.setFont("helvetica", "bold");
            pdf.text(label, margin, y);

            const responseX = margin + labelWidth;
            pdf.setFont("helvetica", "normal");

            const tableRegex = /((?:\|.*\|(?:\n)?)+)/g;
            const match = chat.response.match(tableRegex);

            if (match) {
                const table = match[0];
                const parts = chat.response.split(table);

                if (parts[0].trim()) {
                    safeAddText(parts[0].trim(), { x: responseX });
                    y += paragraphGap;
                }

                y += 10;

                safeAddTable(table.trim());

                y += 30;

                if (parts[1]?.trim()) {
                    safeAddText(parts[1].trim(), { x: responseX });
                    y += paragraphGap;
                }
            } else {
                safeAddText(chat.response, { x: responseX });
                y += paragraphGap;
            }


            y += paragraphGap;
        }


        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            addFooter(i, totalPages);
        }



        // Only modification: Flutter app detection
        if (window.flutterInAppWebView) {
            const pdfOutput = pdf.output('datauristring');
            const base64Data = pdfOutput.split(',')[1];
            window.flutterInAppWebView.callHandler('saveFile', {
                filename: `SitePace_Chat_Transcript_${projectName.replace(/\s+/g, "_")}.pdf`,
                data: base64Data,
                mimeType: 'application/pdf'
            });
        } else {
            // Your original save code remains EXACTLY the same
            pdf.save(`SitePace_Chat_Transcript_${projectName.replace(/\s+/g, "_")}.pdf`);
        }

        document.querySelector(".delete-popup").style.display = 'none';
    }


}

document.addEventListener("click", function (e) {
    const dropdown = document.getElementById("export-dropdown");
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.remove();
    }
});


async function updateSidebarSessions(captureId) {
    const sessions = await getSessions(captureId);
    const historyContainer = document.querySelector('.history-container');

    if (!historyContainer) return;

    // Clear existing items
    historyContainer.innerHTML = '';

    // Show up to 3 recent sessions
    sessions.forEach(session => {

        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');

        // ✅ Add 'active' class if session.id matches currentSessionId
        if (session.id === currentSessionId) {
            historyItem.classList.add('active');
        }

        const itemContent = document.createElement('div');
        itemContent.classList.add('history-item-content');
        itemContent.textContent = session.name || `Chat ${session.id}`;

        const menuButton = document.createElement('div');
        menuButton.classList.add('history-menu-button');
        menuButton.innerHTML = threeDotsVerticalIcon;

        const dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('history-dropdown-menu');
        dropdownMenu.style.display = 'none';

        const deleteOption = document.createElement('div');
        deleteOption.classList.add('history-menu-option');
        deleteOption.classList.add('delete-option');
        deleteOption.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="#ff4d4f" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"/>
    </svg> Delete`;

        const renameOption = document.createElement('div');
        renameOption.classList.add('history-menu-option');
        renameOption.classList.add('rename-option');
        renameOption.innerHTML = `<svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5845 0.805664L13.5048 2.88535L19.0907 8.47129L21.1704 6.3916C22.2446 5.31738 22.2446 3.57715 21.1704 2.50293L19.4774 0.805664C18.4032 -0.268555 16.663 -0.268555 15.5888 0.805664H15.5845ZM12.5337 3.85644L2.51767 13.8768C2.0708 14.3236 1.74423 14.8779 1.56376 15.4838L0.0426709 20.6529C-0.0647509 21.0182 0.0340772 21.4092 0.300483 21.6756C0.56689 21.942 0.957905 22.0408 1.31884 21.9377L6.48798 20.4166C7.09384 20.2361 7.64814 19.9096 8.09502 19.4627L18.1196 9.44238L12.5337 3.85644Z" fill="black"/>
</svg> Rename`;

        // Dropdown toggle
        menuButton.addEventListener('click', function (e) {
            e.stopPropagation();
            document.querySelectorAll('.history-dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) menu.style.display = 'none';
            });
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        // Delete session
        // deleteOption.addEventListener('click', async function (e) {
        //     e.stopPropagation();
        //     const success = await deleteSession(session.id);
        //     if (success) {
        //         console.log(`Deleted session: ${session.id}`);
        //         updateSidebarSessions(captureId); // Refresh sidebar
        //     } else {
        //         console.error(`Failed to delete session: ${session.id}`);
        //     }
        //     dropdownMenu.style.display = 'none';
        // });
        //////////////////////////////////////
        function isMobileView() {
            return window.matchMedia("(max-width: 576px)").matches;
        }
        deleteOption.addEventListener('click', async function (e) {
            e.stopPropagation();
            const popupAlert = document.querySelector(".popup-alert");
            const deletePopUp = document.querySelector(".delete-popup");
            const mobilePopup = document.querySelector('.mobile-popup')
            dropdownMenu.style.display = 'none';

            // Reset popupAlert state before showing
            popupAlert.style.opacity = '1'; // Ensure it's visible when shown
            popupAlert.style.display = 'none'; // Start hidden

            // ===== 1. SHOW CONFIRMATION POPUP =====
            deletePopUp.innerHTML = `
            <div class="delete-popup-content">
            <div class="delete-popup-text">Delete this session permanently?</div>
            <div class="delete-popup-buttons">
                <button class="delete-popup-button cancel">Cancel</button>
                <button class="delete-popup-button delete">Delete</button>
            </div>
            </div>
            `;

            deletePopUp.style.display = 'block';

            // ===== 2. WAIT FOR USER CHOICE =====
            const userConfirmed = await new Promise((resolve) => {
                deletePopUp.querySelector('.cancel').addEventListener('click', () => {
                    deletePopUp.style.display = 'none';
                    resolve(false);
                }, { once: true });

                deletePopUp.querySelector('.delete').addEventListener('click', () => {
                    deletePopUp.style.display = 'none';
                    resolve(true);
                }, { once: true });
            });

            if (!userConfirmed) {
                dropdownMenu.style.display = 'none';
                return; // Exit if user cancels
            }

            // ===== 3. PROCEED WITH EXISTING DELETION LOGIC =====
            const allSessions = await getSessions(captureId);


            if (allSessions.length <= 1) {
                if (isMobileView()) {
                    mobilePopup.innerHTML = `
                        <div class="mobile-popup-content">
                            <div class="mobile-popup-message">You cannot delete the last remaining chat session.</div>
                        </div>
                    `;
                    mobilePopup.style.display = 'flex';
                    setTimeout(() => {
                        mobilePopup.style.display = 'none';
                    }, 1500);
                } else {
                    popupAlert.innerHTML = `<div>You cannot delete the last remaining chat session.</div>`;
                    popupAlert.style.display = 'flex';
                    popupAlert.style.justifyContent = 'center';
                    popupAlert.style.alignItems = 'center';
                    popupAlert.style.backgroundColor = 'rgba(223, 255, 96, 1.0)';
                    popupAlert.style.color = 'black';
                    setTimeout(() => {
                        popupAlert.style.opacity = '0';
                        setTimeout(() => { popupAlert.style.display = 'none'; }, 3000);
                    }, 3000);
                }
                dropdownMenu.style.display = 'none';
                return;
            }

            // Add skeleton class and clear chat content to prevent overlap
            const chatBody = document.getElementById('chat-body');
            chatBody.classList.add('skeleton');
            chatBody.innerHTML = ''; // Clear existing content to avoid overlap

            const success = await deleteSession(session.id);

            if (success) {
                console.log(`Deleted session: ${session.id}`);  // Keeping this exactly as is

                if (isMobileView()) {
                    // Mobile version - ADDED NEW CODE
                    mobilePopup.innerHTML = `
            <div class="mobile-popup-content">
                <div class="mobile-popup-message">Chat deleted.</div>
            </div>
        `;
                    mobilePopup.style.display = 'flex';
                    setTimeout(() => {
                        mobilePopup.style.display = 'none';
                    }, 1500);
                } else {
                    // Desktop version - EXISTING CODE PRESERVED EXACTLY
                    popupAlert.innerHTML = `<div>Chat deleted.</div>`;
                    popupAlert.style.display = 'flex';
                    popupAlert.style.justifyContent = 'center';
                    popupAlert.style.alignItems = 'center';
                    popupAlert.style.backgroundColor = 'rgba(223, 255, 96, 1.0)'; // Black with 80% opacity
                    popupAlert.style.color = 'black'; // Text color (full opacity)
                }

                // REST OF EXISTING CODE PRESERVED EXACTLY
                const updatedSessions = await getSessions(captureId);

                if (updatedSessions.length > 0) {
                    const latestSession = updatedSessions[updatedSessions.length - 1];
                    currentSessionId = latestSession.id;

                    await updateSidebarSessions(captureId);
                    clearChatMessages();
                    fetchChatHistory(currentSessionId, captureId);
                    chatBody.classList.remove('skeleton');
                } else {
                    console.warn("No sessions left after deletion.");
                    clearChatMessages();
                    await updateSidebarSessions(captureId);
                    chatBody.classList.remove('skeleton');
                }
            } else {
                if (isMobileView()) {
                    // Mobile version - ADDED NEW CODE
                    mobilePopup.innerHTML = `
            <div class="mobile-popup-content">
                <div class="mobile-popup-message">Failed to delete session.</div>
            </div>
        `;
                    mobilePopup.style.display = 'flex';
                    setTimeout(() => {
                        mobilePopup.style.display = 'none';
                    }, 3000);
                } else {
                    // Desktop version - EXISTING CODE PRESERVED EXACTLY
                    popupAlert.innerHTML = `<div>Failed to delete session.</div>`;
                    popupAlert.style.display = 'flex';
                    popupAlert.style.opacity = '1';
                }
                chatBody.classList.remove('skeleton');
            }

            // Auto-hide after 3 seconds (desktop only - existing code preserved exactly)
            if (!isMobileView()) {
                setTimeout(() => {
                    popupAlert.style.opacity = '0';
                    setTimeout(() => {
                        popupAlert.style.display = 'none';
                        popupAlert.style.opacity = '1'; // Reset for next time
                    }, 300);
                }, 3000);
            }


            dropdownMenu.style.display = 'none';
        });


        // Rename session
        //  renameOption.addEventListener('click', function (e) {
        //     e.stopPropagation();
        //     dropdownMenu.style.display = 'none';


        //     // Replace itemContent text with input field
        //     const input = document.createElement('input');
        //     input.type = 'text';
        //     input.classList.add('rename-input');
        //     input.value = session.name || `Chat ${session.id}`;
        //     itemContent.innerHTML = '';
        //     itemContent.appendChild(input);
        //     input.focus();

        //     // On Enter key, rename
        //     input.addEventListener('keydown', async function (event) {

        //         // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        //         if (event.key === 'Enter' || event.key === 'Go') {

        //             event.preventDefault(); 

        //             const newName = input.value.trim();
        //             if (newName.length === 0) return;

        //             try {
        //                 const response = await renameSession(session.id, newName);
        //                 console.log('Renamed to:', response.name);
        //                 updateSidebarSessions(captureId); // Refresh
        //             } catch (err) {
        //                 console.error('Rename failed:', err);
        //             }
        //         }
        //         // Optional: cancel on Escape
        //         if (event.key === 'Escape') {
        //             updateSidebarSessions(captureId);
        //         }
        //     });

        //     input.addEventListener('keydown', function(event) {
        //         console.log('Key pressed:', event.key, 'Key code:', event.keyCode);
        //     });

        //     // On blur, cancel rename and revert
        //     input.addEventListener('blur', function () {
        //         updateSidebarSessions(captureId);
        //     });
        // });


        ////////////////////////
        // Rename session
        renameOption.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdownMenu.style.display = 'none';

            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const currentName = session.name || `Chat ${session.id}`;

            if (isMobile) {
                // Mobile: Use the delete popup for renaming
                const deletePopUp = document.querySelector(".delete-popup");

                // ===== 1. SHOW RENAME POPUP =====
                deletePopUp.innerHTML = `
                    <div class="delete-popup-content">
                        <div class="delete-popup-text">Rename this session :</div>
                        <input type="text" class="rename-input" value="${currentName}" />
                        <div class="delete-popup-buttons">
                            <button class="delete-popup-button cancel">Cancel</button>
                            <button class="delete-popup-button rename">Rename</button>
                        </div>
                    </div>
                `;
                deletePopUp.style.display = 'block';

                // Focus and select all text in the input
                const input = deletePopUp.querySelector('.rename-input');
                input.focus();
                input.select();

                // ===== 2. HANDLE RENAME LOGIC =====
                const handleRename = async () => {
                    const newName = input.value.trim();
                    if (newName.length === 0) return;

                    try {
                        const response = await renameSession(session.id, newName);
                        console.log('Renamed to:', response.name);
                        deletePopUp.style.display = 'none';
                        updateSidebarSessions(captureId); // Refresh
                    } catch (err) {
                        console.error('Rename failed:', err);
                    }
                };

                // Enter key handler
                input.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        handleRename();
                    }
                });

                // Button handlers
                deletePopUp.querySelector('.cancel').addEventListener('click', () => {
                    deletePopUp.style.display = 'none';
                }, { once: true });

                deletePopUp.querySelector('.rename').addEventListener('click', () => {
                    handleRename();
                }, { once: true });

            } else {
                // Desktop: Original inline rename behavior
                const input = document.createElement('input');
                input.type = 'text';
                input.classList.add('rename-input');
                input.value = currentName;
                itemContent.innerHTML = '';
                itemContent.appendChild(input);
                input.focus();
                input.select();

                input.addEventListener('keydown', async function (event) {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        const newName = input.value.trim();
                        if (newName.length === 0) return;

                        try {
                            const response = await renameSession(session.id, newName);
                            console.log('Renamed to:', response.name);
                            updateSidebarSessions(captureId); // Refresh
                        } catch (err) {
                            console.error('Rename failed:', err);
                        }
                    }
                    if (event.key === 'Escape') {
                        updateSidebarSessions(captureId);
                    }
                });

                input.addEventListener('blur', function () {
                    updateSidebarSessions(captureId);
                });
            }
        });


        document.addEventListener('click', function () {
            dropdownMenu.style.display = 'none';
        });


        dropdownMenu.appendChild(deleteOption);
        dropdownMenu.appendChild(renameOption);
        historyItem.appendChild(itemContent);
        historyItem.appendChild(menuButton);
        historyItem.appendChild(dropdownMenu);
        historyContainer.appendChild(historyItem);


        // itemContent.addEventListener('click', async function () {
        //     const sidebarHide = document.querySelector('.sidebar-hide')
        //     // sidebarHide.click();
        //     currentSessionId = session.id;

        //     // Remove active class from all items first
        //     document.querySelectorAll('.history-item').forEach(item => {
        //         item.classList.remove('active');
        //     });

        //     // Highlight the current clicked one
        //     historyItem.classList.add('active');

        //     // Clear current chat UI (optional, depends on your structure)
        //     clearChatMessages(); // implement this if needed

        //     fetchChatHistory(currentSessionId, captureId);

        // });

        itemContent.addEventListener('click', async function () {
            const sidebarHide = document.querySelector('.sidebar-hide');
            currentSessionId = session.id;

            // Remove active class from all items first
            document.querySelectorAll('.history-item').forEach(item => {
                item.classList.remove('active');
            });

            // Highlight the current clicked one
            historyItem.classList.add('active');

            // Add skeleton class and clear chat body to prevent overlap
            const chatBody = document.getElementById('chat-body');
            if (chatBody) {
                chatBody.classList.add('skeleton');
                chatBody.innerHTML = ''; // Clear content immediately
            }

            try {
                // Clear current chat UI
                clearChatMessages(); // Optional, may be redundant with innerHTML clear

                // Fetch and load chat history
                await fetchChatHistory(currentSessionId, captureId);

                // Remove skeleton class after content is loaded
                if (chatBody) chatBody.classList.remove('skeleton');
            } catch (error) {
                console.error('Error loading chat history:', error);
                if (chatBody) chatBody.classList.remove('skeleton'); // Remove skeleton on error
            }
        });

    });
}



async function initializeChatLogic() {
    const captureId = window?.tourData?.capture_id;
    if (!captureId) {
        console.error("Missing capture ID.");
        return;
    }

    let sessions = await getSessions(captureId);

    if (!sessions || sessions.length === 0) {
        // const newChatName = `Chat ${new Date().toLocaleString().replace(/[/,:\s]/g, '-')}`;
        const newChatName = `New Chat`;
        const createdSession = await createSession(captureId, newChatName);
        if (!createdSession?.id) {
            console.error("Failed to create new session.");
            return;
        }
        currentSessionId = createdSession.id;
    } else {
        currentSessionId = sessions[0].id;
    }

    // Update sidebar after session is created or fetched
    await updateSidebarSessions(captureId);

    // Now fetch chat history
    fetchChatHistory(currentSessionId, captureId);

    const chat_body = document.querySelector('.chat-body')
    const historyContainer = document.querySelector('.history-container');

    chat_body.classList.remove('skeleton');
    historyContainer.classList.remove('skeleton');
}

// Message Bubble
function addMessage(message, sender = "user", createdAt = null, showTimestamp = false) {
    const messageBubble = document.createElement("div");
    messageBubble.classList.add("chat-message", sender);

    // messageBubble.textContent = message;
    const formattedMessage = formatMessageText(message);
    messageBubble.innerHTML = formattedMessage;


    const chatBody = document.getElementById("chat-body");

    if (showTimestamp && createdAt) {
        const time_stamp = document.createElement("div");
        time_stamp.classList.add("message-timestamp");

        const curr_date = new Date(createdAt);
        const date = curr_date.toLocaleDateString('en-US');
        const time = curr_date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
        time_stamp.innerText = `${date}, ${time}`;
        chatBody.appendChild(time_stamp);
    }

    chatBody.appendChild(messageBubble);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function formatMessageText(text) {
    const emojiMap = {
        ':warning:': '⚠️',
        ':check:': '✅',
        ':info:': 'ℹ️',
        ':rocket:': '🚀'
    };

    return text
        // Escape HTML for safety (optional, uncomment if needed)
        // .replace(/</g, '&lt;').replace(/>/g, '&gt;')
        // Headings ###, ##, #
        .replace(/^### (.*)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*)$/gm, '<h2>$1</h2>')
        .replace(/^# (.*)$/gm, '<h1>$1</h1>')
        // Bold **text**
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Replace * bullet with • bullet
        .replace(/^\* (.*)$/gm, '• $1')
        // Replace - dash with –
        .replace(/^- (.*)$/gm, '– $1')
        // Replace > quote with blockquote
        .replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>')
        // Replace :emoji: with actual emoji
        .replace(/:(\w+):/g, (match, p1) => emojiMap[match] || match)
        // Replace line breaks with <br>
        .replace(/\r\n|\n|\r/g, '<br>');
}

const promptData = [
    "What are the safety concerns in this frame?",
    "Is anyone missing a helmet or PPE?",
    "Generate a progress report for this floor",
    "What construction work is visible here?",
    "Give checklist of items needing correction",
    "Write a to-do for site supervisor",
    "What quality issues do you notice?",
    "Is shuttering done correctly in this image?",
    "How to report this issue in SitePace dashboard?",
    "What can be improved in material storage here?",
    "Provide a timeline estimation based on visible work.",
    "List construction materials in this frame.",
    "Are there any electrical safety issues visible?",
    "Provide a scaffolding safety checklist.",
    "Which equipment appears underutilized here?",
    "How to better organize this layout for efficiency?",
    "What would be ideal lighting improvements in this space?",
    "Is there any evidence of concrete curing?",
    "Does this image show proper steel placement?",
    "Give a checklist for fall protection setup.",
    "What tasks should be scheduled next based on this frame?",
    "Are the temporary barricades visible?",
    "Is material stacking compliant with best practices?",
    "Which safety signs are missing from this area?",
    "What looks like recently completed work here?",
    "Can you list visible non-conformities?",
    "How would you brief a junior engineer using this image?",
    "Draft a report to share with project manager.",
    "Which QA checklist applies to this activity?",
    "What areas need cleaning or housekeeping?",
    "Can you describe the reinforcement layout here?",
    "Are workers wearing the correct reflective jackets?",
    "Suggest training topics for workers based on this image.",
    "How to improve worker safety compliance on site?",
    "What are the environmental hazards in this frame?",
    "Generate a weekly summary using this frame.",
    "Can you identify stage of civil works?",
    "Are there exposed rebar or dangerous edges?",
    "Draft instruction note for safety officer.",
    "Which contractor teams are likely active in this section?",
    "Is any formwork system identifiable here?",
    "How can we reduce rework probability from this activity?",
    "List the visible MEP installation items.",
    "Is this an excavation site? What precautions are missing?",
    "How can site cleanliness be maintained better here?",
    "Are any utilities at risk in this zone?",
    "List quality inspection checks to do here.",
    "Draft WhatsApp update for client using this frame.",
    "Create a daily logbook entry using this image.",
    "Summarize visible scope completed and next actions."
];

function getRandomPrompts(arr, count = 3) {
    const shuffled = [...arr].sort(() => 0.3 - Math.random());
    return shuffled.slice(0, count);
}

// function showIntroMessage() {
//     const selectedPrompts = getRandomPrompts(promptData);
//     const suggestions = selectedPrompts.map(p => `- ${p}`).join('\n');

//     const introMessage = `<b>Welcome to SitePace IntelliViz™</b>
//     your AI assistant for reviewing construction progress, safety, or quality using this frame. 💬

//     Here's what I can help you with:

//     ${suggestions}

//     Ask anything or 📄 download this chat using the top-right button (PDF/ editable DOC).`;

//     addMessage(introMessage, 'bot', null, false);
// }

function showIntroMessage() {
    const selectedPrompts = getRandomPrompts(promptData);
    const suggestions = selectedPrompts.map(p => `- ${p}`).join('\n');

    const introMessage = `<b>Welcome to SitePace IntelliViz™</b>
your AI assistant for reviewing construction progress, safety, or quality using this frame.

Here's what I can help you with:
${suggestions}

Ask anything or download this chat using the top-right button (PDF/ editable DOC).`;

    addMessage(introMessage, 'bot', null, false);

}


function clearChatMessages() {
    const chatBody = document.getElementById("chat-body");
    if (chatBody) chatBody.innerHTML = '';
}

async function fetchChatHistory(currentSessionId, captureId = null) {
    const url = `https://user.sitepace.ai/api/chat/history/?session_id=${encodeURIComponent(currentSessionId)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });

        const data = await response.json();
        console.log(captureId, "---------------------------");


        if (captureId && data.chat_history.length == 1) {
            console.log("first chat response BEFORE updateSidebarSessions");
            updateSidebarSessions(captureId);
            console.log("first chat response AFTER updateSidebarSessions");

        }

        if (data.chat_history && data.chat_history.length > 0) {
            data.chat_history.forEach(item => {
                addMessage(item.prompt, 'user', item.created_at, true);
                addMessage(item.response, 'bot', item.created_at, false);
            });
        } else {
            clearChatMessages();
            showIntroMessage();
        }
    } catch (error) {
        console.error('Failed to load chat history:', error);
    }
}