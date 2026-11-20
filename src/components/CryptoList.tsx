
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { Crypto } from '../types/crypto'
import { obtenerCriptomonedas } from '../services/cryptoService'
import { cryptoSearchSchema } from '../schemas/cryptoSearchSchema'
import CryptoCard from './CryptoCard'

function CryptoList() {
  const [criptomonedas, setCriptomonedas] = useState<Crypto[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const [busqueda, setBusqueda] = useState('')
  const [tendencia, setTendencia] = useState('todas')
  const [busquedaAplicada, setBusquedaAplicada] = useState('')
  const [tendenciaAplicada, setTendenciaAplicada] = useState('todas')
  const [errores, setErrores] = useState<{
    busqueda?: string
    tendencia?: string
  }>({})

  async function cargarDatos() {
  try {
    const datos = await obtenerCriptomonedas()
    setCriptomonedas(datos)
    setError('')
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : 'Ocurrió un error inesperado'
    )
  } finally {
    setCargando(false)
  }
}

function actualizarDatos() {
  setCargando(true)
  setError('')
  void cargarDatos()
}

  useEffect(() => {
  let activo = true

  obtenerCriptomonedas()
    .then((datos) => {
      if (activo) {
        setCriptomonedas(datos)
        setError('')
      }
    })
    .catch((err) => {
      if (activo) {
        setError(
          err instanceof Error
            ? err.message
            : 'Ocurrió un error inesperado'
        )
      }
    })
    .finally(() => {
      if (activo) {
        setCargando(false)
      }
    })

  return () => {
    activo = false
  }
}, [])

  function manejarBusqueda(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    const resultado = cryptoSearchSchema.safeParse({
      busqueda,
      tendencia
    })

    if (!resultado.success) {
      const nuevosErrores: {
        busqueda?: string
        tendencia?: string
      } = {}

      resultado.error.issues.forEach((issue) => {
        const campo = issue.path[0] as string

        if (campo === 'busqueda' || campo === 'tendencia') {
          nuevosErrores[campo] = issue.message
        }
      })

      setErrores(nuevosErrores)
      return
    }

    setErrores({})
setBusquedaAplicada(resultado.data.busqueda)
setTendenciaAplicada(resultado.data.tendencia)
  }

  const criptomonedasFiltradas = criptomonedas.filter((crypto) => {
  const coincideBusqueda =
    crypto.name.toLowerCase().includes(busquedaAplicada.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(busquedaAplicada.toLowerCase())

  const variacion = crypto.price_change_percentage_24h

  const coincideTendencia =
    tendenciaAplicada === 'todas' ||
    (tendenciaAplicada === 'positivas' && variacion !== null && variacion > 0) ||
    (tendenciaAplicada === 'negativas' && variacion !== null && variacion < 0)

  return coincideBusqueda && coincideTendencia
})

  if (cargando) {
    return <p>Cargando cotizaciones...</p>
  }

  if (error) {
    return (
      <div>
        <p role="alert">{error}</p>
        <button type="button" onClick={actualizarDatos}>
          Volver a intentar
        </button>
      </div>
    )
  }

  if (criptomonedas.length === 0) {
  return (
    <section className="crypto-list">
      <p>No hay criptomonedas disponibles en este momento.</p>
      <button type="button" onClick={actualizarDatos}>
        Volver a intentar
      </button>
    </section>
  )
}

  return (
    <section className="crypto-list">
      <div className="crypto-list-header">
        <h2>Cotizaciones actuales</h2>

        <button type="button" onClick={actualizarDatos}>
          Actualizar precios
        </button>
      </div>

      <form onSubmit={manejarBusqueda}>
        <div>
          <label htmlFor="busqueda">Buscar criptomoneda</label>

          <input
            id="busqueda"
            type="text"
            value={busqueda}
            onChange={(evento) => {
              setBusqueda(evento.target.value)
              setErrores({})
            }}
            placeholder="Ejemplo: Bitcoin"
            aria-invalid={Boolean(errores.busqueda)}
            aria-describedby={
              errores.busqueda ? 'error-busqueda' : undefined
            }
          />

          {errores.busqueda && (
            <p id="error-busqueda" role="alert">
              {errores.busqueda}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="tendencia">Filtrar por tendencia</label>

          <select
            id="tendencia"
            value={tendencia}
            onChange={(evento) => {
              setTendencia(evento.target.value)
              setErrores({})
            }}
          >
            <option value="todas">Todas</option>
            <option value="positivas">Subieron</option>
            <option value="negativas">Bajaron</option>
          </select>
        </div>

        <button type="submit">
          Buscar
        </button>
      </form>

      <button
  type="button"
  onClick={() => {
    setBusqueda('')
    setTendencia('todas')
    setBusquedaAplicada('')
    setTendenciaAplicada('todas')
    setErrores({})
  }}
>
  Limpiar filtros
</button>

      <p aria-live="polite">
        Resultados encontrados: {criptomonedasFiltradas.length}
      </p>

      {criptomonedasFiltradas.length > 0 ? (
        <div className="crypto-grid">
          {criptomonedasFiltradas.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      ) : (
        <p>No se encontraron criptomonedas con esos criterios.</p>
      )}
    </section>
  )
}

export default CryptoList
