import axios from '@/lib/axios';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UseAuthProps {
    middleware?: 'auth' | 'guest';
    redirectIfAuthenticated?: string;
}

interface AuthErrors {
    [key: string]: string[];
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthProps = {}) => {
    const router = useRouter();
    const [organization, setOrganization] = useState<Organization | null>(() => {
        const storedOrganization = localStorage.getItem('organization');
        return storedOrganization ? JSON.parse(storedOrganization) : null;
    });
    const [token, setToken] = useState<string | null>(() => {
        const storedToken = localStorage.getItem('token');
        return storedToken ? JSON.parse(storedToken) : null;
    });
    const [error, setError] = useState<string | null>(null);

    const loginOrganization = async ({ setErrors, setStatus, ...props }: {
        setErrors: (errors: AuthErrors) => void;
        setStatus: (status: string | null) => void;
    } & AuthenticateOrganizationDto) => {
        setErrors({});
        setStatus(null);

        try {
            const response = await axios.post('/auth/organization', props);
            localStorage.setItem('organization', JSON.stringify(response.data.data));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            setOrganization(response.data);
            setToken(response.data.token);
            router.push('/dashboard');
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setError('An unexpected error occurred.');
                throw error;
            }
        }
    };

    const registerOrganization = async ({ setErrors, ...props }: {
        setErrors: (errors: AuthErrors) => void;
    } & CreateOrganizationDto) => {
        setErrors({});

        try {
            const response = await axios.post('/organizations', props);
            localStorage.setItem('organization', JSON.stringify(response.data.data));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            setOrganization(response.data);
            setToken(response.data.token);
            router.push('/dashboard');
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setError('An unexpected error occurred.');
                throw error;
            }
        }
    };

    const logout = useCallback(async () => {
        localStorage.removeItem('organization');
        localStorage.removeItem('token');
        setOrganization(null);
        setToken(null);
        router.push('/');
    }, [router]);

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && organization && token) {
            router.push(redirectIfAuthenticated);
        }

        if (middleware === 'auth' && (!organization || !token)) {
            router.push('/signin');
        }

        if (middleware === 'auth' && error) {
            logout();
        }
    }, [error, middleware, redirectIfAuthenticated, router, logout, organization, token]);

    return {
        loginOrganization,
        registerOrganization,
        token,
        organization,
        logout,
    };
};