import { Injectable } from '@nestjs/common';
import { prisma } from '../../../shared/utils/prisma';
import { User } from '../entities/user.entity';
import { IUser } from '../interfaces/entities';
import { IUserRepository } from '../interfaces/repositories';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  async create(User: IUser): Promise<User> {
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

  async update(user: IUser): Promise<User> {
    const userPrisma = await prisma.userPrisma.update({
      where: { id: user.id },
      data: UserMapper.toPrismaModel(user),
      include: {
        reservations: true,
      },
    });

    return UserMapper.toEntity(userPrisma);
  }

  async delete(id: number): Promise<User> {
    const user = await prisma.userPrisma.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return UserMapper.toEntity(user);
  }
}
