export interface PhysicalBullyingResponse {
  kekerasan_dengan_anggota_tubuh: number;
  kekerasan_dengan_benda: number;
  pemaksaan_uang_makanan_benda: number;
  disenggol_hingga_terjatuh: number;
  makanan_minuman_ditumpahkan: number;
  mendukung_siswa_memukul: number;
  diperintah_mem_bully: number;
  barang_disembunyikan: number;
  kendaraan_dirusak: number;
  dipaksa_merekam_pembullyan: number;
}

export interface VerbalBullyingResponse {
  dihina_nama_orangtua: number;
  dihina_nama_hewan: number;
  dapat_siulan_usil: number;
  dihina_fisik: number;
  dijauhi_karena_fitnah: number;
  diberi_julukan_buruk: number;
  dapat_ancaman: number;
}

export interface SexualBullyingResponse {
  dihina_fisik_seksual: number;
  dibujuk_tawaran_seksual: number;
  diintai: number;
  diintip_bagian_tubuh: number;
  melihat_aksi_ekshibisionisme: number;
  disentuh_tidaksopan: number;
  percobaan_pemerkosaan: number;
  digoda_siulan_seksual: number;
  foto_pribadi_disebar_tanpa_izin: number;
  dikirimi_pesan_foto_video_seksual: number;
}

export interface BullyingResponse {
  userId: string;
  timestamp?: number;
  physicalBullyingResponse: [];
  verbalBullyingResponse: [];
  sexualBullyingResponse: [];
  cyberBullyingResponse: [];
}

export interface Report {
  id?: string;
  userId: string;
  timestamp?: Date;
  physicalBullyingResponseId: string;
  verbalBullyingResponseId: string;
  sexualBullyingResponseId: string;
  cyberBullyingResponseId: string;
}
