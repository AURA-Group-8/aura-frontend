import HomePage from "./pages/landing-page-sections/HomePage"
import { RouterProvider, BrowserRouter } from "react-router-dom"
import { routes } from "./routes/Routes"

function App() {

  return (
    <>

        <RouterProvider router={routes} />
     

    </>
  )
}

export default App
