import {PermissionsAndroid} from 'react-native';

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    console.log('Sending email to:', to);
    console.log('Subject:', subject);
    console.log('Text:', text);

    const response = await fetch(
      'https://sendmail-three-jade.vercel.app/send-email',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          subject,
          text,
        }),
      },
    );

    console.log('Email API response status:', response.status);

    if (response.ok) {
      // API returns plain text, not JSON
      const responseData = await response.text();
      console.log('Email sent successfully:', responseData);
      return {status: true, message: 'Email sent successfully'};
    } else {
      const errorData = await response.text();
      console.error('Failed to send email. Status:', response.status);
      console.error('Error response:', errorData);
      return {status: false, message: `Email sent failed: ${response.status}`};
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return {status: false, message: 'Email sent failed: Network error'};
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
