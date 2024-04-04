import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CssBaseline } from "@mui/material"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import DoveSiamo from "./pages/DoveSiamo"
import Contatti from "./pages/Contatti"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ArticleDetail from "./pages/ArticleDetail"
import NotFound from "./pages/NotFound"
import './styles/App.css'

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
          <Route path="/article-detail/:codice" element={<ArticleDetail />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>

  )
}

export default App
