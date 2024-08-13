import {BullyingResponse, Report, UserRole} from "../Types";
import firestore from "@react-native-firebase/firestore";

/**
 * Create a new bullying report
 * @param respon - The bullying response data
 * @returns Success or failure status
 */
export async function createLaporanBullying(respon: BullyingResponse) {
    try {
        // get time now
        const timestamp = firestore.Timestamp.now();
        const date: Date = timestamp.toDate();
        let kategori
        if(respon.skor_total! < 18){
            kategori='ringan'
        }else if(respon.skor_total! > 18 || respon.skor_total! <32){
            kategori='sedang'
        }else if(respon.skor_total! > 18){
            kategori='berat'
        }

        // buat payload untuk melakukan laporan
        const report: Report = {
            userId: respon.userId,
            timestamp: date,
            title: respon.title,
            deskripsi: respon.deskripsi,
            physicalPointResponse: respon.physicalPointResponse,
            verbalPointResponse: respon.verbalPointResponse,
            sexualPointResponse: respon.sexualPointResponse,
            cyberPointResponse: respon.cyberPointResponse,
            kategori: kategori,
            skor_total:respon.skor_total,
            status: respon.status,
        };

        // upload laporan ke firestore
        await firestore().collection("reports").add(report);
        console.info("Laporan berhasil ditambahkan!");
        return { success: true, message: 'Berhasil buat laporan' };
    } catch (error: any) {
        console.error("Error membuat laporan:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Get a specific bullying report by ID
 * @param reportId - The ID of the report
 * @returns The report data or an error message
 */
export async function getLaporanBullying(reportId: string) {
    try {
        const reportDoc = await firestore().collection("reports").doc(reportId).get();
        if (!reportDoc.exists) {
            console.log("Laporan tidak ditemukan!");
            return { success: false, error: "Laporan tidak ditemukan" };
        }

        const data = reportDoc.data()

        if (data!.timestamp) {
            data!.timestamp = data!.timestamp.toDate();
        }

        console.log("Laporan:", data);
        return { success: true, data: data };
    } catch (error: any) {
        console.error("Error mengambil laporan:", error);
        return { success: false, error: error.message };
    }
}


/**
 * Get all reports by a specific user or all reports based on role
 * @param userId - The user ID
 * @param role - The user's role
 * @param kelasArray
 * @returns A list of reports or an error message
 */
export async function getReportsByUser(userId: string, role: UserRole, kelasArray?: string[]): Promise<{ success: boolean, data?: Report[], error?: string }> {
    try {
        let query;

        if (role === UserRole.STUDENT) {
            query = firestore().collection('reports').where('userId', '==', userId);
        } else if (role === UserRole.TEACHER) {
            query = firestore().collection('reports');
            if (kelasArray && kelasArray.length > 0) {
                const usersSnapshot = await firestore()
                    .collection('users')
                    .where('kelas', 'in', kelasArray)
                    .get();
                const userIds = usersSnapshot.docs.map(doc => doc.id);

                if (userIds.length > 0) {
                    query = query.where('userId', 'in', userIds);
                } else {
                    // Jika tidak ada user dalam kelas yang ditentukan, kembalikan laporan kosong
                    return { success: true, data: [] };
                }
            }else{
                return { success: true, data: [] }
            }
        } else {
            throw new Error('Peran tidak dikenal');
        }

        const snapshot = await query.get();
        const reports: Report[] = [];

        snapshot.forEach(doc => {
            const data = doc.data();
            reports.push({
                id: doc.id,
                userId: data.userId,
                timestamp: data.timestamp?.toDate(),
                title: data.title,
                deskripsi: data.deskripsi,
                physicalPointResponse: data.physicalPointResponse,
                verbalPointResponse: data.verbalPointResponse,
                sexualPointResponse: data.sexualPointResponse,
                cyberPointResponse: data.cyberPointResponse,
                status: data.status,
                kategori: data.kategori,
                skor_total: data.skor_total,
            });
        });

        return { success: true, data: reports };
    } catch (error: any) {
        console.error('Error mendapatkan laporan:', error);
        return { success: false, error: error.message };
    }
}


/**
 * Update an existing bullying report
 * @param reportId - The ID of the report
 * @param updatedRespon - The updated bullying response data
 * @returns Success or failure status
 */
export async function updateLaporanBullying(reportId: string, updatedRespon: Partial<BullyingResponse>) {
    try {
        const reportDoc = await firestore().collection("reports").doc(reportId).get();
        if (!reportDoc.exists) {
            console.log("Laporan tidak ditemukan!");
            return { success: false, error: "Laporan tidak ditemukan" };
        }
        await firestore().collection('reports').doc(reportId).update(updatedRespon);

        console.log("Laporan berhasil diperbarui!");
        return { success: true };
    } catch (error: any) {
        console.error("Error memperbarui laporan:", error);
        return { success: false, error: error.message };
    }
}


/**
 * Delete a bullying report and associated responses
 * @param reportId - The ID of the report
 * @returns Success or failure status
 */
export async function deleteLaporanBullying(reportId: string | undefined) {
    try {
        if (!reportId) {
            throw new Error("ID laporan tidak diberikan");
        }
        const reportDoc = await firestore().collection("reports").doc(reportId).get();
        if (!reportDoc.exists) {
            console.log("Laporan tidak ditemukan!");
            return { success: false, error: "Laporan tidak ditemukan" };
        }
        await firestore().collection("reports").doc(reportId).delete();

        console.log("Laporan berhasil dihapus!");
        return { success: true };
    } catch (error: any) {
        console.error("Error menghapus laporan:", error);
        return { success: false, error: error.message };
    }
}

type User = {
    id: string;
    nama_lengkap: string;
    kelas: string;
    alamat_lengkap: string;
    role: string;
};


type CombinedReport = {
    "Nama pelapor": string;
    "Kelas": string;
    "Alamat": string;
    "Tanggal laporan": string;
    "Title": string,
    "Deskripsi": string,
    "Verbal": number;
    "Fisik": number;
    "Seksual": number;
    "Cyber": number;
    "Skor Total": number;
    "Kategori"?: string;
    "Status": string,
    "Feedback": string;
};

export async function fetchUsersWithReports(currentUserRole: string, allowedClasses?: string[]): Promise<CombinedReport[]> {
    if (currentUserRole !== 'guru') {
        throw new Error('Only teachers can perform this action');
    }

    try {
        // Fetch all users
        const userSnapshot = await firestore().collection('users').get();
        const users: User[] = userSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as User[];

        // If allowedClasses is not provided, include all users
        const filteredUsers = allowedClasses
            ? users.filter(user => allowedClasses.includes(user.kelas))
            : users;

        // Fetch all reports
        const reportSnapshot = await firestore().collection('reports').get();
        const reports: Report[] = reportSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp.toDate(),
        })) as Report[];

        // Combine users and their reports into the desired structure
        const combinedReports: CombinedReport[] = [];

        reports.forEach(report => {
            // Find the corresponding user for each report
            const user = filteredUsers.find(user => user.id === report.userId);

            // Ensure the user is found and belongs to an allowed class
            if (user) {
                combinedReports.push({
                    "Nama pelapor": user.nama_lengkap,
                    Kelas: user.kelas,
                    Title: report.title,
                    "Tanggal laporan": report.timestamp?.toString().slice(0, 16) || '',
                    Alamat: user.alamat_lengkap,
                    Cyber: report.cyberPointResponse,
                    Deskripsi: report.deskripsi,
                    Seksual: report.sexualPointResponse,
                    Fisik: report.physicalPointResponse,
                    Verbal: report.verbalPointResponse,
                    "Skor Total": report.verbalPointResponse + report.physicalPointResponse + report.sexualPointResponse + report.cyberPointResponse,
                    Kategori: report.kategori,
                    Status: report.status,
                    Feedback: report.feedback || '',
                });
            }
        });

        console.info(combinedReports.length, 'total jumlah laporan yang berhasil diambil');
        return combinedReports;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch users and reports');
    }
}



