"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHelperFn = exports.MessagesHelper = void 0;
exports.MessagesHelper = {
    PASSWORD_VALID: 'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais.',
    EMAIL_INVALID: 'O campo email não corresponde a um email válido.',
};
function MessageHelperFn(field) {
    return `O campo ${field} é obrigatório.`;
}
exports.MessageHelperFn = MessageHelperFn;
//# sourceMappingURL=messages.helper.js.map