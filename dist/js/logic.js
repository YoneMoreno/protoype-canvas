'use strict';

if (!Detector.webgl) Detector.addGetWebGLMessage();

// global variables for this scripts
var OriginalImg = void 0,
    SegmentImg = void 0,
    myFileReader = void 0;

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var mousePressed = false;
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
originalCanvas.addEventListener('mouseup', onDocumentMouseUp, false);

function onDocumentMouseDown(event) {
    mousePressed = true;

    clickCount++;

    var realClickedCanvasX = event.offsetX;
    var realClickedCanvasY = event.offsetY;

    var OriginalImgRenderer = OriginalImg.renderer;
    mouse.x = (event.clientX - OriginalImgRenderer.domElement.offsetLeft) / OriginalImgRenderer.domElement.clientWidth * 2 - 1;
    mouse.y = -((event.clientY - OriginalImgRenderer.domElement.offsetTop) / OriginalImgRenderer.domElement.clientHeight) * 2 + 1;

    console.log('Mouse x position is: ', realClickedCanvasX, 'the click number was: ', clickCount);
    console.log('Mouse x position is: ', realClickedCanvasY, 'the click number was: ', clickCount);

    //console.log('Mouse x position is: ', mouse.x, 'the click number was: ', clickCount);
    //console.log('Mouse Y position is: ', mouse.y);

    var target = OriginalImgRenderer.getRenderTarget();
    console.log('Our target which should be a WebGLRenderTarget is: ');
    console.log(target);

    var outputBuffer = new Uint8Array(OriginalImgRenderer.width * OriginalImgRenderer.height * 4);

    OriginalImgRenderer.readRenderTargetPixels(target, 0, 0, OriginalImgRenderer.width, OriginalImgRenderer.height, outputBuffer);

    var pixelIndex = (realClickedCanvasX * OriginalImgRenderer.width + realClickedCanvasY) * 4;

    var color = {
        r: outputBuffer[pixelIndex + 0],
        g: outputBuffer[pixelIndex + 1],
        b: outputBuffer[pixelIndex + 2],
        a: outputBuffer[pixelIndex + 3]
    };

    console.log('Color of clicked pixel is: ');
    console.log(color);

    raycaster.setFromCamera(mouse.clone(), OriginalImg.camera);
    var objects = raycaster.intersectObjects(OriginalImg.scene.children);

    console.log(objects);
}

function onDocumentMouseUp(event) {
    mousePressed = false;
}

function animate() {

    requestAnimationFrame(animate);
    OriginalImg.animate();
    SegmentImg.animate();
}
//# sourceMappingURL=logic.js.map