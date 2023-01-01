import { BrowserRouter, Route, Routes } from "react-router-dom"
import Root from "./pages/Root"

function App()
{
    return (
        <BrowserRouter>
            <Routes >
                <Route path="/" element={<Root />}></Route>
                <Route path="/:page" element={<Root />}></Route>
                <Route path="*" element={<Root />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
