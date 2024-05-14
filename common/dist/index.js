"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBloginput = exports.createBloginput = exports.loginSchema = exports.bodySchema = void 0;
const zod_1 = require("zod");
exports.bodySchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(5, "your username should have at least more then 5 characters"),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]+$/, "Password must contain at least one uppercase letter, one digit, and one of special character"),
    email: zod_1.z.string().email(),
    firstname: zod_1.z.string().optional(),
    lastname: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(5, "your username should have at least more then 5 characters"),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]+$/, "Password must contain at least one uppercase letter, one digit, and one of special character"),
});
exports.createBloginput = zod_1.z.object({
    Title: zod_1.z.string(),
    content: zod_1.z.string(),
    summary: zod_1.z.string(),
    userId: zod_1.z.number(),
});
exports.updateBloginput = zod_1.z.object({
    Title: zod_1.z.string(),
    content: zod_1.z.string(),
    summary: zod_1.z.string(),
    id: zod_1.z.number(),
});
