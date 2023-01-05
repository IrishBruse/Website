import { BrowserRouter, Route, Routes } from "react-router-dom"
import Error from "./pages/Error"
import Root from "./Root"

function App()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
