let formData = new FormData();
const crossIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">   
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`;

const closeIconSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`;

const uploadImage = `
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5 21.6672C21.8932 21.6672 23.8333 19.7271 23.8333 17.3338C23.8333 14.9406 21.8932 13.0005 19.5 13.0005C17.1067 13.0005 15.1666 14.9406 15.1666 17.3338C15.1666 19.7271 17.1067 21.6672 19.5 21.6672Z" stroke="#111827" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M28.1666 4.3335H19.4999C8.66658 4.3335 4.33325 8.66683 4.33325 19.5002V32.5002C4.33325 43.3335 8.66658 47.6668 19.4999 47.6668H32.4999C43.3332 47.6668 47.6666 43.3335 47.6666 32.5002V21.6668" stroke="#111827" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M34.125 10.834H46.0417" stroke="#111827" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M40.0833 16.7922V4.87549" stroke="#111827" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M5.78491 41.0589L16.4666 33.8872C18.1782 32.7389 20.6482 32.8689 22.1866 34.1905L22.9016 34.8189C24.5916 36.2705 27.3216 36.2705 29.0116 34.8189L38.0249 27.0839C39.7149 25.6322 42.4449 25.6322 44.1349 27.0839L47.6666 30.1172" stroke="#111827" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

const upload = `
    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.75 6.70552e-06C11.8583 -6.2206e-05 11.9653 0.0233208 12.0637 0.068548C12.1621 0.113775 12.2495 0.179774 12.32 0.262007L15.32 3.76201C15.4494 3.91318 15.5135 4.10958 15.4981 4.30799C15.4827 4.5064 15.3892 4.69058 15.238 4.82001C15.0868 4.94943 14.8904 5.0135 14.692 4.99813C14.4936 4.98275 14.3094 4.88918 14.18 4.73801L12.5 2.77801V13.75C12.5 13.9489 12.421 14.1397 12.2803 14.2803C12.1397 14.421 11.9489 14.5 11.75 14.5C11.5511 14.5 11.3603 14.421 11.2197 14.2803C11.079 14.1397 11 13.9489 11 13.75V2.77701L9.32 4.73801C9.25591 4.81286 9.17771 4.87436 9.08986 4.91899C9.00201 4.96362 8.90622 4.99051 8.80798 4.99813C8.70974 5.00574 8.61095 4.99393 8.51727 4.96337C8.42359 4.93281 8.33685 4.88409 8.262 4.82001C8.18714 4.75592 8.12565 4.67772 8.08102 4.58987C8.03638 4.50202 8.00949 4.40623 8.00188 4.30799C7.99426 4.20975 8.00608 4.11096 8.03664 4.01728C8.0672 3.9236 8.11591 3.83686 8.18 3.76201L11.18 0.262007C11.2505 0.179774 11.3379 0.113775 11.4363 0.068548C11.5347 0.0233208 11.6417 -6.2206e-05 11.75 6.70552e-06ZM6.746 7.00201C6.94491 7.00095 7.1361 7.07895 7.2775 7.21885C7.4189 7.35875 7.49894 7.54909 7.5 7.74801C7.50106 7.94692 7.42306 8.13811 7.28316 8.27951C7.14325 8.42091 6.95291 8.50095 6.754 8.50201C5.661 8.50801 4.886 8.53601 4.297 8.64401C3.731 8.74901 3.402 8.91601 3.159 9.15901C2.882 9.43601 2.702 9.82501 2.603 10.559C2.502 11.314 2.5 12.315 2.5 13.75V14.75C2.5 16.186 2.502 17.187 2.603 17.942C2.702 18.676 2.883 19.064 3.159 19.342C3.436 19.618 3.824 19.798 4.559 19.897C5.313 19.999 6.315 20 7.75 20H15.75C17.185 20 18.186 19.999 18.942 19.897C19.676 19.798 20.064 19.618 20.341 19.341C20.618 19.064 20.798 18.676 20.897 17.942C20.998 17.187 21 16.186 21 14.75V13.75C21 12.315 20.998 11.314 20.897 10.558C20.798 9.82501 20.617 9.43601 20.341 9.15901C20.097 8.91601 19.769 8.74901 19.203 8.64401C18.614 8.53601 17.839 8.50801 16.746 8.50201C16.6475 8.50148 16.5501 8.48156 16.4593 8.44339C16.3685 8.40521 16.2861 8.34952 16.2168 8.27951C16.1476 8.20949 16.0928 8.12652 16.0556 8.03532C16.0184 7.94413 15.9995 7.8465 16 7.74801C16.0005 7.64952 16.0204 7.55209 16.0586 7.4613C16.0968 7.37051 16.1525 7.28812 16.2225 7.21885C16.2925 7.14958 16.3755 7.09477 16.4667 7.05757C16.5579 7.02036 16.6555 7.00148 16.754 7.00201C17.836 7.00801 18.737 7.03401 19.474 7.16901C20.232 7.30901 20.877 7.57401 21.402 8.09901C22.004 8.70001 22.262 9.45901 22.384 10.359C22.5 11.225 22.5 12.328 22.5 13.695V14.805C22.5 16.173 22.5 17.275 22.384 18.142C22.262 19.042 22.004 19.8 21.402 20.402C20.8 21.004 20.042 21.262 19.142 21.384C18.275 21.5 17.172 21.5 15.805 21.5H7.695C6.328 21.5 5.225 21.5 4.358 21.384C3.458 21.263 2.7 21.004 2.098 20.402C1.496 19.8 1.238 19.042 1.117 18.142C0.999998 17.275 0.999998 16.172 0.999998 14.805V13.695C0.999998 12.328 0.999998 11.225 1.117 10.358C1.237 9.45801 1.497 8.70001 2.098 8.09801C2.623 7.57401 3.268 7.30801 4.026 7.16901C4.763 7.03401 5.664 7.00801 6.746 7.00201Z" fill="#DFFF60"/>
    </svg>`;

const addCommentArrow = `
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5131 7.49341L9.26662 12.7959L3.29948 9.0637C2.44452 8.5288 2.62237 7.23015 3.58941 6.94735L17.757 2.79837C18.6425 2.53883 19.4632 3.36676 19.2001 4.25516L15.0087 18.4129C14.7215 19.3813 13.4303 19.5543 12.9004 18.6957L9.26384 12.7969" stroke="#DFFF60" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

const downArrow = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
    <path d="M12.8332 1.0835L6.99984 6.91683L1.1665 1.0835" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

const rightIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="#111827" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

const threeDots = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M10.0835 16.5002C10.0835 17.0064 10.4939 17.4168 11.0002 17.4168C11.5064 17.4168 11.9168 17.0064 11.9168 16.5002C11.9168 15.9939 11.5064 15.5835 11.0002 15.5835C10.4939 15.5835 10.0835 15.9939 10.0835 16.5002Z" fill="#111827"/>
    <path d="M10.0835 11.0002C10.0835 11.5064 10.4939 11.9168 11.0002 11.9168C11.5064 11.9168 11.9168 11.5064 11.9168 11.0002C11.9168 10.4939 11.5064 10.0835 11.0002 10.0835C10.4939 10.0835 10.0835 10.4939 10.0835 11.0002Z" fill="#111827"/>
    <path d="M10.0835 5.50016C10.0835 6.00642 10.4939 6.41683 11.0002 6.41683C11.5064 6.41683 11.9168 6.00642 11.9168 5.50016C11.9168 4.9939 11.5064 4.5835 11.0002 4.5835C10.4939 4.5835 10.0835 4.9939 10.0835 5.50016Z" fill="#111827"/>
    <path d="M10.0835 16.5002C10.0835 17.0064 10.4939 17.4168 11.0002 17.4168C11.5064 17.4168 11.9168 17.0064 11.9168 16.5002C11.9168 15.9939 11.5064 15.5835 11.0002 15.5835C10.4939 15.5835 10.0835 15.9939 10.0835 16.5002Z" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.0835 11.0002C10.0835 11.5064 10.4939 11.9168 11.0002 11.9168C11.5064 11.9168 11.9168 11.5064 11.9168 11.0002C11.9168 10.4939 11.5064 10.0835 11.0002 10.0835C10.4939 10.0835 10.0835 10.4939 10.0835 11.0002Z" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.0835 5.50016C10.0835 6.00642 10.4939 6.41683 11.0002 6.41683C11.5064 6.41683 11.9168 6.00642 11.9168 5.50016C11.9168 4.9939 11.5064 4.5835 11.0002 4.5835C10.4939 4.5835 10.0835 4.9939 10.0835 5.50016Z" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

const chnageImageIcon = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Group 35">
    <path id="Vector" d="M1.33337 5.16872V3.1298C1.33337 2.5595 1.79571 2.09717 2.366 2.09717H4.55121" stroke="white" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path id="Vector_2" d="M3.7832 1.33594L4.5512 2.09724L3.7832 2.86523" stroke="white" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path id="Vector_3" d="M14.6667 10.7866V12.8256C14.6667 13.3959 14.2043 13.8582 13.6341 13.8582H11.4489" stroke="white" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path id="Vector_4" d="M12.2168 14.6191L11.4489 13.8578L12.2168 13.0898" stroke="white" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path id="Vector_5" d="M2.86646 9.23082V10.8508C2.86646 11.4711 3.3693 11.9739 3.9896 11.9739H12.0419C12.6622 11.9739 13.1651 11.4711 13.1651 10.8508V5.12168C13.1651 4.50138 12.6622 3.99854 12.0419 3.99854H3.9896C3.3693 3.99854 2.86646 4.50138 2.86646 5.12168V6.80875" stroke="white" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path id="Stroke 5" d="M12.8148 8.7432C12.2641 8.25982 11.6201 7.26172 10.4686 7.26172C9.31659 7.26172 8.65257 9.41556 7.54468 9.41556C6.43679 9.41556 5.43032 8.44167 4.54257 9.066C3.65483 9.68981 3.18518 10.9654 3.18518 10.9654" stroke="white" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path id="Stroke 3" fill-rule="evenodd" clip-rule="evenodd" d="M6.78649 5.98339C6.78649 6.41479 6.43713 6.76415 6.00573 6.76415C5.57475 6.76415 5.22498 6.41479 5.22498 5.98339C5.22498 5.55199 5.57475 5.20264 6.00573 5.20264C6.43671 5.20306 6.78606 5.55241 6.78649 5.98339Z" stroke="white" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    </svg>`;

const markUpPen = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M8.16492 12.6287H13" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52001 1.52986C8.0371 0.911858 8.96666 0.821237 9.59748 1.32782C9.63236 1.35531 10.753 2.22586 10.753 2.22586C11.446 2.64479 11.6613 3.5354 11.2329 4.21506C11.2102 4.25146 4.87463 12.1763 4.87463 12.1763C4.66385 12.4393 4.34389 12.5945 4.00194 12.5982L1.57569 12.6287L1.02902 10.3149C0.952442 9.98953 1.02902 9.64785 1.2398 9.3849L7.52001 1.52986Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.34723 3.00049L9.98206 5.7919" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`

const zoomInIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
    <circle cx="9.47522" cy="9.46625" r="7.83832" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.9269 15.3252L17.9999 18.3903" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5316 6.59831C10.5316 6.16486 10.1802 5.81348 9.74679 5.81348C9.31334 5.81348 8.96195 6.16486 8.96195 6.59831V8.9528H6.60746C6.17401 8.9528 5.82263 9.30418 5.82263 9.73763C5.82263 10.1711 6.17401 10.5225 6.60746 10.5225H8.96195V12.8769C8.96195 13.3104 9.31334 13.6618 9.74678 13.6618C10.1802 13.6618 10.5316 13.3104 10.5316 12.8769V10.5225H12.8861C13.3195 10.5225 13.6709 10.1711 13.6709 9.73763C13.6709 9.30418 13.3195 8.9528 12.8861 8.9528H10.5316V6.59831Z" fill="white"/>
    </svg>`;

const zoomOutIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
    <circle cx="9.47522" cy="9.46625" r="7.83832" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.9269 15.3252L17.9999 18.3903" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.82263 9.73795C5.82263 9.30451 6.17401 8.95312 6.60746 8.95312H12.8861C13.3195 8.95312 13.6709 9.30451 13.6709 9.73795C13.6709 10.1714 13.3195 10.5228 12.8861 10.5228H6.60746C6.17401 10.5228 5.82263 10.1714 5.82263 9.73795Z" fill="white"/>
    </svg>`;

const rotateImageInForward = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9548 5.12451H7.59407C6.07598 5.12451 5.1239 6.20008 5.1239 7.7222V11.8279C5.1239 13.35 6.07195 14.4256 7.59407 14.4256H11.9523C13.4769 14.4256 14.4245 13.35 14.4245 11.8279V7.7222C14.4265 6.20008 13.4784 5.12451 11.9548 5.12451Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.13267 8.16625C9.13267 8.68034 8.71635 9.09666 8.20226 9.09666C7.68867 9.09666 7.27185 8.68034 7.27185 8.16625C7.27185 7.65216 7.68867 7.23584 8.20226 7.23584C8.71585 7.23634 9.13217 7.65266 9.13267 8.16625Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.4267 11.2741C13.9615 10.7953 13.0669 9.82812 12.0941 9.82812C11.1209 9.82812 10.5599 11.9616 9.62394 11.9616C8.68798 11.9616 7.83771 10.9969 7.08774 11.6154C6.33776 12.2333 5.62811 13.4968 5.62811 13.4968" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.871 2.53125L17.1697 4.62254L15.0784 4.32378" stroke="white" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.9651 4.30001C15.3146 2.28551 12.8074 1 9.99988 1C5.0293 1 0.999878 5.02942 0.999878 10C0.999878 14.9706 5.0293 19 9.99988 19C14.9705 19 18.9999 14.9706 18.9999 10" stroke="white" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

const arrowLeft = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.54199 10.2287L16.042 10.2287" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.58301 15.2488L3.54134 10.2288L8.58301 5.20801" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

const arrowRight = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.458 9.77132H3.95801" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.417 4.75116L16.4587 9.77116L11.417 14.792" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

const likeIcon = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.39323 9.66527C1.49906 6.8736 2.54406 3.68277 5.4749 2.7386C7.01656 2.2411 8.71823 2.53443 9.9999 3.4986C11.2124 2.5611 12.9766 2.24443 14.5166 2.7386C17.4474 3.68277 18.4991 6.8736 17.6057 9.66527C16.2141 14.0903 9.9999 17.4986 9.9999 17.4986C9.9999 17.4986 3.83156 14.1419 2.39323 9.66527Z" stroke="#111827" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.3333 5.5835C14.225 5.87183 14.855 6.66766 14.9308 7.60183" stroke="#111827" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

const commentIcon = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4495 10.3441C12.4495 9.88384 12.8226 9.51074 13.2828 9.51074H13.2903C13.7506 9.51074 14.1237 9.88384 14.1237 10.3441C14.1237 10.8043 13.7506 11.1774 13.2903 11.1774H13.2828C12.8226 11.1774 12.4495 10.8043 12.4495 10.3441Z" fill="#111827"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.10864 10.3441C9.10864 9.88384 9.48174 9.51074 9.94198 9.51074H9.94948C10.4097 9.51074 10.7828 9.88384 10.7828 10.3441C10.7828 10.8043 10.4097 11.1774 9.94948 11.1774H9.94198C9.48174 11.1774 9.10864 10.8043 9.10864 10.3441Z" fill="#111827"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.76782 10.3441C5.76782 9.88384 6.14092 9.51074 6.60116 9.51074H6.60866C7.06889 9.51074 7.44199 9.88384 7.44199 10.3441C7.44199 10.8043 7.06889 11.1774 6.60866 11.1774H6.60116C6.14092 11.1774 5.76782 10.8043 5.76782 10.3441Z" fill="#111827"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4505 4.54761C12.4435 1.53947 7.55749 1.53947 4.55053 4.54761L4.5504 4.54774C2.19549 6.90219 1.68409 10.3923 3.0058 13.2485C3.01024 13.2581 3.01443 13.2678 3.01838 13.2776C3.09519 13.4684 3.09346 13.6847 3.09 13.807C3.08566 13.9606 3.06867 14.1375 3.0477 14.3175C3.02788 14.4877 3.0027 14.6752 2.9771 14.8658L2.97178 14.9054C2.94406 15.1119 2.91583 15.3239 2.8912 15.5362C2.84123 15.9669 2.80985 16.369 2.82381 16.6907C2.83077 16.851 2.84829 16.9698 2.87067 17.0512C2.87821 17.0786 2.88511 17.0975 2.8902 17.1096C2.90238 17.1147 2.92126 17.1216 2.94869 17.1292C3.03014 17.1515 3.14894 17.169 3.30925 17.176C3.63094 17.1899 4.03306 17.1585 4.46363 17.1086C4.67593 17.084 4.88792 17.0558 5.09443 17.0281L5.13379 17.0228C5.32444 16.9972 5.51201 16.9721 5.68224 16.9523C5.86222 16.9313 6.03914 16.9144 6.1927 16.9101C6.31501 16.9066 6.53124 16.9049 6.72202 16.9817C6.73176 16.9857 6.74141 16.9898 6.75094 16.9942C9.60775 18.3155 13.0965 17.8046 15.4505 15.4495L15.4506 15.4495C18.4579 12.4417 18.4639 7.56064 15.4506 4.54772L15.4505 4.54761ZM16.3344 3.66378C12.8393 0.167372 7.16159 0.167411 3.66647 3.6639C0.946439 6.38351 0.345394 10.4038 1.84068 13.7064C1.84113 13.721 1.84133 13.7424 1.8405 13.7717C1.83775 13.8691 1.82597 14.0023 1.8061 14.1729C1.7876 14.3317 1.76382 14.5088 1.73774 14.703L1.73289 14.7391C1.70523 14.9452 1.67561 15.1674 1.64953 15.3922C1.59805 15.8358 1.55652 16.3194 1.57499 16.7449C1.58424 16.9582 1.60926 17.1783 1.66537 17.3825C1.7202 17.5819 1.81719 17.8122 2.00248 17.9976L2.00277 17.9979C2.18811 18.183 2.4184 18.2798 2.61778 18.3346C2.82184 18.3906 3.04194 18.4156 3.25517 18.4248C3.68055 18.4432 4.16406 18.4017 4.60759 18.3503C4.83235 18.3242 5.05453 18.2946 5.26056 18.267L5.29633 18.2622C5.49065 18.2361 5.66782 18.2124 5.8267 18.1939C5.99723 18.1741 6.13041 18.1623 6.22782 18.1596C6.25716 18.1587 6.27856 18.159 6.29317 18.1594C9.59598 19.654 13.6151 19.0539 16.3345 16.3333C19.8292 12.8381 19.8367 7.16558 16.3344 3.66378Z" fill="#111827"/>
    </svg>`;

const edit = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"       xmlns="http://www.w3.org/2000/svg">
    <path d="M13.7473 20.4429H20.9999" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.0208 6.00092L16.473 10.188" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

const trashBin = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.3248 9.4682C19.3248 9.4682 18.7818 16.2032 18.4668 19.0402C18.3168 20.3952 17.4798 21.1892 16.1088 21.2142C13.4998 21.2612 10.8878 21.2642 8.27979 21.2092C6.96079 21.1822 6.13779 20.3782 5.99079 19.0472C5.67379 16.1852 5.13379 9.4682 5.13379 9.4682" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20.708 6.23969H3.75" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.4406 6.23967C16.6556 6.23967 15.9796 5.68467 15.8256 4.91567L15.5826 3.69967C15.4326 3.13867 14.9246 2.75067 14.3456 2.75067H10.1126C9.53358 2.75067 9.02558 3.13867 8.87558 3.69967L8.63258 4.91567C8.47858 5.68467 7.80258 6.23967 7.01758 6.23967" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
const calendarSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.1367 7.73603H2.31968C1.99875 7.73603 1.73828 7.47557 1.73828 7.15464C1.73828 6.83371 1.99875 6.57324 2.31968 6.57324H16.1367C16.4577 6.57324 16.7181 6.83371 16.7181 7.15464C16.7181 7.47557 16.4577 7.73603 16.1367 7.73603" fill="#111827"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.6753 10.7634C12.3544 10.7634 12.0908 10.5029 12.0908 10.182C12.0908 9.86105 12.3474 9.60059 12.6683 9.60059H12.6753C12.9962 9.60059 13.2567 9.86105 13.2567 10.182C13.2567 10.5029 12.9962 10.7634 12.6753 10.7634" fill="#111827"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.23544 10.7634C8.91451 10.7634 8.65094 10.5029 8.65094 10.182C8.65094 9.86105 8.90753 9.60059 9.22846 9.60059H9.23544C9.55637 9.60059 9.81683 9.86105 9.81683 10.182C9.81683 10.5029 9.55637 10.7634 9.23544 10.7634" fill="#111827"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.78852 10.7634C5.46759 10.7634 5.20325 10.5029 5.20325 10.182C5.20325 9.86105 5.46061 9.60059 5.78154 9.60059H5.78852C6.10945 9.60059 6.36991 9.86105 6.36991 10.182C6.36991 10.5029 6.10945 10.7634 5.78852 10.7634" fill="#111827"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.6753 13.7761C12.3544 13.7761 12.0908 13.5156 12.0908 13.1947C12.0908 12.8737 12.3474 12.6133 12.6683 12.6133H12.6753C12.9962 12.6133 13.2567 12.8737 13.2567 13.1947C13.2567 13.5156 12.9962 13.7761 12.6753 13.7761" fill="#111827"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.23544 13.7761C8.91451 13.7761 8.65094 13.5156 8.65094 13.1947C8.65094 12.8737 8.90753 12.6133 9.22846 12.6133H9.23544C9.55637 12.6133 9.81683 12.8737 9.81683 13.1947C9.81683 13.5156 9.55637 13.7761 9.23544 13.7761" fill="#111827"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.78852 13.7761C5.46759 13.7761 5.20325 13.5156 5.20325 13.1947C5.20325 12.8737 5.46061 12.6133 5.78154 12.6133H5.78852C6.10945 12.6133 6.36991 12.8737 6.36991 13.1947C6.36991 13.5156 6.10945 13.7761 5.78852 13.7761" fill="#111827"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3593 4.54745C12.0384 4.54745 11.7779 4.28699 11.7779 3.96606V1.41489C11.7779 1.09396 12.0384 0.833496 12.3593 0.833496C12.6802 0.833496 12.9407 1.09396 12.9407 1.41489V3.96606C12.9407 4.28699 12.6802 4.54745 12.3593 4.54745" fill="#111827"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.09726 4.54745C5.77633 4.54745 5.51587 4.28699 5.51587 3.96606V1.41489C5.51587 1.09396 5.77633 0.833496 6.09726 0.833496C6.41819 0.833496 6.67866 1.09396 6.67866 1.41489V3.96606C6.67866 4.28699 6.41819 4.54745 6.09726 4.54745" fill="#111827"/>
<mask id="mask0_20507_19745" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="1" y="2" width="16" height="16">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.66669 2.05713H16.783V17.4997H1.66669V2.05713Z" fill="white"/>
</mask>
<g mask="url(#mask0_20507_19745)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.94662 3.21994C3.93654 3.21994 2.82956 4.29204 2.82956 6.23855V13.2533C2.82956 15.2424 3.93654 16.337 5.94662 16.337H12.5032C14.5133 16.337 15.6203 15.2626 15.6203 13.3122V6.23855C15.6234 5.28118 15.366 4.537 14.8551 4.02537C14.3296 3.49824 13.5195 3.21994 12.5102 3.21994H5.94662ZM12.5031 17.4998H5.94653C3.307 17.4998 1.66669 15.8726 1.66669 13.2533V6.23853C1.66669 3.65868 3.307 2.05713 5.94653 2.05713H12.5101C13.8349 2.05713 14.9303 2.45403 15.6783 3.20364C16.4047 3.9331 16.7868 4.98194 16.783 6.24008V13.3122C16.783 15.8951 15.1427 17.4998 12.5031 17.4998V17.4998Z" fill="#111827"/>
</g>
</svg>
`
const pdfIcon = `<svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.20001 22.75H6.69068V21.175H7.36668C8.44135 21.175 9.34268 20.3875 9.34268 19.32C9.34268 18.2525 8.47601 17.4825 7.36668 17.4825H5.20001V22.7325V22.75ZM6.69068 19.9675V18.7075H7.21068C7.55735 18.7075 7.85201 18.935 7.85201 19.32C7.85201 19.705 7.57468 19.95 7.21068 19.95H6.69068V19.9675ZM10.7293 22.75H12.792C14.5253 22.75 15.6 21.7175 15.6 20.09C15.6 18.5675 14.5253 17.5 12.792 17.5H10.7293V22.75ZM12.22 21.5075V18.725H12.7227C13.2947 18.725 14.0747 19.005 14.0747 20.09C14.0747 21.2275 13.2947 21.5075 12.7227 21.5075H12.22ZM17.3333 22.75H18.824V20.8775H20.6613V19.67H18.824V18.725H20.9213V17.5175H17.3507V22.7675L17.3333 22.75Z" fill="black"/>
<path d="M21.6667 28H4.33334C2.89467 28 1.73334 26.8275 1.73334 25.375V2.625C1.73334 1.1725 2.89467 0 4.33334 0H16.6227C17.316 0 17.9747 0.28 18.46 0.77L23.504 5.8625C23.9893 6.3525 24.2667 7.0175 24.2667 7.7175V25.375C24.2667 26.8275 23.1053 28 21.6667 28ZM4.33334 1.75C3.848 1.75 3.46667 2.135 3.46667 2.625V25.375C3.46667 25.865 3.848 26.25 4.33334 26.25H21.6667C22.152 26.25 22.5333 25.865 22.5333 25.375V7.7175C22.5347 7.60274 22.5123 7.48896 22.4675 7.38348C22.4228 7.27799 22.3566 7.18313 22.2733 7.105L17.2293 2.0125C17.0693 1.84764 16.8513 1.75329 16.6227 1.75H4.33334Z" fill="black"/>
<path d="M23.192 8.75002H18.148C16.744 8.75002 15.6 7.59502 15.6 6.17752V1.08502C15.6 0.595022 15.9813 0.210022 16.4667 0.210022C16.952 0.210022 17.3333 0.595022 17.3333 1.08502V6.17752C17.3333 6.63252 17.6973 7.00002 18.148 7.00002H23.192C23.6773 7.00002 24.0587 7.38502 24.0587 7.87502C24.0587 8.36502 23.6773 8.75002 23.192 8.75002Z" fill="black"/>
</svg>
`;
const shareIcon = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.68 25.5345L13.3815 22.0995C12.5592 22.9786 11.4915 23.59 10.3171 23.8543C9.14275 24.1186 7.91603 24.0236 6.79639 23.5816C5.67674 23.1395 4.71594 22.3709 4.03886 21.3757C3.36177 20.3804 2.99969 19.2045 2.99969 18.0008C2.99969 16.797 3.36177 15.6211 4.03886 14.6258C4.71594 13.6306 5.67674 12.862 6.79639 12.4199C7.91603 11.9779 9.14275 11.8829 10.3171 12.1472C11.4915 12.4115 12.5592 13.0229 13.3815 13.902L19.6815 10.467C19.3244 9.05095 19.4959 7.55325 20.1641 6.25466C20.8322 4.95606 21.9511 3.94573 23.3108 3.41306C24.6706 2.88038 26.178 2.86193 27.5504 3.36117C28.9228 3.8604 30.0661 4.84305 30.7658 6.1249C31.4655 7.40675 31.6737 8.8998 31.3513 10.3242C31.0289 11.7485 30.1981 13.0064 29.0146 13.8621C27.8311 14.7177 26.3762 15.1123 24.9226 14.9719C23.4689 14.8315 22.1164 14.1658 21.1185 13.0995L14.8185 16.5345C15.0608 17.4965 15.0608 18.5035 14.8185 19.4655L21.1185 22.9005C22.1169 21.8347 23.4697 21.1697 24.9234 21.03C26.3771 20.8903 27.8318 21.2856 29.0149 22.1418C30.1979 22.998 31.0281 24.2562 31.3499 25.6807C31.6716 27.1052 31.4627 28.5981 30.7625 29.8796C30.0622 31.1611 28.9186 32.1433 27.546 32.6419C26.1734 33.1405 24.666 33.1215 23.3065 32.5883C21.947 32.055 20.8286 31.0443 20.161 29.7455C19.4933 28.4466 19.3223 26.9489 19.68 25.533M9 21C9.79565 21 10.5587 20.6839 11.1213 20.1213C11.6839 19.5587 12 18.7957 12 18C12 17.2044 11.6839 16.4413 11.1213 15.8787C10.5587 15.3161 9.79565 15 9 15C8.20435 15 7.44129 15.3161 6.87868 15.8787C6.31607 16.4413 6 17.2044 6 18C6 18.7957 6.31607 19.5587 6.87868 20.1213C7.44129 20.6839 8.20435 21 9 21ZM25.5 12C26.2957 12 27.0587 11.6839 27.6213 11.1213C28.1839 10.5587 28.5 9.79565 28.5 9C28.5 8.20435 28.1839 7.44129 27.6213 6.87868C27.0587 6.31607 26.2957 6 25.5 6C24.7044 6 23.9413 6.31607 23.3787 6.87868C22.8161 7.44129 22.5 8.20435 22.5 9C22.5 9.79565 22.8161 10.5587 23.3787 11.1213C23.9413 11.6839 24.7044 12 25.5 12ZM25.5 30C26.2957 30 27.0587 29.6839 27.6213 29.1213C28.1839 28.5587 28.5 27.7957 28.5 27C28.5 26.2044 28.1839 25.4413 27.6213 24.8787C27.0587 24.3161 26.2957 24 25.5 24C24.7044 24 23.9413 24.3161 23.3787 24.8787C22.8161 25.4413 22.5 26.2044 22.5 27C22.5 27.7957 22.8161 28.5587 23.3787 29.1213C23.9413 29.6839 24.7044 30 25.5 30Z" fill="black"/>
</svg>
`
const threeSixtyView = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 16C4 17.5759 4.31039 19.1363 4.91345 20.5922C5.5165 22.0481 6.40042 23.371 7.51472 24.4853C8.62902 25.5996 9.95189 26.4835 11.4078 27.0866C12.8637 27.6896 14.4241 28 16 28C17.5759 28 19.1363 27.6896 20.5922 27.0866C22.0481 26.4835 23.371 25.5996 24.4853 24.4853C25.5996 23.371 26.4835 22.0481 27.0866 20.5922C27.6896 19.1363 28 17.5759 28 16C28 14.4241 27.6896 12.8637 27.0866 11.4078C26.4835 9.95189 25.5996 8.62902 24.4853 7.51472C23.371 6.40042 22.0481 5.5165 20.5922 4.91345C19.1363 4.31039 17.5759 4 16 4C14.4241 4 12.8637 4.31039 11.4078 4.91345C9.95189 5.5165 8.62902 6.40042 7.51472 7.51472C6.40042 8.62902 5.5165 9.95189 4.91345 11.4078C4.31039 12.8637 4 14.4241 4 16Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6667 16C10.6667 19.1826 11.2286 22.2348 12.2288 24.4853C13.229 26.7357 14.5855 28 16 28C17.4145 28 18.771 26.7357 19.7712 24.4853C20.7714 22.2348 21.3333 19.1826 21.3333 16C21.3333 12.8174 20.7714 9.76516 19.7712 7.51472C18.771 5.26428 17.4145 4 16 4C14.5855 4 13.229 5.26428 12.2288 7.51472C11.2286 9.76516 10.6667 12.8174 10.6667 16Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 16C4 18.9467 9.37333 21.3334 16 21.3334C22.6267 21.3334 28 18.9467 28 16C28 13.0534 22.6267 10.6667 16 10.6667C9.37333 10.6667 4 13.0534 4 16Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
const locationIcon = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 8.50051C11.5 7.11924 10.3808 6 9.00051 6C7.61924 6 6.5 7.11924 6.5 8.50051C6.5 9.88076 7.61924 11 9.00051 11C10.3808 11 11.5 9.88076 11.5 8.50051Z" stroke="#DFFF60" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.99951 19C7.80104 19 1.5 13.8984 1.5 8.56329C1.5 4.38664 4.8571 1 8.99951 1C13.1419 1 16.5 4.38664 16.5 8.56329C16.5 13.8984 10.198 19 8.99951 19Z" stroke="#DFFF60" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`

let collabrators = [];
let selectedCollabrators = [];
let pinPointCoordinets = {};
let placedPins = [];
let subjectLengthCount = 0;
let existingPinPoints = [];
let siteNoteStatus = { status_name: undefined, status_id: undefined };
let captureImagesArray = [];
let currentSiteNoteId = undefined;
let parentCommentId = undefined;
let editCommentData = {}
let mensionCollabratorList = [];
let deletedCaptureImage = []
let statusData = [];
let allCollaborators = []; // cache the full list
let collaboratorSelected = false;
let isOpenSiteActionModal = false
let currentZoom = 1;
const minZoom = 1;
const maxZoom = 5;
let userData = JSON.parse(localStorage.getItem("userData"));
let currentSiteSpot = null;
const maxSize = 10 * 1024 * 1024;
let isDisableTourSite = false;

window.addEventListener("DOMContentLoaded", () => {
    window.parent.postMessage({
        type: 'getParentUrlForSite'
    }, '*');

})
window.addEventListener('message', (event) => {

    if (event.data && event.data.type === "parentUrlResponseForSite" && event.data.data && event.data.data.length > 0) {

        const data = JSON.parse(event.data.data);

        if (data) {
            const krpano = document.getElementById("krpanoSWFObject");


            if (!krpano) return;

            setTimeout(() => {

                triggerThreeJSClick(data?.frameName);
                krpano.call(`lookto(${data?.yaw}, ${data?.pitch}, 90, direct());`);

                setTimeout(() => {
                    handelViewSiteNote(data?.sitenoteId)
                    window.parent.postMessage({
                        type: 'getParentUrlForSiteCancel'
                    }, '*');
                }
                    , 2000)
            }, 1000)
        }
    }

}, false)


function createSiteNotePopup() {
    const krpano = document.getElementById("krpanoSWFObject");
    if (krpano) {
        const sitenoteBox = document.getElementById("sitenote_box");

        //----------------- create site note popup -----------------
        const siteNotePopupInnerContainer = document.createElement("div");
        siteNotePopupInnerContainer.classList.add("sitenote_inner_container");
        sitenoteBox.appendChild(siteNotePopupInnerContainer);

        // create left side container
        const siteNotePopupContainerLeft = document.createElement("div");
        siteNotePopupContainerLeft.classList.add("sitenote_left");
        siteNotePopupInnerContainer.appendChild(siteNotePopupContainerLeft);

        // create h6 tage for add heading text
        const siteNoteInfomationTitle = document.createElement("h6");
        siteNoteInfomationTitle.classList.add("information_titel");
        siteNoteInfomationTitle.innerHTML = "Add a Field Note";
        siteNotePopupContainerLeft.appendChild(siteNoteInfomationTitle);

        // create p tage for add  text
        const siteNoteInfomationText = document.createElement("h6");
        siteNoteInfomationText.classList.add("information_text");
        siteNoteInfomationText.innerHTML = "Tap anywhere in the capture to add your note.";
        siteNotePopupContainerLeft.appendChild(siteNoteInfomationText);

        // create right side container
        const siteNotePopupContainerRight = document.createElement("div");
        siteNotePopupContainerRight.classList.add("sitenote_right");
        siteNotePopupInnerContainer.appendChild(siteNotePopupContainerRight);

        // create cancel button
        const siteNoteCancelButton = document.createElement("button");
        siteNoteCancelButton.classList.add("sitenote_cancel_button");
        siteNoteCancelButton.innerHTML = "Cancel";
        siteNoteCancelButton.onclick = handelClosePlacePoint;
        siteNotePopupContainerRight.appendChild(siteNoteCancelButton);
    }
};

function createSitenoteModal() {
    const krpano = document.getElementById("krpanoSWFObject");
    if (krpano) {
        //----------------- create modal dialoge -----------------
        const sitenoteModalDialoge = document.createElement("div");
        sitenoteModalDialoge.classList.add("sitenote_modal_dialoge");
        sitenoteModalDialoge.id = "sitenote_modal_dialoge";
        sitenoteModalDialoge.style.display = "none";
        krpano.appendChild(sitenoteModalDialoge);

        // create modal
        const sitenoteModal = document.createElement("div");
        sitenoteModal.classList.add("sitenote_modal");
        sitenoteModal.id = "sitenote_modal";
        sitenoteModalDialoge.appendChild(sitenoteModal);

        //----------------- create modal header -----------------
        const sitenoteModalheaderWrapper = document.createElement("div");
        sitenoteModalheaderWrapper.classList.add("modal_header_wrapper");
        sitenoteModal.appendChild(sitenoteModalheaderWrapper);

        const sitenoteModalheader = document.createElement("div");
        sitenoteModalheader.classList.add("modal_header");
        sitenoteModalheaderWrapper.appendChild(sitenoteModalheader);

        // create modal header titel
        const modalHeading = document.createElement("h3");
        modalHeading.classList.add("modal_titel");
        modalHeading.id = "modal_titel";
        modalHeading.innerHTML = "Add Site Note";
        sitenoteModalheader.appendChild(modalHeading);

        // create modal close icon
        const modalCloseIcon = document.createElement("button");
        modalCloseIcon.classList.add("modal_close_icon");
        modalCloseIcon.id = "modal_close_icon";
        modalCloseIcon.innerHTML = closeIconSVG;
        sitenoteModalheader.appendChild(modalCloseIcon);

        //----------------- create profile section -----------------
        const modalHeaderProfileContainer = document.createElement("div");
        modalHeaderProfileContainer.classList.add("modal_profile_container");
        sitenoteModalheaderWrapper.appendChild(modalHeaderProfileContainer);

        // create left side container
        const leftProfileContainer = document.createElement("div");
        leftProfileContainer.classList.add("left_profile_container");
        modalHeaderProfileContainer.appendChild(leftProfileContainer);

        // create profile image container
        const userProfileContainer = document.createElement("div");
        userProfileContainer.classList.add("user_profile_container");
        leftProfileContainer.appendChild(userProfileContainer);

        // create profile image
        const userProfileImage = document.createElement("img");
        userProfileImage.classList.add("user_profile_image");
        userProfileImage.id = "user_profile_image";
        userProfileContainer.appendChild(userProfileImage);

        // create name and date container
        const userNameContainer = document.createElement("div");
        userNameContainer.classList.add("user_name_container");
        leftProfileContainer.appendChild(userNameContainer);

        // create h2 for user name 
        const userName = document.createElement("h2");
        userName.classList.add("user_name");
        userName.id = "user_name";
        userNameContainer.appendChild(userName)

        // create p for date 
        const createdDate = document.createElement("p");
        createdDate.classList.add("created_date");
        createdDate.id = "created_date";
        userNameContainer.appendChild(createdDate);

        const rightProfileContainerMain = document.createElement("div");
        rightProfileContainerMain.className = "flex-box"
        modalHeaderProfileContainer.appendChild(rightProfileContainerMain);

        const rightThreeSixtyViewContainer = document.createElement("div")
        rightThreeSixtyViewContainer.className = "right_360_view"
        rightThreeSixtyViewContainer.id = "right_360_view"
        rightThreeSixtyViewContainer.innerHTML = ` <span> ${locationIcon} </span> View in Tour`
        rightThreeSixtyViewContainer.style.display = "none";
        rightThreeSixtyViewContainer.onclick = handleSiteActionCancel;
        rightProfileContainerMain.appendChild(rightThreeSixtyViewContainer);

        // create right side container
        const rightProfileContainer = document.createElement("div");
        rightProfileContainer.classList.add("right_profile_container");
        rightProfileContainer.id = "right_profile_container";
        rightProfileContainer.style.display = "none";
        rightProfileContainer.onclick = handleToggleSiteAction
        rightProfileContainerMain.appendChild(rightProfileContainer);


        const rightActionDropdown = document.createElement("div");
        rightActionDropdown.classList.add("right_action_dropdown");
        rightActionDropdown.id = "right_action_dropdown";
        rightProfileContainer.appendChild(rightActionDropdown);



        const rightActionDropdownDownload = document.createElement("button");
        rightActionDropdownDownload.classList.add("right_action_dropdown_download");
        rightActionDropdownDownload.id = "right_action_dropdown_download";
        rightActionDropdownDownload.innerHTML = ` <span> ${pdfIcon} </span> Download PDF`
        rightActionDropdown.appendChild(rightActionDropdownDownload);

        const rightActionDropdownShare = document.createElement("button");
        rightActionDropdownShare.classList.add("right_action_dropdown_share");
        rightActionDropdownShare.id = "right_action_dropdown_share";
        rightActionDropdownShare.innerHTML = ` <span>${shareIcon}</span> Share link`
        rightActionDropdownShare.onclick = (e) => { e.stopPropagation(); handleSiteActionShare() }

        rightActionDropdown.appendChild(rightActionDropdownShare);

        const rightActionDropdownDelete = document.createElement("button");
        rightActionDropdownDelete.classList.add("right_action_dropdown_delete");
        rightActionDropdownDelete.id = "right_action_dropdown_delete";
        rightActionDropdownDelete.style.display = "none";
        rightActionDropdownDelete.innerHTML = ` <span> ${trashBin} </span>  Delete note`
        rightActionDropdownDelete.onclick = () => { handleSiteActionDelete() }
        rightActionDropdown.appendChild(rightActionDropdownDelete);



        const userDeleteSiteModalDialoge = document.createElement("div");
        userDeleteSiteModalDialoge.classList.add("user_delete_site_modal_dialoge");
        userDeleteSiteModalDialoge.id = "user_delete_site_modal_dialoge";
        sitenoteModalheaderWrapper.appendChild(userDeleteSiteModalDialoge);


        const userDeleteSiteModal = document.createElement("div");
        userDeleteSiteModal.classList.add("user_delete_site_modal");
        userDeleteSiteModal.id = "user_delete_site_modal";
        userDeleteSiteModalDialoge.appendChild(userDeleteSiteModal);

        const userDeleteSiteModalConfirmHeading = document.createElement("p");
        userDeleteSiteModalConfirmHeading.classList.add("user_delete_site_modal_confirm_heading");
        userDeleteSiteModalConfirmHeading.innerHTML = "Confirm Deletion"
        userDeleteSiteModal.appendChild(userDeleteSiteModalConfirmHeading);

        const userDeleteSiteModalHeading = document.createElement("p");
        userDeleteSiteModalHeading.classList.add("user_delete_site_modal_heading");
        userDeleteSiteModalHeading.innerHTML = "Are you sure you want to delete this site note?"
        userDeleteSiteModal.appendChild(userDeleteSiteModalHeading);

        const userDeleteSiteModalContainer = document.createElement("div");
        userDeleteSiteModalContainer.classList.add("user_delete_site_modal_main");
        userDeleteSiteModal.appendChild(userDeleteSiteModalContainer);

        const userDeleteSiteModalCancelButton = document.createElement("button");
        userDeleteSiteModalCancelButton.classList.add("user_delete_site_modal_cancel_button");
        userDeleteSiteModalCancelButton.innerHTML = `Cancel`
        userDeleteSiteModalCancelButton.onclick = () => { handleCancelSiteNote() }
        userDeleteSiteModalContainer.appendChild(userDeleteSiteModalCancelButton);

        const userDeleteSiteModalSubmitButton = document.createElement("button");
        userDeleteSiteModalSubmitButton.classList.add("user_delete_site_modal_submit_button");
        userDeleteSiteModalSubmitButton.id = "user_delete_site_modal_submit_button";

        userDeleteSiteModalSubmitButton.innerHTML = `Delete`
        userDeleteSiteModalSubmitButton.onclick = () => { handleDeleteSiteNote() }
        userDeleteSiteModalContainer.appendChild(userDeleteSiteModalSubmitButton);



        // create action button container
        const rightActionContainer = document.createElement("div");
        rightActionContainer.classList.add("right_action_container");
        rightActionContainer.innerHTML = threeDots
        rightProfileContainer.appendChild(rightActionContainer);

        //----------------- create modal body container -----------------
        const modalBodyContainer = document.createElement("div");
        modalBodyContainer.classList.add("modal_body_container");
        sitenoteModal.appendChild(modalBodyContainer);

        //----------------- create modal body left container -----------------
        const modalBodyLeftContainer = document.createElement("div");
        modalBodyLeftContainer.classList.add("modal_body_left_container");
        modalBodyContainer.appendChild(modalBodyLeftContainer);

        // create floor capture image container
        const floorCaptureContainer = document.createElement("div");
        floorCaptureContainer.classList.add("floor_capture_contaner");
        floorCaptureContainer.id = "floor_capture_contaner";
        modalBodyLeftContainer.appendChild(floorCaptureContainer);

        const removeCurrentCapture = document.createElement('button');
        removeCurrentCapture.className = 'remove_capture_button';
        removeCurrentCapture.id = 'remove_capture_button';
        removeCurrentCapture.innerHTML = crossIcon;
        removeCurrentCapture.style.display = "none";
        removeCurrentCapture.onclick = () => handelRemoveExtraImage();
        floorCaptureContainer.appendChild(removeCurrentCapture);

        // create comment container
        const commentContainer = document.createElement("div");
        commentContainer.classList.add("comment_container");
        commentContainer.id = "comment_container";
        modalBodyLeftContainer.appendChild(commentContainer);

        // create comment container header
        const commentHeader = document.createElement("h3");
        commentHeader.classList.add("comment_header");
        commentHeader.innerHTML = "Comments";
        commentContainer.appendChild(commentHeader);

        // create comment body
        const commentBody = document.createElement("div");
        commentBody.classList.add("comment_body");
        commentBody.id = "comment_body";
        commentContainer.appendChild(commentBody);

        // create comment footer
        const commentFooter = document.createElement("div");
        commentFooter.classList.add("comment_footer");
        commentFooter.id = "comment_footer";
        commentContainer.appendChild(commentFooter);

        // create add comment input
        const addCommentInput = document.createElement("input");
        addCommentInput.classList.add("add_comment_textarea");
        addCommentInput.id = "add_comment_textarea";
        addCommentInput.setAttribute("autocomplete", "off");
        addCommentInput.placeholder = "Write Comment";
        addCommentInput.rows = 2;
        addCommentInput.oninput = (e) => handelGetTagedCollabratorList(e)
        addCommentInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handelAddCommentInSiteNote();
            }
        });
        commentFooter.appendChild(addCommentInput);
        const addCommentButton = document.createElement("button");
        addCommentButton.classList.add("add_comment_button");
        addCommentButton.id = "add_comment_button";
        addCommentButton.onclick = () => handelAddCommentInSiteNote();
        addCommentButton.innerHTML = addCommentArrow;
        commentFooter.appendChild(addCommentButton);


        //----------------- create modal body right container -----------------
        const modalBodyRightContainer = document.createElement("div");
        modalBodyRightContainer.classList.add("modal_body_right_container");
        modalBodyContainer.appendChild(modalBodyRightContainer);

        // create floor map container
        const floorMapImageContainer = document.createElement("div");
        floorMapImageContainer.classList.add("floor_map_image_continer");
        modalBodyRightContainer.appendChild(floorMapImageContainer);

        // create header titel
        const floorMapImageTitel = document.createElement("h3");
        floorMapImageTitel.classList.add("floor_map_image_titel");
        floorMapImageTitel.id = "floor_map_image_titel"
        floorMapImageContainer.appendChild(floorMapImageTitel);

        // create floor map image wrapper
        const floorMapImageWrapper = document.createElement("div");
        floorMapImageWrapper.classList.add("floor_map_image_wrapper");
        floorMapImageWrapper.id = "floor_map_image_wrapper";
        floorMapImageContainer.appendChild(floorMapImageWrapper);



        // create floor map image
        const floorMapImage = document.createElement("img");
        floorMapImage.classList.add("floor_map_image");
        floorMapImage.id = "floor_map_image";
        floorMapImage.src = "./floorplan.jpeg";
        floorMapImage.style.position = "relative"
        floorMapImageWrapper.appendChild(floorMapImage);

        // Image Drag & Pan

        // Get the image and wrapper elements
        const imageToPan = document.getElementById("floor_map_image");
        const imageWrapper = document.getElementById("floor_map_image_wrapper");
        // Prevent native image dragging
        imageToPan.draggable = false;

        enableZoomAndPanForFloorMap(imageWrapper, imageToPan)


        function adjustFloorMapZoom(amount,e) {
            const container = document.getElementById("floor_map_image_wrapper");
            const image = document.getElementById("floor_map_image");

            if (!container || !image) return;
            if(e?.detail === 0) return true;
            const newZoom = Math.max(minZoom, Math.min(currentZoom + amount, maxZoom));

            if (newZoom === currentZoom) return;

            const rect = container.getBoundingClientRect();

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const offsetX = centerX + container.scrollLeft;
            const offsetY = centerY + container.scrollTop;

            const contentX = offsetX / currentZoom;
            const contentY = offsetY / currentZoom;

            currentZoom = newZoom;

            image.style.transform = `scale(${currentZoom})`;

            container.scrollLeft = contentX * currentZoom - centerX;
            container.scrollTop = contentY * currentZoom - centerY;

            updatePinPositions();

        }

        function enableZoomAndPanForFloorMap(container, image) {
            let isDragging = false;
            let startX = 0;
            let startY = 0;
            let scrollX = 0;
            let scrollY = 0;
            let imgWidth = image.naturalWidth;
            let imgHeight = image.naturalHeight;

            // Setup container styles
            container.style.overflow = "auto";
            container.style.touchAction = "none";
            container.style.position = "relative";
            container.style.cursor = "grab";
            image.style.transformOrigin = "top left";
            image.style.transform = `scale(${currentZoom})`;
            image.style.pointerEvents = "none";

            // Get accurate image dimensions
            image.onload = function () {
                imgWidth = this.naturalWidth;
                imgHeight = this.naturalHeight;
            };
            if (image.complete) image.onload();

            // Apply zoom and adjust scroll to keep content centered
            const applyZoom = (newZoom, centerX, centerY) => {
                const rect = container.getBoundingClientRect();

                // Convert screen coordinates to container coordinates
                const containerX = centerX - rect.left;
                const containerY = centerY - rect.top;

                // Calculate content position under the pointer before zoom
                const contentX = (container.scrollLeft + containerX) / currentZoom;
                const contentY = (container.scrollTop + containerY) / currentZoom;

                // Apply new zoom
                currentZoom = Math.max(minZoom, Math.min(newZoom, maxZoom));
                image.style.transform = `scale(${currentZoom})`;

                // Calculate new scroll position to keep content under pointer stable
                const newScrollLeft = contentX * currentZoom - containerX;
                const newScrollTop = contentY * currentZoom - containerY;

                // Ensure we don't scroll beyond image boundaries
                const maxScrollX = Math.max(0, imgWidth * currentZoom - rect.width);
                const maxScrollY = Math.max(0, imgHeight * currentZoom - rect.height);

                container.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScrollX));
                container.scrollTop = Math.max(0, Math.min(newScrollTop, maxScrollY));
                updatePinPositions();
            };

            // Wheel zoom (for desktop)
            container.addEventListener("wheel", (e) => {
                e.preventDefault();

                const zoomStep = 0.2; // Smaller step for smoother zoom
                const delta = e.deltaY < 0 ? zoomStep : -zoomStep;
                applyZoom(currentZoom + delta, e.clientX, e.clientY);
            });

            // Pointer events for dragging
            container.addEventListener("pointerdown", (e) => {
                if (isPinching) return;
                e.preventDefault();
                isDragging = true;

                startX = e.clientX;
                startY = e.clientY;

                scrollX = container.scrollLeft;
                scrollY = container.scrollTop;

                container.setPointerCapture(e.pointerId);
                container.style.cursor = "grabbing";
            });

            container.addEventListener("pointermove", (e) => {
                if (!isDragging || isPinching) return;

                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                container.scrollLeft = scrollX - dx;
                container.scrollTop = scrollY - dy;
            });

            container.addEventListener("pointerup", (e) => {
                isDragging = false;
                container.releasePointerCapture(e.pointerId);
                container.style.cursor = "grab";
                updatePinPositions();
            });

            container.addEventListener("pointerleave", () => {
                isDragging = false;
                container.style.cursor = "grab";
            });

            // Enhanced Pinch Zoom
            let initialPinchDistance = null;
            let isPinching = false;
            let initialZoom = currentZoom;
            let initialTouchCenter = null;
            let animationFrameId = null;

            container.addEventListener("touchstart", (e) => {
                if (e.touches.length === 2) {
                    isPinching = true;
                    initialPinchDistance = getPinchDistance(e.touches);
                    initialZoom = currentZoom;

                    const rect = container.getBoundingClientRect();
                    const touch1 = e.touches[0];
                    const touch2 = e.touches[1];

                    // Calculate center point between fingers in screen coordinates
                    initialTouchCenter = {
                        x: (touch1.clientX + touch2.clientX) / 2,
                        y: (touch1.clientY + touch2.clientY) / 2
                    };

                    // Optimize for performance during pinch
                    image.style.willChange = 'transform';
                } else if (e.touches.length === 1) {
                    const touch = e.touches[0];
                    isDragging = true;
                    startX = touch.clientX;
                    startY = touch.clientY;
                    scrollX = container.scrollLeft;
                    scrollY = container.scrollTop;
                }
            });

            container.addEventListener("touchmove", (e) => {
                if (e.touches.length === 2 && isPinching) {
                    e.preventDefault();
                    if (animationFrameId) cancelAnimationFrame(animationFrameId);

                    animationFrameId = requestAnimationFrame(() => {
                        const touch1 = e.touches[0];
                        const touch2 = e.touches[1];
                        const newDistance = getPinchDistance(e.touches);

                        // Calculate new center point
                        const currentCenter = {
                            x: (touch1.clientX + touch2.clientX) / 2,
                            y: (touch1.clientY + touch2.clientY) / 2
                        };

                        // Apply zoom centered between fingers
                        const scaleFactor = newDistance / initialPinchDistance;
                        applyZoom(initialZoom * scaleFactor, currentCenter.x, currentCenter.y);
                    });
                } else if (e.touches.length === 1 && isDragging) {
                    const touch = e.touches[0];
                    const dx = touch.clientX - startX;
                    const dy = touch.clientY - startY;
                    container.scrollLeft = scrollX - dx;
                    container.scrollTop = scrollY - dy;
                }
            });

            container.addEventListener("touchend", (e) => {
                if (e.touches.length < 2 && isPinching) {
                    isPinching = false;
                    initialPinchDistance = null;
                    initialTouchCenter = null;
                    if (animationFrameId) cancelAnimationFrame(animationFrameId);
                    image.style.willChange = '';
                }

                if (e.touches.length === 0) {
                    isDragging = false;
                    updatePinPositions(); // 👈

                }
            });

            function getPinchDistance(touches) {
                const dx = touches[0].clientX - touches[1].clientX;
                const dy = touches[0].clientY - touches[1].clientY;
                return Math.sqrt(dx * dx + dy * dy);
            }
        }

        // Create zoom controls
        const zoomControls = document.createElement('div');
        zoomControls.className = 'floor_map_action_controls';
        zoomControls.id = 'floor_map_action_controls';

        // Zoom in button
        const zoomInBtn = document.createElement('button');
        zoomInBtn.className = 'action_btn';
        zoomInBtn.innerHTML = zoomInIcon;
        zoomInBtn.addEventListener('click', (e) => adjustFloorMapZoom(0.4,e));

        // Zoom out button
        const zoomOutBtn = document.createElement('button');
        zoomOutBtn.className = 'action_btn';
        zoomOutBtn.innerHTML = zoomOutIcon;
        zoomOutBtn.addEventListener('click', (e) => adjustFloorMapZoom(-0.4,e));

        zoomControls.appendChild(zoomInBtn);
        zoomControls.appendChild(zoomOutBtn);
        floorMapImageContainer.appendChild(zoomControls);

        // create subject container
        const subjectContainer = document.createElement("div");
        subjectContainer.classList.add("subject_container");
        subjectContainer.id = "subject_container";
        modalBodyRightContainer.appendChild(subjectContainer);

        // create label for subject
        const subjectLabel = document.createElement("label");
        subjectLabel.classList.add("input_label");
        subjectLabel.textContent = "Subject";
        subjectContainer.appendChild(subjectLabel);

        // create input for subject
        const subjectInput = document.createElement("input");
        subjectInput.classList.add("input_for_value");
        subjectInput.id = "subject_input";
        subjectInput.type = "text";
        subjectInput.placeholder = "Add Subject";
        subjectInput.oninput = handelChangeSubject;
        subjectContainer.appendChild(subjectInput);

        // error message for subject
        const subjecterrorMessage = document.createElement("p");
        subjecterrorMessage.classList.add("input_error_message");
        subjecterrorMessage.id = "subject_input_error";
        subjecterrorMessage.maxlength = "100"
        subjectContainer.appendChild(subjecterrorMessage);

        // error message for subject
        const subjectLength = document.createElement("p");
        subjectLength.classList.add("length_check");
        subjectLength.id = "length_check";
        subjectLength.innerHTML = `${subjectLengthCount} / 100`
        subjectContainer.appendChild(subjectLength);

        // create description container
        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("textarea_container");
        descriptionContainer.id = "description_container";
        modalBodyRightContainer.appendChild(descriptionContainer);

        // create label for description
        const descriptionLabel = document.createElement("label");
        descriptionLabel.classList.add("textarea_label");
        descriptionLabel.textContent = "Description";
        descriptionContainer.appendChild(descriptionLabel);

        // create textarea for description
        const descriptionTextarea = document.createElement("textarea");
        descriptionTextarea.classList.add("textarea_for_value");
        descriptionTextarea.id = "description_textarea";
        descriptionTextarea.placeholder = "Add description...";
        descriptionTextarea.rows = 4;
        descriptionTextarea.oninput = handelChangeDescription;
        descriptionContainer.appendChild(descriptionTextarea);

        // error message for description
        const descriptionMessage = document.createElement("p");
        descriptionMessage.classList.add("input_error_message");
        descriptionMessage.id = "description_input_error";
        descriptionContainer.appendChild(descriptionMessage);

        // create wrapper container
        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row_flex_container");
        modalBodyRightContainer.appendChild(rowContainer);



        // create status container
        const statusContainer = document.createElement("div");
        statusContainer.classList.add("droprown_container");
        statusContainer.id = "status_container";
        modalBodyRightContainer.appendChild(statusContainer);


        // create due date container
        const dueDateContainer = document.createElement("div");
        dueDateContainer.classList.add("input_container");
        dueDateContainer.id = "due_date_container";
        modalBodyRightContainer.appendChild(dueDateContainer);


        // append children inside the flex container
        rowContainer.appendChild(statusContainer);
        rowContainer.appendChild(dueDateContainer);


        // create label for status
        const statusLabel = document.createElement("label");
        statusLabel.classList.add("dropdown_label");
        statusLabel.textContent = "Status";
        statusContainer.appendChild(statusLabel);

        // create select custome dropdown for status
        const statusHeadContainer = document.createElement("div");
        statusHeadContainer.classList.add("status_head_container");
        statusHeadContainer.id = "status_head_container";

        const defaultStatusHeading = document.createElement("span");
        defaultStatusHeading.classList.add("default_heading")

        const defaultStatusHeadingLeft = document.createElement("span");
        defaultStatusHeadingLeft.innerHTML = "Select Status"
        const defaultStatusHeadingRight = document.createElement("button");
        defaultStatusHeadingRight.id = 'dropdown_arrow';
        defaultStatusHeadingRight.innerHTML = downArrow;

        defaultStatusHeading.appendChild(defaultStatusHeadingLeft);
        defaultStatusHeading.appendChild(defaultStatusHeadingRight);
        statusHeadContainer.appendChild(defaultStatusHeading);
        statusHeadContainer.onclick = handelToggleStatusDropdownOption;

        const statusOptionsContainer = document.createElement("div");
        statusOptionsContainer.classList.add("status_options_container");
        statusOptionsContainer.id = "status_options_container";
        statusOptionsContainer.style.display = "none";
        statusContainer.appendChild(statusHeadContainer);
        statusContainer.appendChild(statusOptionsContainer);

        // error message for status
        const statusMessage = document.createElement("p");
        statusMessage.classList.add("input_error_message");
        statusMessage.id = "status_input_error";
        statusContainer.appendChild(statusMessage);


        // create label for due date
        const dueDateLabel = document.createElement("label");
        dueDateLabel.classList.add("input_label");
        dueDateLabel.textContent = "Due Date";
        dueDateContainer.appendChild(dueDateLabel);

        // container for input + icon
        const dueDateInputWrapper = document.createElement("div");
        dueDateInputWrapper.classList.add("input_icon_wrapper");


        // create input for due date
        const dueDateInput = document.createElement("input");
        dueDateInput.classList.add("input_for_value");
        dueDateInput.id = "due_date_input";
        dueDateInput.type = "text";
        dueDateInput.autocomplete = "off";
        dueDateInput.readOnly = true;
        dueDateInput.placeholder = "Select Due Date";
        dueDateInput.onclick = initializeCalendarComponent;

        // create calendar icon
        const calendarIcon = document.createElement("span");
        calendarIcon.classList.add("calendar_icon");
        calendarIcon.innerHTML = calendarSvg; // or use an <img> or SVG here
        calendarIcon.onclick = () => {
            dueDateInput.click(); // triggers input's click handler
        };


        // dueDateContainer.appendChild(dueDateInput);
        dueDateInputWrapper.appendChild(dueDateInput);
        dueDateInputWrapper.appendChild(calendarIcon);
        dueDateContainer.appendChild(dueDateInputWrapper);

        syncLeftHeightToRight()

        // error message for due date
        const dueDateMessage = document.createElement("p");
        dueDateMessage.classList.add("input_error_message");
        dueDateMessage.id = "duedate_input_error";
        dueDateContainer.appendChild(dueDateMessage);

        // create collebrator container
        const collebratorContainer = document.createElement("div");
        collebratorContainer.classList.add("droprown_container");
        collebratorContainer.id = "collabrator_container";
        modalBodyRightContainer.appendChild(collebratorContainer);

        // create label for collebrator
        const collebratorLabel = document.createElement("label");
        collebratorLabel.classList.add("dropdown_label");
        collebratorLabel.textContent = "Collabrator";
        collebratorContainer.appendChild(collebratorLabel);

        // create select custome dropdown for collobrator
        const collobratorHeadContainer = document.createElement("div");
        collobratorHeadContainer.classList.add("collabrator_head_container");
        collobratorHeadContainer.id = "collabrator_head_container";

        const defaultHeading = document.createElement("span");
        defaultHeading.classList.add("default_heading")

        const defaultHeadingLeft = document.createElement("span");
        defaultHeadingLeft.innerHTML = "Select Collobrator"
        const defaultHeadingRight = document.createElement("button");
        defaultHeadingRight.id = 'collabrator_dropdown_arrow';
        defaultHeadingRight.innerHTML = downArrow;

        defaultHeading.appendChild(defaultHeadingLeft);
        defaultHeading.appendChild(defaultHeadingRight);
        collobratorHeadContainer.appendChild(defaultHeading);
        collobratorHeadContainer.onclick = handelToggleCollabratorDropdownOption;

        const collobratorOptionsContainer = document.createElement("div");
        collobratorOptionsContainer.classList.add("collabrator_options_container");
        collobratorOptionsContainer.id = "collabrator_options_container";
        collobratorOptionsContainer.style.display = "none";
        collebratorContainer.appendChild(collobratorHeadContainer);
        collebratorContainer.appendChild(collobratorOptionsContainer);

        // error message for collobrator
        const collobratorMessage = document.createElement("p");
        collobratorMessage.classList.add("input_error_message");
        collobratorMessage.id = "collabrator_input_error";
        collebratorContainer.appendChild(collobratorMessage);

        // create preview container for collobrator
        const collobratorPreviewContainerOuter = document.createElement("div");
        collobratorPreviewContainerOuter.classList.add("collabrator_preview_container_outer");
        collobratorPreviewContainerOuter.id = "collabrator_preview_container_outer";
        modalBodyRightContainer.appendChild(collobratorPreviewContainerOuter);

        // create preview container for collobrator
        const collobratorPreviewContainer = document.createElement("div");
        collobratorPreviewContainer.classList.add("collabrator_preview_container");
        collobratorPreviewContainer.id = "collabrator_preview_container";
        collobratorPreviewContainerOuter.appendChild(collobratorPreviewContainer);

        // create attachement container
        const attachementContainer = document.createElement("div");
        attachementContainer.classList.add("attachement_container");
        attachementContainer.id = "attachement_container";
        modalBodyRightContainer.appendChild(attachementContainer);

        // create label for attachement
        const attachementLabel = document.createElement("label");
        attachementLabel.classList.add("attachement_label");
        attachementLabel.textContent = "Add attachements";
        attachementContainer.appendChild(attachementLabel);

        // create file select area container
        const attachemenArea = document.createElement("div");
        attachemenArea.classList.add("attachement_mian");
        attachementContainer.appendChild(attachemenArea);

        // add upload image svg in attachemenArea
        attachemenArea.innerHTML = uploadImage;

        // add choose note in attachemenArea
        const fileChooseNote = document.createElement("p");
        fileChooseNote.classList.add("file_choose_note");
        fileChooseNote.innerHTML = "Choose an upload option to get started.";
        attachemenArea.appendChild(fileChooseNote);

        // // add upload image button choose note in attachemenArea
        // const uploadImageButton = document.createElement("button");
        // uploadImageButton.classList.add("upload_Image_button");
        // uploadImageButton.id = "upload_Image_button";
        // uploadImageButton.innerHTML = `${upload} &nbsp Upload Image`;
        // uploadImageButton.onclick = handelClickOnUploadImageButton;
        
        // attachemenArea.appendChild(uploadImageButton);


        // Create a wrapper label to simulate a button
        const uploadLabel = document.createElement("label");
        uploadLabel.classList.add("upload_Image_button");
        uploadLabel.id = "upload_Image_button";
        uploadLabel.innerHTML = `${upload} &nbsp Upload Image`;

        // Create the hidden file input
        const uploadImageInput = document.createElement("input");
        uploadImageInput.type = "file";
        uploadImageInput.accept = "image/jpeg, image/jpg, image/png, image/webp, application/pdf";
        uploadImageInput.style.display = "none"; // Hidden but clickable through label
        uploadImageInput.onchange = handelSelectExtraImageFromDevice;

        // Append input to the label
        uploadLabel.appendChild(uploadImageInput);

        // Append label to the attachment area
        attachemenArea.appendChild(uploadLabel);

        // add drag and drop note in attachemenArea
        const attachmentCount = document.createElement("p");
        attachmentCount.classList.add("attachment_count");
        attachmentCount.id = "attachment_count";
        attachmentCount.innerHTML = "Attachments Count: 0";
        attachemenArea.appendChild(attachmentCount);

        //  add drag drop image container
        const dragDropContainer = document.createElement("div");
        dragDropContainer.classList.add("drag_drop_container");
        attachemenArea.appendChild(dragDropContainer);

        // add drag and drop note in attachemenArea
        const dragDropnote = document.createElement("p");
        dragDropnote.classList.add("drag_drop_note");
        dragDropnote.innerHTML = `Or drag and drop here <br> (.jpg, .jpeg, .png, .webp, .pdf And size 10MB Maximum)`;
        dragDropContainer.appendChild(dragDropnote);

        // const dragDropnoteInfo = document.createElement("p");
        // dragDropnoteInfo.classList.add("drag_drop_note_info");
        // dragDropnoteInfo.innerHTML = `(.jpg, .jpeg, .pdf And size 10MB Maximum) `;
        // dragDropContainer.appendChild(dragDropnoteInfo);

        // add drag and drop input in dragDropContainer
        const dragDropInput = document.createElement("input");
        dragDropInput.classList.add("drag_drop_input");
        dragDropInput.id = "drag_drop_input";
        dragDropInput.type = "file";
        dragDropContainer.onchange = handelSelectExtraImageFromDevice;
        dragDropInput.accept = "image/jpeg, image/jpg, image/png, image/webp, application/pdf";
        dragDropContainer.appendChild(dragDropInput);

        //----------------- create modal footer -----------------
        const sitenoteModalFooter = document.createElement("div");
        sitenoteModalFooter.classList.add("modal_footer");
        sitenoteModalFooter.id = "modal_footer";
        sitenoteModal.appendChild(sitenoteModalFooter);

        // add action button container in footer
        const footerActionButtonContainer = document.createElement("div");
        footerActionButtonContainer.classList.add("action_buttons_container");
        sitenoteModalFooter.appendChild(footerActionButtonContainer);

        // add cancel button
        const footerCancelButton = document.createElement("button");
        footerCancelButton.classList.add("footer_cancel_button");
        footerCancelButton.id = "footer_cancel_button";
        footerCancelButton.innerHTML = "Cancel";
        footerActionButtonContainer.appendChild(footerCancelButton);

        // add note button
        const footerAddNotelButton = document.createElement("button");
        footerAddNotelButton.classList.add("footer_addnote_button");
        footerAddNotelButton.id = "footer_addnote_button";
        footerAddNotelButton.innerHTML = "Add note";
        footerAddNotelButton.onclick = handelAddSiteNote;
        footerActionButtonContainer.appendChild(footerAddNotelButton);

        getUserDetails();
        getSiteNoteStatusList();
        getCollabratorList();
        toggleStatusToggle();
        toggleCollabratorDropdown();
        toggleCalendarContainer();
    } else {
        console.error("krpanoSWFObject not found!");
    }
};


function syncLeftHeightToRight() {

    const leftContainer = document.querySelector(".modal_body_left_container");
    const rightContainer = document.querySelector(".modal_body_right_container");

    if (!leftContainer || !rightContainer) return;
    if (window && window.innerWidth >= 768) {
        const observer = new ResizeObserver(() => {
            const rightHeight = rightContainer.offsetHeight;
            leftContainer.style.height = rightHeight + "px";
        });
        observer.observe(rightContainer);
    } else {
        const observer = new ResizeObserver(() => {
            leftContainer.style.height = 700 + "px";
        });
        observer.observe(rightContainer);
    }

}



let activeCaptureId = undefined;

function convertTime(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
}

function generate12DigitId() {
    const base62chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const array = new Uint8Array(9); // 9 bytes ~ 72 bits => log₂(62^12) ≈ 71.5 bits
    crypto.getRandomValues(array);

    let uuid = '';
    for (let i = 0; i < array.length; i++) {
        uuid += base62chars[array[i] % 62];
    }
    return uuid;
}

//// initialize capture slider

function initializeCaptureSlider() {

    const removeCaptureButton = document.getElementById("remove_capture_button");
    if (removeCaptureButton) {
        removeCaptureButton.style.display = "none";
    }
    // Create the main container
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'capture_slider_container';
    sliderContainer.id = 'capture_slider_container';

    // Create the slides wrapper
    const captureSlidesWrapper = document.createElement('div');
    captureSlidesWrapper.className = 'capture_slides_wrapper';
    captureSlidesWrapper.id = 'capture_slides_wrapper';

    // Track zoom state globally (for buttons)
    let currentZoom = 1;
    let activeImage = null;
    let activeContainer = null;

    // Create slides
    captureImagesArray?.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.dataset.index = index;
        slide.dataset.scale = 1;
        slide.dataset.rotation = 0;
        slide.dataset.imageId = image.image_id;

        const img = document.createElement('img');
        img.src = image.image_url;
        img.alt = `Slide ${index + 1}`;

        img.classList.add("slide_image")

        slide.appendChild(img);
        // slide.appendChild(slideInner);
        captureSlidesWrapper.appendChild(slide);

        if (index === 0) {
            activeImage = img;
            activeContainer = slide;
        }
        makeZoomableAndPannable(slide, img);
    });

    sliderContainer?.appendChild(captureSlidesWrapper);


    function makeZoomableAndPannable(container, image) {
        let zoom = 1;
        let minZoom = 1;
        let maxZoom = 5;
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let scrollX = 0;
        let scrollY = 0;
        let imgWidth = 0;
        let imgHeight = 0;

        // Get initial image dimensions after load
        image.onload = function () {
            imgWidth = this.naturalWidth;
            imgHeight = this.naturalHeight;
        };
        if (image.complete) image.onload();

        // Enable scroll & drag
        container.style.overflow = "auto";
        container.style.touchAction = "none";
        container.style.position = "relative";
        container.style.cursor = "grab";
        image.style.transformOrigin = "top left";
        image.style.transform = `scale(${zoom})`;
        image.style.pointerEvents = "none";

        var zoomStep = 0.4;

        const applyZoom = (newZoom, centerX, centerY) => {
            // Don't adjust scroll position during drag
            if (isDragging) {
                currentZoom = Math.max(minZoom, Math.min(newZoom, maxZoom));
                const rotation = parseInt(container.dataset.rotation || 0);
                image.style.transform = `scale(${currentZoom}) rotate(${rotation}deg)`;
                return;
            }

            // Calculate content position relative to container
            const containerRect = container.getBoundingClientRect();
            const contentX = (centerX - containerRect.left + container.scrollLeft) / currentZoom;
            const contentY = (centerY - containerRect.top + container.scrollTop) / currentZoom;

            // Apply the new zoom
            currentZoom = Math.max(minZoom, Math.min(newZoom, maxZoom));
            const rotation = parseInt(container.dataset.rotation || 0);
            image.style.transform = `scale(${currentZoom}) rotate(${rotation}deg)`;

            // Calculate new scroll position to keep content centered
            if (centerX && centerY) {
                const newScrollLeft = contentX * currentZoom - (centerX - containerRect.left);
                const newScrollTop = contentY * currentZoom - (centerY - containerRect.top);

                // Ensure we don't scroll beyond image boundaries
                const maxScrollX = Math.max(0, imgWidth * currentZoom - containerRect.width);
                const maxScrollY = Math.max(0, imgHeight * currentZoom - containerRect.height);

                container.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScrollX));
                container.scrollTop = Math.max(0, Math.min(newScrollTop, maxScrollY));
            }
        };

        // Mouse / touch wheel zoom
        container.addEventListener("wheel", (e) => {
            e.preventDefault();
            if (!container.closest('.slide')?.classList.contains('active')) return;

            if (container === activeContainer) {
                const delta = e.deltaY < 0 ? zoomStep : -zoomStep;
                const rect = container.getBoundingClientRect();
                const centerX = e.clientX;
                const centerY = e.clientY;
                applyZoom(currentZoom + delta, centerX, centerY);
            }
        });

        // Drag (pan) handlers
        container.addEventListener("pointerdown", (e) => {
            // Only start drag if not pinching and it's the active slide
            if (isPinching || !container.closest('.slide')?.classList.contains('active')) return;

            e.preventDefault();
            isDragging = true;

            startX = e.clientX;
            startY = e.clientY;

            scrollX = container.scrollLeft;
            scrollY = container.scrollTop;

            container.setPointerCapture(e.pointerId);
            container.style.cursor = "grabbing";
        });

        container.addEventListener("pointermove", (e) => {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            container.scrollLeft = scrollX - dx;
            container.scrollTop = scrollY - dy;
        });

        container.addEventListener("pointerup", (e) => {
            isDragging = false;
            container.releasePointerCapture(e.pointerId);
            container.style.cursor = "grab";
        });

        container.addEventListener("pointerleave", () => {
            isDragging = false;
            container.style.cursor = "grab";
        });

        // Pinch zoom handlers
        let initialPinchCenter = null;
        let initialPinchDistance = null;
        let isPinching = false;
        let initialZoom = currentZoom;
        let initialScrollLeft = 0;
        let initialScrollTop = 0;

        container.addEventListener("touchstart", (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                isPinching = true;
                initialPinchDistance = getPinchDistance(e.touches);
                initialZoom = currentZoom;
                initialScrollLeft = container.scrollLeft;
                initialScrollTop = container.scrollTop;

                const rect = container.getBoundingClientRect();
                const touch1 = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
                const touch2 = { x: e.touches[1].clientX - rect.left, y: e.touches[1].clientY - rect.top };

                initialPinchCenter = {
                    x: (touch1.x + touch2.x) / 2,
                    y: (touch1.y + touch2.y) / 2,
                    // Store the content position at the center point
                    contentX: (initialScrollLeft + (touch1.x + touch2.x) / 2) / initialZoom,
                    contentY: (initialScrollTop + (touch1.y + touch2.y) / 2) / initialZoom
                };
            }
        });

        let animationFrameId = null;

        container.addEventListener("touchmove", (e) => {
            if (e.touches.length === 2 && isPinching) {
                e.preventDefault();

                const newDistance = getPinchDistance(e.touches);
                const scaleFactor = newDistance / initialPinchDistance;
                const newZoom = Math.max(minZoom, Math.min(initialZoom * scaleFactor, maxZoom));

                const rect = container.getBoundingClientRect();
                const touch1 = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
                const touch2 = { x: e.touches[1].clientX - rect.left, y: e.touches[1].clientY - rect.top };
                const newCenterX = (touch1.x + touch2.x) / 2;
                const newCenterY = (touch1.y + touch2.y) / 2;

                // Calculate where the initial center point should be after zoom
                const targetX = initialPinchCenter.contentX * newZoom;
                const targetY = initialPinchCenter.contentY * newZoom;

                // Apply the zoom
                currentZoom = newZoom;
                const rotation = parseInt(container.dataset.rotation || 0);
                image.style.transform = `scale(${currentZoom}) rotate(${rotation}deg)`;

                // Adjust scroll position to keep the content under fingers
                container.scrollLeft = targetX - newCenterX;
                container.scrollTop = targetY - newCenterY;
            }
        });

        container.addEventListener("touchend", (e) => {
            if (e.touches.length < 2 && isPinching) {
                isPinching = false;
                initialPinchDistance = null;
                initialPinchCenter = null;
            }
        });

        function getPinchDistance(touches) {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }

    // Create tools container (Change Image, Markup, Toggle)
    const captureToolsContainer = document.createElement('div');
    captureToolsContainer.className = 'capture_tools_container';
    captureToolsContainer.id = 'capture_tools_container';

    // Change Image button
    const changeImageBtn = document.createElement('button');
    changeImageBtn.className = 'tool_btn';
    changeImageBtn.id = 'change_image_tool_btn';
    changeImageBtn.innerHTML = `${chnageImageIcon} Change Image`
    changeImageBtn.onclick = handelChangeCaptureImage;

    captureToolsContainer.appendChild(changeImageBtn);
    sliderContainer.appendChild(captureToolsContainer);

    // Create dots for pagination
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'dots_container';

    captureImagesArray?.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.addEventListener('click', (e) => goToSlide(parseInt(e.target.dataset.index)));
        dotsContainer.appendChild(dot);
    });

    sliderContainer.appendChild(dotsContainer);

    // Create zoom controls
    const zoomControls = document.createElement('div');
    zoomControls.className = 'capture_action_controls';

    // rotate button
    const rotateLeftBtn = document.createElement('button');
    rotateLeftBtn.className = 'action_btn';
    rotateLeftBtn.innerHTML = rotateImageInForward;
    rotateLeftBtn.addEventListener('click', (e) => adjustRotation(90,e));

    // Zoom in button
    const zoomInBtn = document.createElement('button');
    zoomInBtn.className = 'action_btn';
    zoomInBtn.innerHTML = zoomInIcon;
    zoomInBtn.addEventListener('click', (e) => adjustCaptureZoom(0.4,e));

    // Zoom out button
    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.className = 'action_btn';
    zoomOutBtn.innerHTML = zoomOutIcon;
    zoomOutBtn.addEventListener('click', (e) => adjustCaptureZoom(-0.4,e));

    zoomControls.appendChild(rotateLeftBtn);
    zoomControls.appendChild(zoomInBtn);
    zoomControls.appendChild(zoomOutBtn);
    sliderContainer.appendChild(zoomControls);

    // Append the slider to the container
    document.getElementById('floor_capture_contaner').appendChild(sliderContainer);

    // Set up variables for slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    // const slideInners = document.querySelectorAll('.slide_inner');
    const dots = document.querySelectorAll('.dot');


    function updateActiveElements() {
        const currentSlideElement = slides[currentSlide];
        // activeContainer = currentSlideElement.querySelector('.slide');
        activeContainer = currentSlideElement;
        activeImage = activeContainer.querySelector('img');
    }

    // Function to go to a specific slide
    function goToSlide(slideIndex) {
        if (slideIndex === currentSlide) return;

        activeCaptureId = captureImagesArray?.[slideIndex]?.image_id;

        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = slideIndex;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        const currentSlideElement = slides[currentSlide];

        activeContainer = currentSlideElement;
        activeImage = currentSlideElement.querySelector('img');
        updateActiveElements();

        // Reset zoom and rotation for the new active slide
        currentZoom = 1;
        const rotation = parseInt(currentSlideElement.dataset.rotation || 0);

        // Always set transform origin based on current rotation
        activeImage.style.transformOrigin = rotation === 0 ? "top left" : "center center";
        activeImage.style.transform = `scale(${currentZoom}) rotate(${rotation}deg)`;

        // Reset scroll position if at 0° rotation
        if (rotation === 0) {
            currentSlideElement.scrollLeft = 0;
            currentSlideElement.scrollTop = 0;
        }

        document.getElementById("remove_capture_button").style.display = slideIndex !== 0 ? "block" : "none";
        captureToolsContainer.style.display = slideIndex === 0 ? "block" : "none";
    }

    // Function to adjust zoom
    function adjustCaptureZoom(amount,e) {
        if (!activeImage || !activeContainer) return;
        if(e?.detail === 0) return;
        const container = activeContainer;
        const image = activeImage;
        const rotation = parseInt(container.dataset.rotation || 0);

        const newZoom = Math.max(1, Math.min(currentZoom + amount, 5));
        if (newZoom === currentZoom) return;

        const rect = container.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate current content position at center
        const contentX = (container.scrollLeft + centerX) / currentZoom;
        const contentY = (container.scrollTop + centerY) / currentZoom;

        // Apply the new zoom
        currentZoom = newZoom;
        image.style.transform = `scale(${currentZoom}) rotate(${rotation}deg)`;

        // Calculate new scroll position to keep content centered
        container.scrollLeft = contentX * currentZoom - centerX;
        container.scrollTop = contentY * currentZoom - centerY;

        // Ensure we stay within bounds
        ensureValidScrollPosition(container, image);
    }


    function ensureValidScrollPosition(container, image) {
        const rect = container.getBoundingClientRect();
        const contentWidth = image.naturalWidth * currentZoom;
        const contentHeight = image.naturalHeight * currentZoom;

        container.scrollLeft = Math.max(0, Math.min(container.scrollLeft, contentWidth - rect.width));
        container.scrollTop = Math.max(0, Math.min(container.scrollTop, contentHeight - rect.height));
    }

    // Function to adjust rotation
    function adjustRotation(degrees,e) {
        if(e?.detail === 0) return true;

        const currentSlideElement = slides[currentSlide];
        let rotation = parseInt(currentSlideElement.dataset.rotation || 0);
        rotation += degrees;
        rotation = (rotation + 360) % 360;

        currentSlideElement.dataset.rotation = rotation;
        const image = currentSlideElement.querySelector('img');

        // Set transform origin based on rotation
        if (rotation === 0) {
            image.style.transformOrigin = "top left";
            // Reset scroll position to top-left when returning to 0°
            currentSlideElement.scrollLeft = 0;
            currentSlideElement.scrollTop = 0;
        } else {
            image.style.transformOrigin = "center center";
        }

        updateTransform(currentSlideElement);

        // Center the image after rotation if not at 0°
        if (rotation !== 0) {
            const container = currentSlideElement;
            const rect = container.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const contentX = (container.scrollLeft + centerX) / currentZoom;
            const contentY = (container.scrollTop + centerY) / currentZoom;

            container.scrollLeft = contentX * currentZoom - centerX;
            container.scrollTop = contentY * currentZoom - centerY;
        }
        ensureValidScrollPosition(activeContainer, activeImage);
    }

    // Function to update transform
    function updateTransform(element) {
        const scale = currentZoom;
        const rotation = parseInt(element.dataset.rotation || 0);
        const image = element.querySelector('img');
        if (!image) return;

        image.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
    }

}

//// Function to capture image
function handelChangeCaptureImage() {
    const floorCaptureContaner = document.getElementById("floor_capture_contaner");

    const captureSliderContainer = document.getElementById("capture_slider_container")
    if (captureSliderContainer) {
        floorCaptureContaner.removeChild(document.getElementById("capture_slider_container"));
    }

    const captureUploadContainer = document.createElement("div");
    captureUploadContainer.classList.add("capture_upload_container");
    captureUploadContainer.id = "capture_upload_container";
    floorCaptureContaner.appendChild(captureUploadContainer);

    const captureLabel = document.createElement("label");
    captureLabel.classList.add("capture_upload_button");
    captureLabel.id = "capture_upload_button";
    captureLabel.style.width="138px";
    captureLabel.innerHTML = `Upload Photo ${upload}`;
    
captureLabel.onclick = () => {
  if (typeof window.requestFlutterFile === "function") {
    window.requestFlutterFile();
  } 
};


    // Create the hidden file input
    const captureUploadInput = document.createElement("input");
    captureUploadInput.type = "file";
    captureUploadInput.accept = "image/jpeg, image/jpg, image/webp, image/png";
    captureUploadInput.style.display = "none";
    captureUploadInput.classList.add("capture_upload_input");
    captureUploadInput.id = "capture_upload_input";
    captureUploadInput.onchange = handelSelectCaptureImageFromFile;

    // Append the input to the label (so clicking label opens file picker)
    captureLabel.appendChild(captureUploadInput);

    // Append label (styled as button) to container
    captureUploadContainer.appendChild(captureLabel);



    const cancelButton = document.createElement("button");
    cancelButton.classList.add("capture_cancel_button");
    cancelButton.id = "capture_cancel_button";
    cancelButton.innerHTML = `Cancel ${crossIcon}`;
    cancelButton.onclick = handelCancelCaptureImage;
    captureUploadContainer.appendChild(cancelButton);
}

//// Function to open file select modal for capture image
function handelUploadCaptureImage(event) {
    if (event.type === "click") {
        const captureUploadInput = document.getElementById("capture_upload_input");
        captureUploadInput.click();
    };
};

//// Function to select capture image from device
function handelSelectCaptureImageFromFile(event) {


    if (event.type === "change") {
        const files = event.target.files;

        if (files.length > 0) {
            const file = files[0];


            if (file.size > maxSize) {
                document.getElementById('sitenote_box').style.display = "none"
                showAlertMessage(false, "File size must be less than 10MB.");
                return;
            }

            // Validate file type (only allow JPEG/JPG)
            if (!["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)) {
                // alert("Only JPEG and JPG files are allowed.");
                showAlertMessage(false, "Only JPEG, JPG, PNG and WEBP files are allowed.");
                return;
            }

            // show selected file preview in capture image
            const imageUrl = URL.createObjectURL(file);
            const rendomId = generate12DigitId();

            captureImagesArray[0] = { image_id: rendomId, image_url: imageUrl, file_object: files[0] };
            setTimeout(() => {
                handelCancelCaptureImage();
            }, 500);
        }
    };
};

window.addEventListener("flutterImageSelected", function (e) {
  const base64 = e.detail;

  // You can now upload it, convert to blob, preview etc.
  console.log("Received image from Flutter:", base64);

  
});


//// Function to cancel capture image
function handelCancelCaptureImage() {
    document.getElementById("floor_capture_contaner").removeChild(document.getElementById("capture_upload_container"));
    initializeCaptureSlider();
}

//// Function to open file select modal for extra image
function handelClickOnUploadImageButton(event) {
    if (event.type === "click") {
        const dragDropInput = document.getElementById("drag_drop_input");
        dragDropInput?.click();
    };
};

//// Function to select extra image from device
function handelSelectExtraImageFromDevice(event) {

    if (event.type === "change") {

        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            const fileType = file.type;
            const rendomId = generate12DigitId();

            // Handle image files
            if (captureImagesArray?.length < 6) {

                if (file.size > maxSize) {
                    document.getElementById('sitenote_box').style.display = "none"
                    showAlertMessage(false, "File size must be less than 10MB.");
                    return;
                }

                if (["image/jpeg", 'image/png' , "image/jpg", "image/webp"].includes(fileType)) {
                    const imageUrl = URL.createObjectURL(file);
                    captureImagesArray?.push({ image_id: rendomId, image_url: imageUrl, file_object: files[0] });
                    document.getElementById("attachment_count").innerHTML = `Attachments Count: ${captureImagesArray.length - 1}`
                    const container = document.getElementById("floor_capture_contaner");
                    const slider = document.getElementById("capture_slider_container");
                    if (container && slider) {
                        container.removeChild(slider);
                        initializeCaptureSlider();
                    }
                }

                // Handle PDF files
                else if (fileType === "application/pdf") {

                    const fileReader = new FileReader();
                    fileReader.onload = async function () {
                        const typedarray = new Uint8Array(this.result);

                        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
                        const page = await pdf.getPage(1);

                        const viewport = page.getViewport({ scale: 1.5 });
                        const canvas = document.createElement("canvas");
                        const context = canvas.getContext("2d");

                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };

                        await page.render(renderContext).promise;

                        canvas.toBlob(blob => {
                            if (!blob) return;
                            const imageFile = new File([blob], file.name.replace('.pdf', '.png'), { type: 'image/png' });

                            const imageUrl = canvas.toDataURL("image/png");

                            if (captureImagesArray?.length < 6) {
                                // captureImagesArray?.push({ image_id: rendomId, image_url: imageUrl, file_object: files[0] });
                                captureImagesArray?.push({ image_id: rendomId, image_url: imageUrl, file_object: imageFile });
                                document.getElementById("attachment_count").innerHTML = `Attachments Count: ${captureImagesArray.length - 1}`
                                const container = document.getElementById("floor_capture_contaner");
                                const slider = document.getElementById("capture_slider_container");
                                if (container && slider) {
                                    container.removeChild(slider);

                                    initializeCaptureSlider();
                                }
                            } else {
                                // alert("You can only upload 5 attachments.");
                                document.getElementById('sitenote_box').style.display = "none"
                                showAlertMessage(false, "You can only upload 5 attachments.");
                            }

                        })

                    };

                    fileReader.readAsArrayBuffer(file);
                }

                else {
                    // alert("Only JPEG, JPG or PDF files are allowed.");
                    document.getElementById('sitenote_box').style.display = "none"
                    showAlertMessage(false, "Only JPEG, JPG or PDF files are allowed");
                    return;
                }
            } else {
                // alert("You can only upload 5 attachments.");
                document.getElementById('sitenote_box').style.display = "none"
                showAlertMessage(false, "You can only upload 5 attachments.");
                return;
            }

        }
    };
};

//// Function to remove selected extra image
function handelRemoveExtraImage() {
    const matchArray = captureImagesArray?.filter((image) => image?.image_id === activeCaptureId);
    matchArray.forEach(item => {
        if (!('file_object' in item)) {
            deletedCaptureImage.push(item?.image_id);
        }
    });
    const filterCaptureImagesArray = captureImagesArray?.filter((image) => image?.image_id !== activeCaptureId);
    captureImagesArray = filterCaptureImagesArray
    document.getElementById("attachment_count").innerHTML = `Attachments Count: ${captureImagesArray?.length - 1}`
    activeCaptureId = undefined;
    document.getElementById("remove_capture_button").style.display = "none";
    document.getElementById("capture_slider_container").remove();
    initializeCaptureSlider();
}


//// initialize calender component
function initializeCalendarComponent(event) {
    event.stopPropagation();

    document.getElementById("status_options_container").style.display = "none";
    document.getElementById("collabrator_options_container").style.display = "none";
    document.getElementById('right_action_dropdown').style.display = "none";
    isOpenSiteActionModal = false;

    const container = document.getElementById("due_date_container");
    if (!container) {
        console.error("Container element due_date_container not found");
        return;
    }

    // Initialize state
    const today = new Date();
    let currentDate = today;
    let displayedMonth = today.getMonth();
    let displayedYear = today.getFullYear();
    let selectedDate = today.getDate();

    const dueDateInput = document.getElementById("due_date_input");
    if (dueDateInput && dueDateInput.value) {
        const parsedDate = new Date(dueDateInput.value);
        if (!isNaN(parsedDate)) {
            currentDate = parsedDate;
            displayedMonth = parsedDate.getMonth();
            displayedYear = parsedDate.getFullYear();
            selectedDate = parsedDate.getDate();
        }
    }

    // Format date as YYYY-MM-DD
    const formatDateString = (year, month, day) => {
        const formattedMonth = String(month + 1).padStart(2, '0');
        const formattedDay = String(day).padStart(2, '0');
        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    let selectedFullDate = formatDateString(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const isDateInPast = (year, month, day) => {
        const checkDate = new Date(year, month, day);
        checkDate.setHours(0, 0, 0, 0);

        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        return checkDate < todayDate;
    };

    const createCalendarStructure = () => {

        // Clear any old calendar first
        const existingCalendar = document.getElementById('calendar_container');
        if (existingCalendar) {
            existingCalendar.remove();
        } else {
            const calendarContainer = document.createElement('div');
            calendarContainer.className = 'calendar_container';
            calendarContainer.id = 'calendar_container';

            const headerDiv = document.createElement('div');
            headerDiv.className = 'calendar_header';

            const prevButton = document.createElement('button');
            prevButton.className = 'nav_button';
            prevButton.id = 'prev_month';
            prevButton.innerHTML = arrowLeft;
            prevButton.addEventListener('click', navigatePrevMonth);

            const monthYearDisplay = document.createElement('div');
            monthYearDisplay.className = 'month_year';
            monthYearDisplay.id = 'month_year';

            const nextButton = document.createElement('button');
            nextButton.className = 'nav_button';
            nextButton.id = 'next_month';
            nextButton.innerHTML = arrowRight;
            nextButton.addEventListener('click', navigateNextMonth);

            headerDiv.appendChild(prevButton);
            headerDiv.appendChild(monthYearDisplay);
            headerDiv.appendChild(nextButton);

            const daysOfWeekDiv = document.createElement('div');
            daysOfWeekDiv.className = 'day_labels';
            const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            daysOfWeek.forEach(day => {
                const dayLabel = document.createElement('div');
                dayLabel.className = 'day_label';
                dayLabel.textContent = day;
                daysOfWeekDiv.appendChild(dayLabel);
            });

            const calendarGrid = document.createElement('div');
            calendarGrid.className = 'calendar_grid';
            calendarGrid.id = 'calendar_grid';

            calendarContainer.appendChild(headerDiv);
            calendarContainer.appendChild(daysOfWeekDiv);
            calendarContainer.appendChild(calendarGrid);
            container.appendChild(calendarContainer);

            updateMonthYearDisplay();
            generateCalendarDays();
        }


    };

    const updateMonthYearDisplay = () => {
        const monthYearDisplay = document.getElementById('month_year');
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        if (monthYearDisplay) {
            monthYearDisplay.textContent = `${months[displayedMonth]} ${displayedYear}`;
        }
    };

    const navigatePrevMonth = () => {
        if (displayedMonth === 0) {
            displayedMonth = 11;
            displayedYear -= 1;
        } else {
            displayedMonth -= 1;
        }
        updateMonthYearDisplay();
        generateCalendarDays();
    };

    const navigateNextMonth = () => {
        if (displayedMonth === 11) {
            displayedMonth = 0;
            displayedYear += 1;
        } else {
            displayedMonth += 1;
        }
        updateMonthYearDisplay();
        generateCalendarDays();
    };

    const generateCalendarDays = () => {
        const calendarGrid = document.getElementById('calendar_grid');
        calendarGrid.innerHTML = '';

        const firstDay = new Date(displayedYear, displayedMonth, 1);
        const lastDay = new Date(displayedYear, displayedMonth + 1, 0);

        const startingDayOfWeek = firstDay.getDay();
        const prevMonthLastDay = new Date(displayedYear, displayedMonth, 0).getDate();

        // Previous month days
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const dayCell = document.createElement('div');
            dayCell.className = 'date_cell prev_month disabled';
            dayCell.textContent = String(prevMonthLastDay - i).padStart(2, '0');
            calendarGrid.appendChild(dayCell);
        }

        // Current month days
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'date_cell';
            dayCell.textContent = String(day).padStart(2, '0');

            const dateString = formatDateString(displayedYear, displayedMonth, day);

            if (dateString === selectedFullDate) {
                dayCell.classList.add('selected');
            }

            if (isDateInPast(displayedYear, displayedMonth, day)) {
                dayCell.classList.add('disabled');
            } else {
                dayCell.addEventListener('click', () => {
                    dueDateInput.value = dateString;
                    // Optional: close calendar after selecting
                    const calendarContainer = document.getElementById('calendar_container');
                    if (calendarContainer) {
                        calendarContainer.remove();
                    }
                });
            }
            calendarGrid.appendChild(dayCell);
        }
    };

    createCalendarStructure();
}

// Hide calender when clicking outside
function toggleCalendarContainer() {

    document.addEventListener("click", function (event) {

        const dueDateContainer = document.getElementById("due_date_container");
        const calendarContainer = document.getElementById("calendar_container");

        if (!calendarContainer || !dueDateContainer) return;
        if (
            !dueDateContainer.contains(event.target) &&
            !calendarContainer.contains(event.target)
        ) {
            dueDateContainer.removeChild(calendarContainer);
        }
    });
}


//// Zoom in / out floor map image
// let currentZoom = 1;
// function adjustFloorMapZoom(amount) {
//     const floorMapImage = document.getElementById("floor_map_image");
//     if (!floorMapImage) return;

//     currentZoom += amount;
//     currentZoom = Math.max(1, Math.min(currentZoom, 5));

//     floorMapImage.style.transform = `scale(${currentZoom})`;
//     floorMapImage.style.transformOrigin = 'center center';
// }

//// Setup live updating of pins
function trackPinPositions() {
    const krpano = document.getElementById("krpanoSWFObject");
    krpano.set("events.onviewchange", function () {

        placedPins.forEach(pin => {
            const coords = krpano.spheretoscreen(pin.yaw, pin.pitch);

            if (coords) {
                if (coords.depth < 0) {
                    // Behind the camera – hide the pin
                    pin.element.style.display = "none";
                } else {
                    // In front – show and position the pin
                    // pin.element.style.display = "block";
                    pin.element.style.left = `${coords.x - 16}px`;
                    pin.element.style.top = `${coords.y - 16}px`;
                }
            } else {
                // If coords couldn't be calculated, hide the pin
                pin.element.style.display = "none";
            }
        });
    });
};

//// Function to fetch User details
async function getUserDetails() {
    const krpano = document.getElementById("krpanoSWFObject");
    try {
        const response = await fetch(`https://user.sitepace.ai/api/get_user_details/${ids?.projectId}/`, {
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
        if (data?.data) {
            localStorage.setItem("userData", JSON.stringify(data?.data));

            if (!krpano) return;

            if (data?.data?.user_role === "Viewer" || !data?.data?.project_active) {
                krpano.set("layer[add_svg].onclick", ""); // remove the onclick action
                krpano.set("layer[add_svg].alpha", 0.4); // optional: visually indicate it's disabled
                krpano.set("layer[add_svg].enabled", false);
            } else {
                krpano.set("layer[add_svg].onclick", "js(handelOpenSiteNoteModal());"); // restore if needed
                krpano.set("layer[add_svg].alpha", 1.0); // optional: restore alpha
                krpano.set("layer[add_svg].enabled", true);
            }

        }
    }
    catch (error) {
        console.log("error", error);
    }
};

//// Function to fetch siteNote Status List from API

async function getSiteNoteStatusList() {
    try {
        const response = await fetch(`https://user.sitepace.ai/api/sitenote_status_list`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch available dates');
        }

        statusData = await response.json();
        if (statusData) {
            const statusOptionsContainer = document.getElementById("status_options_container")
            statusOptionsContainer.innerHTML = "";
            // Append new options in status dropdown
            statusData?.forEach(status => {
                const option = document.createElement("div");
                option.classList.add("status_option");

                const optionLeft = document.createElement("span");
                optionLeft.classList.add("option_left");
                optionLeft.innerHTML = '⬤'
                optionLeft.style.color = status?.color_code

                const optionRight = document.createElement("p");
                optionRight.classList.add("option_right");
                optionRight.innerHTML = status?.status_name

                const checkIcon = document.createElement("span");
                checkIcon.classList.add("check_icon");
                checkIcon.innerHTML = rightIcon;
                checkIcon.style.marginLeft = 'auto';
                checkIcon.style.display = 'none';

                option.appendChild(optionLeft);
                option.appendChild(optionRight);
                option.appendChild(checkIcon);
                option.onclick = () => handelChangeStatus(option, checkIcon, status);
                statusOptionsContainer.appendChild(option);

                // If there's a selected status already (e.g., loaded from data), show it
                if (siteNoteStatus?.status_name && status?.status_name === siteNoteStatus?.status_name) {
                    handelChangeStatus(option, checkIcon, status);
                }
            });
        }
    }
    catch (error) {
        console.log("error", error);
    }
};

// Toggle status options on click
function handelToggleStatusDropdownOption(e) {
    e.stopPropagation();
    const dropDoewnArrow = document.getElementById("dropdown_arrow")
    const statusOptionsContainer = document.getElementById("status_options_container");
    document.getElementById("collabrator_options_container").style.display = "none"

    isOpenSiteActionModal = false;
    document.getElementById('right_action_dropdown').style.display = "none";

    const existingCalendar = document.getElementById('calendar_container');
    if (existingCalendar) {
        existingCalendar.style.display = "none"
    }
    dropDoewnArrow.style.transform = dropDoewnArrow.style.transform === "rotateX(180deg)" ? "rotateX(0deg)" : "rotateX(180deg)";
    statusOptionsContainer.style.display = statusOptionsContainer.style.display === "none" ? "block" : "none";
}

// Hide status options when clicking outside
function toggleStatusToggle() {
    document.addEventListener("click", (event) => {
        const statusContainer = document.getElementById("status_container");
        if (!statusContainer.contains(event.target)) {
            document.getElementById("dropdown_arrow").style.transform = "rotateX(0deg)";
            const statusOptionsContainer = document.getElementById("status_options_container");
            statusOptionsContainer.style.display = "none";
        }
    });
}


//// Function to Render collabrator options
const renderCollabratorOptions = (filteredList) => {
    const optionsWrapper = document.getElementById("collaborator_options_wrapper");
    if (!optionsWrapper) return;

    optionsWrapper.innerHTML = "";

    filteredList?.forEach(collabrator => {
        const option = document.createElement("div");
        option.classList.add("collabrator_option");

        const optionName = document.createElement("p");
        optionName.classList.add("option_name");
        optionName.innerHTML = collabrator?.collaborator_name;

        const checkIcon = document.createElement("span");
        checkIcon.classList.add("collabrator_check_icon");
        checkIcon.innerHTML = rightIcon;
        checkIcon.style.marginLeft = 'auto';

        // Check if this collaborator is already selected
        const isSelected = selectedCollabrators?.some(
            selected => selected.collabrator_id === collabrator.collaborator_id
        );

        if (isSelected) {
            option.style.backgroundColor = "#DFFF60";
            checkIcon.style.display = "block";
        } else {
            checkIcon.style.display = "none";
        }

        option.appendChild(optionName);
        option.appendChild(checkIcon);
        option.onclick = () => handelChangeCollabrator(option, checkIcon, collabrator);
        optionsWrapper.appendChild(option);
    });
};

//// Function to fetch siteNote CollabratorList List from API
async function getCollabratorList() {
    try {
        const response = await fetch(`https://user.sitepace.ai/api/collaborator_list/${ids.projectId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch available dates');
        }

        collabrators = await response.json();

        if (collabrators) {
            const collabratorOptionsContainer = document.getElementById("collabrator_options_container")
            collabratorOptionsContainer.innerHTML = "";

            // Add a search input
            const searchInput = document.createElement("input");
            searchInput.type = "text";
            searchInput.placeholder = "Search...";
            searchInput.classList.add("collaborator_search_input"); // Add styling class if needed
            searchInput.id = "collaborator_search_input";
            collabratorOptionsContainer.appendChild(searchInput);

            const optionsWrapper = document.createElement("div");
            optionsWrapper.id = "collaborator_options_wrapper";
            collabratorOptionsContainer.appendChild(optionsWrapper);

            renderCollabratorOptions(collabrators); // Initial render

            // Filter as user types
            searchInput.addEventListener("input", () => {
                const query = searchInput.value.toLowerCase();
                const filtered = collabrators?.filter(c =>
                    c?.collaborator_name?.toLowerCase().includes(query)
                );
                renderCollabratorOptions(filtered);
            });
        }
    }
    catch (error) {
        console.log("error", error);
    }
};

//// Function to remove selected collaborators
function handelRemoveCollabrator(collabrator) {

    const collebratorPreviewContainer = document.getElementById("collabrator_preview_container");
    collebratorPreviewContainer.innerHTML = "";

    if (!collabrator?.collabrator_id) return;

    // Remove from selectedCollabrators
    selectedCollabrators = selectedCollabrators?.filter(
        item => item?.collabrator_id !== collabrator?.collabrator_id
    );

    // Re-render preview
    selectedCollabrators?.forEach(collabrator => {
        const collabratorElement = document.createElement("div");
        collabratorElement.classList.add("collobrator_name_container");
        const profileContainer = document.createElement("img")
        profileContainer.className = "collobrator_profile"
        profileContainer.src = collabrator?.collaborator_profile || "icons/default-profile-logo.png";
        collabratorElement.appendChild(profileContainer);

        const nameContainer = document.createElement("p");
        nameContainer.classList.add("collobrator_name");
        nameContainer.innerHTML = collabrator?.collabrator_name;
        collabratorElement.appendChild(nameContainer);

        const removeIcon = document.createElement("button");
        removeIcon.classList.add("collobrator_cross_icon");
        removeIcon.innerHTML = crossIcon;
        removeIcon.onclick = () => handelRemoveCollabrator(collabrator)

        collabratorElement.appendChild(removeIcon);
        collebratorPreviewContainer.appendChild(collabratorElement);
    });

    // Unhighlight the option in dropdown
    const allOptions = document.querySelectorAll(".collabrator_option");
    allOptions.forEach(option => {
        const optionText = option.querySelector(".option_name")?.innerText;
        if (optionText === collabrator?.collabrator_name) {
            option.style.backgroundColor = "";
            option.querySelector(".collabrator_check_icon").style.display = "none";
        }
    });

    // Hide preview container if no selections left
    if (selectedCollabrators?.length === 0) {
        const collobratorPreviewContainer = document.getElementById("collabrator_preview_container");
        collobratorPreviewContainer.classList.remove("collabrator_preview_container");
        document.getElementById("collabrator_preview_container_outer").style.display = "none";
        document.getElementById("collaborator_search_input").value = '';
    }
};

//// Function to change collabrator list 
function handelChangeCollabrator(option, checkIcon, collabrator) {
    const collebratorPreviewContainer = document.getElementById("collabrator_preview_container");
    collebratorPreviewContainer?.classList.add("collabrator_preview_container")
    const currentCollobrator = {
        collabrator_id: collabrator?.collaborator_id,
        collabrator_name: collabrator?.collaborator_name,
        collaborator_profile: collabrator?.collaborator_profile
    };

    const index = selectedCollabrators?.findIndex(collab => collab?.collabrator_id === currentCollobrator?.collabrator_id);

    if (index !== -1) {
        // Deselect if already selected
        selectedCollabrators?.splice(index, 1);
        option.style.backgroundColor = "";
        checkIcon.style.display = "none";

        // Remove from preview
        const previewItems = document.querySelectorAll(".collobrator_name_container");
        previewItems.forEach(item => {

            if (item.querySelector(".collobrator_name")?.innerText === currentCollobrator.collabrator_name) {
                item.remove();
            }

        });
    } else {
        // Add to selected
        selectedCollabrators.push(currentCollobrator);
        option.style.backgroundColor = "#DFFF60";
        checkIcon.style.display = "block";

        // Add to preview
        const collabratorElement = document.createElement("div");
        collabratorElement.classList.add("collobrator_name_container");
        const profileContainer = document.createElement("img")
        profileContainer.className = "collobrator_profile"
        profileContainer.src = currentCollobrator?.collaborator_profile || "icons/default-profile-logo.png";
        collabratorElement.appendChild(profileContainer);
        // document.getElementById("collabrator_preview_container")?.classList.add('collabrator_preview_container')
        const nameContainer = document.createElement("p");
        nameContainer.classList.add("collobrator_name");
        nameContainer.innerHTML = currentCollobrator?.collabrator_name;

        const removeIcon = document.createElement("button");
        removeIcon.classList.add("collobrator_cross_icon");
        removeIcon.innerHTML = crossIcon;
        removeIcon.onclick = () => handelRemoveCollabrator(currentCollobrator);

        collabratorElement.appendChild(nameContainer);
        collabratorElement.appendChild(removeIcon);

        collebratorPreviewContainer.appendChild(collabratorElement);
    }
    // Show preview container if at least one selected
    document.getElementById("collabrator_preview_container_outer").style.display = selectedCollabrators?.length > 0 ? "block" : "none";
};

// Toggle collobrator options on click
function handelToggleCollabratorDropdownOption(e) {
    e.stopPropagation();

    const dropDoewnArrow = document.getElementById("collabrator_dropdown_arrow");
    const collobratorOptionsContainer = document.getElementById("collabrator_options_container");
    document.getElementById("status_options_container").style.display = "none"

    isOpenSiteActionModal = false;
    document.getElementById('right_action_dropdown').style.display = "none";


    const existingCalendar = document.getElementById('calendar_container');
    if (existingCalendar) {
        existingCalendar.style.display = "none"
    }
    const isOpen = collobratorOptionsContainer.style.display === "block";

    dropDoewnArrow.style.transform = isOpen ? "rotateX(0deg)" : "rotateX(180deg)";
    collobratorOptionsContainer.style.display = isOpen ? "none" : "block";

    const searchInput = document.getElementById("collaborator_search_input");
    if (searchInput) searchInput.value = "";

    if (!isOpen) {
        renderCollabratorOptions(collabrators);
    }
}

// Hide collobrator options when clicking outside
function toggleCollabratorDropdown() {
    document.addEventListener("click", (event) => {
        const collabratorContainer = document.getElementById("collabrator_container");
        if (!collabratorContainer?.contains(event.target)) {
            const collabratorDropdownArrow = document.getElementById("collabrator_dropdown_arrow");
            const collabratorOptionsContainer = document.getElementById("collabrator_options_container");

            collabratorDropdownArrow.style.transform = "rotateX(0deg)";
            collabratorOptionsContainer.style.display = "none";

            // Reset search value
            const searchInput = document.getElementById("collaborator_search_input");
            if (searchInput) searchInput.value = "";

            renderCollabratorOptions(collabrators);
        }

        // const rightProfileContainer = document.getElementById('right_profile_container');
        // if (!rightProfileContainer?.contains(event.target)) {
        //     document.getElementById('right_action_dropdown').style.display="none"
        // }
    });
}


//// Function to get existing sitenotes
async function getExistingSiteNoteList() {

    const krpano = document.getElementById("krpanoSWFObject");
    try {
        const response = await fetch(`https://user.sitepace.ai/api/list_capture_sitenotes/${ids?.projectId}/${ids.jobId}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch available dates');
        }
        const existSitenoteData = await response.json();

        if (existSitenoteData && krpano && typeof krpano.call === "function") {
            existingPinPoints = existSitenoteData;
            removeAllFloorMapPins();
            removeAllPins();
            await existSitenoteData?.map((item, index) => {
                const tagPosition = item?.tag_position;

                if (tagPosition) {
                    const { yaw, pitch } = tagPosition;
                    // Convert yaw/pitch to screen coordinates using krpano
                    krpano.call(`
                        var x;
                        var y;
                        var thepoint = spheretoscreen(${yaw}, ${pitch});
                        x = thepoint.x;
                        y = thepoint.y;
                        js(setPinPosition(${yaw}, ${pitch}, x, y,${item?.sitenote_id}, ${tagPosition.frame_name},${index}));
                    `);

                    setTimeout(() => {
                        handelAddPinOnFloorMap(tagPosition, item?.sitenote_id, index)
                    }, 500);
                }
            });
            await trackPinPositions();
            await updateSIteNotePin();
        }
    }
    catch (error) {
        console.log("error", error);
    }
};

function removeAllFloorMapPins() {


    const krpano = document.getElementById("krpanoSWFObject");
    if (!krpano || typeof krpano.get !== "function" || typeof krpano.call !== "function") return;

    // Loop through layers and remove any pin layers
    let i = 0;
    while (true) {
        const layer = krpano.get(`layer[pin_${i}]`);
        if (!layer) break;

        krpano.call(`removelayer(pin_${i});`);
        i++;
    }
}



function removeAllPins() {

    const allPins = document.querySelectorAll('img[name^="pin_"]');
    allPins.forEach(pin => pin.remove());
    placedPins.length = 0; // Clear the placedPins array too, if you're tracking it
}

async function setPinPosition(yaw, pitch, x, y, siteNoteId, frame_name, index) {

    const pin = document.createElement("img");
    pin.src = "icons/pin-point.svg";
    pin.style.position = "absolute";
    pin.style.left = `${x}px`;
    pin.style.top = `${y}px`;
    pin.style.zIndex = 10;
    pin.style.width = "50px";
    pin.style.height = "50px";
    pin.style.cursor = "pointer";
    // pin.style.display = "none";
    pin.id = `pin_${frame_name}_${index}`;
    pin.className = siteNoteId
    pin.name = `pin_${frame_name}_${siteNoteId}_${index}`;
    let isHandlingClick = false;
    pin.addEventListener("click", async () => {
        if (isHandlingClick) return;
        isHandlingClick = true;

        try {
            await handelViewSiteNote(siteNoteId);
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => isHandlingClick = false, 300);
        }
    });

    await document.body.appendChild(pin);

    await placedPins.push({
        element: pin,
        yaw,
        pitch
    });

}

async function updateSIteNotePin() {

    existingPinPoints?.map((item, index) => {
        const krpano = document.getElementById("krpanoSWFObject");
        const activeFrameName = krpano.get("xml.scene");
        const tagPosition = item?.tag_position;
        const pinFrame = document.getElementById(`pin_${tagPosition.frame_name}_${index}`);
        if (activeFrameName === tagPosition.frame_name) {
            pinFrame.style.display = "block";
        } else {
            pinFrame.style.display = "none";
        }
        trackPinPositions();
    });
}



//// Function to add Place pin on map
function handelAddPinOnFloorMap(tagPosition, siteNoteId, index) {

    const krpano = document.getElementById("krpanoSWFObject");
    const mapImage = krpano.get('layer[map]');

    if (mapImage) {
        const value = tagPosition.frame_name;
        const number = value.match(/\d+/)[0];
        const currentSpot = krpano.get(`layer[spot${number}]`);
        currentSiteSpot = currentSpot

        const yaw = tagPosition?.yaw ?? 0;
        const pitch = tagPosition?.pitch ?? 0;

        krpano.call(`
            addlayer(pin_${index});
            set(layer[pin_${index}].parent, map);
            set(layer[pin_${index}].url, 'icons/pin-point.svg');
            set(layer[pin_${index}].x, ${(currentSpot.x - 15)});
            set(layer[pin_${index}].y, ${(currentSpot.y - 30)});
            set(layer[pin_${index}].width, 32);
            set(layer[pin_${index}].height, 32);
            set(layer[pin_${index}].zorder, 100);
            set(layer[pin_${index}].keep, true);
            set(layer[pin_${index}].enabled, true);
            set(layer[pin_${index}].onclick, js(handlePinClick('${value}', ${yaw}, ${pitch}, '${siteNoteId}', ${index})));
        `);
    }
}

function handlePinClick(sceneName, yaw, pitch, siteNoteId, index) {
    const krpano = document.getElementById("krpanoSWFObject");

    if (!krpano) return;

    // Load the scene
    // krpano.call(`loadscene(${sceneName}, null, MERGE, BLEND(1));`);
    triggerThreeJSClick(sceneName);

    // Optional: Update your map UI
    collapseFloorplan(); // if you want to close the floorplan
    updateSIteNotePin(); // to re-sync pins if needed

    // You can also do something after a delay if needed
    setTimeout(() => {
        krpano.call(`lookto(${yaw}, ${pitch}, 90, direct());`);
        // e.g., focus camera on that position or show some info
    }, 500);
}


function resetFloorMapZoomAndPan(container, image) {
    currentZoom = 1; // or your default zoom value, like 0.4
    image.style.transform = `scale(1)`;

    // Optional: reset scroll position so image is centered or at top-left
    container.scrollLeft = 0;
    container.scrollTop = 0;
}





//// Function handel view existing siteNote
async function handelViewSiteNote(siteNoteId) {

    currentSiteNoteId = siteNoteId;
    handelGetComments(siteNoteId);

    const floorMapImageContainer = document.getElementsByClassName("floor_map_image_wrapper");
    const floorImage = document.getElementById("floor_map_image");

    document.getElementById("right_360_view").style.display = "flex";

    const footerAddnoteButton = document.getElementById("footer_addnote_button");
    if (siteNoteId) {
        footerAddnoteButton.innerHTML = `Save changes`;
    }
    document.getElementById("modal_titel").innerHTML = "Site Note";



    document.getElementById("modal_close_icon").addEventListener("click", function () {
        resetFloorMapZoomAndPan(floorMapImageContainer, floorImage)
        handleCloseSiteNote()

    }, { once: true });

    document.getElementById("footer_cancel_button").addEventListener("click", function () { handleCloseSiteNote() }, { once: true });

    document.getElementById('add_comment_textarea').disabled = false
    document.getElementById('add_comment_button').disabled = false


    const lengthCheck = document.getElementById("length_check");
    const descriptionTextarea = document.getElementById("description_textarea");
    const dueDateInput = document.getElementById("due_date_input");
    const collebratorPreviewContainer = document.getElementById("collabrator_preview_container");
    const collebratorPreviewContainerOuter = document.getElementById("collabrator_preview_container_outer");
    const floorMapImageTitel = document.getElementById("floor_map_image_titel");
    const subjectInput = document.getElementById("subject_input");
    const userProfile = document.getElementById("user_profile_image");
    const userName = document.getElementById("user_name");
    const createdDate = document.getElementById("created_date");
    const floorMapImage = document.getElementById('floor_map_image');
    const statusHeadContainer = document.getElementById('status_head_container');
    const collabratorHeadContainer = document.getElementById('collabrator_head_container');
    const attachementContainer = document.getElementById('attachement_container');
    const modalFooter = document.getElementById('modal_footer');
    const removeCaptureButton = document.getElementById('remove_capture_button');
    const rightProfileContainer = document.getElementById('right_profile_container');
    const rightActionDropdownDelete = document.getElementById('right_action_dropdown_delete');
    const addCommentButton = document.getElementById('add_comment_button');
    const addCommentTextarea = document.getElementById('add_comment_textarea');




    try {
        const response = await fetch(`https://user.sitepace.ai/api/retrive_sitenote/${siteNoteId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch available dates');
        }

        const selectedSiteNoteData = await response.json();

        const floorMapImageWrapper = document.querySelector(".floor_map_image_wrapper");
        const floorMapImage = document.querySelector(".floor_map_image");

        function placePins() {

            const pin = document.createElement("div");
            pin.className = "pin";

            pin.dataset.originalX = selectedSiteNoteData?.tag_position?.note_current_spot_x;
            pin.dataset.originalY = selectedSiteNoteData?.tag_position?.note_current_spot_y;

            pin.style.left = `${selectedSiteNoteData?.tag_position?.note_x}px`;
            pin.style.top = `${selectedSiteNoteData?.tag_position?.note_y}px`;

            floorMapImageWrapper.appendChild(pin);
        }

        floorMapImage.onload = placePins;

        const useAuth = JSON.parse(localStorage.getItem("userData"))

        const isUser = useAuth?.project_active ? useAuth?.email?.toLowerCase() === selectedSiteNoteData?.created_by_email?.toLowerCase() : false

        const now = new Date(selectedSiteNoteData?.created_at);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', options);
        userProfile.src = selectedSiteNoteData?.created_by_profile;

        userName.innerHTML = selectedSiteNoteData?.created_by_name;
        createdDate.innerHTML = formattedDate;
        floorMapImageTitel.innerHTML = selectedSiteNoteData?.project_floor_name

        floorMapImage.src = selectedSiteNoteData?.project_floor_plan;
        subjectInput.value = selectedSiteNoteData?.subject;

        rightProfileContainer.style.display = "block"
        rightActionDropdownDelete.style.display = !isUser ? "none" : "";


        subjectInput.disabled = !isUser;
        descriptionTextarea.disabled = !isUser;
        dueDateInput.disabled = !isUser;
        attachementContainer.style.display = !isUser ? "none" : "";
        statusHeadContainer.style.pointerEvents = !isUser ? "none" : "";
        collabratorHeadContainer.style.pointerEvents = !isUser ? "none" : "";

        removeCaptureButton.disabled = !isUser;

        modalFooter.style.display = !isUser ? "none" : "";

        addCommentButton.disabled = !useAuth?.project_active;
        addCommentTextarea.disabled = !useAuth?.project_active;

        descriptionTextarea.value = selectedSiteNoteData?.description;
        dueDateInput.value = selectedSiteNoteData?.due_date;
        lengthCheck.innerHTML = `${selectedSiteNoteData?.subject?.length} / 100`;

        if (selectedSiteNoteData?.collaborators.length > 0) {
            collebratorPreviewContainerOuter.style.display = "block";
        }

        const defaultHeading = document.querySelector(".default_heading");
        const selectedStatusIndex = statusData.findIndex(item => item?.status_name === selectedSiteNoteData?.status)


        defaultHeading.innerHTML = ""; // Clear previous content

        document.querySelectorAll(".status_option").forEach((opt, index) => {
            if (index === selectedStatusIndex) {
                opt.style.backgroundColor = "#DFFF60";
                opt.querySelector(".check_icon").style.display = "block";
            }
        });



        const selectedDot = document.createElement("span");
        selectedDot.innerHTML = "⬤";
        if (selectedStatusIndex !== -1) {
            siteNoteStatus = { status_name: statusData[selectedStatusIndex]?.status_name, status_id: statusData[selectedStatusIndex]?.status_id };

            selectedDot.style.color = statusData[selectedStatusIndex]?.color_code;
        }

        // selectedDot.style.color = status?.color_code;
        selectedDot.style.marginRight = "8px";
        selectedDot.style.marginTop = "-2px";



        const selectedStatusName = document.createElement("span");
        selectedStatusName.textContent = selectedSiteNoteData?.status;

        const dropdownArrow = document.createElement("button");
        dropdownArrow.id = 'dropdown_arrow';
        dropdownArrow.innerHTML = downArrow;
        dropdownArrow.style.marginLeft = "auto";

        defaultHeading.appendChild(selectedDot);
        defaultHeading.appendChild(selectedStatusName);
        defaultHeading.appendChild(dropdownArrow);



        const captureImage = { image_id: generate12DigitId(), image_url: selectedSiteNoteData?.image };
        selectedSiteNoteData?.attached_files.unshift(captureImage);
        captureImagesArray = selectedSiteNoteData?.attached_files;

        document.getElementById("attachment_count").innerHTML = `Attachments Count: ${captureImagesArray?.length - 1}`
        initializeCaptureSlider();

        document.getElementById('change_image_tool_btn').style.display = !isUser ? "none" : "";


        const statusDropdown = document.getElementById("status_dropdown")
        if (statusDropdown && selectedSiteNoteData?.status) {
            for (let option of statusDropdown.options) {
                if (option.textContent === selectedSiteNoteData?.status || option.value === selectedSiteNoteData?.status) {
                    option.selected = true;
                    break;
                }
            }
        };

        collebratorPreviewContainer.classList.add("collabrator_preview_container");
        let reciveCollaborators = selectedSiteNoteData?.collaborators?.map((item) => ({ "collabrator_id": item?.collaborator_id, "collabrator_name": item?.collaborator_name, collaborator_profile: item?.collaborator_profile }));
        selectedCollabrators = reciveCollaborators;

        reciveCollaborators?.forEach(collabrator => {
            const collabratorElement = document.createElement("div");
            collabratorElement.classList.add("collobrator_name_container");
            const profileContainer = document.createElement("img")
            profileContainer.className = "collobrator_profile"
            profileContainer.src = collabrator?.collaborator_profile || "icons/default-profile-logo.png";
            collabratorElement.appendChild(profileContainer);
            const nameContainer = document.createElement("p");
            nameContainer.classList.add("collobrator_name");
            nameContainer.innerHTML = collabrator?.collabrator_name;
            collabratorElement.appendChild(nameContainer);
            const removeIcon = document.createElement("button");
            removeIcon.classList.add("collobrator_cross_icon");
            removeIcon.style.display = !isUser ? "none" : "";

            removeIcon.onclick = () => handelRemoveCollabrator(collabrator)
            removeIcon.innerHTML = crossIcon;
            collabratorElement.appendChild(removeIcon);
            collebratorPreviewContainer.appendChild(collabratorElement);
        });
    }
    catch (error) {
        console.log("error", error);
    }

    const modal = document.getElementById("sitenote_modal_dialoge");
    modal.style.display = "block";
    modal.scrollTop = 0;

}

//// Function to open sitenote
function handelOpenSiteNoteModal() {

    if (!currentSiteNoteId) {
        document.getElementById('add_comment_textarea').disabled = true
        document.getElementById('add_comment_button').disabled = true

    }
    document.getElementById("alert_container").style.display = "none";
    document.getElementById("alert_container_addsite").style.display = "block";
    
    document.getElementById("sitenote_box").style.display = "block";
    document.getElementById("modal_footer").style.display = "block";
    document.getElementById("modal_close_icon").addEventListener("click", function () { handelCancelAddSiteNote() }, { once: true });
    document.getElementById("footer_cancel_button").addEventListener("click", function () { handelCancelAddSiteNote() }, { once: true });
    setTimeout(() => {
        // document.body.style.cursor = "url('icons/pin-point.svg') 20 52, auto";
        document.body.style.cursor = "url('icons/pin-point.svg') 18 40, auto ";
        document.addEventListener("click", handelPinSiteNoteOnScreen, { once: true });
    }, 0);
};

// function updatePinPositions() {
//     const wrapper = document.querySelector(".floor_map_image_wrapper");
//     const image = document.getElementById("floor_map_image");
//     const pins = wrapper.querySelector(".pin");

//     const krpano = document.getElementById("krpanoSWFObject");
//     const mapImage = krpano.get('layer[map]');

//     const renderedWidth = image.getBoundingClientRect().width;
//     const renderedHeight = image.getBoundingClientRect().height;

//     const originalImageWidth = mapImage.renderwidth;
//     const originalImageHeight = mapImage.renderheight;

//     const widthScale = renderedWidth / originalImageWidth;
//     const heightScale = renderedHeight / originalImageHeight;

//     const imageRect = image.getBoundingClientRect();
//     const wrapperRect = wrapper.getBoundingClientRect();
//     const currentLeftInContent = imageRect.left - wrapperRect.left + wrapper.scrollLeft;

//     const originalX = parseFloat(pins.dataset.originalX);
//     const originalY = parseFloat(pins.dataset.originalY);

//     const scaledX = (originalX / 2) * widthScale;
//     const scaledY = (originalY / 2) * heightScale;

//     pins.style.left = `${Math.round(currentLeftInContent + scaledX)}px`;
//     pins.style.top = `${Math.round(scaledY)}px`;

// }


//// Function to point image onscreen


function updatePinPositions() {
    const wrapper = document.querySelector(".floor_map_image_wrapper");
    const image = document.getElementById("floor_map_image");
    const pins = wrapper.querySelectorAll(".pin");

    const krpano = document.getElementById("krpanoSWFObject");
    const mapImage = krpano.get('layer[map]');

    const originalImageWidth = image.naturalWidth || mapImage.renderwidth;
    const originalImageHeight = image.naturalHeight || mapImage.renderheight;


    const baseWidth = image.offsetWidth;
    const baseHeight = image.offsetHeight;

    const scaledWidth = baseWidth * currentZoom;
    const scaledHeight = baseHeight * currentZoom;

    const widthScale = scaledWidth / originalImageWidth;
    const heightScale = scaledHeight / originalImageHeight;

    const imageRect = image.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    const imageOffsetX = (imageRect.left - wrapperRect.left) + wrapper.scrollLeft;
    const imageOffsetY = (imageRect.top - wrapperRect.top) + wrapper.scrollTop;

    pins.forEach(pin => {
        const originalX = parseFloat(pin.dataset.originalX);
        const originalY = parseFloat(pin.dataset.originalY);

        const scaledX = originalX * widthScale;
        const scaledY = originalY * heightScale;

        pin.style.transform = `scale(${currentZoom})`;
        pin.style.left = `${Math.round(imageOffsetX + scaledX -16)}px`;
        pin.style.top = `${Math.round(imageOffsetY + scaledY -16)}px`;
    });
}

function handelPinSiteNoteOnScreen(event) {
    const krpano = document.getElementById("krpanoSWFObject");
    const viewerRect = document.getElementById("pano").getBoundingClientRect();
    const clickX = event.clientX - viewerRect.left;
    const clickY = event.clientY - viewerRect.top;

    // Get yaw/pitch based on mouse click
    const sphericalCoords = krpano.screentosphere(clickX, clickY);
    const frameName = krpano.get("xml.scene");

    if (!sphericalCoords) {
        return;
    }

    const { x: yaw, y: pitch } = sphericalCoords;

    // get pin area to center in screen
    krpano.call(`lookto(${yaw}, ${pitch}, 90, direct());`);

    const coords = krpano.spheretoscreen(yaw, pitch);
    if (!coords) {
        return;
    }

    // Create a new pin image
    const pin = document.createElement("img");
    pin.classList.add("pinde_img");
    pin.src = "icons/pin-point.svg";
    pin.style.position = "absolute";
    pin.style.left = coords?.x;
    pin.style.top = coords?.y;
    pin.style.zIndex = 10;
    pin.style.width = "32px";
    pin.style.height = "32px";
    pin.style.cursor = "pointer";
    pin.style.pointerEvents = "none";
    pin.style.display = "none";

    document.body.appendChild(pin);
    document.body.style.cursor = "default";
    placedPins.push({ yaw, pitch, element: pin });

    pinPointCoordinets = { yaw: yaw, pitch: pitch, x: coords?.x, y: coords?.y, frame_name: frameName };

    setTimeout(() => {
        if (krpano) {
            captureUpdatedScreenShot();
            document.getElementById("alert_container").style.display = "none";
            
            document.getElementById("alert_container_addsite").style.display = "none";

            document.getElementById("sitenote_box").style.display = "none";
            setTimeout(() => {
                const captureurl = localStorage.getItem("captureurl");
                if (captureurl) {
                    const arr = captureurl.split(',');
                    const mime = arr[0].match(/:(.*?);/)[1];
                    const byteString = atob(arr[1]);
                    const ab = new ArrayBuffer(byteString.length);
                    const ia = new Uint8Array(ab);
                    for (let i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }
                    const fileFromStorage = new File([ab], "screenshot.png", { type: mime });

                    //// Convert Blob File 
                    const blobUrl = URL.createObjectURL(fileFromStorage);

                    if (blobUrl) {
                        const floorMapName = document.getElementById("floor_map_image_titel");
                        floorMapName.innerHTML = ids.floor_name;
                        const randomId = generate12DigitId();
                        captureImagesArray[0] = { image_id: randomId, image_url: blobUrl, file_object: fileFromStorage };
                        initializeCaptureSlider();
                        const sitenoteModalDialoge = document.getElementById("sitenote_modal_dialoge");
                        sitenoteModalDialoge.style.display = "block";
                        sitenoteModalDialoge.scrollTo({ top: 0, behavior: "instant" });

                        // set user details in header
                        const now = new Date();
                        const options = { month: 'short', day: 'numeric', year: 'numeric' };
                        const formattedDate = now.toLocaleDateString('en-US', options);
                        const userDetial = JSON.parse(localStorage.getItem("userData"));

                        document.getElementById("user_name").innerText = userDetial?.username;

                        document.getElementById("created_date").innerHTML = formattedDate;
                        document.getElementById("user_profile_image").src = userDetial?.user_profile_image;
                    }


                    var marginLeft = 0
                    const floorMapImageWrapper = document.querySelector(".floor_map_image_wrapper");
                    const floorMapImage = document.getElementById("floor_map_image");

                    const mapImage = krpano.get('layer[map]');
                    const sceneNumber = frameName.split('_')[1]

                    const currentSpot = krpano.get(`layer[spot${sceneNumber}]`);

                    const parent = floorMapImage.parentElement;
                    const parentWidth = parent.offsetWidth;

                    const imageWidth = floorMapImage.offsetWidth;
                    const horizontalSpace = parentWidth - imageWidth;

                    marginLeft = horizontalSpace / 2;

                    const renderedWidth = floorMapImage.clientWidth;
                    const renderedHeight = floorMapImage.clientHeight;


                    const originalImageWidth = floorMapImage.naturalWidth || mapImage.renderwidth;
                    const originalImageHeight = floorMapImage.naturalHeight || mapImage.renderheight;


                    const baseWidth = floorMapImage.offsetWidth;
                    const baseHeight = floorMapImage.offsetHeight;
                    

                    const scaledWidth = baseWidth * currentZoom;
                    const scaledHeight = baseHeight * currentZoom;

                    const widthScale = scaledWidth / originalImageWidth;
                    const heightScale = scaledHeight / originalImageHeight;


                    const imageRect = floorMapImage.getBoundingClientRect();
                    const wrapperRect = floorMapImageWrapper.getBoundingClientRect();

                    const imageOffsetX = (imageRect.left - wrapperRect.left) + floorMapImageWrapper.scrollLeft;
                    const imageOffsetY = (imageRect.top - wrapperRect.top) + floorMapImageWrapper.scrollTop;


                    const originalX = parseFloat(currentSpot.x);
                    const originalY = parseFloat(currentSpot.y);


                    const scaledX = originalX * widthScale;
                    const scaledY = originalY * heightScale;

                    // const widthScale = renderedWidth / originalImageWidth
                    // const heightScale = renderedHeight / originalImageHeight

                    const newX = (currentSpot.x / 2) * widthScale
                    const newY = (currentSpot.y / 2) * heightScale

                    const x = marginLeft + newX;
                    const y = newY;

                    const pin2 = document.createElement("div");
                    pin2.className = "pin";
                    pin2.dataset.originalX = currentSpot.x;
                    pin2.dataset.originalY = currentSpot.y;

                    pin2.style.transform = `scale(${currentZoom})`;
                    pin2.style.left = `${Math.round(imageOffsetX + scaledX -16)}px`;
                    pin2.style.top = `${Math.round(imageOffsetY + scaledY -16)}px`;
            

                    floorMapImageWrapper.appendChild(pin2);

                    pinPointCoordinets = { ...pinPointCoordinets,  note_current_spot_x: currentSpot.x, note_current_spot_y: currentSpot.y, note_original_height: originalImageHeight, note_original_width: originalImageWidth, note_x:(Math.round(imageOffsetX + scaledX -16)),note_y:(Math.round(imageOffsetY + scaledY -16)) }
                }
            }, 500);
        }
    }, 800);

};


//// Function to close pin point
function handelClosePlacePoint() {
    document.body.style.cursor = "default";
    pinPointCoordinets = {};
    // placedPins.push({ yaw, pitch, element: pin });

    // Remove event listener to prevent adding pin after canceling
    document.removeEventListener("click", handelPinSiteNoteOnScreen);

    // hide popup
    document.getElementById("alert_container").style.display = "none";
    
    document.getElementById("alert_container_addsite").style.display = "none";

    document.getElementById("sitenote_box").style.display = "none";
};


//// Function to change subject
function handelChangeSubject(event) {
    let value = event.target.value;

    if (value?.length > 100) {
        value = value?.substring(0, 100);
        event.target.value = value;
    }

    subjectLengthCount = value?.length;
    document.getElementById("length_check").innerHTML = `${value.length} / 100`;
    const subjectError = document.getElementById("subject_input_error");
    if (value?.length > 0) {
        subjectError.style.display = "none";
    }
};


//// Function to change description
function handelChangeDescription(event) {
    const value = event.target.value;
    const descriptionError = document.getElementById("description_input_error")
    if (value?.length > 0) {
        descriptionError.style.display = "none";
    }
};


//// Function to change Status
function handelChangeStatus(option, checkIcon, status) {
    document.querySelectorAll(".status_option").forEach(opt => {
        opt.style.backgroundColor = "";
        opt.querySelector(".check_icon").style.display = "none";
    });

    // Highlight selected option
    option.style.backgroundColor = "#DFFF60";
    checkIcon.style.display = "block";

    // Update selected status
    siteNoteStatus = { status_name: status?.status_name, status_id: status?.status_id };


    // Update the status head container to show selected status and dot
    const defaultHeading = document.querySelector(".default_heading");
    defaultHeading.innerHTML = ""; // Clear previous content

    const selectedDot = document.createElement("span");
    selectedDot.innerHTML = "⬤";
    selectedDot.style.color = status?.color_code;
    selectedDot.style.marginRight = "8px";
    selectedDot.style.marginTop = "-2px";

    const selectedStatusName = document.createElement("span");
    selectedStatusName.textContent = status?.status_name;

    const dropdownArrow = document.createElement("button");
    dropdownArrow.id = 'dropdown_arrow';
    dropdownArrow.innerHTML = downArrow;
    dropdownArrow.style.marginLeft = "auto";

    defaultHeading.appendChild(selectedDot);
    defaultHeading.appendChild(selectedStatusName);
    defaultHeading.appendChild(dropdownArrow);

    document.getElementById("status_options_container").style.display = "none"
    document.getElementById("status_input_error").style.display = "none";
}


//// Function to change dueDate
function handelChangeDueDate(event) {
    const value = event.target.value;
    const dueDateError = document.getElementById("duedate_input_error")
    if (value.length === 0) {
        dueDateError.style.display = "block";
        dueDateError.innerHTML = "Please enter due date"
    }
    else {
        dueDateError.style.display = "none";
    }
};


//// Function to show alert message
function showAlertMessage(success, message) {
    const alerContainer = document.getElementById("alert_container");
    
    alerContainer.style.display = "flex";
    const alerBox = document.getElementById("alert_box");
    alerBox.style.display = "block";
    
    if (success) {
        alerBox.classList.remove("error_message");
        alerBox.classList.add("success_message");
    }
    else {
        alerBox.classList.remove("success_message");
        alerBox.classList.add("error_message");
    }

    alerBox.innerHTML = message;

    setTimeout(() => {
        alerContainer.style.display = "none";
        alerBox.style.display = "none";
        document.getElementById("alert_container_addsite").style.display="none"
    }, 3000);
};


//// Function to reser status dropdown
function handelResetStatusDropdown() {
    siteNoteStatus = { status_name: undefined, status_id: undefined };
    // Reset status dropdown to default header
    const defaultHeading = document.querySelector(".default_heading");

    if (defaultHeading) {
        defaultHeading.innerHTML = "";

        const defaultHeadingLeft = document.createElement("span");
        defaultHeadingLeft.innerHTML = "Select Status";

        const defaultHeadingRight = document.createElement("button");
        defaultHeadingRight.id = 'dropdown_arrow';
        defaultHeadingRight.innerHTML = downArrow;
        defaultHeadingRight.style.marginLeft = "auto";

        defaultHeading.appendChild(defaultHeadingLeft);
        defaultHeading.appendChild(defaultHeadingRight);

    }

    // Also hide the dropdown options if open
    const statusOptionsContainer = document.getElementById("status_options_container");
    if (statusOptionsContainer) {
        statusOptionsContainer.style.display = "none";

        // Remove highlight and check icons from all options
        const allOptions = statusOptionsContainer.querySelectorAll(".status_option");
        allOptions.forEach(option => {
            option.style.backgroundColor = "";
            const icon = option.querySelector(".check_icon");
            if (icon) icon.style.display = "none";
        });
    }
}


//// Function to remove current placed pinPoint
function handelCancelAddSiteNote() {

    const floorMapImageWrapper = document.getElementById("floor_map_image_wrapper")
    const floorMapImagePin = document.querySelector(".pin")
    if (floorMapImagePin) {
        floorMapImageWrapper.removeChild(floorMapImagePin)
    }

    const captureUploadContainer = document.getElementById("capture_upload_container");

    if (captureUploadContainer) {
        document.getElementById("floor_capture_contaner").removeChild(captureUploadContainer);
    }


    formData = new FormData();
    handelResetStatusDropdown();
    captureImagesArray = [];
    currentSiteNoteId = undefined;
    document.getElementById('comment_body').innerHTML = "";
    document.getElementById('add_comment_textarea').value = "";
    document.getElementById("subject_input_error").style.display = "none";
    document.getElementById("description_input_error").style.display = "none";
    document.getElementById("status_input_error").style.display = "none";
    document.getElementById("duedate_input_error").style.display = "none";
    // selectedExtraImagesFile = [];
    const captureSliderContainer = document.getElementById("capture_slider_container")
    if (captureSliderContainer) {

        document.getElementById("floor_capture_contaner").removeChild(document.getElementById("capture_slider_container"));
    }
    document.getElementById("sitenote_modal_dialoge").style.display = "none";
    document.getElementById("subject_input").value = "";
    document.getElementById("description_textarea").value = "";
    // document.getElementById("status_dropdown").value = "";
    document.getElementById("due_date_input").value = "";
    // document.getElementById("collebrator_dropdown").value = "";
    document.getElementById("collabrator_preview_container").innerHTML = "";
    document.getElementById("collabrator_preview_container_outer").style.display = "none";
    localStorage.removeItem("captureUrl");
    document.getElementById("modal_close_icon").removeEventListener("click", function () { handelCancelAddSiteNote() }, { once: true });
    document.getElementById("footer_cancel_button").removeEventListener("click", function () { handelCancelAddSiteNote() }, { once: true });
    selectedCollabrators = [];
    subjectLengthCount = 0;
    document.getElementById("length_check").innerHTML = '0 /100'

    let removeLastPin = placedPins[placedPins.length - 1]

    if (removeLastPin && removeLastPin.element && !removeLastPin.element.id) {
        const lastPin = placedPins.pop();

        if (lastPin && lastPin.element) {
            lastPin.element.remove();
        }
    }

}


//// Function to Reset sitenote
function handleCloseSiteNote() {
    const floorMapImageWrapper = document.getElementById("floor_map_image_wrapper")
    const floorMapImagePin = document.querySelector(".pin")
    if (floorMapImagePin) {
        floorMapImageWrapper.removeChild(floorMapImagePin)
    }


    const captureUploadContainer = document.getElementById("capture_upload_container");

    if (captureUploadContainer) {
        document.getElementById("floor_capture_contaner").removeChild(captureUploadContainer);
    }



    const subjectInput = document.getElementById("subject_input");
    const descriptionTextarea = document.getElementById("description_textarea");
    const statusHeadContainer = document.getElementById('status_head_container');
    const collabratorHeadContainer = document.getElementById('collabrator_head_container');
    const dueDateInput = document.getElementById("due_date_input");
    const removeCaptureButton = document.getElementById('remove_capture_button');
    const rightProfileContainer = document.getElementById('right_profile_container');
    const rightActionDropdown = document.getElementById('right_action_dropdown');
    const rightActionDropdownDelete = document.getElementById('right_action_dropdown_delete');
    const addCommentButton = document.getElementById('add_comment_button');
    const addCommentTextarea = document.getElementById('add_comment_textarea');
    document.getElementById("right_360_view").style.display = "none";

    isOpenSiteActionModal = false;
    rightActionDropdown.style.display = "none";
    removeCaptureButton.disabled = false
    subjectInput.disabled = false
    descriptionTextarea.disabled = false
    dueDateInput.disabled = false

    statusHeadContainer.style.pointerEvents = "auto";
    collabratorHeadContainer.style.pointerEvents = "auto";

    addCommentButton.disabled = false;
    addCommentTextarea.disabled = false;


    rightProfileContainer.style.display = "none"
    rightActionDropdownDelete.style.display = "none"

    const footerAddnoteButton = document.getElementById("footer_addnote_button");
    footerAddnoteButton.innerHTML = `Add note`;
    deletedCaptureImage = []
    document.getElementById("attachment_count").innerHTML = `Attachments Count: ${0}`

    handelResetStatusDropdown();
    captureImagesArray = [];
    currentSiteNoteId = undefined;
    document.getElementById('comment_body').innerHTML = "";
    document.getElementById('add_comment_textarea').value = "";
    // selectedExtraImagesFile = [];
    const captureSliderContainer = document.getElementById("capture_slider_container")
    if (captureSliderContainer) {
        document.getElementById("floor_capture_contaner").removeChild(captureSliderContainer);
    }
    const statusInput = document.getElementById("status_input");
    const statusContainer = document.getElementById("status_container");
    document.getElementById("sitenote_modal_dialoge").style.display = "none";
    if (statusInput && statusContainer.contains(statusInput)) {
        statusContainer.removeChild(statusInput);
    }
    document.getElementById("subject_input_error").style.display = "none";
    document.getElementById("description_input_error").style.display = "none";
    document.getElementById("status_input_error").style.display = "none";
    document.getElementById("duedate_input_error").style.display = "none";

    document.getElementById("attachement_container").style.display = "block";
    // document.getElementById("floor_capture_image").src = "";
    document.getElementById("subject_input").value = "";
    document.getElementById("subject_input").readOnly = false;
    document.getElementById("description_textarea").value = "";
    document.getElementById("description_textarea").readOnly = false;
    document.getElementById("status_head_container").style.display = "flex";

    dueDateInput.value = "";
    dueDateInput.onclick = initializeCalendarComponent;
    document.getElementById("collabrator_head_container").style.display = "flex";
    document.getElementById("collabrator_preview_container").innerHTML = "";
    document.getElementById("collabrator_preview_container_outer").style.display = "none";
    localStorage.removeItem("captureUrl");
    document.getElementById("modal_close_icon").removeEventListener("click", function () { handleCloseSiteNote() }, { once: true });
    document.getElementById("footer_cancel_button").removeEventListener("click", function () { handleCloseSiteNote() }, { once: true });
    selectedCollabrators = [];
    subjectLengthCount = 0;
    siteNoteStatus = { status_name: undefined, status_id: undefined };
    document.getElementById("length_check").innerHTML = '0 /100'
    document.getElementById("modal_titel").innerHTML = "Add Site Note";
};


async function convertImageToWebP(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = function (e) {
            img.src = e.target?.result;
        };

        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error("Canvas context not available"));

            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const webpFile = new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
                            type: 'image/webp',
                            lastModified: Date.now(),
                        });
                        resolve(webpFile);
                    } else {
                        reject(new Error("Blob conversion failed"));
                    }
                },
                'image/webp',
                0.8 // Quality (0 to 1)
            );
        };

        img.onerror = reject;
        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}

//// Function to add site note
async function handelAddSiteNote() {

    const subject = document.getElementById("subject_input").value;
    const description = document.getElementById("description_textarea").value;
    const status = siteNoteStatus?.status_id;
    const dueDate = document.getElementById("due_date_input").value;
    const collaborators = selectedCollabrators?.map((item) => item?.collabrator_id);
    const subjectError = document.getElementById("subject_input_error");
    // const descriptionError = document.getElementById("description_input_error");
    const statusError = document.getElementById("status_input_error");
    const dueDateError = document.getElementById("duedate_input_error");


    // validation for subject
    if (subject === '') {

        subjectError.style.display = "block";
        subjectError.innerHTML = "Please enter subject";
        document.getElementById("subject_input").focus();
        return;
    }
    else {
        subjectError.style.display = "none";
    }



    // validation for status

    if (siteNoteStatus?.status_id === undefined) {
        statusError.style.display = "block";
        statusError.innerHTML = "Please select status";
        return;
    }
    else {
        statusError.style.display = "none";
    }

    // validation for dueDate
    if (dueDate === '') {
        dueDateError.style.display = "block";
        dueDateError.innerHTML = "Please select due date";
        document.getElementById("due_date_input").focus();
        return;
    }
    else {
        statusError.style.display = "none";
    }

    // show spinner
    const footerAddnoteButton = document.getElementById("footer_addnote_button");
    const footerCancelButton = document.getElementById("footer_cancel_button");
    footerAddnoteButton.innerHTML = `<span class="spinner"></span>`;
    footerAddnoteButton.disabled = true;
    footerCancelButton.disabled = true;

    // upload images in s3 bucket
    const captureId = window?.tourData?.capture_id;

    const filesArray = captureImagesArray?.map((item, index) => {
        const fileObject = item?.file_object;
        const base = {
            type: index === 0 ? "main" : "attachment"
        };

        if (fileObject) {
            const randomId = generate12DigitId();
            const originalName = fileObject.name.replace(/\.\w+$/, "");
            const newName = `${originalName}_${randomId}.webp`;

            return {
                ...base,
                filename: newName
            };
        }
        return base;

    });



    let uplodedImagesFileUrls = [];
    const presignedUrlBody = {
        project_id: ids?.projectId,
        floor_id: ids?.floorId,
        capture_id: captureId,
        files: filesArray
    }

    try {

        const hasAtLeastOneFileObject = captureImagesArray.some(item => item.file_object instanceof File);
        if (hasAtLeastOneFileObject) {

            const response = await fetch(`https://user.sitepace.ai/api/get_sitenote_presigned_url/`, {
                body: JSON.stringify(presignedUrlBody),
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch available dates');
            }
            const responseData = await response.json();

            if (response.status === 200) {


                if (responseData?.presigned_urls.length > 0) {

                    const captureImagesResult = captureImagesArray?.filter(item => 'file_object' in item);

                    const webpCaptureImagesResult = await Promise.all(
                        captureImagesResult.map(async (item) => {
                            const webpFile = await convertImageToWebP(item.file_object);
                            return {
                                ...item,
                                file_object: webpFile,
                            };
                        })
                    );

                    await Promise.all(
                        responseData?.presigned_urls?.map(async (item, index) => {

                            try {
                                const response = await fetch(item?.presigned_url, {
                                    method: 'PUT',
                                    body: webpCaptureImagesResult[index]?.file_object,
                                    headers: {
                                        'Content-Type': 'application/octet-stream'
                                    }
                                });

                                if (response?.status === 200) {
                                    uplodedImagesFileUrls.push({ file_url: item?.file_url, type: item?.type });
                                }
                                else {
                                    console.log("error in response");
                                }
                            } catch (error) {
                                console.log("error.message", error.message);
                            }
                        })
                    );
                }
            }
            else {
                console.log("error in upload image in s3 bucket");
            }
        }
        // add site note
        const imageFile = uplodedImagesFileUrls?.find((item) => item?.type === "main")?.file_url;
        const attachedFiles = uplodedImagesFileUrls?.filter((item) => item?.type === "attachment")?.map((item) => item?.file_url);


        const addSiteNoteBody = {
            project_id: ids?.projectId,
            project_floor_capture: captureId,
            project_floor: ids?.floorId,
            subject: subject,
            description: description,
            status: status,
            due_date: dueDate,
            collaborators: collaborators,
            image: imageFile,
            attached_files: attachedFiles !== undefined ? attachedFiles : [],
            tag_position: pinPointCoordinets,
        }

        if (currentSiteNoteId) {
            delete addSiteNoteBody?.tag_position;

            if (deletedCaptureImage.length > 0) {
                addSiteNoteBody.delete_file_ids = deletedCaptureImage
            }

        }

        let url = currentSiteNoteId ? `https://user.sitepace.ai/api/update_sitenote/${currentSiteNoteId}/` : 'https://user.sitepace.ai/api/add_sitenote/'
        try {
            const response = await fetch(url, {
                // const response = await fetch(`http://192.168.0.105:8000/api/add_sitenote/`, {
                body: JSON.stringify(addSiteNoteBody),
                method: `${currentSiteNoteId ? "PATCH" : 'POST'}`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch available dates');
            }
            const responseData = await response.json();
            if (response.status === 201 || response.status === 200) {
                // formData = new FormData();
                footerAddnoteButton.innerHTML = `Add note`;
                footerAddnoteButton.disabled = false;
                footerCancelButton.disabled = false;

                if (currentSiteNoteId) {
                    document.getElementById('sitenote_box').style.display = "none"
                }
                handleCloseSiteNote();
                showAlertMessage(responseData?.success, responseData?.message);
                getExistingSiteNoteList();
            }
            else {
                footerAddnoteButton.innerHTML = `Add note`;
                footerAddnoteButton.disabled = false;
                footerCancelButton.disabled = false;
            }
            uplodedImagesFileUrls = [];
        } catch (error) {
            console.log("error", error);
            footerAddnoteButton.innerHTML = `Add note`;
            footerAddnoteButton.disabled = false;
            footerCancelButton.disabled = false;
            uplodedImagesFileUrls = [];
        }
    } catch (error) {
        console.log("error", error);
    }
};

//// Function create comment action dropdown 
function createCommentActionDropdownMenu(currentData, onEdit, onDelete) {
    const container = document.createElement('div');
    container.classList.add('details_header_right');
    const useAuth = JSON.parse(localStorage.getItem("userData"))
    const isUser = useAuth?.project_active;
    // Create three dots icon
    const threeDotsIcon = document.createElement('div');
    threeDotsIcon.style.pointerEvents = isUser ? "auto" : "none"
    threeDotsIcon.classList.add('three_dots_icon');
    threeDotsIcon.innerHTML = threeDots;
    container.appendChild(threeDotsIcon);

    // Create dropdown menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('comment_action_dropdown_menu', 'hidden');
    dropdownMenu.innerHTML = `
        <div class="dropdown_item edit_item">${edit} Edit</div>
        <div class="dropdown_item delete_item">${trashBin} Delete</div>
    `;
    container.appendChild(dropdownMenu);

    // Toggle dropdown visibility
    threeDotsIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        dropdownMenu.classList.add('hidden');
    });

    // Handle Edit click
    const editBtn = dropdownMenu.querySelector('.edit_item');
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.add('hidden');
        if (typeof onEdit === 'function') {
            onEdit(currentData);
        }
    });

    // Handle Delete click
    const deleteBtn = dropdownMenu.querySelector('.delete_item');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.add('hidden');
        if (typeof onDelete === 'function') {
            onDelete(currentData?.comment_id);
        }
    });

    return container;
}

//// Function to get existing comments
async function handelGetComments(SiteNoteId) {
    const useAuth = JSON.parse(localStorage.getItem("userData"))
    const isUser = useAuth?.project_active;

    try {
        const response = await fetch(`https://user.sitepace.ai/api/list_comments/${SiteNoteId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch available dates');
        }

        const commentsData = await response.json();

        if (commentsData?.length > 0) {
            const commentBody = document.getElementById("comment_body");
            commentsData?.map((item) => {
                const commentList = document.createElement('div');
                commentList.classList.add('comment_list');
                commentList.id = 'comment_list';
                commentBody.appendChild(commentList);

                const commentListAvatar = document.createElement('div');
                commentListAvatar.classList.add('comment_list_avatar');
                commentListAvatar.id = 'comment_list_avatar';
                commentList.appendChild(commentListAvatar);

                const userProfile = document.createElement("img");
                userProfile.src = item?.profile_image;
                userProfile.style.width = "100%";
                userProfile.style.height = "100%";
                commentListAvatar.appendChild(userProfile);

                const commentListDetails = document.createElement('div');
                commentListDetails.classList.add('comment_list_details');
                commentListDetails.id = 'comment_list_details';
                commentList.appendChild(commentListDetails);

                const commentListDetailsHeader = document.createElement('div');
                commentListDetailsHeader.classList.add('details_header');
                commentListDetailsHeader.id = 'details_header';
                commentListDetails.appendChild(commentListDetailsHeader);

                const detailsHeaderLeft = document.createElement('div');
                detailsHeaderLeft.classList.add('details_header_left');
                detailsHeaderLeft.id = 'details_header_left';
                commentListDetailsHeader.appendChild(detailsHeaderLeft);

                const userName = document.createElement('h3');
                userName.classList.add('details_user_name');
                userName.id = 'details_user_name';
                userName.textContent = item?.user_name
                detailsHeaderLeft.appendChild(userName);

                const commentDate = document.createElement('p');
                commentDate.classList.add('details_comment_date');
                commentDate.id = 'details_comment_date';
                commentDate.textContent = convertTime(item?.created_at)
                detailsHeaderLeft.appendChild(commentDate);

                const detailsHeaderRight = document.createElement('div');
                detailsHeaderRight.classList.add('details_header_right');
                detailsHeaderRight.id = 'details_header_right';
                if (userData?.user_id === item?.user_id) {
                    commentListDetailsHeader.appendChild(detailsHeaderRight);
                    const dropdownMenu = createCommentActionDropdownMenu(item, handleEditComment, handleDeleteComment);
                    commentListDetailsHeader.appendChild(dropdownMenu);
                }

                const commentText = document.createElement('p');
                commentText.classList.add('comment_text');
                commentText.id = 'comment_text';
                commentText.textContent = item?.comment_text;
                commentListDetails.appendChild(commentText);

                const actionContainer = document.createElement('div');
                actionContainer.classList.add('comment_action_container');
                actionContainer.id = 'comment_action_container';
                commentListDetails.appendChild(actionContainer);

                const likeContainer = document.createElement('div');
                likeContainer.classList.add('like_container');
                likeContainer.id = 'like_container';
                likeContainer.style.pointerEvents = isUser ? "auto" : "none"

                const tempLikeDiv = document.createElement('div');
                tempLikeDiv.innerHTML = likeIcon.trim();
                const likeElement = tempLikeDiv.firstChild;
                if (item?.liked) {
                    likeElement.classList.add('liked');
                }
                likeContainer.appendChild(likeElement);
                likeContainer.onclick = () => handelAddLike(item?.comment_id);
                actionContainer.appendChild(likeContainer);

                const likeCount = document.createElement('span');
                likeCount.classList.add('like_count');
                likeCount.id = 'like_count';
                likeCount.innerText = item?.likes_count;
                likeContainer.appendChild(likeCount);

                const commentContainer = document.createElement('div');
                commentContainer.classList.add('comment_container');
                commentContainer.id = 'comment_container';
                commentContainer.style.pointerEvents = isUser ? "auto" : "none"

                commentContainer.innerHTML = commentIcon;
                commentContainer.onclick = () => handelReplayComment(item?.comment_id)
                actionContainer.appendChild(commentContainer);

                const commentCount = document.createElement('span');
                commentCount.classList.add('comment_count');
                commentCount.id = 'comment_count';
                commentCount.innerText = item?.comments_count;
                commentContainer.appendChild(commentCount);

                if (item?.replies?.length > 0) {
                    {
                        item?.replies?.map((replayComment) => {
                            const commentList = document.createElement('div');
                            commentList.classList.add('comment_list', 'replay_comment_list');
                            commentList.id = 'replay_comment_list';
                            commentBody.appendChild(commentList);

                            const commentListAvatar = document.createElement('div');
                            commentListAvatar.classList.add('comment_list_avatar');
                            commentListAvatar.id = 'replay_list_avatar';
                            commentList.appendChild(commentListAvatar);

                            const userProfile = document.createElement("img");
                            userProfile.src = replayComment?.profile_image;
                            userProfile.style.width = "100%";
                            userProfile.style.height = "100%";
                            commentListAvatar.appendChild(userProfile);

                            const commentListDetails = document.createElement('div');
                            commentListDetails.classList.add('comment_list_details');
                            commentListDetails.id = 'replay_list_details';
                            commentList.appendChild(commentListDetails);

                            const commentListDetailsHeader = document.createElement('div');
                            commentListDetailsHeader.classList.add('details_header');
                            commentListDetailsHeader.id = 'details_header';
                            commentListDetails.appendChild(commentListDetailsHeader);

                            const detailsHeaderLeft = document.createElement('div');
                            detailsHeaderLeft.classList.add('details_header_left');
                            detailsHeaderLeft.id = 'details_header_left';
                            commentListDetailsHeader.appendChild(detailsHeaderLeft);

                            const userName = document.createElement('h3');
                            userName.classList.add('details_user_name');
                            userName.id = 'details_user_name';
                            userName.textContent = replayComment?.user_name
                            detailsHeaderLeft.appendChild(userName);

                            const commentDate = document.createElement('p');
                            commentDate.classList.add('details_comment_date');
                            commentDate.id = 'details_comment_date';
                            commentDate.textContent = convertTime(replayComment?.created_at)
                            detailsHeaderLeft.appendChild(commentDate);

                            const detailsHeaderRight = document.createElement('div');
                            detailsHeaderRight.classList.add('details_header_right');
                            detailsHeaderRight.id = 'details_header_right';
                            commentListDetailsHeader.appendChild(detailsHeaderRight);
                            if (userData?.user_id === replayComment?.user_id) {
                                commentListDetailsHeader.appendChild(detailsHeaderRight);
                                const dropdownMenu = createCommentActionDropdownMenu(replayComment, handleEditComment, handleDeleteComment);
                                commentListDetailsHeader.appendChild(dropdownMenu);
                            }

                            const commentText = document.createElement('p');
                            commentText.classList.add('comment_text');
                            commentText.id = 'comment_text';
                            commentText.textContent = replayComment?.comment_text;
                            commentListDetails.appendChild(commentText);

                            const actionContainer = document.createElement('div');
                            actionContainer.classList.add('comment_action_container');
                            actionContainer.id = 'comment_action_container';
                            commentListDetails.appendChild(actionContainer);

                            const likeContainer = document.createElement('div');
                            likeContainer.classList.add('like_container');
                            likeContainer.id = 'like_container';

                            const tempLikeDiv = document.createElement('div');
                            tempLikeDiv.innerHTML = likeIcon.trim();
                            const likeElement = tempLikeDiv.firstChild;
                            if (replayComment?.liked) {
                                likeElement.classList.add('liked');
                            }
                            likeContainer.appendChild(likeElement);
                            likeContainer.onclick = () => handelAddLike(replayComment?.comment_id);
                            actionContainer.appendChild(likeContainer);

                            const likeCount = document.createElement('span');
                            likeCount.classList.add('like_count');
                            likeCount.id = 'like_count';
                            likeCount.innerText = replayComment?.likes_count;
                            likeContainer.appendChild(likeCount);
                        });
                    };
                };
            });
        };
    }
    catch (error) {
        console.log("error", error);
    }
}

//// Function to like comment
async function handelAddLike(commentId) {
    const addLikeBody = {
        comment_id: commentId
    }
    try {
        const response = await fetch(`https://user.sitepace.ai/api/add_like/`, {
            body: JSON.stringify(addLikeBody),
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch available dates');
        }
        const result = await response.json();
        if (result.success) {
            const commentBody = document.getElementById("comment_body");
            if (commentBody) {
                commentBody.innerHTML = "";
            }
            handelGetComments(currentSiteNoteId);
        }
    }
    catch (error) {
        console.log(error);
    }
}

//// Function to add new comment
async function handelAddCommentInSiteNote() {
    const commentText = document.getElementById("add_comment_textarea");
    if (commentText.value.trim() === "") return;

    if (editCommentData?.isEditComment) {
        const addCommentBody = {
            comment_id: editCommentData?.data?.comment_id,
            comment_text: commentText?.value
        }
        try {
            const response = await fetch(`https://user.sitepace.ai/api/update_comment/`, {
                body: JSON.stringify(addCommentBody),
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Failed to fetch available dates');
            }
            if (response.status === 200) {
                commentText.value = "";
                const commentBody = document.getElementById("comment_body");
                if (commentBody) {
                    commentBody.innerHTML = "";
                }
                handelGetComments(currentSiteNoteId);
            }
        } catch (error) {
            console.log(error);
        }
    }
    else {
        const addCommentBody = {
            site_note: currentSiteNoteId,
            parent: parentCommentId ? parentCommentId : "",
            comment_text: commentText.value
        }
        if (mensionCollabratorList?.length > 0) {
            mensionCollabratorList.forEach(id => {
                addCommentBody.comment_text[id] = false;
            });
        }
        try {
            const response = await fetch(`https://user.sitepace.ai/api/add_comment/`, {
                body: JSON.stringify(addCommentBody),
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Failed to fetch available dates');
            }
            if (response.status === 201) {
                commentText.value = "";
                const commentBody = document.getElementById("comment_body");
                if (commentBody) {
                    commentBody.innerHTML = "";
                }
                handelGetComments(currentSiteNoteId);
            }
        } catch (error) {
            console.log(error);
        }
    }
    editCommentData = {};
    parentCommentId = undefined;
    mensionCollabratorList = [];
    const existing = document.getElementById("teg_collabrator_container");
    if (existing) existing.remove();
}

//// Function edit existing comment
async function handleEditComment(data) {
    const addCommentTextarea = document.getElementById('add_comment_textarea');
    addCommentTextarea.value = data?.comment_text;
    addCommentTextarea.focus();
    editCommentData = { isEditComment: true, data: data }
}

//// Function delete existing comment
async function handleDeleteComment(commentId) {
    try {
        const response = await fetch(`https://user.sitepace.ai/api/delete_comment/${commentId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch available dates');
        }

        const result = await response.json();

        if (result.success) {
            const commentBody = document.getElementById("comment_body");
            if (commentBody) {
                commentBody.innerHTML = "";
            }
            handelGetComments(currentSiteNoteId);
        }
    }
    catch (error) {
        console.log(error);
    }
}

//// Function to replay comment
function handelReplayComment(parentId) {
    parentCommentId = parentId;
    document.getElementById('add_comment_textarea').focus();
}


async function fetchCollaborators() {
    try {
        const response = await fetch(`https://user.sitepace.ai/api/sitenote_collaborator_list/${currentSiteNoteId}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) throw new Error('Failed to fetch collaborator list');
        allCollaborators = await response.json();
    } catch (error) {
        console.log(error);
    }
}

function handleMention(item, startIndex, endIndex, textarea) {
    mensionCollabratorList = [...mensionCollabratorList, item?.collaborator_user_id];

    const text = textarea.value;
    const before = text.slice(0, startIndex);
    const after = text.slice(endIndex);
    const newText = `${before}@${item.collaborator_name} ${after}`;

    textarea.value = newText;

    const newCursorPos = before.length + item.collaborator_name.length + 2;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
    textarea.focus();

    const existing = document.getElementById("teg_collabrator_container");
    if (existing) existing.remove();
    collaboratorSelected = true;
}

function showSuggestions(filtered, startIndex, endIndex, textarea, commentFooter) {
    const existingPopup = document.getElementById("teg_collabrator_container");
    if (existingPopup) existingPopup.remove();

    const popupContainer = document.createElement("ul");
    popupContainer.classList.add("teg_collabrator_container");
    popupContainer.id = "teg_collabrator_container";

    filtered.forEach((item) => {
        const li = document.createElement("li");
        li.innerText = item.collaborator_name;
        li.onclick = () => handleMention(item, startIndex, endIndex, textarea);
        popupContainer.appendChild(li);
    });

    commentFooter.appendChild(popupContainer);
}

async function handelGetTagedCollabratorList(e) {
    const textarea = e.target;
    const commentFooter = document.getElementById("comment_footer");

    const cursorPos = textarea.selectionStart;
    const text = textarea.value;
    const textBeforeCursor = text.slice(0, cursorPos);

    // Match last word like @john or @jo
    const match = textBeforeCursor.match(/@([a-zA-Z0-9_]*)$/);
    if (!match) {
        const existing = document.getElementById("teg_collabrator_container");
        if (existing) existing.remove();
        return;
    }

    const searchTerm = match[1].toLowerCase();
    const startIndex = cursorPos - searchTerm?.length - 1; // includes '@'
    const endIndex = cursorPos;

    if (allCollaborators?.length === 0) {
        await fetchCollaborators();
    }

    const filtered = allCollaborators?.filter((item) =>
        item?.collaborator_name?.toLowerCase()?.startsWith(searchTerm)
    );

    if (filtered.length > 0) {
        showSuggestions(filtered, startIndex, endIndex, textarea, commentFooter);
    } else {
        const existing = document.getElementById("teg_collabrator_container");
        if (existing) existing.remove();
    }
}

const commentText = document.getElementById("comment_textarea");
async function submitComment() {

    try {
        const response = await fetch("/api/submit_comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                comment: commentText.value,
                tagged_users: mensionCollabratorList
            })
        });

        if (!response.ok) throw new Error("Failed to submit comment");
        const result = await response.json();


        // Reset
        document.getElementById("comment_textarea").value = "";
        mensionCollabratorList = [];
        collaboratorSelected = false;
    } catch (err) {
        console.error(err);
    }
}

if (commentText) {
    // Input listener to trigger filtering
    commentText.addEventListener("input", handelGetTagedCollabratorList);

    // Keydown handler for Enter logic
    commentText.addEventListener("keydown", async function (e) {
        if (e.key === "Enter") {
            const popup = document.getElementById("teg_collabrator_container");
            if (popup && !collaboratorSelected) {
                e.preventDefault();
                const firstItem = popup.querySelector("li");
                if (firstItem) {
                    firstItem.click();
                }
            }
            else if (collaboratorSelected) {
                e.preventDefault();
                await submitComment();
            }
        }
    });
}

function handleToggleSiteAction() {
    isOpenSiteActionModal = !isOpenSiteActionModal
    if (isOpenSiteActionModal) {
        document.getElementById('right_action_dropdown').style.display = "block"
    } else {
        document.getElementById('right_action_dropdown').style.display = "none"
    }
};

function handleSiteActionDelete() {
    document.getElementById('user_delete_site_modal_dialoge').style.display = "flex"
    document.getElementById('user_delete_site_modal').style.padding = '0'
    const floorMapImageContainer = document.getElementsByClassName("floor_map_image_wrapper");
    const floorImage = document.getElementById("floor_map_image");
    resetFloorMapZoomAndPan(floorMapImageContainer, floorImage);
}
const handleSiteActionShare = () => {
    isOpenSiteActionModal=false;

    const sitenoteModal = document.getElementById('sitenote_modal')
    const shareUrl = `https://user.sitepace.ai/sitenote?sitenoteId=${currentSiteNoteId}`

    document.getElementById('right_action_dropdown').style.display="none"

    const existingDialog = document.getElementById('share-dialog');
    if (existingDialog) existingDialog.remove();


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
            <button type="button" onclick="handleClickCloseShareModal()"  style="background: none; border: none; cursor: pointer; font-size: 20px; color: #666;">×</button>
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

    sitenoteModal.appendChild(shareDialog);

    setTimeout(() => {
        const handleOutsideClick = (e) => {
            const dialog = document.getElementById('share-dialog');
            if (dialog && !dialog.contains(e.target)) {
                handleClickCloseShareModal();
                document.removeEventListener('click', handleOutsideClick);
            }
        };

        document.addEventListener('click', handleOutsideClick);
    }, 0);

}

const handleClickCloseShareModal = () => {
    const existingDialog = document.getElementById('share-dialog');
    if (existingDialog){
        existingDialog.remove();
    } 
}


const handleCancelSiteNote = () => {
    document.getElementById('user_delete_site_modal_dialoge').style.display = "none"
}

const handleSiteActionCancel = () => {
    handleCloseSiteNote();
    const floorMapImageContainer = document.getElementsByClassName("floor_map_image_wrapper");
    const floorImage = document.getElementById("floor_map_image");
    resetFloorMapZoomAndPan(floorMapImageContainer, floorImage);
}

const handleDeleteSiteNote = async () => {
    const deleteButton = document.getElementById('user_delete_site_modal_submit_button');

    try {
        deleteButton.style.pointerEvents = "none"
        deleteButton.innerHTML = `<span class="spinner"></span>`;

        let url = `https://user.sitepace.ai/api/delete_sitenote/${currentSiteNoteId}/`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        document.getElementById('user_delete_site_modal_dialoge').style.display = "none";
        document.getElementById('sitenote_box').style.display = "none";
        handleCloseSiteNote();
        showAlertMessage(true, data?.message);
        getExistingSiteNoteList();


    } catch {
        console.log("error")
    }
    deleteButton.innerHTML = `Delete`;
    deleteButton.style.pointerEvents = "auto"
}