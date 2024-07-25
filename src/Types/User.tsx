
import { z } from 'zod';

// Definisikan skema User
export const UserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    displayName: z.string(),
    photoURL: z.string().optional(),
    asalSekolah: z.string(),
    kelas: z.string().min(1).optional(),
    role: z.string().default('siswa'),
});

// Tipe TypeScript dari skema
export type User = z.infer<typeof UserSchema>;
