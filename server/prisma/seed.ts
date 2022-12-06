import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'johndoeee@gmail.com',
            avatarUrl: 'https://github.com/alisson98sb.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'FirstPool',
            code: 'BOL001',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    });

    await prisma.game.create({
        data: {
            date: '2022-11-24T16:00:00.111Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'RS'
        }
    });

    await prisma.game.create({
        data: {
            date: '2022-11-28T13:00:00.111Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'CH',

            guesses: {
                create: {
                    fistTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    });
}

main()