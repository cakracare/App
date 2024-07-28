const errorCode = [
    {
        "code": "auth/email-already-in-use",
        "message": "Alamat email sudah digunakan oleh akun lain."
    },
    {
        "code": "auth/invalid-email",
        "message": "Alamat email tidak valid."
    },
    {
        "code": "auth/user-disabled",
        "message": "Akun pengguna telah dinonaktifkan oleh administrator."
    },
    {
        "code": "auth/user-not-found",
        "message": "Tidak ada pengguna yang ditemukan dengan kredensial ini."
    },
    {
        "code": "auth/wrong-password",
        "message": "Password yang diberikan salah."
    },
    {
        "code": "auth/weak-password",
        "message": "Password yang diberikan terlalu lemah."
    },
    {
        "code": "auth/operation-not-allowed",
        "message": "Operasi ini tidak diizinkan."
    },
    {
        "code": "auth/requires-recent-login",
        "message": "Operasi sensitif ini memerlukan login ulang pengguna."
    },
    {
        "code": "auth/account-exists-with-different-credential",
        "message": "Akun sudah ada dengan kredensial berbeda."
    },
    {
        "code": "auth/credential-already-in-use",
        "message": "Kredensial ini sudah digunakan oleh akun lain."
    },
    {
        "code": "auth/email-already-exists",
        "message": "Alamat email sudah ada."
    },
    {
        "code": "auth/id-token-expired",
        "message": "Token ID telah kedaluwarsa."
    },
    {
        "code": "auth/id-token-revoked",
        "message": "Token ID telah dicabut."
    },
    {
        "code": "auth/insufficient-permission",
        "message": "Izin tidak mencukupi untuk mengakses sumber daya ini."
    },
    {
        "code": "auth/internal-error",
        "message": "Kesalahan internal server."
    },
    {
        "code": "auth/invalid-credential",
        "message": "Kredensial yang diberikan tidak valid."
    },
    {
        "code": "auth/invalid-custom-token",
        "message": "Token kustom yang diberikan tidak valid."
    },
    {
        "code": "auth/invalid-phone-number",
        "message": "Nomor telepon yang diberikan tidak valid."
    },
    {
        "code": "auth/invalid-verification-code",
        "message": "Kode verifikasi yang diberikan tidak valid."
    },
    {
        "code": "auth/invalid-verification-id",
        "message": "ID verifikasi yang diberikan tidak valid."
    },
    {
        "code": "auth/missing-android-pkg-name",
        "message": "Nama paket Android hilang."
    },
    {
        "code": "auth/missing-continue-uri",
        "message": "URL kelanjutan hilang."
    },
    {
        "code": "auth/missing-ios-bundle-id",
        "message": "ID bundle iOS hilang."
    },
    {
        "code": "auth/missing-phone-number",
        "message": "Nomor telepon hilang."
    },
    {
        "code": "auth/quota-exceeded",
        "message": "Kuota telah terlampaui."
    },
    {
        "code": "auth/unauthorized-continue-uri",
        "message": "URL kelanjutan tidak diizinkan."
    },
    {
        "code": "auth/user-not-found",
        "message": "Pengguna tidak ditemukan."
    },
    {
        "code": "auth/weak-password",
        "message": "Kata sandi yang diberikan terlalu lemah."
    },
    {
        "code": "auth/network-request-failed",
        "message": "Permintaan jaringan gagal."
    }
]

const getErrorMessage = (code: string): string => {
    const error = errorCode.find(error => error.code === code);
    return error ? error.message : 'Kesalahan tidak dikenal';
};


export const handleFirebaseError = (error: any): string => {
    return getErrorMessage(error.code);
};

