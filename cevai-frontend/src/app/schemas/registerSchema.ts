import { object, string } from "zod";
import { RegexHelper } from "../utils/utils";

export const registerSchema = object({
    firstName: string()
        .nonempty("Nome é obrigatório")
        .max(40, "Nome muito longo"),
    lastName: string()
        .nonempty("Ultimo nome é obrigatório")
        .max(40, "Ultimo nome é obrigatório"),
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
    confirm_password: string()
        .min(8, "Senha deve ter no minimo 8 caracteres")
        .max(32, "Senha deve ter no máximo 32 caracteres")
        .regex(
            RegexHelper.passwordRegex,
            "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais."
        ),
    gender: string().nonempty("Genero é obrigatório"),
}).refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "As senhas não conferem",
});
