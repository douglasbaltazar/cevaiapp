export const MessagesHelper = {
  PASSWORD_VALID:
    'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais.',
  EMAIL_INVALID: 'O campo email não corresponde a um email válido.',
  PASSWORD_OR_EMAIL_INVALID: 'E-mail e/ou senha são inválidos.',
  ERROR_404: 'Not Found',
  ERROR_404_MSG_USER_EVENT: 'Não existe usuario e/ou evento com esse id.',
  USER_ALREADY_EVENT: 'O Usuario já está confirmado no Evento.',
  USER_NOT_IN_EVENT: 'O Usuario não está confirmado no Evento.',
};

export function MessageHelperFn(field: string) {
  return `O campo ${field} é obrigatório.`;
}

export function MessageHelperAlreadyExistsFn(field: string) {
  return `O ${field} já está cadastrado`;
}
