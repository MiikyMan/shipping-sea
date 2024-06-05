import { Outlet, createBrowserRouter } from 'react-router-dom'
import Home from "../pages/home"
import Product from '../pages/product'
import Signin from '../pages/signin'
import Signup from '../pages/signup'
import ShoppingCart from '../pages/shoppingcart'

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
    {
      path: '/signin',
      element: (
        <div>
          <Signin/>
        </div>
      ),
    },
    {
      path: '/signup',
      element: (
        <div>
          <Signup/>
        </div>
      ),
    },
    {
      path: '/shoppingcart',
      element: (
        <div>
          <ShoppingCart/>
        </div>
      ),
    },
])