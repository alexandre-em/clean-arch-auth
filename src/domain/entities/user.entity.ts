import { Entity } from 'src/core/entities/entity';

export enum Role {
  ADMIN,
  USER,
}

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  emailVerifiedAt?: Date;
  password: string;
  description?: string;
  role?: Role;
  image?: string;

  googleId?: string;
  facebookId?: string;
  stripeId?: string;

  phone?: string;
  address?: string;
  city?: string;
  postal?: string;
  country?: string;

  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }

  get id(): string {
    return this.props.id!;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get emailVerifiedAt(): Date {
    return this.props.emailVerifiedAt!;
  }

  get password(): string {
    return this.props.password;
  }

  get image(): string | undefined {
    return this.props.image;
  }

  get description(): string {
    return this.props.description || '';
  }

  get role(): Role | undefined {
    return this.props.role;
  }

  get googleId(): string | undefined {
    return this.props.googleId;
  }

  get facebookId(): string | undefined {
    return this.props.googleId;
  }

  get stripeId(): string | undefined {
    return this.props.googleId;
  }

  get phone(): string | undefined {
    return this.props.phone;
  }

  get address(): string | undefined {
    return this.props.address;
  }

  get city(): string | undefined {
    return this.props.city;
  }

  get postal(): string | undefined {
    return this.props.postal;
  }

  get country(): string | undefined {
    return this.props.country;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  get currentState(): UserProps {
    return this.props;
  }
}
