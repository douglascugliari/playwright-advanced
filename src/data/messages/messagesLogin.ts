export class MessagesLogin {

    static readonly INVALID_EMAIL_MESSAGES = [
        'Enter an email address',
        'Please enter an email address',
        'Please include an "@" in the email address',
        "Please include an '@' in the email address",
        'Inclua um "@" no endereço de e-mail.'
    ];


    static getMessagesInvalidEmail() {
        return this.INVALID_EMAIL_MESSAGES;
    }
}