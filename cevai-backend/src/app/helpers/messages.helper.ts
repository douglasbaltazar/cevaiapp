export const MessagesHelper = {
  PASSWORD_VALID:
    'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais.',
  EMAIL_INVALID: 'O campo email não corresponde a um email válido.',
  PASSWORD_OR_EMAIL_INVALID: 'E-mail e/ou senha são inválidos.',
};

export function MessageHelperFn(field: string) {
  return `O campo ${field} é obrigatório.`;
}
