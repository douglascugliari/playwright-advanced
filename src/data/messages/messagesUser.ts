export class MessagesUser {
    static readonly INVALID_MESSAGES: string[] = [
        'Nome é obrigatório',
        'Email é obrigatório',
        'Password é obrigatório'
    ];

    static getMessagesInvalid(): string[] {
        return this.INVALID_MESSAGES;
    }
}
