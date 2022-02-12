import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.137.5-HJEdoVYPhjkiJWkt6XIa/mode=imports,min/optimized/three.js'

const xt = (t) => 16 * Math.sin(t) ** 3
const yt = (t) =>
  13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)

const colors = [
  'rgb(56, 127, 242)',
  'rgb(242, 48, 65)',
  'rgb(242, 232, 48)',
  'rgb(48, 242, 174)',
]

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
)
camera.position.set(0, 0, 100)
camera.lookAt(0, 0, 0)

const scene = new THREE.Scene()
scene.backgroundColor = new THREE.Color(0x000000)

const lines = []

const foo = (color) => {
  for (let i = 1; i < 750; i++) {
    const points = []
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
    })
    points.push(new THREE.Vector2(0, 0))
    points.push(new THREE.Vector2(xt(i), yt(i)))
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geometry, material)
    lines.push(line)
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
foo(colors[Math.floor(Math.random() * colors.length)])

const render = async () => {
  for (let line of lines) {
    scene.add(line)
    await wait(0)
  }
  if (scene.children.length >= 749) {
    for (let line of lines) {
      scene.remove(line)
    }
    lines.length = 0
    await wait(10)
    foo(colors[Math.floor(Math.random() * colors.length)])
  }
}

function animate() {
  requestAnimationFrame(animate)
  render()
  renderer.render(scene, camera)
}
animate()
