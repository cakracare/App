import { z } from 'zod';

// Definisikan skema User
export const UserSchema = z.object({
    nama_lengkap: z.string().min(1, { message: "Nama lengkap tidak boleh kosong" }),
    photoURL: z.string().optional(),
    email: z.string().email({ message: "Format email tidak valid" }),
    usia: z.string()
        .refine(value => /^\d+$/.test(value) && Number(value) > 0, { message: "Usia harus berupa angka positif" }),
    kelas: z.string().min(1, { message: "Kelas tidak boleh kosong" }),
    asal_sekolah: z.string().min(1, { message: "Asal sekolah tidak boleh kosong" }),
    no_ortu: z.string().min(1, { message: "Nomor orang tua tidak boleh kosong" }),
    alamat_lengkap: z.string().min(1, { message: "Alamat lengkap tidak boleh kosong" }),
    password: z.string().min(8, { message: "Password harus terdiri dari minimal 8 karakter" }),
    confirm_password: z.string().min(8, { message: "Confirm Password harus terdiri dari minimal 8 karakter" }),
    gender: z.enum(['male', 'female'], { message: "Gender harus 'male' atau 'female'" }),
}).refine(data => data.password === data.confirm_password, {
    message: "Password dan Confirm Password harus sama",
    path: ["confirm_password"], // Field yang akan menerima pesan error
});


export enum UserRole {
    STUDENT = 'student',
    TEACHER = 'teacher',
}

// Tipe TypeScript dari skema
export type User = z.infer<typeof UserSchema>;


