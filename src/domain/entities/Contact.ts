interface AddContactDto {
    requesterId: string;
    contactId: string;
    projectId: string;
}

interface GetUserContactsDto {
    userExternalId: string;
    projectId: string;
}

