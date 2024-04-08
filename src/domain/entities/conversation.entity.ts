import { Entity } from 'src/core/entities/entity';

import { User } from './user.entity';
import { Message } from './message.entity';

export interface ConversationProps {
  id?: string;
  members: User[];
  messages?: Message[];
}

export class Conversation extends Entity<ConversationProps> {
  constructor(props: ConversationProps) {
    super(props);
  }

  get id(): string {
    return this.props.id!;
  }

  get members(): User[] {
    return this.props.members;
  }

  get messages(): Message[] {
    return this.props.messages || [];
  }

  get currentState(): ConversationProps {
    return this.props;
  }
}
