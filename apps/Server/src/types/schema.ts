import z from 'zod';

export const SignupSchema = z.object({
    name: z.string().min(3),
    username: z.string().min(5),
    password: z.string().min(6),
    role: z.enum(["Admin", "User"]),
});

export const LoginSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(8),
});