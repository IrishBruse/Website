import * as THREE from "three";
import { FrontSide, MeshBasicMaterial, MeshPhysicalMaterial, Raycaster } from "three";
import { OrbitControls } from "three-stdlib";
import { DRACOLoader } from "three-stdlib/loaders/DRACOLoader";
import { GLTFLoader } from "three-stdlib/loaders/GLTFLoader";

export default class ThreeEnviroment
{
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    geometry: THREE.BoxGeometry;
    material: THREE.MeshBasicMaterial;
    frameId: number | null = null;

    raycaster: Raycaster = new Raycaster()
    controls!: OrbitControls;
    camera!: THREE.PerspectiveCamera;

    constructor(mount: HTMLCanvasElement)
    {
        let width = window.innerWidth;
        let height = window.innerHeight;

        THREE.ColorManagement.legacyMode = false;

        this.scene = new THREE.Scene()

        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: mount, alpha: true })
        this.geometry = new THREE.BoxGeometry(1, 1, 1)
        this.material = new THREE.MeshBasicMaterial({ color: 0x6644aa })

        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.LinearToneMapping;

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // this.camera.position.z = 5
        this.renderer.setSize(width, height)

        const gltfLoader = new GLTFLoader();

        const draco = new DRACOLoader();
        draco.setDecoderConfig({ type: 'js' });
        draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

        gltfLoader.setDRACOLoader(draco);

        gltfLoader.load('/Prototype.glb', (gltf) =>
        {
            const root = gltf.scene;

            // Enable shadows
            root.traverse(o =>
            {
                if (o instanceof THREE.Mesh)
                {
                    let mat = o.material as MeshBasicMaterial;

                    o.material = new MeshPhysicalMaterial({ color: mat.color, shadowSide: FrontSide, specularIntensity: 0 })

                    o.castShadow = true;
                    o.receiveShadow = true;
                }
                else if (o instanceof THREE.PerspectiveCamera)
                {
                    this.camera = o;

                    this.camera.position.set(o.position.x, o.position.y, o.position.z)
                }
                else if (o instanceof THREE.Light)
                {
                    o.intensity = .6;
                    o.castShadow = true;

                    o.shadow.mapSize.width = 512 * 8;
                    o.shadow.mapSize.height = 512 * 8;
                }
                else
                {
                    o.castShadow = true;
                    o.receiveShadow = true;
                }
            })
            this.scene.add(root)
        });

        const ambientLighting = new THREE.AmbientLight(0xFFF9F0, .7);
        this.scene.add(ambientLighting);



        window.addEventListener('resize', () => this.handleResize())
    }

    unload()
    {
        window.removeEventListener('resize', this.handleResize)

        this.geometry.dispose()
        this.material.dispose()
    }

    handleResize()
    {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
    }

    animate()
    {
        var intersects = this.raycaster.intersectObject(this.scene, true);

        if (intersects.length > 0)
        {

            var object = intersects[0].object;

            // object.material.color.set(Math.random() * 0xffffff);

        }

        this.renderScene()
        this.frameId = window.requestAnimationFrame(() => this.animate())
    }

    renderScene()
    {
        this.renderer.render(this.scene, this.camera)
    }

    start()
    {
        if (!this.frameId)
        {
            this.frameId = requestAnimationFrame(() => this.animate())
        }
    }

    stop()
    {
        cancelAnimationFrame(this.frameId!)
        this.frameId = null
    }

    test = false

    toggle()
    {
        if (this.test)
        {

        }
        else
        {

        }
        this.test = !this.test;
    }
}
