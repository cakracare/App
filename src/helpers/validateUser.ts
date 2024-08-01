import {UserSchema, User} from "../Types";

export function validateUser(data: any) {
    try {
        const user = UserSchema.parse(data);
        return { success: true, data: user as User };
    } catch (e: any) {
        console.log("Zod Validation Error:", e.errors);
        return { success: false, error: e.errors || [] };
    }
}

interface ZodErrorDetail {
    path: (string | number)[];
    message: string;
}

export const handleZodError = (errors: any) => {
    const errorMessages: { [key: string]: string } = {};

    if (Array.isArray(errors)) {
        errors.forEach((error: any) => {
            const { path, message } = error;
            const field = path[0];
            errorMessages[field] = message;
        });
    } else if (errors && errors.errors) {
        // Zod error handling, if `errors.errors` is an array
        errors.errors.forEach((error: any) => {
            const { path, message } = error;
            const field = path[0];
            errorMessages[field] = message;
        });
    }

    return errorMessages;
};