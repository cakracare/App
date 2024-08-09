import {PermissionsAndroid} from "react-native";

export const sendEmail = async (to: string, subject: string, text: string) => {
    try {
        const response = await fetch('https://rwf4bkmm-5000.asse.devtunnels.ms/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to,
                subject,
                text,
            }),
        });

        if (response.ok) {
            console.log('Email sent successfully');
            //     add return unutk toast
        } else {
            console.error('Failed to send email');
        //     add return unutk toast
        }
    } catch (error) {
        console.error('Error sending email:', error);
        //     add return unutk toast
    }
};


export const checkConnections = async () => {
    try {
        const response = await fetch('https://rwf4bkmm-5000.asse.devtunnels.ms/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Email sent successfully');
        } else {
            console.error('Failed to send email');
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const permissions = [
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.NETWORK_EXTERNAL_STORAGE,
];

const checkPermissions = async () => {
    for (const permission of permissions) {
        const result = await PermissionsAndroid.check(permission);
        if (!result) {
            return false;
        }
    }
    return true;
};