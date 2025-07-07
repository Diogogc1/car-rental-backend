import { User } from '../../entities/user.entity';
import { IGetUserByIdResponse } from '../../interfaces/dto/responses';

export class GetUserByIdResponse implements IGetUserByIdResponse {
  id: number;
  name: string;
  email: string;

  constructor(props: IGetUserByIdResponse) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
  }

  static fromEntity(user: User): GetUserByIdResponse {
    return new GetUserByIdResponse({
      id: user.id!,
      name: user.name,
      email: user.email,
    });
  }
}
