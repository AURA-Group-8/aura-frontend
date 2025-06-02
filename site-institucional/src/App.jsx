import HomePage from "./pages/landing-page-sections/HomePage"
import { RouterProvider, BrowserRouter } from "react-router-dom"
import { routes } from "./routes/Routes"
import Vlibras from "@djpfs/react-vlibras"


function App() {

  return (
    <>
        <RouterProvider router={routes} />

        
        <Vlibras/>
    </>
  )
}

export default App
