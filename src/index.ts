import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Mesh, MeshBasicMaterial, PointLightHelper, Uniform, Vector3 } from 'three'
import GUIMovableObject from './gui/movable_3d_object'
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { distanceScale } from './settings'
// import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing'

import Planet from './objects/planet'
import Sun from './objects/sun'
import Mercury from './objects/mercury'
import Venus from './objects/venus'
import Earth from './objects/earth'
import Moon from './objects/moon'
import Mars from './objects/mars'
import Jupiter from './objects/jupiter'
import Saturn from './objects/saturn'
import Uranus from './objects/uranus'
import Neptune from './objects/neptune'
import Pluto from './objects/pluto'
import { Stars } from './objects/stars'
import Ceres from './objects/ceres'

// Loading
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)

// Debug
const gui = new dat.GUI()

// Canvas
const canvas: HTMLElement = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects

//? -- SUN -- ?//
const sun = new Sun()
scene.add(sun.mesh)
sun.addGUI(gui)

//? -- MERCURY -- ?//
const mercury = new Mercury();
mercury.displayOrbit(sun.mesh, scene)
sun.mesh.add(mercury.mesh)
// mercury.addGUI(gui)

//? -- VENUS -- ?//
const venus = new Venus();
venus.displayOrbit(sun.mesh, scene)
sun.mesh.add(venus.mesh)
// venus.addGUI(gui)

//? -- EARTH -- ?//
const earth = new Earth();
earth.displayOrbit(sun.mesh, scene)
sun.mesh.add(earth.mesh)
// earth.addGUI(gui)

//? -- MOON -- ?//
const moon = new Moon();
moon.displayOrbit(earth.mesh, scene)
sun.mesh.add(moon.mesh)
// moon.addGUI(gui)

//? -- MARS -- ?//
const mars = new Mars();
mars.displayOrbit(sun.mesh, scene)
sun.mesh.add(mars.mesh)
// mars.addGUI(gui)

//? -- JUPITER -- ?//
const jupiter = new Jupiter();
jupiter.displayOrbit(sun.mesh, scene)
sun.mesh.add(jupiter.mesh)
// jupiter.addGUI(gui)

//? -- SATURN -- ?//
const saturn = new Saturn();
saturn.displayOrbit(sun.mesh, scene)
sun.mesh.add(saturn.mesh)
// saturn.addGUI(gui)

//? -- URANUS -- ?//
const uranus = new Uranus();
uranus.displayOrbit(sun.mesh, scene)
sun.mesh.add(uranus.mesh)
// uranus.addGUI(gui)

//? -- NEPTUNE -- ?//
const neptune = new Neptune();
neptune.displayOrbit(sun.mesh, scene)
sun.mesh.add(neptune.mesh)
// neptune.addGUI(gui)

//? -- PLUTO -- ?//
const pluto = new Pluto();
pluto.displayOrbit(sun.mesh, scene)
sun.mesh.add(pluto.mesh)
// pluto.addGUI(gui)

//? -- CERES -- ?//
// const ceres = new Ceres();
// ceres.displayOrbit(sun.mesh, scene)
// sun.mesh.add(ceres.mesh)
// ceres.addGUI(gui)

// * -- STARS -- * //
let stars = new Stars(1)

// * -- TEXT -- * //
if (false) {
    const loader = new FontLoader();
    const planetsWithTxt = [sun, mercury, venus, mars, jupiter, saturn, uranus, neptune, pluto]
    loader.load('assets/fonts/gilroy_extrabold.json', function (f) {
        for (const planet in planetsWithTxt) {
            const element = planetsWithTxt[planet];

            const geometryTxt = new TextGeometry(element.name.toString(), {
                font: f,
                size: 0.000001 * element.distance,
                height: 5,

                curveSegments: 12,
                // bevelEnabled: true,
                // bevelThickness: 1,
                // bevelSize: 1,
                // bevelOffset: 0,
                // bevelSegments: 5
            });
            const materialTxt = new MeshBasicMaterial();
            materialTxt.color = new THREE.Color(0xFFFFFF);

            const m = new Mesh(geometryTxt, materialTxt);
            m.position.set(100, 0, 100);
            m.lookAt(sun.mesh.position)
            element.mesh.add(m)
        }
    });
}

// * -- LIGHTS -- * //

// const pointLightHelper = new PointLightHelper(sunLight, 1, 0xffff00)
// scene.add(pointLightHelper)

/**
 ** --  Sizes -- *
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 ** --  Camera -- *
 */
// Base camera
const near = 0.0001
const far = 10000 * (pluto.distance / distanceScale)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, near, far)
const initCameraPos = earth.mesh.position
const initCameraPosRadius = earth.getRadius()
camera.position.set(initCameraPos.x + initCameraPosRadius, initCameraPos.y, initCameraPos.z + initCameraPosRadius)
const initCameraRot = new THREE.Vector3(0, 0, 0)
camera.rotation.set(initCameraRot.x, initCameraRot.y, initCameraRot.z)
scene.add(camera)

stars.displayReal(scene, camera)

const cameraGUI = new GUIMovableObject();
cameraGUI._addGUI(gui, 'Camera', camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false

/**
 ** -- Renderer -- *
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    // powerPreference: "high-performance",
    // stencil: false,
    // depth: false
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
sun.light.shadow.camera.far = pluto.distance;

/**
 ** -- Post Processing -- *
 */
// const composer = new EffectComposer(renderer);
// composer.addPass(new RenderPass(scene, camera));
// composer.addPass(new EffectPass(camera, new BloomEffect()));

// TODO: Texture does not look good for galaxy, (maybe try adding stars individually?)
const galaxyTexture = textureLoader.load('assets/images/textures/galaxy/4k_milky_way_nostars.png', () => {
    const rt = new THREE.WebGLCubeRenderTarget(galaxyTexture.image.height);
    rt.fromEquirectangularTexture(renderer, galaxyTexture);
    scene.background = rt.texture;
})
/**
 ** -- Animate -- *
 */

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

// const windowHalfX = window.innerWidth / 2;
// const windowHalfY = window.innerHeight / 2;

const onDocumentMouseMove = (event) => {
    // mouseX = (event.clientX - windowHalfX)
    // mouseY = (event.clientY - windowHalfY)
    mouseX = (event.clientX)
    mouseY = (event.clientY)
}
document.addEventListener('mousemove', onDocumentMouseMove)

const clock = new THREE.Clock()

//* Set camera position *//
scene.remove(camera)
var positionToLookAt: Vector3 = earth.mesh.position
// const plaRadius = positionToLookAt.radius
const plaCamPosition = positionToLookAt
camera.position.set(plaCamPosition.x, plaCamPosition.y, plaCamPosition.z)
controls.target = positionToLookAt
controls.center = positionToLookAt

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    let planetKeys = {
        48: sun.mesh.position, // 0
        49: mercury.mesh.position, // 1
        50: venus.mesh.position, // 2
        51: earth.mesh.position, // 3
        52: mars.mesh.position, // 4
        53: jupiter.mesh.position, // 5
        54: saturn.mesh.position, // 6
        55: uranus.mesh.position, // 7
        56: neptune.mesh.position, // 8
        57: pluto.mesh.position, // 9
        // 67: ceres.mesh.position, // c
        77: moon.mesh.position, // m
        79: stars.getStarPositionByName("Polaris"), // o
        80: stars.getStarPositionByName("Proxima Centauri"), // p
        82: stars.getStarPositionByName("Rigil Kentaurus") // r
    }
    positionToLookAt = planetKeys[keyCode] ?? positionToLookAt
    controls.target = positionToLookAt
    controls.center = positionToLookAt
};
document.addEventListener("keydown", onDocumentKeyDown, false);
// camera.position.z = 100
// camera.position.x = -100
// camera.fov = 20
// camera.zoom = 10
// camera.position.z = 1.37
// camera.position.x = -13.43
// camera.fov = 13.6
// camera.zoom = 1
// camera.fov = 1
// camera.zoom = 200

var didPrint = false
const tick = () => {

    camera.updateProjectionMatrix() // for GUI controls
    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    // const elapsedTime = clock.getElapsedTime()
    const elapsedTime = clock.startTime + clock.getElapsedTime()

    // Update objects
    const LOCK_CAMERA_TO_MOUSE = false
    if (LOCK_CAMERA_TO_MOUSE) {
        camera.rotation.set(initCameraRot.x, initCameraRot.y, initCameraRot.z)
        camera.rotation.x += .05 * targetY
        camera.rotation.y += .05 * targetX
        camera.position.set(initCameraPos.x, initCameraPos.y, initCameraPos.z)
        camera.position.x += -.01 * targetX
        camera.position.y += .01 * targetY
    }

    mercury.animate(elapsedTime, sun.mesh)
    venus.animate(elapsedTime, sun.mesh)
    earth.animate(elapsedTime, sun.mesh)
    moon.animate(elapsedTime, earth.mesh); moon.mesh.lookAt(earth.mesh.position)
    mars.animate(elapsedTime, sun.mesh)
    jupiter.animate(elapsedTime, sun.mesh)
    saturn.animate(elapsedTime, sun.mesh)
    uranus.animate(elapsedTime, sun.mesh)
    neptune.animate(elapsedTime, sun.mesh)
    pluto.animate(elapsedTime, sun.mesh)
    // ceres.animate(elapsedTime, sun.mesh)

    camera.lookAt(positionToLookAt)
    // console.log("Distance from sun: ", Math.sqrt(Math.pow(camera.position.y - 0, 2) + Math.pow(camera.position.x - 0, 2)))

    if (!didPrint) {
        console.log("sun: ", sun.getPositionAsString())
        console.log("mercury: ", mercury.getPositionAsString())
        console.log("venus: ", venus.getPositionAsString())
        console.log("earth: ", earth.getPositionAsString())
        console.log("moon: ", moon.getPositionAsString())
        console.log("mars: ", mars.getPositionAsString())
        console.log("jupiter: ", jupiter.getPositionAsString())
        console.log("saturn: ", saturn.getPositionAsString())
        console.log("uranus: ", uranus.getPositionAsString())
        console.log("neptune: ", neptune.getPositionAsString())
        console.log("pluto: ", pluto.getPositionAsString())
        // console.log("ceres: ", ceres.getPositionAsString())
        didPrint = true
    }

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)
    // composer.render();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()