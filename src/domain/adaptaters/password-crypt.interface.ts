export abstract class PasswordCryptService {
  abstract hash(hashString: string): Promise<string>;
  abstract compare(password: string, hashedPassword: string): Promise<boolean>;
}
