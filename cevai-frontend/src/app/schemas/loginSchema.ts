import { object, string } from "zod";
import { RegexHelper } from "../utils/utils";

export const loginSchema = object({
    email: string()
        .nonempty("Email é obrigatório")
        .max(255, "O Email está muito longo")
        .email("O Email é inválido"),
    password: string()
        .nonempty("Senha é obrigatório")
        .min(8, "Senha deve ter no minimo 8 caracteres")
        .max(32, "Senha deve ter no máximo 32 caracteres")
        .regex(
            RegexHelper.passwordRegex,
            "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais."
        ),
});
