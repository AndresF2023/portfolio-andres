<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)

let renderer = null
let scene = null
let camera = null
let mesh = null
let material = null
let geometry = null
let resizeTimeout = null

const FOV = 50
const CAMERA_DISTANCE = 950
const COVERAGE_MARGIN = 1.5

// intersecta los 4 rayos de las esquinas de pantalla con el plano z=0:
// la cámara está descentrada, así que el área visible no es un rectángulo
// simétrico y la fórmula de FOV recto no alcanza para cubrir la pantalla
function frustumBoundsAtZ0() {
  camera.updateMatrixWorld(true)
  const camPos = camera.position
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  for (const nx of [-1, 1]) {
    for (const ny of [-1, 1]) {
      const point = new THREE.Vector3(nx, ny, 0.5).unproject(camera)
      const dir = point.sub(camPos).normalize()
      const t = -camPos.z / dir.z
      const px = camPos.x + dir.x * t
      const py = camPos.y + dir.y * t
      minX = Math.min(minX, px)
      maxX = Math.max(maxX, px)
      minY = Math.min(minY, py)
      maxY = Math.max(maxY, py)
    }
  }

  return { minX, maxX, minY, maxY }
}

// desplaza los vértices para formar dunas amplias, pocas y con mucho espacio entre sí
function applyDunes(geo, width, height) {
  const pos = geo.attributes.position
  const fx1 = (Math.PI * 2 * 2) / width
  const fy1 = (Math.PI * 2 * 1.5) / height
  const fx2 = (Math.PI * 2 * 1.1) / width
  const fy2 = (Math.PI * 2 * 0.9) / height

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const h =
      Math.sin(x * fx1) * Math.cos(y * fy1) * 110 +
      Math.sin(x * fx2 + y * fy2 + 1.3) * 45
    pos.setZ(i, h)
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
}

function buildGeometry() {
  const { minX, maxX, minY, maxY } = frustumBoundsAtZ0()
  const midX = (minX + maxX) / 2
  const midY = (minY + maxY) / 2
  const width = (maxX - minX) * COVERAGE_MARGIN
  const height = (maxY - minY) * COVERAGE_MARGIN
  const segX = Math.min(200, Math.round(width / 9))
  const segY = Math.min(150, Math.round(height / 9))
  const geo = new THREE.PlaneGeometry(width, height, segX, segY)
  applyDunes(geo, width, height)
  geo.translate(midX, midY, 0)
  return geo
}

function render() {
  if (!renderer || !scene || !camera) return
  renderer.render(scene, camera)
}

function resize() {
  if (!renderer || !camera || !mesh) return
  const width = window.innerWidth
  const height = window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)

  geometry.dispose()
  geometry = buildGeometry()
  mesh.geometry = geometry

  render()
}

function handleResize() {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(resize, 150)
}

onMounted(() => {
  const canvas = canvasRef.value
  const width = window.innerWidth
  const height = window.innerHeight

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(FOV, width / height, 1, 4000)
  // cámara levemente de costado para que se note el relieve real de la superficie
  camera.position.set(320, 90, CAMERA_DISTANCE)
  camera.lookAt(0, 0, 0)

  geometry = buildGeometry()
  material = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.9,
    metalness: 0,
    // dunas empinadas + cámara al ras pueden dejar pendientes "de espaldas" a
    // cámara: sin esto, WebGL las descarta (culling) y se ve el fondo
    side: THREE.DoubleSide,
  })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const ambient = new THREE.AmbientLight(0x2a2a2a, 1.2)
  scene.add(ambient)

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
  keyLight.position.set(-400, 500, 700)
  scene.add(keyLight)

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(width, height)
  renderer.setClearColor(0x212121, 1)
  renderer.outputColorSpace = THREE.SRGBColorSpace

  render()

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  clearTimeout(resizeTimeout)
  geometry?.dispose()
  material?.dispose()
  renderer?.dispose()
})
</script>

<template>
  <canvas ref="canvasRef" class="scene-bg" aria-hidden="true"></canvas>
</template>

<style scoped>
.scene-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  display: block;
  pointer-events: none;
}
</style>
