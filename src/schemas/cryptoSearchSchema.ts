
import { z } from 'zod'

export const cryptoSearchSchema = z.object({
  busqueda: z
    .string()
    .trim()
    .min(2, 'Ingresá al menos 2 caracteres')
    .max(30, 'Máximo 30 caracteres'),

  tendencia: z.enum([
    'todas',
    'positivas',
    'negativas'
  ])
})

export type CryptoSearchForm = z.infer<
  typeof cryptoSearchSchema
>
