import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { CarModule } from './car.module';
import { ReservationModule } from './reservation.module';
import { UserModule } from './user.module';

@Module({
  imports: [AuthModule, UserModule, CarModule, ReservationModule],
})
export class AppModule {}
