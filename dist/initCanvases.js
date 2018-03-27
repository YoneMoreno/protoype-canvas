'use strict';

var initCanvasOfOriginalImg = function initCanvasOfOriginalImg() {
    var originalImgPath = getParameterByName('originalImgPath');
    var filename = originalImgPath || "models/nrrd/columna02.nrrd"; // change your nrrd file
    var idDiv = 'original';
    OriginalImg = new InitCanvas(idDiv, filename);
    OriginalImg.init();
    console.log(OriginalImg);
};

var initCanvasOfSegmentedImg = function initCanvasOfSegmentedImg() {
    var segmentedImgPath = getParameterByName('segmentedImgPath');

    var filename = segmentedImgPath || "models/nrrd/columnasegmentado02.nrrd"; // change your nrrd file
    var idDiv = 'segment';
    SegmentImg = new InitCanvas(idDiv, filename);
    SegmentImg.init();
};
//# sourceMappingURL=initCanvases.js.map