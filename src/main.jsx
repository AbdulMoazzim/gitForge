import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import CustomizationPage from './Pages/Customization.jsx'
import { DataProvider } from './Context/dataProvider.jsx'
import { ComponentProvider } from './Context/componentProvider.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div style={{textAlign: "center"}}>404 Not Found</div>,
    children: [
      {
        path: "",
        element: <Home />,
      },{
        path: "MyProfile",
        element: <CustomizationPage />,
      }]
  }
])

createRoot(document.getElementById('root')).render(
    <DataProvider>
      <ComponentProvider>
  <RouterProvider router={router}>
      <App />
    </RouterProvider>
    </ComponentProvider>
    </DataProvider>
)
