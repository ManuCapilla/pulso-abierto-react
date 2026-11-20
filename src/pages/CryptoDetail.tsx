
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Crypto } from '../types/crypto'
import { obtenerDetalleCriptomoneda } from '../services/cryptoService'
import { useFavoritesStore } from '../stores/favoritesStore'

function CryptoDetail() {
  const { id } = useParams()

  const [crypto, setCrypto] = useState<Crypto | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  // Consultamos el estado global de favoritos
  const isFavorite = useFavoritesStore(
    (state) => id ? state.favorites.includes(id) : false
  )

  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  )

  useEffect(() => {
    async function cargarDetalle() {
      try {
        setCargando(true)
        setError('')

        if (!id) {
          throw new Error('No se indicó una criptomoneda')
        }

        const datos = await obtenerDetalleCriptomoneda(id)
        setCrypto(datos)

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

    cargarDetalle()
  }, [id])

  if (cargando) {
    return (
      <main className="contenedor">
        <p>Cargando detalle...</p>
      </main>
    )
  }

  if (error || !crypto) {
    return (
      <main className="contenedor">
        <p role="alert">
          {error || 'No se encontró la criptomoneda'}
        </p>
        <Link to="/">Volver al inicio</Link>
      </main>
    )
  }

  return (
    <main className="contenedor">
      <Link to="/">← Volver a las cotizaciones</Link>

      <h2>{crypto.name}</h2>

      <img
        src={crypto.image}
        alt={`Logo de ${crypto.name}`}
        width="70"
      />

      <p>Símbolo: {crypto.symbol.toUpperCase()}</p>

      <p>
        Precio actual: ${crypto.current_price.toLocaleString('en-US')}
      </p>

      <p>
        Variación en 24 horas:{' '}
        {crypto.price_change_percentage_24h?.toFixed(2) ?? 'Sin datos'}%
      </p>

      <p>
        Capitalización de mercado:{' '}
        ${crypto.market_cap.toLocaleString('en-US')}
      </p>

      <button
        type="button"
        onClick={() => toggleFavorite(crypto.id)}
        aria-pressed={isFavorite}
        aria-label={
          isFavorite
            ? `Quitar ${crypto.name} de favoritos`
            : `Agregar ${crypto.name} a favoritos`
        }
      >
        {isFavorite ? '★ Favorito' : '☆ Agregar a favoritos'}
      </button>
    </main>
  )
}

export default CryptoDetail
