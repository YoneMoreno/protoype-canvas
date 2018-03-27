if (!Detector.webgl) Detector.addGetWebGLMessage();

// global variables for this scripts
let OriginalImg,
    SegmentImg;

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



let originalCanvas = document.getElementById('original');
originalCanvas.addEventListener('mousedown', onDocumentMouseDown, false);




function onDocumentMouseDown(event) {

    clickCount++;

    let {realClickedCanvasX, realClickedCanvasY} = calculateClickedPointWindowCoordinates(event);
    let OriginalImgRenderer = calculateNormalizedClickedPointCoordinates(event);


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

