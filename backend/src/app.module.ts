import { Module } from '@nestjs/common';
import { CarModule } from './car.module';
import { AppController } from './controllers';
import { ReservationModule } from './reservation.module';
import { AppService } from './use-cases';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, CarModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
