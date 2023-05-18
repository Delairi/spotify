import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'

const routes = createBrowserRouter([
  {
    path: '/',
    element:<Home/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
 <RouterProvider router={routes} />
)
