"use strict";

var _InitCanvas = require("./InitCanvas.js");

if (!Detector.webgl) Detector.addGetWebGLMessage();

// global variables for this scripts
var OriginalImg = void 0,
    SegmentImg = void 0;

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var mousePressed = false;

init();
animate();

// initilize the page
function init() {
    var filename = "models/nrrd/columna01.nrrd"; // change your nrrd file
    var idDiv = 'original';
    OriginalImg = new _InitCanvas.InitCanvas(idDiv, filename);
    OriginalImg.init();
    console.log(OriginalImg);

    filename = "models/nrrd/columnasegmentado01.nrrd"; // change your nrrd file
    idDiv = 'segment';
    SegmentImg = new _InitCanvas.InitCanvas(idDiv, filename);
    SegmentImg.init();
}

document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);

function onDocumentMouseDown(event) {
    mousePressed = true;
    mouse.x = event.clientX / window.innerWidth * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
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