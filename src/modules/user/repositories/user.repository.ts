import { Injectable } from '@nestjs/common';
import { prisma } from '../../../shared/utils/prisma';
import { User } from '../entities/user.entity';
import { IUpdateUserByIdPayload } from '../interfaces/dto/payloads';
import { IUser } from '../interfaces/entities';
import { IUserRepository } from '../interfaces/repositories';
import { UserMapper } from '../mappers';

@Injectable()
export class UserRepository implements IUserRepository {
  async persist(user: IUser): Promise<User> {
    const userPrisma = await prisma.userPrisma.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });

    return UserMapper.toEntity(userPrisma);
  }

  async findById(id: number): Promise<User | null> {
    const userPrisma = await prisma.userPrisma.findUnique({
      where: { id, deletedAt: null },
      include: {
        reservations: {
          where: {
            deletedAt: null,
          },
        },
      },
    });

    if (!userPrisma) {
      return null;
    }

    return UserMapper.toEntity(userPrisma);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userPrisma = await prisma.userPrisma.findFirst({
      where: { email },
    });

    if (!userPrisma) {
      return null;
    }

    return UserMapper.toEntity(userPrisma);
  }

  async update(
    id: number,
    user: Partial<Omit<IUpdateUserByIdPayload, 'id'>>,
  ): Promise<User> {
    const userPrisma = await prisma.userPrisma.update({
      where: { id: id },
      data: user,
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
