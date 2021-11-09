import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js'
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
import {OBJExporter} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/exporters/OBJExporter.js';
import * as Shape from './resources/objects.js'

// Palette size
const paletteSize = 32;

// Texture Settings
const textureSrc = './resources/texture.png'
const numberOfTexture = 6
const brickTextureSize = 16;
const brickTextureFileWidth = 112;
const brickTextureFileHeight = 64;


// Palette class
//  - Set brick state in certain location
//  - Get brick state in certain location
//  - Picking
//  - Generate geometric informations of each bricks in palette
class Palette {

    // Constructor
    constructor(options) {
        this.paletteSize = options.paletteSize;
        this.brickTextureSize = options.brickTextureSize;
        this.brickTextureFileWidth = options.brickTextureFileWidth;
        this.brickTextureFileHeight = options.brickTextureFileHeight;
        const {paletteSize} = this;
        this.cell = [];

        // Initialize brick world(palette) data
        for(let i=0; i < paletteSize; i++){
            this.cell[i] = []
            for(let j=0; j < paletteSize; j++){
                this.cell[i][j] = []
                for(let k=0; k < paletteSize; k++){
                    this.cell[i][j][k] = 0
                }
            }
        }        
    }


    // Add block to palette
    // setBrickState( x, y, z, textureIdx )
    setBrickState(x, y, z, v) {
        this.cell[x][y][z] = v
    }


    // Get texture index in certain coordinate
    getBrickState(x, y, z) {
        // return brick state what is on the palette
        if(paletteSize > x && x >= 0){
            if(paletteSize > y && y >= 0){
                if(paletteSize > z && z >= 0){
                    return this.cell[x][y][z]
                }
            }
        }
    }

    
    // Add brick with geometric data in object.js(Shape) and texture file
    generateGeometryData() {
        const {paletteSize, brickTextureSize, brickTextureFileWidth, brickTextureFileHeight} = this;
        const positions = [];
        const normals = [];
        const uvs = [];
        const indices = [];

        for (let y = 0; y < paletteSize; ++y) {
            for (let z = 0; z < paletteSize; ++z) {
                for (let x = 0; x < paletteSize; ++x) {
                    
                    // textureState == 0 : Empty
                    // textureState != 0 : Color Textures
                    const textureState = this.getBrickState(x, y, z);
                    
                    if (textureState != 0) {
                        
                        // Texture; Brick 0 is empty
                        let uvBrick = textureState - 1;
                        
                        // Set texture index
                        if(uvBrick != 0){
                            uvBrick = (uvBrick - 1) % numberOfTexture + 1
                        }

                        // Shape control
                        let shape = Shape.facesCube;
                        
                        switch(Math.floor((textureState - 2) / numberOfTexture)){
                            case 0: shape = Shape.facesCube; break;

                            case 1: shape = Shape.facesHypotenuse1; break;
                            case 2: shape = Shape.facesHypotenuse2; break;
                            case 3: shape = Shape.facesHypotenuse3; break;
                            case 4: shape = Shape.facesHypotenuse4; break;

                            case 5: shape = Shape.facesTriangle1; break;
                            case 6: shape = Shape.facesTriangle2; break;
                            case 7: shape = Shape.facesTriangle3; break;
                            case 8: shape = Shape.facesTriangle4; break;

                            case 9: shape = Shape.facesPyramid; break;
                            case 10: shape = Shape.facesColumn; break;
                        }

                        for (const {dir, corners, uvRow} of shape) {
                            
                            const ndx = positions.length / 3;
                            for (const {pos, uv} of corners) {
                                positions.push(pos[0] + x, pos[1] + y, pos[2] + z);
                                normals.push(...dir);
                                uvs.push(
                                    (uvBrick +   uv[0]) * brickTextureSize / brickTextureFileWidth,
                                1 - (uvRow + 1 - uv[1]) * brickTextureSize / brickTextureFileHeight);
                            }
                            indices.push(
                                ndx, ndx + 1, ndx + 2,
                                ndx + 2, ndx + 1, ndx + 3,
                            );

                        }
                    }
                }
            }
        }

        return {
            positions,
            normals,
            uvs,
            indices,
        };

    }


    // Picking with using ray cast 
    rayCastPicking(start, end) {
        let dx = end.x - start.x;
        let dy = end.y - start.y;
        let dz = end.z - start.z;
        const lenSq = dx * dx + dy * dy + dz * dz;
        const len = Math.sqrt(lenSq);

        dx /= len;
        dy /= len;
        dz /= len;

        let t = 0.0;
        let ix = Math.floor(start.x);
        let iy = Math.floor(start.y);
        let iz = Math.floor(start.z);

        const stepX = (dx > 0) ? 1 : -1;
        const stepY = (dy > 0) ? 1 : -1;
        const stepZ = (dz > 0) ? 1 : -1;

        const txDelta = Math.abs(1 / dx);
        const tyDelta = Math.abs(1 / dy);
        const tzDelta = Math.abs(1 / dz);

        const xDist = (stepX > 0) ? (ix + 1 - start.x) : (start.x - ix);
        const yDist = (stepY > 0) ? (iy + 1 - start.y) : (start.y - iy);
        const zDist = (stepZ > 0) ? (iz + 1 - start.z) : (start.z - iz);

        // location of nearest voxel boundary, in units of t
        let txMax = (txDelta < Infinity) ? txDelta * xDist : Infinity;
        let tyMax = (tyDelta < Infinity) ? tyDelta * yDist : Infinity;
        let tzMax = (tzDelta < Infinity) ? tzDelta * zDist : Infinity;

        let steppedIndex = -1;

        // main loop along raycast vector
        while (t <= len) {
            const voxel = this.getBrickState(ix, iy, iz);
            
            if (voxel) {
                return {
                    position: [
                    start.x + t * dx,
                    start.y + t * dy,
                    start.z + t * dz,
                    ],
                    normal: [
                    steppedIndex === 0 ? -stepX : 0,
                    steppedIndex === 1 ? -stepY : 0,
                    steppedIndex === 2 ? -stepZ : 0,
                    ],
                    voxel,
                };
            }

            // advance t to next nearest voxel boundary
            if (txMax < tyMax) {
                if (txMax < tzMax) {
                    ix += stepX;
                    t = txMax;
                    txMax += txDelta;
                    steppedIndex = 0;
                } else {
                    iz += stepZ;
                    t = tzMax;
                    tzMax += tzDelta;
                    steppedIndex = 2;
                }
            } else {
                if (tyMax < tzMax) {
                    iy += stepY;
                    t = tyMax;
                    tyMax += tyDelta;
                    steppedIndex = 1;
                } else {
                    iz += stepZ;
                    t = tzMax;
                    tzMax += tzDelta;
                    steppedIndex = 2;
                }
            }
        }
        return null;
    }

}





//////////////////////////////////////////////////////
//                                                  //
//              Update Scene's Geometry             //
//      (Scene update with using Palette class)     //
//                                                  //
//////////////////////////////////////////////////////

let mesh;

function updateGeometry(x, y, z) {
    const cellX = Math.floor(x / paletteSize);
    const cellY = Math.floor(y / paletteSize);
    const cellZ = Math.floor(z / paletteSize);
    
    const geometry = mesh ? mesh.geometry : new THREE.BufferGeometry();

    const {positions, normals, uvs, indices} = palette.generateGeometryData();


    const positionNumComponents = 3;
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
    const normalNumComponents = 3;
    geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
    const uvNumComponents = 2;
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));
    geometry.setIndex(indices);
    geometry.computeBoundingSphere();


    if (!mesh) {
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        mesh.position.set(cellX * paletteSize, cellY * paletteSize, cellZ * paletteSize);
    }
}





//////////////////////////////////////////////////////
//                                                  //
//                      Main Code                   //
//                                                  //
//////////////////////////////////////////////////////
let loader
let texture
let canvas
let renderer
let palette
let material
let controls
let scene
let camera

let selectedColor = 1;
let selectedShape = 1;
let currentBrickShape = 1;

let mousedownCoordinate = 0

let deleteMode = false;


// Set functions to export globally(globalThis) 
// for Flutter framework
let control_create = () => {
    deleteMode = false;
    changeBrick()
}

let control_delete = () => {
    deleteMode = true;
    currentBrickShape = 0;
}

let control_selectColor = (index) => {
    selectedColor = index
    changeBrick()
}

let control_selectShape = (index) => {
    selectedShape = index
    changeBrick()
}

// Export obj file
let control_getObjCode = () => {

    removeBottomPlate()
    updateGeometry(1, 1, 1);
    
    let objCode = objExportFromScene(scene)

    createBottomPlate()
    updateGeometry(1, 1, 1);

    return objCode
}

// Top View
let camera_topView = () => {
    // -0.01 for set camera correctly
    camera.position.set(paletteSize/2, paletteSize/2, paletteSize/2-0.001);
    controls.target.set(paletteSize/2, 0, paletteSize/2);
    requestRender();
}

// Front View
let camera_frontView = () => {
    camera.position.set(paletteSize/2, 0, -paletteSize/4);
    controls.target.set(paletteSize/2, 0, 0);
    requestRender();
}

// Right Side View
let camera_rightSideView = () => {
    camera.position.set(-paletteSize/4, 0, paletteSize/2);
    controls.target.set(0, 0, paletteSize/2);
    requestRender();
}

// Perspective View
let camera_perspectiveView = () => {
    // Camera Position
    camera.position.set(paletteSize*0.4, 6.0 , paletteSize*0.4);
    // Camera LookAt
    controls.target.set(paletteSize*0.5, 0, paletteSize*0.5);
    requestRender();
}





// Initialize when Web app was started
window.onload = () => {

    // Initialize variables
    canvas = document.getElementById('c');
    renderer = new THREE.WebGLRenderer({canvas});


    // Set global function variables for Flutter
    globalThis.global_control_create = control_create
    globalThis.global_control_delete = control_delete
    globalThis.global_control_selectColor = control_selectColor
    globalThis.global_control_selectShape = control_selectShape
    globalThis.global_control_getObjCode = control_getObjCode

    globalThis.global_camera_topView = camera_topView
    globalThis.global_camera_frontView = camera_frontView
    globalThis.global_camera_rightSideView = camera_rightSideView
    globalThis.global_camera_perspectiveView = camera_perspectiveView
    

    // Camera setting
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 100;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    controls = new OrbitControls(camera, canvas);
    controls.update();
    camera_perspectiveView()


    // Scene setting
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xF3FBFF );


    // Initialize block shape and color
    changeBrick()


    // Load texture
    loader = new THREE.TextureLoader();
    texture = loader.load(textureSrc, render);
    
    // Add texture to blocks
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;

    material = new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
        transparent: true,
    });
    
    
    // Light
    addLight(0, 10,  -30, 0.9);
    addLight(-30, 10,  0, 0.8);

    addLight(30, 10, 0, 0.7);
    addLight(0, 10,  30, 0.6);
    


    
    // Add listener for mouse events (Place / Remove bricks)
    canvas.addEventListener('pointerdown', (event) => {
        event.preventDefault();

        // Right click / delete mode to delete
        if (event.button == 2 || deleteMode)
            currentBrickShape = 0;
        // Left click to create
        else if(event.button == 0)
            changeBrick()
        
        // Check mouse was moved between mousedown and mouseup event
        // Record mouse position
        mousedownCoordinate = event.clientX + event.clientY
        mousedownCoordinate = mousedownCoordinate * mousedownCoordinate
    });

    window.addEventListener('pointerup', (event) => {
        // Check mouse was moved between mousedown and mouseup event
        let mouseupCoordinate = event.clientX + event.clientY
        mouseupCoordinate = mouseupCoordinate * mouseupCoordinate
        // Tolerate error to ignore a litte bit moved
        const error = 2000
        if(mouseupCoordinate + error >= mousedownCoordinate && mousedownCoordinate >= mouseupCoordinate - error)
            placeBrick(event);
    });

    // Prevent scrolling
    canvas.addEventListener('touchstart', (event) => {
        event.preventDefault();
    }, {passive: false});

    // render if window or control has been mutated
    controls.addEventListener('change', requestRender);
    window.addEventListener('resize', requestRender);




    // Create Palette
    palette = new Palette({
        paletteSize,
        brickTextureSize,
        brickTextureFileWidth,
        brickTextureFileHeight,
    });
    
    // Create(add) pannel to scene
    createBottomPlate()
    updateGeometry(1, 1, 1);  // 0,0,0 will generate

    render();

}





//////////////////////////////////////////////////////
//                                                  //
//                   Brick Controls                 //
//                                                  //
//////////////////////////////////////////////////////

// Place brick with ray cast picking
function placeBrick(event) {
    
    const rect = canvas.getBoundingClientRect();
    const pos = {
        x: (event.clientX - rect.left) * canvas.width  / rect.width,
        y: (event.clientY - rect.top ) * canvas.height / rect.height,
    }

    const x = (pos.x / canvas.width ) *  2 - 1;
    const y = (pos.y / canvas.height) * -2 + 1;  // flip Y

    const start = new THREE.Vector3();
    const end = new THREE.Vector3();
    start.setFromMatrixPosition(camera.matrixWorld);
    end.set(x, y, 1).unproject(camera);

    const intersection = palette.rayCastPicking(start, end);
    if (intersection) {

        const pos = intersection.position.map((v, ndx) => {
            return v + intersection.normal[ndx] * (currentBrickShape > 0 ? 0.5 : -0.5);
        });

        // Prevent deleting bottom of palette
        if(pos[1] > 1){
            palette.setBrickState(Math.floor(pos[0]), Math.floor(pos[1]), Math.floor(pos[2]), currentBrickShape);
            updateGeometry(Math.floor(pos[0]), Math.floor(pos[1]), Math.floor(pos[2]));
            requestRender();
        }
    }
}


// Change block by selectecd value (selectedColor, selectedShape)
function changeBrick() {
    selectedColor = Number.parseInt(selectedColor)
    selectedShape = Number.parseInt(selectedShape)

    currentBrickShape = selectedColor + (selectedShape - 1) * numberOfTexture
    currentBrickShape += 1
}


// Create(add) pannel to scene
function createBottomPlate() {
    for(let i = 0; i < paletteSize; i++)
        for(let j = 0; j < paletteSize; j++)
            palette.setBrickState(i, 0, j, 1);
}


// Delete(remove) pannel to scene
function removeBottomPlate() {
    for(let i = 0; i < paletteSize; i++)
        for(let j = 0; j < paletteSize; j++)
            palette.setBrickState(i, 0, j, 0);
}





//////////////////////////////////////////////////////
//                                                  //
//                    Light Control                 //
//                                                  //
//////////////////////////////////////////////////////

// Lighting
function addLight(x, y, z, intensity) {
    const color = 0xFFFFFF;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    scene.add(light);
}





//////////////////////////////////////////////////////
//                                                  //
//                   Obj Exporter                   //
//                                                  //
//////////////////////////////////////////////////////
function objExportFromScene(targetScene) {
    let objCode = (new OBJExporter()).parse(targetScene);
    return objCode
}





//////////////////////////////////////////////////////
//                                                  //
//                     Renderer                     //
//                                                  //
//////////////////////////////////////////////////////

// Initial render function
function render() {

    if (isDisplaySizeChanged(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    controls.update();
    
    if(camera.position.y<=1.1)
        camera.position.y = 1.1;
    
    renderer.render(scene, camera);
}


// React window resize event
function isDisplaySizeChanged(renderer) {

    const canvas = renderer.domElement;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const isResized = canvas.width !== width || canvas.height !== height;
    
    if (isResized) {
        renderer.setSize(width, height, false);
    }
    
    return isResized;
}


// Render with animation frame
function requestRender() {
    requestAnimationFrame(render);
}

