if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// global variables for this scripts
let OriginalImg, 
    SegmentImg;


init();
animate();

  
// initilize the page
function init ()
{
    let filename = "models/nrrd/columna01.nrrd"; // change your nrrd file
    let idDiv = 'original';
    OriginalImg = new InitCanvas(idDiv, filename );
    OriginalImg.init(); 
    
    filename = "models/nrrd/columnasegmentado01.nrrd"; // change your nrrd file
    idDiv = 'segment';
    SegmentImg = new InitCanvas(idDiv, filename );
    SegmentImg.init(); 
}

function animate() {
    requestAnimationFrame( animate );
    OriginalImg.animate();
    SegmentImg.animate();


}   