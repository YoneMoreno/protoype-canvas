
// this class handles the load and the canva for a nrrd
// Using programming based on prototype: https://javascript.info/class
// This class should be improved:
//   - Canvas Width and height

InitCanvas = function ( IdDiv, Filename ) {
    
    
    this.IdDiv = IdDiv;
    this.Filename = Filename
}

InitCanvas.prototype = {

    constructor: InitCanvas,
    
    init: function() {

        this.container = document.getElementById( this.IdDiv );
        
        // this should be changed. 
        this.container.innerHeight = 600; 
        this.container.innerWidth = 800;

        //These statenments should be changed to improve the image position
        this.camera = new THREE.PerspectiveCamera( 60, this.container.innerWidth / this.container.innerHeight, 0.01, 1e10 );
        this.camera.position.z = 300;

        let scene = new THREE.Scene();
        scene.add( this.camera );

        // light

        let dirLight = new THREE.DirectionalLight( 0xffffff );
        dirLight.position.set( 200, 200, 1000 ).normalize();

        this.camera.add( dirLight );
        this.camera.add( dirLight.target );


        // read file
    
        let loader = new THREE.NRRDLoader();
        loader.load( this.Filename , function ( volume ) {
    
            //z plane
            let sliceZ = volume.extractSlice('z',Math.floor(volume.RASDimensions[2]/4));
            
            scene.add( sliceZ.mesh );
        } );

        
        this.scene = scene;

        // renderer

        this.renderer = new THREE.WebGLRenderer( { alpha: true } );
        this.renderer.setPixelRatio( this.container.devicePixelRatio );
        this.renderer.setSize( this.container.innerWidth, this.container.innerHeight );
        
        // add canvas in container
        this.container.appendChild( this.renderer.domElement );

    },

    animate: function () {
        
        this.renderer.render( this.scene, this.camera );
    }

}



