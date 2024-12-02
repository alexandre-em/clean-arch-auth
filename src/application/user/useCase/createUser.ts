import { Injectable } from '@nestjs/common';

import { PasswordCryptService } from 'src/domain/adaptaters/password-crypt.interface';
import { User } from 'src/domain/entities';

import { UserRepository } from '../ports/user.repository';

interface CreateUserUseCaseCommand {
  name: string;
  email: string;
  password: string;

  phone: string;
  address: string;
  city: string;
  postal: string;
  country: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private pcs: PasswordCryptService,
  ) {}

  async execute(props: CreateUserUseCaseCommand): Promise<any> {
    const createdAt = new Date();
    const password = await this.pcs.hash(props.password);

    const user = new User({
      ...props,
      password,
      createdAt,
    });

    const response = await this.userRepository.create(user);

    return response;
  }
}
