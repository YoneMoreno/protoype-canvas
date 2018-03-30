import {InitCanvas} from "./InitCanvas.js";

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// global variables for this scripts
let OriginalImg, 
    SegmentImg;

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var mousePressed = false;



init();
animate();

  
// initilize the page
function init ()
{
    let originalImgPath = getParameterByName('originalImgPath');
    let filename = originalImgPath || "models/nrrd/columna02.nrrd"; // change your nrrd file // change your nrrd file
    let idDiv = 'original';
    OriginalImg = new InitCanvas(idDiv, filename );
    OriginalImg.init();
    console.log(OriginalImg);

    let segmentedImgPath = getParameterByName('segmentedImgPath');
     filename = segmentedImgPath || "models/nrrd/columnasegmentado02.nrrd"; // change your nrrd file
    idDiv = 'segment';
    SegmentImg = new InitCanvas(idDiv, filename );
    SegmentImg.init(); 
}

document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener( 'mouseup', onDocumentMouseUp, false );

function onDocumentMouseDown( event ) {
    mousePressed = true;
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse.clone(), OriginalImg.camera );
    var objects = raycaster.intersectObjects(OriginalImg.scene.children);
    console.log(objects);
}
function onDocumentMouseUp( event ) { mousePressed = false}





function animate() {


    requestAnimationFrame( animate );
    OriginalImg.animate();
    SegmentImg.animate();


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