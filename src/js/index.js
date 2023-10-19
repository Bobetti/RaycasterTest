import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

window.ThreeJsData = {};
let SelectionObjects = [];
let canvasIdName = "threejs-main";
const frustumSize = 2000;

window.onload = function () {
    Start();
};

function render() {
    window.ThreeJsData.renderer.clear();
    requestAnimationFrame(render);
    window.ThreeJsData.renderer.render(window.ThreeJsData.scene, window.ThreeJsData.camera);
    window.ThreeJsData.orbitalControls.update();
}

function Start() {
    window.ThreeJsData = {};

    console.log("THREE.REVISION:", THREE.REVISION);

    let scene, renderer, camera, raycaster, orbitalControls;

    scene = CreateScene();
    renderer = CreateRenderer();
    camera = CreateCamera(renderer, scene);
    raycaster = AddRaycaster(renderer);

    orbitalControls = AddOrbitalControls(camera, renderer);

    CreateLight(scene);
    //AddGeometry(scene);
    AddResizeEvent(camera, renderer);

    window.ThreeJsData.scene = scene;
    window.ThreeJsData.renderer = renderer;
    window.ThreeJsData.camera = camera;
    window.ThreeJsData.clock = new THREE.Clock();
    window.ThreeJsData.raycaster = raycaster;
    window.ThreeJsData.orbitalControls = orbitalControls;

    AddMouseEvents();

    LoadAssets("assets/Landscape24.glb", scene, 1);

    render();
}

function CreateScene() {
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    const axesHelper = new THREE.AxesHelper(500);
    scene.add(axesHelper);

    return scene;
}

function CreateRenderer() {
    let canvasSize = GetCanvasContainerSize();

    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(canvasSize.window, canvasSize.height);
    renderer.setSize(canvasSize.width, canvasSize.height);

    var dome = document.getElementById(canvasIdName);
    dome.appendChild(renderer.domElement);

    return renderer;
}

function CreateCamera(renderer, scene) {
    let CameraPositions = [];
    CameraPositions[0] = {
        x: 480.30493693970516,
        y: 88.34970574011882,
        z: 471.3929250072687,
    };

    let canvasSize = GetCanvasContainerSize();

    let widthHalf = canvasSize.width / 2;
    let heightHalf = canvasSize.height / 2;

    //camera = new THREE.OrthographicCamera(-widthHalf, widthHalf, heightHalf, -heightHalf, 0, 2000);

    /// Suggestion --
    const aspect = canvasSize.width / canvasSize.height;
    camera = new THREE.OrthographicCamera(
        (frustumSize * aspect) / -2,
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        frustumSize / -2,
        0,
        2000
    );
    /// -------------

    camera.position.set(CameraPositions[0].x, CameraPositions[0].y, CameraPositions[0].z);
    camera.position.z = 500;
    camera.zoom = 0.54;

    return camera;
}

function AddRaycaster(renderer) {
    let raycaster = new THREE.Raycaster();

    return raycaster;
}

function AddOrbitalControls(camera, renderer) {
    let OrbitalCameraPositionDeltas = [];
    OrbitalCameraPositionDeltas[0] = { x: 9, y: 0, z: 0 };

    // // Sets orbit control to move the camera around
    let controls = new OrbitControls(camera, renderer.domElement);

    controls.enablePan = true;
    controls.maxDistance = 1000;
    controls.minDistance = 1;

    controls.target.x += OrbitalCameraPositionDeltas[0].x;
    controls.target.y += OrbitalCameraPositionDeltas[0].y;
    controls.target.z += OrbitalCameraPositionDeltas[0].z;

    return controls;
}

function CreateLight(scene) {
    var hemiLight = new THREE.HemisphereLight(16777215, 526368, 1);
    scene.add(hemiLight);

    AddDirectionalLight(scene);
}

function AddDirectionalLight(scene) {
    const directionalLight = new THREE.DirectionalLight(0xf6d29a, 4);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -4;
    directionalLight.shadow.camera.left = -4;
    directionalLight.shadow.camera.right = 4;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 40;
    directionalLight.shadow.camera.far = 40;
    directionalLight.shadow.bias = -0.002;
    directionalLight.position.set(15, 12, -10);

    scene.add(directionalLight);
}

function AddGeometry(scene) {
    // var planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
    // var texture = new THREE.TextureLoader().load( 'https://threejs.org/examples/textures/uv_grid_opengl.jpg' );
    // var planeMaterial = new THREE.MeshLambertMaterial( { map: texture } );
    // var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // var plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
    // var plane3 = new THREE.Mesh(planeGeometry, planeMaterial);
    // var plane4 = new THREE.Mesh(planeGeometry, planeMaterial);
    // var plane5 = new THREE.Mesh(planeGeometry, planeMaterial);
    // // plane.receiveShadow = true;
    // // plane2.receiveShadow = true;
    // // plane3.receiveShadow = true;
    // // plane4.receiveShadow = true;
    // scene.add(plane);
    // scene.add(plane2);
    // scene.add(plane3);
    // scene.add(plane4);
    // scene.add(plane5);
    // plane.position.set(0,10,-10);
    // plane2.position.set(10,10,0);
    // plane3.position.set(-10,10,0);
    // plane4.position.set(0,10,10);
    // plane4.position.set(0,0,0);
    // plane2.rotateY(-Math.PI * 0.5);
    // plane3.rotateY(Math.PI * 0.5);
    // plane4.rotateY(Math.PI);
    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const cube = new THREE.Mesh( geometry, material );
    // cube.position.set(15, 15, 15 );
    // scene.add( cube );
    // //Create a plane that receives shadows (but does not cast them)
    // const planeGeometry = new THREE.PlaneGeometry( 2000, 2000, 1, 1 );
    // const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
    // const plane = new THREE.Mesh( planeGeometry, planeMaterial );
    // plane.position.set(0,-1,0);
    // plane.receiveShadow = true;
    // plane.rotateX(-Math.PI * 0.5);
    // scene.add( plane );
    // const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
    // mesh.rotation.x = - Math.PI / 2;
    // mesh.receiveShadow = true;
    // scene.add(mesh);
}

function AddResizeEvent(camera, renderer) {
    window.addEventListener("resize", function () {
        Resize(camera, renderer);
    });
}

function Resize(camera, renderer) {
    let imgW = 1923;
    let imgH = 913;
    const modelScale = 1.301;

    let canvasSize = GetCanvasContainerSize();

    const newWidth = canvasSize.width;
    const newHeight = canvasSize.height;

    let bgAspectRatioThreshold = 2.1;
    const bgAspectRatio = newWidth / newHeight;

    if (bgAspectRatio > bgAspectRatioThreshold) {
        let scale = newWidth / imgW;
        window.ThreeJsData.model.scale.set(
            modelScale * scale,
            modelScale * scale,
            modelScale * scale
        );
    } else {
        let scale = newHeight / imgH;
        window.ThreeJsData.model.scale.set(
            modelScale * scale,
            modelScale * scale,
            modelScale * scale
        );
    }

    let widthHalf = newWidth / 2;
    let heightHalf = newHeight / 2;

    // camera.left = -widthHalf;
    // camera.right = widthHalf;
    // camera.top = heightHalf;
    // camera.bottom = -heightHalf;

    /// Suggestion --
    const aspect = canvasSize.width / canvasSize.height;
    camera.left = (-frustumSize * aspect) / 2;
    camera.right = (frustumSize * aspect) / 2;
    camera.top = frustumSize / 2;
    camera.bottom = -frustumSize / 2;
    /// -------------

    camera.updateProjectionMatrix();
    renderer.setSize(canvasSize.width, canvasSize.height);
    renderer.render(window.ThreeJsData.scene, camera);
}

function AddMouseEvents() {
    let camera = window.ThreeJsData.camera;

    window.addEventListener("mouseup", function () {
        console.log("mouse coords = ", camera.position);
    });

    document.addEventListener("mousedown", (event) => {
        CheckIntersects(event, "mousedown");
    });

    document.addEventListener("mousemove", (event) => {
        CheckIntersects(event, "mousemove");
    });

    window.addEventListener("wheel", (event) => {
        Resize(camera, window.ThreeJsData.renderer);
    });
}

function GetMouseCoords(event) {
    let div = document.querySelector("#" + canvasIdName); // replace 'yourDivId' with your div's ID
    let rect = div.getBoundingClientRect();

    return {
        x: event.clientX - rect.x,
        y: event.clientY - rect.y,
    };
}

function CheckIntersects(event, eventType) {
    event.preventDefault();

    const rect = window.ThreeJsData.renderer.domElement.getBoundingClientRect();
    let mouse = new THREE.Vector2();

    mouse.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

    let raycaster = window.ThreeJsData.raycaster;
    let camera = window.ThreeJsData.camera;
    raycaster.setFromCamera(mouse, camera);

    let objects = SelectionObjects;
    const intersects = raycaster.intersectObjects(objects, true);
    let intersected = intersects.length > 0 ? intersects[0].object : null;

    console.log(" intersects.length = ", intersects.length);
}

function GetSelectionObjects(model) {
    let objects = [];
    model.traverse(function (child) {
        if (child.isMesh && child.name.includes("selection")) {
            objects.push(child);

            var geo = new THREE.EdgesGeometry(child.geometry); // or WireframeGeometry
            var mat = new THREE.LineBasicMaterial({ color: 0x0000ff });
            const wireframe = new THREE.LineSegments(geo, mat);
            wireframe.name = "wireframe-base";
            child.add(wireframe);
        }
    });
    return objects;
}

function LoadAssets(path, scene, scale) {
    const gltfLoader = new GLTFLoader();

    gltfLoader.load(path, function (gltf) {
        const model = gltf.scene;
        model.scale.set(scale, scale, scale);

        scene.add(model);

        window.ThreeJsData.model = model;

        SelectionObjects = GetSelectionObjects(model);

        Resize(window.ThreeJsData.camera, window.ThreeJsData.renderer);
    });
}

function GetCanvasContainerSize() {
    let size = {};

    let parent = document.getElementById("threejs-container");
    //let child = document.getElementById("threejs-menu");

    size.width = parent.offsetWidth;
    size.height = parent.offsetHeight - 0; //child.offsetHeight;

    return size;
}
