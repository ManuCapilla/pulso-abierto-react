
import { describe, it, expect, beforeEach } from 'vitest'
import { useFavoritesStore } from './favoritesStore'

describe('Favorites Store', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] })
  })

  it('debe agregar una criptomoneda a favoritos', () => {
    useFavoritesStore.getState().toggleFavorite('bitcoin')

    expect(useFavoritesStore.getState().favorites).toContain('bitcoin')
  })

  it('debe quitar una criptomoneda de favoritos', () => {
    useFavoritesStore.setState({ favorites: ['bitcoin'] })

    useFavoritesStore.getState().toggleFavorite('bitcoin')

    expect(useFavoritesStore.getState().favorites).not.toContain('bitcoin')
  })

  it('debe reconocer si una criptomoneda es favorita', () => {
    useFavoritesStore.setState({ favorites: ['ethereum'] })

    expect(useFavoritesStore.getState().isFavorite('ethereum')).toBe(true)
  })
})
