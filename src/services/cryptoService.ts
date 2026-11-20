
import type { Crypto } from '../types/crypto'

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets'

export async function obtenerCriptomonedas(): Promise<Crypto[]> {
  const parametros = new URLSearchParams({
    vs_currency: 'usd',
    ids: 'bitcoin,ethereum,solana',
    order: 'market_cap_desc',
    per_page: '3',
    page: '1',
    sparkline: 'false'
  })

  const respuesta = await fetch(`${API_URL}?${parametros}`)

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener las criptomonedas')
  }

  const datos: Crypto[] = await respuesta.json()

  return datos
}

export async function obtenerDetalleCriptomoneda(
  id: string
): Promise<Crypto> {
  const respuesta = await fetch(
    `${API_URL}?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=1&page=1&sparkline=false`
  )

  if (!respuesta.ok) {
    throw new Error('No se pudo obtener el detalle de la criptomoneda')
  }

  const datos: Crypto[] = await respuesta.json()

  if (datos.length === 0) {
    throw new Error('No se encontró esa criptomoneda')
  }

  return datos[0]
}
