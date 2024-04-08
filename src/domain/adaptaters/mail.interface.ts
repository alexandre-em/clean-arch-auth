export interface IMailPayload {
  to: string;
  subject?: string;
  template?: string; // static http name file
  context?: Record<string, string | number>; // custom variables from the template
}

export abstract class MailService {
  abstract sendMail(payload: IMailPayload): void;
}
