import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import "./App.css"
import { UserAuthContextProvider } from './components/context/UserAuthContext'

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <RouterProvider router={router} />
      </UserAuthContextProvider>
    </>
  )
}

export default App