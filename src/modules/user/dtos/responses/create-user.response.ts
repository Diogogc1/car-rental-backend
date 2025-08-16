import { User } from '../../entities/user.entity';
import { ICreateUserResponse } from '../../interfaces/dto/responses/create-user-response.interface';

export class CreateUserResponse implements ICreateUserResponse {
  id: number;
  name: string;
  email: string;

  constructor(props: ICreateUserResponse) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
  }

  static fromEntity(user: User): CreateUserResponse {
    return new CreateUserResponse({
      id: user.id!,
      name: user.name,
      email: user.email,
    });
  }
}
