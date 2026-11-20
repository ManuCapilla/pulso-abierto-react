
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CryptoList from './CryptoList'
import { obtenerCriptomonedas } from '../services/cryptoService'

vi.mock('../services/cryptoService', () => ({
  obtenerCriptomonedas: vi.fn(),
}))

describe('CryptoList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('muestra un error y permite reintentar la consulta', async () => {
    const user = userEvent.setup()

    vi.mocked(obtenerCriptomonedas)
      .mockRejectedValueOnce(new Error('Error de conexión'))
      .mockResolvedValueOnce([])

    render(
      <MemoryRouter>
        <CryptoList />
      </MemoryRouter>
    )

    // Comprobamos que aparece el error
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Error de conexión'
    )

    // Reintentamos la consulta
    await user.click(
      screen.getByRole('button', { name: 'Volver a intentar' })
    )

    // Comprobamos que la recuperación funcionó
    expect(
      await screen.findByText(
        'No hay criptomonedas disponibles en este momento.'
      )
    ).toBeInTheDocument()

    expect(obtenerCriptomonedas).toHaveBeenCalledTimes(2)

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })
})
