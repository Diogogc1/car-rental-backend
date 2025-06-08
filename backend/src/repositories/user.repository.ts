import { User } from 'src/entities';
import { prisma } from './prisma';
import { UserMapper } from 'src/mappers/user.mapper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class UserRepository {
  async create(User: User): Promise<User> {
    const userPrisma = await prisma.userPrisma.create({
      data: {
        email: User.email,
        name: User.name,
        password: User.password,
      },
      include: {
        reservations: true,
      },
    });

    return UserMapper.toEntity(userPrisma);
  }

  async findById(id: number): Promise<User | null> {
    const userPrisma = await prisma.userPrisma.findUnique({
      where: { id },
      include: {
        reservations: true,
      },
    });

    if (!userPrisma) {
      return null;
    }

    return UserMapper.toEntity(userPrisma);
  }

  async update(id: number, user: User): Promise<User | null> {
    try {
      const userPrisma = await prisma.userPrisma.update({
        where: { id },
        data: UserMapper.toPrismaModel(user),
        include: {
          reservations: true,
        },
      });

      return UserMapper.toEntity(userPrisma);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null;
      }
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.userPrisma.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return;
      }
      throw error;
    }
  }
}
