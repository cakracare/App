import { z } from 'zod';

// Skema untuk PhysicalBullyingResponse
const PhysicalBullyingResponseSchema = z.object({
    kekerasan_dengan_anggota_tubuh: z.number().default(0),
    kekerasan_dengan_benda: z.number().default(0),
    pemaksaan_uang_makanan_benda: z.number().default(0),
    disenggol_hingga_terjatuh: z.number().default(0),
    makanan_minuman_ditumpahkan: z.number().default(0),
    mendukung_siswa_memukul: z.number().default(0),
    diperintah_mem_bully: z.number().default(0),
    barang_disembunyikan: z.number().default(0),
    kendaraan_dirusak: z.number().default(0),
    dipaksa_merekam_pembullyan: z.number().default(0),
});

// Skema untuk VerbalBullyingResponse
const VerbalBullyingResponseSchema = z.object({
    dihina_nama_orangtua: z.number().default(0),
    dihina_nama_hewan: z.number().default(0),
    dapat_siulan_usil: z.number().default(0),
    dihina_fisik: z.number().default(0),
    dijauhi_karena_fitnah: z.number().default(0),
    diberi_julukan_buruk: z.number().default(0),
    dapat_ancaman: z.number().default(0),
});

// Skema untuk SexualBullyingResponse
const SexualBullyingResponseSchema = z.object({
    dihina_fisik_seksual: z.number().default(0),
    dibujuk_tawaran_seksual: z.number().default(0),
    diintai: z.number().default(0),
    diintip_bagian_tubuh: z.number().default(0),
    melihat_aksi_ekshibisionisme: z.number().default(0),
    disentuh_tidaksopan: z.number().default(0),
    percobaan_pemerkosaan: z.number().default(0),
    digoda_siulan_seksual: z.number().default(0),
    foto_pribadi_disebar_tanpa_izin: z.number().default(0),
    dikirimi_pesan_foto_video_seksual: z.number().default(0),
});

// Skema untuk BullyingResponse
const BullyingResponseSchema = z.object({
    userId: z.string(),
    timestamp: z.date().optional(),
    physicalBullyingResponse: PhysicalBullyingResponseSchema,
    verbalBullyingResponse: VerbalBullyingResponseSchema,
    sexualBullyingResponse: SexualBullyingResponseSchema,
});

// Skema untuk Report
const ReportSchema = z.object({
    userId: z.string(),
    timestamp: z.date().optional(),
    physicalBullyingResponseId: z.string(),
    verbalBullyingResponseId: z.string(),
    sexualBullyingResponseId: z.string(),
});

export type BullyingResponse = z.infer<typeof BullyingResponseSchema>;
export type PhysicalBullyingResponse = z.infer<typeof PhysicalBullyingResponseSchema>;
export type VerbalBullyingResponse = z.infer<typeof VerbalBullyingResponseSchema>;
export type SexualBullyingResponse = z.infer<typeof BullyingResponseSchema>;
export type Report = z.infer<typeof ReportSchema>;

export {
    PhysicalBullyingResponseSchema,
    VerbalBullyingResponseSchema,
    SexualBullyingResponseSchema,
    BullyingResponseSchema,
    ReportSchema
};
