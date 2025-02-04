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
