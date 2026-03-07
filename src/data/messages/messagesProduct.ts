export class MessagesProduct {


    static readonly EXPECTED_MESSAGES = [
        'Produto cadastrado com sucesso'
    ];

    static readonly EXPECTED_MESSAGES_PRODUCT_DUPLICATED = [
        'Já existe produto com esse nome'
    ]

    static readonly EXPECTED_MESSAGES_ERROR = [
        'Preco deve ser um número positivo',
        'Quantidade deve ser maior ou igual a 0'
    ];

    static readonly EXPECTED_MESSAGES_ERROR_VALIDATION = [
        'Nome é obrigatório',
        'Preco é obrigatório',
        'Descricao é obrigatório',
        'Quantidade é obrigatório'
    ];

    static getExpectedMessagesError(): string[] {
        return this.EXPECTED_MESSAGES_ERROR;
    }

    static getExpectedMessagesErrorValidation(): string[] {
        return this.EXPECTED_MESSAGES_ERROR_VALIDATION;
    }

    static getExpectedMessagesProductDuplicated(): string[] {
        return this.EXPECTED_MESSAGES_PRODUCT_DUPLICATED;
    }
}
