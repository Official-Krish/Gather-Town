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

export const UpdateMetaDataSchema = z.object({
    avatarId: z.string()
});

export const CreateSpaceSchema = z.object({
    name : z.string(),
    dimensions : z.string().regex(/^[0-9]{1-4}x[0-9]{1-4}$/),
    mapId : z.string(),
});

export const AddElementSchema = z.object({
    elementId : z.string(),
    spaceId : z.string(),
    x: z.number(),
    y: z.number(),
});

export const CreateElementSchema = z.object({
    imageUrl : z.string(),
    width : z.number(),
    height : z.number(),
    static : z.boolean(),
});

export const UpdateElementSchema = z.object({
    imageUrl : z.string(),
});

export const createAvatarSchema = z.object({
    name : z.string(),
    imageUrl : z.string(),
});

export const createMapSchema = z.object({
    name : z.string(),
    thumbnail : z.string(),
    dimensions : z.string().regex(/^[0-9]{1-4}x[0-9]{1-4}$/),
    defaultElements : z.array(z.object({
        elementId : z.string(),
        x : z.number(),
        y : z.number(),
    })),
});

export const deleteElementSchema = z.object({
    id : z.string(),
});


declare global {
    namespace Express {
      export interface Request {
        userId?: string;
        role?: "Admin" | "User";
      }
    }
}