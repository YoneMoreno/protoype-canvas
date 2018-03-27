let initCanvasOfOriginalImg = function () {
    let originalImgPath = getParameterByName('originalImgPath');
    let filename = originalImgPath || "models/nrrd/columna02.nrrd"; // change your nrrd file
    let idDiv = 'original';
    OriginalImg = new InitCanvas(idDiv, filename);
    OriginalImg.init();
    console.log(OriginalImg);
};

let initCanvasOfSegmentedImg = function () {
    let segmentedImgPath = getParameterByName('segmentedImgPath');

    let filename = segmentedImgPath || "models/nrrd/columnasegmentado02.nrrd"; // change your nrrd file
    let idDiv = 'segment';
    SegmentImg = new InitCanvas(idDiv, filename);
    SegmentImg.init();
};