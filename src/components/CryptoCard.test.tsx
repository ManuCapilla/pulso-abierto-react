
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CryptoCard from './CryptoCard'
import { useFavoritesStore } from '../stores/favoritesStore'
import type { Crypto } from '../types/crypto'

const bitcoin: Crypto = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'btc',
  image: 'bitcoin.png',
  current_price: 95000,
  price_change_percentage_24h: 2.5,
  market_cap: 1800000000,
}

describe('CryptoCard', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] })
  })

  it('permite agregar una criptomoneda a favoritos desde la interfaz', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <CryptoCard crypto={bitcoin} />
      </MemoryRouter>
    )

    const boton = screen.getByRole('button', {
      name: 'Agregar Bitcoin a favoritos',
    })

    await user.click(boton)

    expect(
      screen.getByRole('button', {
        name: 'Quitar Bitcoin de favoritos',
      })
    ).toHaveAttribute('aria-pressed', 'true')
  })

  it('permite quitar una criptomoneda de favoritos desde la interfaz', async () => {
    const user = userEvent.setup()

    useFavoritesStore.setState({ favorites: ['bitcoin'] })

    render(
      <MemoryRouter>
        <CryptoCard crypto={bitcoin} />
      </MemoryRouter>
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Quitar Bitcoin de favoritos',
      })
    )

    expect(
      screen.getByRole('button', {
        name: 'Agregar Bitcoin a favoritos',
      })
    ).toHaveAttribute('aria-pressed', 'false')
  })
})
