import { useEffect, useRef, useState } from "react"
import "./style.css"
import ThreeEnviroment from "./ThreeEnviroment"

function Root()
{
    const mount = useRef<HTMLCanvasElement>(null)
    let three: ThreeEnviroment | null = null;

    useEffect(() =>
    {
        if (mount.current === null)
        {
            return
        }

        three = new ThreeEnviroment(mount.current);
        three.start();
        return () =>
        {
            three!.unload();
        }
    }, [])

    return (
        <>
            <button onClick={() => three!.toggle()}>Toggle</button>
            <canvas ref={mount} className="fullscreen viewport" />
            <div className="fullscreen vignette"></div>
        </>
    )
}

export default Root
