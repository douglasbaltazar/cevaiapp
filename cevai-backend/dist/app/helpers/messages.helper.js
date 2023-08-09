"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHelperFn = exports.MessagesHelper = void 0;
exports.MessagesHelper = {
    PASSWORD_VALID: 'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais.',
    EMAIL_INVALID: 'O campo email não corresponde a um email válido.',
    PASSWORD_OR_EMAIL_INVALID: 'E-mail e/ou senha são inválidos.',
};
function MessageHelperFn(field) {
    return `O campo ${field} é obrigatório.`;
}
exports.MessageHelperFn = MessageHelperFn;
//# sourceMappingURL=messages.helper.js.map