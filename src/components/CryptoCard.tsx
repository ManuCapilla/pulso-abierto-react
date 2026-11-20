
import { Link } from 'react-router-dom'
import type { Crypto } from '../types/crypto'
import { useFavoritesStore } from '../stores/favoritesStore'

interface CryptoCardProps {
  crypto: Crypto
}

function CryptoCard({ crypto }: CryptoCardProps) {
  const variacion = crypto.price_change_percentage_24h ?? 0

  // Consultamos el estado global de favoritos
  const isFavorite = useFavoritesStore(
    (state) => state.favorites.includes(crypto.id)
  )

  // Obtenemos la acción para agregar o quitar favoritos
  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  )

  return (
    <article className="crypto-card">
      <div className="crypto-info">
        <img
          src={crypto.image}
          alt={`Logo de ${crypto.name}`}
          className="crypto-image"
        />

        <div>
          <h3>{crypto.name}</h3>
          <span>{crypto.symbol.toUpperCase()}</span>
        </div>
      </div>

      <p className="crypto-price">
        ${crypto.current_price.toLocaleString('en-US')}
      </p>

      <p className={variacion >= 0 ? 'positivo' : 'negativo'}>
        {variacion.toFixed(2)}%
      </p>

            <div className="crypto-actions">
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

        <Link to={`/criptomonedas/${crypto.id}`}>
          Ver detalles
        </Link>
      </div>

    </article>
  )
}

export default CryptoCard
