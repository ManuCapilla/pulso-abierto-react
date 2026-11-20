
import { describe, it, expect, vi, afterEach } from 'vitest'
import { obtenerCriptomonedas } from './cryptoService'
import type { Crypto } from '../types/crypto'

const criptomonedaPrueba: Crypto = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'btc',
  image: 'bitcoin.png',
  current_price: 95000,
  price_change_percentage_24h: 2.5,
  market_cap: 1800000000,
}

describe('Servicio de criptomonedas', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('debe devolver criptomonedas cuando la respuesta es exitosa', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [criptomonedaPrueba],
    } as Response)

    const resultado = await obtenerCriptomonedas()

    expect(fetchMock).toHaveBeenCalledOnce()
    expect(resultado).toEqual([criptomonedaPrueba])
    expect(resultado[0].name).toBe('Bitcoin')
  })

  it('debe generar un error cuando la respuesta HTTP falla', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => [],
    } as Response)

    await expect(obtenerCriptomonedas()).rejects.toThrow(
      'No se pudieron obtener las criptomonedas'
    )
  })
})
