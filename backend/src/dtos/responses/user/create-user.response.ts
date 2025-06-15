import { User } from '../../../entities';

export interface ICreateUserResponse {
  id: number;
  name: string;
  email: string;
}

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
