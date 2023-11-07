import './style.css'
import GUI from 'lil-gui'
import * as THREE from 'three'

const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xbb0000 }))

cube2.position.x = 2

group.add(cube1, cube2)

// Axes Helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Scale
mesh.scale.set(2, 0.5, 0.5)

// Rotation
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25

mesh.position.y = 2

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

// Cursor
const cursor = { x: 0, y: 0 }
window.addEventListener('mousemove', (event) => {
  cursor.x = -(event.clientX / sizes.width - 0.5)
  cursor.y = -(event.clientY / sizes.height - 0.5)
})

const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1 , -1 , 0.01, 1000)
camera.position.z = 4
// scene.add(camera)
// camera.lookAt(mesh.position)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Clock
const clock = new THREE.Clock()

gui.add(mesh.position, 'y').min(-15).max(15).step(0.001).name('elevation')
gui.add(mesh, 'visible')
gui.add(mesh.material, 'wireframe')
gui.addColor(mesh.material, 'color').onChange((color) => {
  console.log('value has changed', color.getHexString())
})

// Animations
const tick = () => {
  // // Clock
  // const elapsedTime = clock.getElapsedTime()

  // // Update objects
  // mesh.rotation.x = elapsedTime * Math.PI * 0.1
  // mesh.rotation.y = elapsedTime * Math.PI * 0.2
  // mesh.rotation.z = elapsedTime * Math.PI * 0.3

  // group.rotation.y -= 0.01

  // Update camera
  camera.position.x = cursor.x * 10
  camera.position.y = cursor.y * 10

  // camera.position.y = Math.sin(elapsedTime)

  group.position.y += 0.001
  camera.lookAt(new THREE.Vector3())

  // Render
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
