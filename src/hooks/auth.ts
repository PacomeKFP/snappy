import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface UseAuthProps {
    middleware?: 'auth' | 'guest'
    redirectIfAuthenticated?: string
}

interface AuthErrors {
    [key: string]: string[]
}


export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthProps = {}) => {
    const router = useRouter()

    const { data: user, error, mutate } = useSWR('/auth/user', () =>
        axios
            .post('/')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
                router.push('/verify-email')
            }),
    )

    const registerUser = async ({ setErrors, ...props }: { setErrors: (errors: AuthErrors) => void } & CreateUserDto) => {
        setErrors({})

        axios
            .post('/user/create', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const loginUser = async ({ setErrors, setStatus, ...props }: {
        setErrors: (errors: AuthErrors) => void
        setStatus: (status: string | null) => void
    } & AuthenticateUserDto) => {
        setErrors({})
        setStatus(null)

        axios
            .post('/auth/user', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const loginOrganization = async ({ setErrors, setStatus, ...props }: {
        setErrors: (errors: AuthErrors) => void
        setStatus: (status: string | null) => void
    } & AuthenticateOrganizationDto) => {
        setErrors({})
        setStatus(null)

        axios
            .post('/auth/organization', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const registerOrganization = async ({ setErrors, ...props }: {
        setErrors: (errors: AuthErrors) => void
    } & CreateOrganizationDto) => {
        setErrors({})

        axios
            .post('/', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const logout = async () => {
        if (!error) {
            // Since there's no explicit logout endpoint in the API, 
            // we'll just clear the local state
            await mutate(null)
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }

        if (middleware === 'auth' && error) {
            logout()
        }
    }, [user, error])

    return {
        user,
        registerUser,
        loginUser,
        loginOrganization,
        registerOrganization,
        logout,
    }
}