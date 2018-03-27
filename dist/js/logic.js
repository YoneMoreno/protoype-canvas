'use strict';

if (!Detector.webgl) Detector.addGetWebGLMessage();

// global variables for this scripts
var OriginalImg = void 0,
    SegmentImg = void 0;

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var clickCount = 0;
var allText;

init();
animate();

// initilize the page
function init() {

    readTextFile("columna01-es-latin1.txt");
    initCanvasOfOriginalImg();
    initCanvasOfSegmentedImg();
}

var originalCanvas = document.getElementById('original');
originalCanvas.addEventListener('mousedown', onDocumentMouseDown, false);

function onDocumentMouseDown(event) {

    clickCount++;

    var _calculateClickedPoin = calculateClickedPointWindowCoordinates(event),
        realClickedCanvasX = _calculateClickedPoin.realClickedCanvasX,
        realClickedCanvasY = _calculateClickedPoin.realClickedCanvasY;

    var OriginalImgRenderer = calculateNormalizedClickedPointCoordinates(event);

    console.log('Mouse x position is: ', realClickedCanvasX, 'the click number was: ', clickCount);
    console.log('Mouse x position is: ', realClickedCanvasY, 'the click number was: ', clickCount);

    //console.log('Mouse x position is: ', mouse.x, 'the click number was: ', clickCount);
    //console.log('Mouse Y position is: ', mouse.y);

    calculateClickedPointColor(OriginalImgRenderer, realClickedCanvasX, realClickedCanvasY);
    projectRayAndGetIntersectedObject();
}

function animate() {

    requestAnimationFrame(animate);
    OriginalImg.animate();
    SegmentImg.animate();
}
//# sourceMappingURL=logic.js.map