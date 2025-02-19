interface Organization {
    id: string;
    name: string;
    email: string;
    projectId: string;
    privateKey: string;
    createdAt: string;
    updatedAt: string;
    username: string;
    enabled: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
}

interface AuthenticateOrganizationDto {
    email: string
    password: string
}

interface AuthResponse {
    data: Organization;
    token: string;
}
interface CreateOrganizationDto {
    name: string
    email: string
    password: string
}

interface AuthenticationResourceOrganization {
    data: Organization;
    token: string;
}