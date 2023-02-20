import { OrbitControls, PerspectiveCamera, ContactShadows } from "@react-three/drei"
import { Canvas, RootState } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import * as THREE from "three"
import { Euler, Vector2 } from "three"
import { DirectionalLightShadow } from "three/src/lights/DirectionalLightShadow"

import { EffectComposer, SSAO, } from "@react-three/postprocessing"
import { useControls } from "leva"
import Scene from "./Scene"

function App()
{
    const ref = useRef()

    const shadow = new DirectionalLightShadow(ref.current)
    shadow.bias = 0;
    shadow.normalBias = 0.015;
    shadow.mapSize = new Vector2(2048, 2048);

    const { useOrbitControls } = useControls({
        useOrbitControls: false,
    })

    const CamRotation = new Euler(-18 * THREE.MathUtils.DEG2RAD, 0, 0);

    const onCreate = (state: RootState) =>
    {
        state.gl.setClearColor("#9ae793")
    }

    return <>
        <Canvas
            onCreated={onCreate}
            gl={{
                toneMapping: THREE.CineonToneMapping, outputEncoding: THREE.sRGBEncoding,
                alpha: true, stencil: false, depth: false, antialias: true
            }} shadows camera={{ position: [0, 0.530839, 0.888041], rotation: CamRotation, fov: 50 }} >

            <Suspense fallback={null}>
                <Scene />
            </Suspense>

            <directionalLight castShadow intensity={1} color={[.9, 1, 1]} position={[0, 1, .8]} shadow={shadow} />
            <ambientLight intensity={0.25} color={[1, 1, 1]} />

            <EffectComposer>
            </EffectComposer>

            {useOrbitControls ? <OrbitControls ref={ref} /> : <PerspectiveCamera ref={ref} />}
        </Canvas >
        <div className="fullscreen vignette"></div>
    </>
}

export default App
