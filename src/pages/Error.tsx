import { Link } from "react-router-dom";

function Error()
{
    return (
        <div >
            <h1>
                404
            </h1>
            <h2>
                Page not found!
            </h2>
            <Link to="/">Back to safety</Link>
        </div>
    );
}

export default Error;
