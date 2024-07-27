import { z } from 'zod';

// Definisikan skema User
export const UserSchema = z.object({
    nama_lengkap: z.string(),
    photoURL: z.string().optional(),
    email: z.string().email(),
    usia: z.number().optional(),
    kelas: z.string().max(10).optional(),
    asalSekolah: z.string().optional(),
    gender: z.enum(['male', 'female']).optional(),
    nama_orangtua: z.string().max(20).optional(),
    role: z.string().default('siswa'),
});

export enum UserRole {
    STUDENT = 'student',
    TEACHER = 'teacher',
}

// Tipe TypeScript dari skema
export type User = z.infer<typeof UserSchema>;


