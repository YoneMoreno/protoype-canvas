let projectRayAndGetIntersectedObject = function () {
    raycaster.setFromCamera(mouse.clone(), OriginalImg.camera);
    var objects = raycaster.intersectObjects(OriginalImg.scene.children);

    console.log(objects);
};

let calculateClickedPointWindowCoordinates = function (event) {
    let realClickedCanvasX = event.offsetX;
    let realClickedCanvasY = event.offsetY;
    return {realClickedCanvasX, realClickedCanvasY};
};

let calculateNormalizedClickedPointCoordinates = function (event) {
    let OriginalImgRenderer = OriginalImg.renderer;
    mouse.x = ( ( event.clientX - OriginalImgRenderer.domElement.offsetLeft ) / OriginalImgRenderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = -( ( event.clientY - OriginalImgRenderer.domElement.offsetTop ) / OriginalImgRenderer.domElement.clientHeight ) * 2 + 1
    return OriginalImgRenderer;
};

let calculateClickedPointColor = function (OriginalImgRenderer, realClickedCanvasX, realClickedCanvasY) {
    var target = OriginalImgRenderer.getRenderTarget();
    console.log('Our target which should be a WebGLRenderTarget is: ');
    console.log(target);

    var outputBuffer = new Uint8Array(OriginalImgRenderer.width * OriginalImgRenderer.height * 4);

    OriginalImgRenderer.readRenderTargetPixels(target, 0, 0, OriginalImgRenderer.width, OriginalImgRenderer.height, outputBuffer);

    var pixelIndex = ((realClickedCanvasX * OriginalImgRenderer.width) + realClickedCanvasY) * 4;

    var color = {
        r: outputBuffer[pixelIndex + 0],
        g: outputBuffer[pixelIndex + 1],
        b: outputBuffer[pixelIndex + 2],
        a: outputBuffer[pixelIndex + 3]
    };

    console.log('Color of clicked pixel is: ');
    console.log(color);
};