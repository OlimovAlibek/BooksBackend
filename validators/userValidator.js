const {z} = require("zod")

const registerSchema = z.object({
    ism: z.string().min(3).trim().max(15),
    familiya: z.string().min(3, "Minimum 3 ta harf bo'lsin").trim().max(15),
    yosh: z.number().int().min(1),
    email: z.string().email().trim(),
    parol: z.string().min(8)
})

const loginSchema = z.object({
    email: z.string().email().trim(),
    parol: z.string().min(8)
})

module.exports = {registerSchema, loginSchema}