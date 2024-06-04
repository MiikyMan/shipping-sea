import { Outlet, createBrowserRouter } from 'react-router-dom'
import Home from "../pages/home"
import Product from '../pages/product'

export const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div>
          <Home/>
        </div>
      ),
    },
    {
      path: '/product',
      element: (
        <div>
          <Product/>
        </div>
      ),
    },
])