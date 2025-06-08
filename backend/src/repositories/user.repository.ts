import { IUser, User } from 'src/entities';
import { prisma } from './prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserMapper } from 'src/mappers';

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
      where: { id, deletedAt: null },
      include: {
        reservations: true,
      },
    });

    if (!userPrisma) {
      return null;
    }

    return UserMapper.toEntity(userPrisma);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userPrisma = await prisma.userPrisma.findFirst({
      where: { email, deletedAt: null },
      include: {
        reservations: true,
      },
    });

    if (!userPrisma) {
      return null;
    }

    return UserMapper.toEntity(userPrisma);
  }

  async update(id: number, user: IUser): Promise<User | null> {
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

  async delete(id: number): Promise<void | null> {
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
        return null;
      }
      throw error;
    }
  }
}
