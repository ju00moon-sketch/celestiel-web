import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import World from './pages/World.jsx'
import Download from './pages/Download.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/world" element={<World />} />
        <Route path="/download" element={<Download />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
