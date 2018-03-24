if (!Detector.webgl) Detector.addGetWebGLMessage();

// global variables for this scripts
let OriginalImg,
    SegmentImg;

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var mousePressed = false;
var clickCount = 0;
var allText;


init();
animate();
readTextFile("columna01-es-latin1.txt");


// initilize the page
function init() {


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

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
                console.log('The complete text is', allText);
                let lineArr = intoArray(allText);
                let firstLineWords = intoWords(lineArr[0]);
                let secondLineWords = intoWords(lineArr[1]);

                console.log('Our  first line is: ', lineArr[0]);

                let atlas = {};
                for (let i = 0; i < firstLineWords.length; i++) {
                    console.log(`Our ${i} word in the first line is : ${firstLineWords[i]}`);
                    console.log(`Our ${i} word in the SECOND line is : ${secondLineWords[i]}`);
                    atlas[firstLineWords[i]] = secondLineWords[i];
                }
                console.log('The atlas is: ', atlas);
                let atlasJson = JSON.stringify(atlas);
                console.log('Atlas as json is: ', atlasJson);

                download(atlasJson, 'atlasJson.txt', 'text/plain');
            }
        }
    };
    rawFile.send(null);
}

// Function to download data to a file
function download(text, name, type) {
    var a = document.getElementById("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
}


function intoArray(lines) {
    // splitting all text data into array "\n" is splitting data from each new line
    //and saving each new line as each element*

    var lineArr = lines.split('\n');

    //just to check if it works output lineArr[index] as below


    return lineArr;


}

function intoWords(line) {


    var wordsArr = line.split('" "');


    return wordsArr;
}