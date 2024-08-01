import {BullyingResponse, Report, UserRole,} from "../Types";
import firestore from "@react-native-firebase/firestore";


/*
Update untuk type Report = {
    userId,
    title,
    desc?,
    physicalBullyingResponse: [];
    verbalBullyingResponse: [];
    sexualBullyingResponse: [];
    cyberBullyingResponse: [];
}
*/

// TAMBAHKAN PENGECEKAN DAN RETURN UNUTK SETIAP FUNCTION

export async function createLaporanBullying(respon: BullyingResponse) {
    try {
        const timestamp = firestore.Timestamp.now(); // Mendapatkan timestamp saat ini
        const date: Date = timestamp.toDate();

        // uplod sua rsponse yang didapat ke firestore
        const physicalResponseRef = await firestore()
            .collection("physical_bullying_responses")
            .add(respon.physicalBullyingResponse);
        const verbalResponseRef = await firestore()
            .collection("verbal_bullying_responses")
            .add(respon.verbalBullyingResponse);
        const sexualResponseRef = await firestore()
            .collection("sexual_bullying_responses")
            .add(respon.sexualBullyingResponse);
        const cyberResponseRef = await firestore()
            .collection("cyber_bullying_responses")
            .add(respon.cyberBullyingResponse);

        // Menambahkan laporan dengan referensi ke jawaban terkait bullying fisik, verbal, dan seksual

        /*
        Update untuk type Report = {
            userId,
            title,
            desc?,
            timestamp
            physicalBullyingResponseId,
            verbalBullyingResponseId,
            sexualBullyingResponseId,
            cyberBullyingResponseId
        }
         */
        const report: Report = {
            userId: respon.userId,
            timestamp: date,
            physicalBullyingResponseId: physicalResponseRef.id,
            verbalBullyingResponseId: verbalResponseRef.id,
            sexualBullyingResponseId: sexualResponseRef.id,
            cyberBullyingResponseId: cyberResponseRef.id
        };

        // berikan return agar memudah kan logging
        await firestore().collection("reports").add(report);
        console.info("Laporan berhasil ditambahkan!");
    } catch (error) {
        console.error(error, '<< membuat laporan');
    }
}


// Tambahkan untuk cyber bully
async function getLaporanBullying(reportId: string) {
    try {
        const reportDoc = await firestore().collection("reports").doc(reportId).get();
        if (!reportDoc.exists) {
            console.log("Laporan tidak ditemukan!");
            return;
        }
        const reportData = reportDoc.data() as Report;

        const physicalResponseDoc = await firestore()
            .collection("physical_bullying_responses")
            .doc(reportData.physicalBullyingResponseId)
            .get();
        const verbalResponseDoc = await firestore()
            .collection("verbal_bullying_responses")
            .doc(reportData.verbalBullyingResponseId)
            .get();
        const sexualResponseDoc = await firestore()
            .collection("sexual_bullying_responses")
            .doc(reportData.sexualBullyingResponseId)
            .get();

        const response = {
            ...reportData,
            physicalBullyingResponse: physicalResponseDoc.data(),
            verbalBullyingResponse: verbalResponseDoc.data(),
            sexualBullyingResponse: sexualResponseDoc.data()
        };

        console.log("Laporan:", response);
        return response;
    } catch (error) {
        console.error("Error mengambil laporan: ", error);
    }
}

export async function getReportsByUser(userId: string, role: UserRole): Promise<Report[]> {
    try {
        let query;

        if (role === UserRole.STUDENT) {
            // Jika peran adalah siswa, ambil laporan yang dibuat oleh pengguna ini
            query = firestore()
                .collection('reports')
                .where('userId', '==', userId);
        } else if (role === UserRole.TEACHER) {
            // Jika peran adalah guru, ambil semua laporan
            query = firestore()
                .collection('reports');
        } else {
            throw new Error('Peran tidak dikenal');
        }

        const snapshot = await query.get();


        const reports: Report[] = [];


        snapshot.forEach(doc => {
            const data = doc.data();
            reports.push({
                id : doc.id,
                userId: data.userId,
                timestamp: data.timestamp?.toDate(),
                physicalBullyingResponseId: data.physicalBullyingResponseId,
                verbalBullyingResponseId: data.verbalBullyingResponseId,
                sexualBullyingResponseId: data.sexualBullyingResponseId,
                cyberBullyingResponseId: data.sexualBullyingResponseId
            });
        });

        return reports
    } catch (error) {
        console.error('Error getting reports:', error);
        throw new Error('Gagal mendapatkan laporan');
    }
}

async function updateLaporanBullying(reportId: string, updatedRespon: Partial<BullyingResponse>) {
    try {
        const reportDoc = await firestore()
            .collection("reports")
            .doc(reportId).get();
        if (!reportDoc.exists) {
            console.log("Laporan tidak ditemukan!");
            return;
        }
        const reportData = reportDoc.data() as Report;

        if (updatedRespon.physicalBullyingResponse) {
            await firestore()
                .collection("physical_bullying_responses")
                .doc(reportData.physicalBullyingResponseId)
                .update(updatedRespon.physicalBullyingResponse);
        }
        if (updatedRespon.verbalBullyingResponse) {
            await firestore().collection("verbal_bullying_responses").doc(reportData.verbalBullyingResponseId).update(updatedRespon.verbalBullyingResponse);
        }
        if (updatedRespon.sexualBullyingResponse) {
            await firestore().collection("sexual_bullying_responses").doc(reportData.sexualBullyingResponseId).update(updatedRespon.sexualBullyingResponse);
        }

        console.log("Laporan berhasil diperbarui!");
    } catch (error) {
        console.error("Error memperbarui laporan: ", error);
    }
}

export async function deleteLaporanBullying(reportId: string | undefined) {
    try {
        const reportDoc = await firestore().collection("reports").doc(reportId).get();
        if (!reportDoc.exists) {
            console.log("Laporan tidak ditemukan!");
            return;
        }
        const reportData = reportDoc.data() as Report;

        await firestore().collection("physical_bullying_responses").doc(reportData.physicalBullyingResponseId).delete();
        await firestore().collection("verbal_bullying_responses").doc(reportData.verbalBullyingResponseId).delete();
        await firestore().collection("sexual_bullying_responses").doc(reportData.sexualBullyingResponseId).delete();
        await firestore().collection("cyber_bullying_responses").doc(reportData.cyberBullyingResponseId).delete();
        await firestore().collection("reports").doc(reportId).delete();

        console.log("Laporan berhasil dihapus!");
    } catch (error) {
        console.error("Error menghapus laporan: ", error);
    }
}
