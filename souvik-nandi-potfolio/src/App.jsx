import { Route, Routes } from 'react-router-dom'
import Shell from './components/Shell'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Publications from './pages/Publications'
import Patents from './pages/Patents'
// import Placeholder from './pages/Placeholder'

function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/patents" element={<Patents />} />
        {/* Contact page temporarily disabled — see DESIGN_LOG.md. */}
        {/* <Route path="/contact" element={<Placeholder title="Contact" />} /> */}
      </Route>
    </Routes>
  )
}

export default App
