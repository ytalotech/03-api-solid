import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase
describe('Check in use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

    // vai criar um mock para o timer antes dos testes
    vi.useFakeTimers()
  })

  afterEach(() => {
    // vai usar o timer real depois dos testes
    vi.useRealTimers()
  })

  // deve ser possivel
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    console.log(checkIn.created_at)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // red, green, refactor
  // nao deve ser possivel
  it('should not be able to check in twice in the same day', async () => {
    // para garantir que o check in nao foi criado no mesmo dia
    vi.setSystemTime(new Date(2022, 0, 1, 10, 0, 0))

    await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    await expect(
      sut.execute({
        userId: 'user-1',
        gymId: 'gym-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice but in different days', async () => {
    // para garantir que o check in nao foi criado no mesmo dia
    vi.setSystemTime(new Date(2022, 0, 1, 10, 0, 0))

    await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    vi.setSystemTime(new Date(2022, 0, 1, 21, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))

    // retorna um valor nao invalido "toBeTruthy"
  })
})
