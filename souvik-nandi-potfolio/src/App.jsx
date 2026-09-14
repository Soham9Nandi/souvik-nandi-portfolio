import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Placeholder from './pages/Placeholder'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/publications" element={<Placeholder title="Publications" />} />
        <Route path="/patents" element={<Placeholder title="Patents & Research" />} />
        <Route path="/contact" element={<Placeholder title="Contact" />} />
      </Route>
    </Routes>
  )
}

export default App
