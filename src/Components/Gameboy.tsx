import * as THREE from "three"

import { Html } from "@react-three/drei"
import { GroupProps, Object3DNode, ThreeEvent, useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { AnimationAction, Group, Vector3 } from "three"
import { Model } from "../models/Gameboy"
import { HtmlProps } from "@react-three/drei/web/Html"

export default function Gameboy()
{
    // let model = useRef<THREE.Group>()
    // let html = useRef(null)

    const [hovered, setHovered] = useState(false)
    useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered])

    const playAnimation = (event: ThreeEvent<MouseEvent>) =>
    {
        let obj = event.eventObject;
        console.log(obj);

        let actionName = Object.keys(obj.animations).filter(a => { return a.includes("Action") })[0]

        if (actionName)
        {
            let anim: AnimationAction = obj.animations[actionName];
            anim.setLoop(THREE.LoopOnce, 0).reset().play();

            let animDurationMs = anim.getClip().duration * 1000;

            setTimeout(() =>
            {
                anim.paused = true;
            }, Math.round(animDurationMs / 2.0));
        }
    }

    useFrame(() =>
    {
        // console.log(model.current);

        // let gb = model.current.getObjectByName("Gameboy");
        // let pos = gb.position;

        // html.current.position = new Vector3(pos.x, pos.y, pos.z);
    });

    return (<>
        <Model onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={playAnimation} >
            <Html className="cssWrapper" transform occlude rotation-x={-Math.PI / 2} onLostPointerCapture={(e) => e.stopPropagation()} onGotPointerCapture={(e) => e.stopPropagation()} >
                <div className="GameboyViewport">
                    <h1>Test</h1>
                </div>
            </Html>
        </Model>
    </>
    )
}
