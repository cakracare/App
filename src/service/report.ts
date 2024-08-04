import {BullyingResponse, Report, UserRole} from "../Types";
import firestore from "@react-native-firebase/firestore";

/**
 * Create a new bullying report
 * @param respon - The bullying response data
 * @returns Success or failure status
 */
export async function createLaporanBullying(respon: BullyingResponse) {
    try {
        const timestamp = firestore.Timestamp.now();
        const date: Date = timestamp.toDate();

        const report: Report = {
            userId: respon.userId,
            timestamp: date,
            title: respon.title,
            deskripsi: respon.deskripsi,
            physicalPointResponse: respon.physicalPointResponse,
            verbalPointResponse: respon.verbalPointResponse,
            sexualPointResponse: respon.sexualPointResponse,
            cyberPointResponse: respon.cyberPointResponse,
            status: respon.status,
        };

        await firestore().collection("reports").add(report);
        console.info("Laporan berhasil ditambahkan!");
        return { success: true };
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
 * Get data from response collection
 * @param collection - The name of the collection
 * @param responseIds - Array of response IDs
 * @returns An array of response data
 */
async function getResponseData(collection: string, responseIds: string[]) {
    const responsePromises = responseIds.map(id => firestore().collection(collection).doc(id).get());
    const responseDocs = await Promise.all(responsePromises);

    return responseDocs.map(doc => doc.data() || {});
}

/**
 * Get all reports by a specific user or all reports based on role
 * @param userId - The user ID
 * @param role - The user's role
 * @returns A list of reports or an error message
 */
export async function getReportsByUser(userId: string, role: UserRole): Promise<{ success: boolean, data?: Report[], error?: string }> {
    try {
        let query;

        if (role === UserRole.STUDENT) {
            query = firestore().collection('reports').where('userId', '==', userId);
        } else if (role === UserRole.TEACHER) {
            query = firestore().collection('reports');
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
                status: data.status
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
    } catch (error) {
        console.error("Error memperbarui laporan:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Update response data
 * @param collection - The collection to update
 * @param responseIds - Array of response IDs
 * @param updatedData - The updated response data
 */
async function updateResponses(collection: string, responseIds: string[], updatedData: any) {
    const updatePromises = responseIds.map(id => firestore().collection(collection).doc(id).update(updatedData));
    await Promise.all(updatePromises);
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
    } catch (error) {
        console.error("Error menghapus laporan:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Delete response data
 * @param collection - The collection to delete from
 * @param responseIds - Array of response IDs
 */
async function deleteResponses(collection: string, responseIds: string[]) {
    const deletePromises = responseIds.map(id => firestore().collection(collection).doc(id).delete());
    await Promise.all(deletePromises);
}




type User = {
    id: string;
    nama_lengkap: string;
    kelas: string;
    alamat_lengkap: string;
    role: string;
};

// type Report = {
//     feedback?: string;
//     id: string;
//     userId: string;
//     timestamp: Date;
//     title: string;
//     deskripsi: string;
//     physicalPointResponse: number;
//     verbalPointResponse: number;
//     sexualPointResponse: number;
//     cyberPointResponse: number;
//     status: string;
// };

type CombinedReport = {
    namaPelapor: string;
    kelas: string;
    alamat: string;
    tglLaporan: string;
    title: string,
    deskripsi: string,
    verbal: number;
    fisik: number;
    seksual: number;
    cyber: number;
    skorTotal: number;
    kategori?: string;
    status: string,
    feedback: string;
};

export async function fetchUsersWithReports(currentUserRole: string): Promise<CombinedReport[]> {
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

        // Fetch all reports
        const reportSnapshot = await firestore().collection('reports').get();
        const reports: Report[] = reportSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp.toDate(),
        })) as Report[];
        // console.log(reports.length, 'sadfsafsdadsasfd')

        // Combine users and their reports into the desired structure
        const combinedReports: CombinedReport[] = [];

        reports.forEach(report => {
            console.log('report')
            // Find the corresponding user for each report
            const user = users.find(user => user.id === report.userId);

            // Ensure the user is found
            if (user) {
                console.log('report')
                combinedReports.push({
                    namaPelapor: user.nama_lengkap,
                    kelas: user.kelas,
                    alamat: user.alamat_lengkap,
                    tglLaporan: report.timestamp?.toString().slice(0, 16) || '',
                    title: report.title,
                    deskripsi: report.deskripsi,
                    verbal: report.verbalPointResponse,
                    fisik: report.physicalPointResponse,
                    seksual: report.sexualPointResponse,
                    cyber: report.cyberPointResponse,
                    skorTotal: report.verbalPointResponse + report.physicalPointResponse + report.sexualPointResponse + report.cyberPointResponse,
                    kategori: report.kategori,
                    status: report.status,
                    feedback: report.feedback || ''
                });
            }
        });
        console.log(combinedReports.length, 'sadfsafsdadsasfd')

        return combinedReports;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch users and reports');
    }
}

