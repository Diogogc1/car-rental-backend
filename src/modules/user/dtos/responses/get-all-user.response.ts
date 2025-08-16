import { User } from '../../entities/user.entity';
import { IGetAllUserResponse } from '../../interfaces/dto/responses/get-all-user-response.interface';

export class GetAllUserResponse implements IGetAllUserResponse {
  id: number;
  name: string;
  email: string;

  constructor(props: IGetAllUserResponse) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
  }

  static fromEntity(user: User): GetAllUserResponse {
    return new GetAllUserResponse({
      id: user.id!,
      name: user.name,
      email: user.email,
    });
  }
}
