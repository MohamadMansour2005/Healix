import { API_BASE_URL } from '@/config';

interface PatientSignupData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    birthDate: string;
}

export async function signupPatient(data: PatientSignupData) {
    const url = 'http://127.0.0.1:8000/api/accounts/register/patient/';
    
    console.log('Making API call to:', url);

    try {
        const requestData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            birthDate: data.birthDate
        };

        console.log('Sending data:', { ...requestData, password: '***' });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        console.log('Response status:', response.status);
        
        // Get the raw response text first
        const responseText = await response.text();
        console.log('Raw response text:', responseText);

        // Try to parse the response as JSON
        let result;
        try {
            result = JSON.parse(responseText);
            console.log('Parsed response:', result);
        } catch (e) {
            console.error('Failed to parse response as JSON:', e);
            throw new Error('Server returned invalid JSON');
        }

        if (!response.ok) {
            const errorMessage = result.message || result.error || 'Registration failed';
            throw new Error(errorMessage);
        }

        // Don't try to send verification email for now
        // We'll add this back once basic registration works

        return {
            success: true,
            data: result
        };
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}