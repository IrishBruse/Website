import { OrbitControls, PerspectiveCamera, ContactShadows, Html } from "@react-three/drei"
import { Canvas, RootState } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import * as THREE from "three"
import { Euler, Vector2 } from "three"
import { DirectionalLightShadow } from "three/src/lights/DirectionalLightShadow"

import { EffectComposer } from "@react-three/postprocessing"
import { useControls } from "leva"
import Scene from "./Scene"

function App()
{
    const ref = useRef()

    const { useOrbitControls } = useControls({
        useOrbitControls: false,
    })

    const shadow = new DirectionalLightShadow(ref.current)
    shadow.bias = 0;
    shadow.normalBias = 0.02;
    shadow.mapSize = new Vector2(2048, 2048);

    const CamRotation = new Euler(-18 * THREE.MathUtils.DEG2RAD, 0, 0);

    return <>
        <Canvas gl={{ antialias: true }} shadows="soft" camera={{
            position: [0, 0.530839, 0.888041], rotation: CamRotation, fov: 50, near: .01, far: 2
        }} >
            <directionalLight castShadow color={[1.00, 0.94, 0.72]} position={[0, 1, 0.2]} rotation={[90, 0, 0]} shadow-mapSize={1024} shadow={shadow} >
                <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 3]} />
            </directionalLight>
            <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={1.75} far={4.5} />
            <ambientLight intensity={0.7} color={[1, 1, 1]} />

            <Suspense fallback={null}>
                <Scene />
            </Suspense>

            <EffectComposer>

            </EffectComposer>

            {useOrbitControls ? <OrbitControls ref={ref} /> : <PerspectiveCamera ref={ref} />}
        </Canvas >
        <div className="fullscreen vignette"></div>
    </>
}

export default App
