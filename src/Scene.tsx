import { ThreeEvent } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import * as THREE from "three"
import { AnimationAction } from "three"

import * as CoffeeCup from "./models/CoffeeCup"
import * as Keyboard from "./models/Keyboard"
import * as Monitor from "./models/Monitor"
import * as Notepad from "./models/Notepad"
import * as Phone from "./models/Phone"
import * as Table from "./models/Table"
import Gameboy from "./Components/Gameboy"


function Scene()
{
    const [selected, setSelected] = useState(false)

    const [hovered, setHovered] = useState(false)
    useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered])

    const playAnimation = (event: ThreeEvent<MouseEvent>) =>
    {
        let obj = event.eventObject;
        let actionName = Object.keys(obj.animations).filter(a => { return a.includes("Action") })[0]

        if (!actionName)
        {
            return;
        }

        let anim: AnimationAction = obj.animations[actionName];
        console.log(anim);

        anim.setLoop(THREE.LoopOnce, 0).reset().play();

        let animDurationMs = anim.getClip().duration * 1000;

        setTimeout(() =>
        {
            anim.paused = true;
        }, Math.floor(animDurationMs / 2.0));

        setSelected(!selected);
    }

    return <>
        <Suspense fallback={null}>
            <CoffeeCup.Model onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={playAnimation} />
            <Gameboy />
            <Keyboard.Model onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={playAnimation} />
            <Monitor.Model />
            <Notepad.Model onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={playAnimation} />
            <Phone.Model onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={playAnimation} />
            <Table.Model />
        </Suspense>
    </>
}

export default Scene
