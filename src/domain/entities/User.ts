interface User {
    id: string;
    projectId: string;
    externalId: string;
    avatar: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    login: string;
    customJson: Record<string, string>;
    contacts: User[];
    organization: Organization;
    createdAt: string;
    updatedAt: string;
    username: string;
    online: boolean;
    enabled: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
}
interface CreateUserDto {
    projectId: string
    externalId: string
    avatar?: string
    displayName: string
    email?: string
    phoneNumber?: string
    login: string
    secret: string
    customJson?: Record<string, string>
}


interface AuthenticateUserDto {
    projectId: string
    login: string
    secret: string
}

interface FindUserByDisplayNameDto {
    displayName: string;
    projectId: string;
}

interface AuthenticationResourceUser {
    data: User;
    token: string;
}
interface UserProjection {
    externalId: string;
}