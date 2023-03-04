import './App.css'
import { Route } from 'wouter'
import { Home } from './Home.jsx'
import { Detail } from './Detail.jsx'

// const API_KEY = import.meta.env.VITE_API_KEY

function App () {
  return (
    <>
      <Route path='/' component={Home} />
      <Route path='/:name' component={Detail} />
    </>
  )
}

export default App
