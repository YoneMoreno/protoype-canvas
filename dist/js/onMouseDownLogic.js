'use strict';

var projectRayAndGetIntersectedObject = function projectRayAndGetIntersectedObject() {
    raycaster.setFromCamera(mouse.clone(), OriginalImg.camera);
    var objects = raycaster.intersectObjects(OriginalImg.scene.children);

    console.log(objects);
};

var calculateClickedPointWindowCoordinates = function calculateClickedPointWindowCoordinates(event) {
    var realClickedCanvasX = event.offsetX;
    var realClickedCanvasY = event.offsetY;
    return { realClickedCanvasX: realClickedCanvasX, realClickedCanvasY: realClickedCanvasY };
};

var calculateNormalizedClickedPointCoordinates = function calculateNormalizedClickedPointCoordinates(event) {
    var OriginalImgRenderer = OriginalImg.renderer;
    mouse.x = (event.clientX - OriginalImgRenderer.domElement.offsetLeft) / OriginalImgRenderer.domElement.clientWidth * 2 - 1;
    mouse.y = -((event.clientY - OriginalImgRenderer.domElement.offsetTop) / OriginalImgRenderer.domElement.clientHeight) * 2 + 1;
    return OriginalImgRenderer;
};

var calculateClickedPointColor = function calculateClickedPointColor(OriginalImgRenderer, realClickedCanvasX, realClickedCanvasY) {
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
};
//# sourceMappingURL=onMouseDownLogic.js.map