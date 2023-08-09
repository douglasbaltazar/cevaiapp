export const MessagesHelper = {
  PASSWORD_VALID:
    'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais.',
  EMAIL_INVALID: 'O campo email não corresponde a um email válido.',
};

export function MessageHelperFn(field: string) {
  return `O campo ${field} é obrigatório.`;
}