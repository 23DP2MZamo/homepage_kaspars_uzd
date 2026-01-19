import './App.css'
import './components/header.jsx'
import'./components/main.jsx'
import'./components/footer.jsx'
import { RouterProvider } from 'react-router'
import { router } from './routes.js'

function App() {

  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    <header/>
    <main/>
    <footer/>
    </>
  )
}

export default App
