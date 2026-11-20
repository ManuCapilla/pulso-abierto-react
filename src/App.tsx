
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import CryptoList from './components/CryptoList'
import CryptoDetail from './pages/CryptoDetail'


function Inicio() {
  return (
    <main className="contenedor">
      <h2>Bienvenido a Pulso Abierto</h2>

      <p>
        Consultá las cotizaciones de las principales criptomonedas.
      </p>

      <CryptoList />
    </main>
  )
}


function NoEncontrado() {
  return (
    <main className="contenedor">
      <h2>Página no encontrada</h2>
      <p>La dirección que buscás no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  )
}

function App() {
  return (
    <>
      <header className="encabezado">
        <h1>Pulso Abierto</h1>
        <p>Tu espacio para consultar criptomonedas</p>
        <nav>
          <Link to="/">Inicio</Link>
        </nav>
      </header>

      <Routes>
  <Route path="/" element={<Inicio />} />
  <Route path="/criptomonedas/:id" element={<CryptoDetail />} />
  <Route path="*" element={<NoEncontrado />} />
</Routes>

      <footer className="pie">
        <p>© 2026 Pulso Abierto</p>
      </footer>
    </>
  )
}

export default App
