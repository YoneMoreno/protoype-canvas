if (!Detector.webgl) Detector.addGetWebGLMessage();

// global variables for this scripts
let OriginalImg,
    SegmentImg,
    myFileReader;

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


    let filename = "models/nrrd/columna01.nrrd"; // change your nrrd file
    let idDiv = 'original';
    OriginalImg = new InitCanvas(idDiv, filename);
    OriginalImg.init();
    console.log(OriginalImg);

    filename = "models/nrrd/columnasegmentado01.nrrd"; // change your nrrd file
    idDiv = 'segment';
    SegmentImg = new InitCanvas(idDiv, filename);
    SegmentImg.init();
}

let originalCanvas = document.getElementById('original');
originalCanvas.addEventListener('mousedown', onDocumentMouseDown, false);
originalCanvas.addEventListener('mouseup', onDocumentMouseUp, false);


function onDocumentMouseDown(event) {
    mousePressed = true;

    clickCount++;

    mouse.x = ( ( event.clientX - OriginalImg.renderer.domElement.offsetLeft ) / OriginalImg.renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = -( ( event.clientY - OriginalImg.renderer.domElement.offsetTop ) / OriginalImg.renderer.domElement.clientHeight ) * 2 + 1

    console.log('Mouse x position is: ', mouse.x, 'the click number was: ', clickCount);
    console.log('Mouse Y position is: ', mouse.y);

    raycaster.setFromCamera(mouse.clone(), OriginalImg.camera);
    var objects = raycaster.intersectObjects(OriginalImg.scene.children);

    console.log(objects);
}

function onDocumentMouseUp(event) {
    mousePressed = false
}


function animate() {


    requestAnimationFrame(animate);
    OriginalImg.animate();
    SegmentImg.animate();


}

