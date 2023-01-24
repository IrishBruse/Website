import { useEffect } from "react";
import "./build/style.css"
import "./build/uno-bootstrap.css"
import "./build/normalize.css"




function Monoboy()
{
    useEffect(() =>
    {
    }, [])

    return <>
        <div id='uno-body' className='container-fluid uno-body'>
            <div className='uno-loader' loading-position='bottom' loading-alert='none'>
                <img className='logo' src='/Monoboy.ico' />
                <progress></progress>
                <span className='alert'>
                </span>
            </div>
        </div>

        <canvas id="viewport" width="160px" height="144px"></canvas>
    </>

}

export default Monoboy;
