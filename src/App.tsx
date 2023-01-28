import { Environment, OrbitControls, PerspectiveCamera, ContactShadows } from "@react-three/drei"
import { Canvas, RootState } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import * as THREE from "three"
import { Euler, Vector2 } from "three"
import { DirectionalLightShadow } from "three/src/lights/DirectionalLightShadow"

import { EffectComposer, SSAO, } from "@react-three/postprocessing"
import { useControls } from "leva"
import { BlendFunction } from "postprocessing"
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
                toneMapping: THREE.ACESFilmicToneMapping, outputEncoding: THREE.sRGBEncoding,
                alpha: true, stencil: false, depth: false, antialias: true
            }} shadows camera={{ position: [0, 0.530839, 0.888041], rotation: CamRotation, fov: 50 }} >

            <Suspense fallback={null}>
                <Scene />
            </Suspense>

            <directionalLight castShadow intensity={1.5} color={[0.64, 0.49, 0.11]} position={[13, 18.5, 14.5]} shadow={shadow} />
            <Environment preset="sunset" />

            <EffectComposer>
                <SSAO
                    blendFunction={BlendFunction.MULTIPLY} // Use NORMAL to see the effect
                    samples={12}
                    radius={.2}
                    rangeFalloff={1}
                    intensity={50}
                />
                {/* <SSAO distanceThreshold={10} distanceFalloff={2} samples={11} radius={15} intensity={20} color="green" /> */}
            </EffectComposer>

            {useOrbitControls ? <OrbitControls ref={ref} /> : <PerspectiveCamera ref={ref} />}
        </Canvas >
        <div className="fullscreen vignette"></div>
    </>
}

export default App
