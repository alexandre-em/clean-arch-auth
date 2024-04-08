import { Injectable } from '@nestjs/common';

import { UserRepository } from '../ports/user.repository';

interface GetUserByIdUseCaseCommand {
  id: string;
}

@Injectable()
export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: GetUserByIdUseCaseCommand): Promise<any> {
    const response = await this.userRepository.findById(id);

    return response;
  }
}
