import { Car } from './car.entity';
import { User } from './user.entity';

export class Reservation {
  id: string;
  startDate: Date;
  endDate: Date;
  car: Car;
  user: User;
  totalPrice: number;

  constructor(
    id: string,
    startDate: Date,
    endDate: Date,
    car: Car,
    user: User,
    totalPrice: number,
  ) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.car = car;
    this.user = user;
    this.totalPrice = totalPrice;
  }
}
