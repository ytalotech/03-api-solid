import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase
describe('Check in use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-1',
      title: 'Academia do Zé',
      description: null,
      phone: null,
      latitude: new Decimal(-4.3575675),
      longitude: new Decimal(-38.0288483),
    })

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
      userLatitude: -4.3575675,
      userLongitude: -38.0288483,
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
      userLatitude: -4.3575675,
      userLongitude: -38.0288483,
    })

    await expect(
      sut.execute({
        userId: 'user-1',
        gymId: 'gym-1',
        userLatitude: -4.3575675,
        userLongitude: -38.0288483,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice but in different days', async () => {
    // para garantir que o check in nao foi criado no mesmo dia
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -4.3575675,
      userLongitude: -38.0288483,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -4.3575675,
      userLongitude: -38.0288483,
    })

    expect(checkIn.id).toEqual(expect.any(String))

    // retorna um valor nao invalido "toBeTruthy"
  })
})
