import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CssBaseline } from "@mui/material"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import DoveSiamo from "./pages/DoveSiamo"
import Contatti from "./pages/Contatti"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import './styles/App.css'
import ArticlesByPosition from "./pages/ArticlesByPosition"

function App() {

  return (

    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/dove-siamo' element={<DoveSiamo />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/articles-by-position/:codice" element={<ArticlesByPosition />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>

  )
}

export default App
