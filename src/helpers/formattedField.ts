export const formattedField = (field: string, user: any): string => {
    if (field === 'kelas' && user.role === 'guru') {
        return 'Wali Kelas';
    }

    if (field === 'no_ortu') {
        if (user.role === 'siswa') {
            return 'Nomor Wali Murid';
        } else if (user.role === 'guru') {
            return 'Nomor Pribadi';
        }
    }

    // Capitalize first letter of each word
    return field.replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .replace(/\b\w/g, char => char.toUpperCase());
};
