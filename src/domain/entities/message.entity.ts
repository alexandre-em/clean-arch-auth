import { Entity } from 'src/core/entities/entity';
import { User } from './user.entity';

export interface MessageProps {
  id?: string;
  author: User;
  sendAt: Date;
  content: string;
}

export class Message extends Entity<MessageProps> {
  constructor(props: MessageProps) {
    super(props);
  }

  get id(): string {
    return this.props.id!;
  }

  get author(): User {
    return this.props.author;
  }

  get content(): string {
    return this.props.content;
  }

  get sendAt(): Date {
    return this.sendAt;
  }

  get currentState(): MessageProps {
    return this.props;
  }
}
