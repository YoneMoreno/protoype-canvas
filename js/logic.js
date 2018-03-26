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

    let originalImgPath = getParameterByName('originalImgPath');
    let filename = originalImgPath || "models/nrrd/columna02.nrrd"; // change your nrrd file
    let idDiv = 'original';
    OriginalImg = new InitCanvas(idDiv, filename);
    OriginalImg.init();
    console.log(OriginalImg);

    let segmentedImgPath = getParameterByName('segmentedImgPath');

    filename = segmentedImgPath || "models/nrrd/columnasegmentado02.nrrd"; // change your nrrd file
    idDiv = 'segment';
    SegmentImg = new InitCanvas(idDiv, filename);
    SegmentImg.init();





















    let canvas2D = document.getElementById('canvas2D');
    let ctx2D = canvas2D.getContext('2d');

    var img2D = new Image();
    img2D.src = OriginalImg.renderer.domElement.toDataURL("img/png");
    console.log('Our img 2d source is:::: ',img2D.src);
    img2D.addEventListener("load", function () {
        ctx2D.clearRect(0, 0, canvas2D.width, canvas2D.height);
        ctx2D.drawImage(img2D, 0, 0);
        // from here, get your pixel data
        var imgData = ctx2D.getImageData(10, 10, 1, 1);
        red = imgData.data[0];
        green = imgData.data[1];
        blue = imgData.data[2];
        alpha = imgData.data[3];
        console.log(red + " " + green + " " + blue + " " + alpha);
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let originalCanvas = document.getElementById('original');
originalCanvas.addEventListener('mousedown', onDocumentMouseDown, false);
originalCanvas.addEventListener('mouseup', onDocumentMouseUp, false);


function onDocumentMouseDown(event) {
    mousePressed = true;

    clickCount++;

    let realClickedCanvasX = event.offsetX;
    let realClickedCanvasY = event.offsetY;

    mouse.x = ( ( event.clientX - OriginalImg.renderer.domElement.offsetLeft ) / OriginalImg.renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = -( ( event.clientY - OriginalImg.renderer.domElement.offsetTop ) / OriginalImg.renderer.domElement.clientHeight ) * 2 + 1


    console.log('Mouse x position is: ', realClickedCanvasX, 'the click number was: ', clickCount);
    console.log('Mouse x position is: ', realClickedCanvasY, 'the click number was: ', clickCount);

    //console.log('Mouse x position is: ', mouse.x, 'the click number was: ', clickCount);
    //console.log('Mouse Y position is: ', mouse.y);

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

