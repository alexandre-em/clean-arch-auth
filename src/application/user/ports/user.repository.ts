import { User } from 'src/domain/entities/user.entity';

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | Error>;
  abstract findByEmail(email: string): Promise<User | Error>;
  abstract create(data: User): Promise<User>;
  abstract update(id: string, data: Partial<User>): Promise<User>;
  abstract delete(id: string): Promise<User>;
  abstract appendFavorite(id: string, park: string): Promise<User>;
  abstract appendPark(id: string, park: string): Promise<User>;
  abstract appendReservation(id: string, reservation: string): Promise<User>;
}
