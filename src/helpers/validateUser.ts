import {UserSchema} from "../Types";


export function validateUser(data: any) {
    try {
        const user = UserSchema.parse(data);
        return { success: true, data: user };
    } catch (e: any) {
        return { success: false, error: e.errors };
    }
}