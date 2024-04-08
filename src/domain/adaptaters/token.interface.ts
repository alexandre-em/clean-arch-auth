import { Role, User } from '../entities';

export interface ITokenPayload {
  sub: string; // user id
  name: string;
  email: string;
  image?: string;
  iat?: number; // issued at time
  exp?: number; // expiration time
  aud: string | string[];
  role: Role;
}

export function UserToTokenPayload(user: User) {
  return {
    sub: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role || Role.USER,
    aud: 'http://localhost:3000', // TODO: put dynamically the domain
  };
}

export abstract class TokenService {
  abstract verifyToken(token: string): Promise<any>;
  abstract generateToken(payload: ITokenPayload, secret: string, expiresIn: string | number): string;
}
