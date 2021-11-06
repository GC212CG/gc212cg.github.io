import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js'
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
import {OBJExporter} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/exporters/OBJExporter.js';
import * as Shape from './resources/objects.js'
let textureSrc = './resources/texture.png'

class World {
    constructor(options) {
        this.cellSize = options.cellSize;
        this.tileSize = options.tileSize;
        this.tileTextureWidth = options.tileTextureWidth;
        this.tileTextureHeight = options.tileTextureHeight;
        const {cellSize} = this;
        this.cellSliceSize = cellSize * cellSize;
        this.cells = {};
    }


    computeVoxelOffset(x, y, z) {
        const {cellSize, cellSliceSize} = this;
        const voxelX = THREE.MathUtils.euclideanModulo(x, cellSize) | 0;
        const voxelY = THREE.MathUtils.euclideanModulo(y, cellSize) | 0;
        const voxelZ = THREE.MathUtils.euclideanModulo(z, cellSize) | 0;
        return voxelY * cellSliceSize +
                voxelZ * cellSize +
                voxelX;
    }


    computeCellId(x, y, z) {
        const {cellSize} = this;
        const cellX = Math.floor(x / cellSize);
        const cellY = Math.floor(y / cellSize);
        const cellZ = Math.floor(z / cellSize);
        return `${cellX},${cellY},${cellZ}`;
    }






    // Add block to world
    // x, y, z, texture
    setVoxel(x, y, z, v, addCell = true) {

        let cell = this.getCellForVoxel(x, y, z);

        if (!cell) {
            if (!addCell) {
                return;
            }
            cell = this.addCellForVoxel(x, y, z);
        }
        const voxelOffset = this.computeVoxelOffset(x, y, z);
        cell[voxelOffset] = v;

    }



    addCellForVoxel(x, y, z) {
        const cellId = this.computeCellId(x, y, z);
        let cell = this.cells[cellId];
        if (!cell) {
            const {cellSize} = this;
            cell = new Uint8Array(cellSize * cellSize * cellSize);
            this.cells[cellId] = cell;
        }
        return cell;
    }


    getCellForVoxel(x, y, z) {
        return this.cells[this.computeCellId(x, y, z)];
    }



    getVoxel(x, y, z) {
        const cell = this.getCellForVoxel(x, y, z);
        if (!cell) {
            return 0;
        }
        const voxelOffset = this.computeVoxelOffset(x, y, z);
        return cell[voxelOffset];
    }



    generateGeometryDataForCell(cellX, cellY, cellZ) {
        const {cellSize, tileSize, tileTextureWidth, tileTextureHeight} = this;
        const positions = [];
        const normals = [];
        const uvs = [];
        const indices = [];
        const startX = cellX * cellSize;
        const startY = cellY * cellSize;
        const startZ = cellZ * cellSize;

        for (let y = 0; y < cellSize; ++y) {
            const voxelY = startY + y;
            for (let z = 0; z < cellSize; ++z) {
                const voxelZ = startZ + z;
                for (let x = 0; x < cellSize; ++x) {
                    const voxelX = startX + x;
                    const voxel = this.getVoxel(voxelX, voxelY, voxelZ);
                    if (voxel) {
                        // voxel 0 is sky (empty) so for UVs we start at 0
                        let uvVoxel = voxel - 1;
                        
                        // 0: bottom block
                        if(uvVoxel != 0){
                            uvVoxel = (uvVoxel - 1) % 5 + 1
                        }


                        
                        
                        // Shape control
                        let shape = Shape.facesCube;
                        
                        switch(Math.floor((voxel - 2) / 5)){
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
                                    (uvVoxel +   uv[0]) * tileSize / tileTextureWidth,
                                1 - (uvRow + 1 - uv[1]) * tileSize / tileTextureHeight);
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




    // from
    // http://www.cse.chalmers.se/edu/year/2010/course/TDA361/grid.pdf
    intersectRay(start, end) {
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
            const voxel = this.getVoxel(ix, iy, iz);
            
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






const cellSize = 64;
const tileSize = 16;
const tileTextureWidth = 256;
const tileTextureHeight = 64;


let loader
let texture

let world
let material

let per_view = 1;

let selectedColor = 1;
let selectedShape = 1;
let currentVoxel = 1;

let canvas
let renderer

let controls
let scene
let camera

const cellIdToMesh = {};


let control_create = () => {
    changeBlock()
}

let control_delete = () => {
    currentVoxel = 0;
}

let control_selectColor = (index) => {
    selectedColor = index
    changeBlock()
}

let control_selectShape = (index) => {
    selectedShape = index
    changeBlock()
}

let control_getObjCode = () => {
    deletePannel()
    updateVoxelGeometry(1, 1, 1);
    
    let exporter = new OBJExporter();
    let objCode = exporter.parse(scene);

    addPannel()
    updateVoxelGeometry(1, 1, 1);

    return objCode
}

// Top View
let camera_topView = () => {
    // -0.01 for set camera correctly
    camera.position.set(cellSize/2, cellSize/2, cellSize/2-0.001);
    controls.target.set(cellSize/2, 0, cellSize/2);
    requestRenderIfNotRequested();
}

// Front View
let camera_frontView = () => {
    camera.position.set(cellSize/2, 0, -cellSize/4);
    controls.target.set(cellSize/2, 0, 0);
    requestRenderIfNotRequested();
}


// Right Side View
let camera_rightSideView = () => {
    camera.position.set(-cellSize/4, 0, cellSize/2);
    controls.target.set(0, 0, cellSize/2);
    requestRenderIfNotRequested();
}

let camera_perspectiveView = () => {
    // Camera Position
    camera.position.set(cellSize*0.45, 4.8 , cellSize*0.45);
    // Camera LookAt
    controls.target.set(cellSize*0.5, 0, cellSize*0.5);
    requestRenderIfNotRequested();
}



window.onload = () => {

    // Initialize variables
    canvas = document.querySelector('#c');
    renderer = new THREE.WebGLRenderer({canvas});

    
    globalThis.global_control_create = control_create
    globalThis.global_control_delete = control_delete
    globalThis.global_control_selectColor = control_selectColor
    globalThis.global_control_selectShape = control_selectShape
    globalThis.global_control_getObjCode = control_getObjCode

    globalThis.global_camera_topView = camera_topView
    globalThis.global_camera_frontView = camera_frontView
    globalThis.global_camera_rightSideView = camera_rightSideView
    globalThis.global_camera_perspectiveView = camera_perspectiveView
    

    let fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;

    // Camera setting
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    controls = new OrbitControls(camera, canvas);
    controls.update();
    camera_perspectiveView()

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xF3FBFF );

    changeBlock()

    canvas.addEventListener('pointerdown', (event) => {
        event.preventDefault();

        // Left click to create
        if(event.which == 1)
            control_create()
        // Right click to delete
        else
            control_delete()
        
        recordStartPosition(event);
        window.addEventListener('pointermove', recordMovement);
        window.addEventListener('pointerup', placeVoxelIfNoMovement);
    }, {passive: false});

    canvas.addEventListener('touchstart', (event) => {
        // prevent scrolling
        event.preventDefault();
    }, {passive: false});

    controls.addEventListener('change', requestRenderIfNotRequested);
    window.addEventListener('resize', requestRenderIfNotRequested);


    // =============================================================================
    // =============================================================================
    // =============================================================================

    loader = new THREE.TextureLoader();
    texture = loader.load(textureSrc, render);
    
    
    // Create world
    world = new World({
        cellSize,
        tileSize,
        tileTextureWidth,
        tileTextureHeight,
    });

    // Add texture to blocks
    material = new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
        transparent: true,
    });
    
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    
    // Light
    addLight(0, 10,  -30, 0.9);
    addLight(-30, 10,  0, 0.8);

    addLight(30, 10, 0, 0.7);
    addLight(0, 10,  30, 0.6);
    
    // Create(add) pannel to scene
    addPannel()
    updateVoxelGeometry(1, 1, 1);  // 0,0,0 will generate

    renderRequested = false;
    render();

}




// Change block by selectecd value (selectedColor, selectedShape)
function changeBlock() {
    selectedColor = Number.parseInt(selectedColor)
    selectedShape = Number.parseInt(selectedShape)

    currentVoxel = selectedColor + (selectedShape - 1) * 5
    currentVoxel += 1
}


// Create(add) pannel to scene
function addPannel() {
    for(let i = 0; i < cellSize; i++)
        for(let j = 0; j < cellSize; j++)
            world.setVoxel(i, 0, j, 1);
}

// Delete(remove) pannel to scene
function deletePannel() {
    for(let i = 0; i < cellSize; i++)
        for(let j = 0; j < cellSize; j++)
            world.setVoxel(i, 0, j, 0);
}





const mouse = {
    x: 0,
    y: 0,
};

function recordStartPosition(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.moveX = 0;
    mouse.moveY = 0;
}

function recordMovement(event) {
    mouse.moveX += Math.abs(mouse.x - event.clientX);
    mouse.moveY += Math.abs(mouse.y - event.clientY);
}





function placeVoxelIfNoMovement(event) {
    if (mouse.moveX < 5 && mouse.moveY < 5) {
        placeVoxel(event);
    }
    window.removeEventListener('pointermove', recordMovement);
    window.removeEventListener('pointerup', placeVoxelIfNoMovement);
}





function placeVoxel(event) {
    const pos = getCanvasRelativePosition(event);
    const x = (pos.x / canvas.width ) *  2 - 1;
    const y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y

    const start = new THREE.Vector3();
    const end = new THREE.Vector3();
    start.setFromMatrixPosition(camera.matrixWorld);
    end.set(x, y, 1).unproject(camera);

    const intersection = world.intersectRay(start, end);
    if (intersection) {

        const voxelId = event.shiftKey ? 0 : currentVoxel;
        // the intersection point is on the face. That means
        // the math imprecision could put us on either side of the face.
        // so go half a normal into the voxel if removing (currentVoxel = 0)
        // our out of the voxel if adding (currentVoxel  > 0)
        const pos = intersection.position.map((v, ndx) => {
            return v + intersection.normal[ndx] * (voxelId > 0 ? 0.5 : -0.5);
        });


        // 맨 밑바닥 블록 생성/제거 기능 제한
        if(pos[1] > 1){
            world.setVoxel(...pos, voxelId);
            updateVoxelGeometry(...pos);
            requestRenderIfNotRequested();
        }
        
    }
}





function updateVoxelGeometry(x, y, z) {
    const updatedCellIds = {};
    for (const offset of neighborOffsets) {
        const ox = x + offset[0];
        const oy = y + offset[1];
        const oz = z + offset[2];
        const cellId = world.computeCellId(ox, oy, oz);
        if (!updatedCellIds[cellId]) {
            updatedCellIds[cellId] = true;
            updateCellGeometry(ox, oy, oz);
        }
    }
}



function updateCellGeometry(x, y, z) {
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    const cellZ = Math.floor(z / cellSize);
    const cellId = world.computeCellId(x, y, z);
    let mesh = cellIdToMesh[cellId];
    const geometry = mesh ? mesh.geometry : new THREE.BufferGeometry();

    const {positions, normals, uvs, indices} = world.generateGeometryDataForCell(cellX, cellY, cellZ);
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
        mesh.name = cellId;
        cellIdToMesh[cellId] = mesh;
        scene.add(mesh);
        mesh.position.set(cellX * cellSize, cellY * cellSize, cellZ * cellSize);
    }
}

const neighborOffsets = [
    [ 0,  0,  0], // self
    [-1,  0,  0], // left
    [ 1,  0,  0], // right
    [ 0, -1,  0], // down
    [ 0,  1,  0], // up
    [ 0,  0, -1], // back
    [ 0,  0,  1], // front
];








function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) * canvas.width  / rect.width,
        y: (event.clientY - rect.top ) * canvas.height / rect.height,
    };
}













function addLight(x, y, z, intensity) {
    const color = 0xFFFFFF;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    scene.add(light);
}








let renderRequested = false;

function render() {

    renderRequested = undefined;

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    controls.update();
    
    if(camera.position.y<=1.1)
        camera.position.y = 1.1;
    
    renderer.render(scene, camera);
}



function resizeRendererToDisplaySize(renderer) {

    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    
    return needResize;
}



function requestRenderIfNotRequested() {
    if (!renderRequested) {
        renderRequested = true;
        requestAnimationFrame(render);
    }
}


