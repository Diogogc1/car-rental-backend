import { User } from '../../entities/user.entity';
import { IUpdateUserByIdResponse } from '../../interfaces/dto/responses';

export class UpdateUserByIdResponse implements IUpdateUserByIdResponse {
  id: number;
  name: string;
  email: string;

  constructor(props: IUpdateUserByIdResponse) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
  }

  static fromEntity(user: User): UpdateUserByIdResponse {
    return new UpdateUserByIdResponse({
      id: user.id!,
      name: user.name,
      email: user.email,
    });
  }
}
