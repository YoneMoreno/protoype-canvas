'use strict';

// this class handles the load and the canva for a nrrd
// Using programming based on prototype: https://javascript.info/class
// This class should be improved:
//   - Canvas Width and height

InitCanvas = function InitCanvas(IdDiv, Filename) {

        this.IdDiv = IdDiv;
        this.Filename = Filename;
};

InitCanvas.prototype = {

        constructor: InitCanvas,

        init: function init() {

                this.container = document.getElementById(this.IdDiv);

                // this should be changed.
                debugger;
                this.container.innerHeight = 600;
                this.container.innerWidth = 800;

                //These statenments should be changed to improve the image position
                this.camera = new THREE.PerspectiveCamera(60, this.container.innerWidth / this.container.innerHeight, 0.01, 1e10);
                this.camera.position.z = 300;

                var scene = new THREE.Scene();
                scene.add(this.camera);

                // light

                var dirLight = new THREE.DirectionalLight(0xffffff);
                dirLight.position.set(200, 200, 1000).normalize();

                this.camera.add(dirLight);
                this.camera.add(dirLight.target);

                // read file

                var loader = new THREE.NRRDLoader();
                loader.load(this.Filename, function (volume) {

                        //z plane
                        var sliceZ = volume.extractSlice('z', Math.floor(volume.RASDimensions[2] / 4));

                        debugger;
                        this.container.innerWidth = sliceZ.iLength;
                        this.container.innerHeight = sliceZ.jLength;

                        scene.add(sliceZ.mesh);
                }.bind(this));

                this.scene = scene;

                // renderer

                this.renderer = new THREE.WebGLRenderer({ alpha: true });
                this.renderer.setPixelRatio(this.container.devicePixelRatio);
                debugger;
                this.renderer.setSize(this.container.innerWidth, this.container.innerHeight);

                // add canvas in container
                this.container.appendChild(this.renderer.domElement);
        },

        animate: function animate() {

                this.renderer.render(this.scene, this.camera);
        }

};
//# sourceMappingURL=InitCanvas.js.map