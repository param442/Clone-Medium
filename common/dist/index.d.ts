import { z } from "zod";
export declare const bodySchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
    firstname: z.ZodOptional<z.ZodString>;
    lastname: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    email: string;
    firstname?: string | undefined;
    lastname?: string | undefined;
}, {
    username: string;
    password: string;
    email: string;
    firstname?: string | undefined;
    lastname?: string | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const createBloginput: z.ZodObject<{
    Title: z.ZodString;
    content: z.ZodString;
    summary: z.ZodString;
    userId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    Title: string;
    content: string;
    summary: string;
    userId: number;
}, {
    Title: string;
    content: string;
    summary: string;
    userId: number;
}>;
export declare const updateBloginput: z.ZodObject<{
    Title: z.ZodString;
    content: z.ZodString;
    summary: z.ZodString;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    Title: string;
    content: string;
    summary: string;
    id: number;
}, {
    Title: string;
    content: string;
    summary: string;
    id: number;
}>;
export type Inputs = {
    id: number;
    name: string;
    placeholder: string;
    type: string;
    label: string;
};
export type CreateBlogInput = z.infer<typeof createBloginput>;
export type UpdateBloginput = z.infer<typeof updateBloginput>;
export type login = z.infer<typeof loginSchema>;
export type body = z.infer<typeof bodySchema>;
