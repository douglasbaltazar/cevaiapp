import { object, string } from "zod";

export const createEventSchema = object({
    name: string().nonempty("Nome é obrigatório").max(60, "Nome muito longo"),
    bands: string()
        .nonempty("Ultimo nome é obrigatório")
        .max(255, "Ultimo nome é obrigatório"),
    // status: string().nonempty("Genero é obrigatório"),
});
