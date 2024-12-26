/**
 * Base interfaces and types for a simplified chat engine API.
 * Each interface represents a persisted entity and methods represent API endpoints.
 */
interface Root {
    /** Creates a new organization and returns the created entity */
    createOrganization(organization: Organization): Organization;
    /** Updates an existing organization's details */
    updateOrganization(uuid: string, update: Partial<Organization>): Organization;
    /** Permanently removes an organization */
    deleteOrganization(uuid: string): void;
    /** Retrieves organization details by UUID */
    getOrganization(uuid: string): Organization;
}

/**
 * Represents an organization entity with user management capabilities.
 * Organizations are top-level containers for users and projects.
 */
interface Organization {
    /** Unique identifier for the organization */
    uuid: string;
    /** Organization's display name */
    name: string;
    /** Primary email for organization management */
    email: string;
    /** Authentication password */
    password: string;
    /** Unique project identifier */
    projectId: string;
    /** Security key for user management operations */
    privateKey: string;

    /** Returns all statistics required for the dashboard UI */
    getStatistics(): void;
    /** Authenticates organization admin and returns session token */
    login(email: string, password: string): string;

    /** Creates a new user in the organization */
    createUser(user: User): User;
    /** Removes a user from the organization */
    deleteUser(externalId: string): User;
    /** Updates user information */
    updateUser(externalId: string, user: User): User;
    /** Retrieves all users in the organization */
    getUsers(): User[];
}

/**
 * Represents a user entity with messaging and contact management capabilities.
 * Users belong to an organization and can interact with other users.
 */
interface User {
    /** Internal unique identifier */
    uuid: string;
    /** Reference to parent project */
    projectId: string;
    /** Client-provided user identifier */
    externalId: string;
    /** Optional profile picture URL */
    avatar?: string;
    /** User's display name in the chat */
    displayName: string;
    /** Optional contact email */
    email?: string;
    /** Optional contact phone */
    phoneNumber?: string;
    /** Username for authentication */
    login: string;
    /** Password/token for authentication */
    secret: string;
    /** Real-time user status */
    isOnline: boolean;
    /** Custom user metadata */
    custom_json: {
        [key: string]: any;
    };
    /** User's contact list */
    contacts: User[];

    /** Authenticates user and returns JWT token */
    auth(login: string, password: string): string;
    /** Adds a user to contacts list */
    addContact(externalId: String): User[];
    /** Retrieves user's contacts */
    getMyContacts(): User[];
    /** Gets user's chat preview list with last message */
    getMyChats(): Array<{ user: User; lastMessage: Message }>;
    /** Retrieves full chat history with a specific user */
    getChatDetails(externalId: string): { user: User; messages: Message[] };
}

/**
 * Represents a chat message entity with media support.
 * Messages are exchanged between users and support various modes.
 */
interface Message {
    /** Internal unique identifier */
    uuid: string;
    /** Reference to parent project */
    projectId: string;
    /** Message sender */
    author: User;
    /** Message recipient */
    to: User;
    /** Message content */
    body: string;
    /** Attached media files */
    medias: MessageMedia[];
    /** Indicates if message was sent by a human vs bot */
    isWrittenByHuman: boolean;
    /** Message visibility/notification state */
    mode: MessageMode;

    /** Sends a new message */
    sendMessage(message: Message): Message;
    /** Listens for incoming messages in a room */
    receiveMessage(roomId: string): Promise<Message>;
}

/** Controls message visibility and notifications */
enum MessageMode {
    /** Messages disabled */
    off,
    /** Receiving messages only */
    listen,
    /** Full messaging enabled */
    on
}

/**
 * Represents media attachments for messages.
 * Supports various file types with metadata.
 */
interface MessageMedia {
    /** Internal unique identifier */
    uuid: string;
    /** Reference to parent project */
    projectId: string;
    /** Media file type */
    mimetype: string;
    /** Base64 encoded file content */
    data: string;
    /** Original filename */
    filename?: string | null;
    /** File size in bytes */
    filesize?: number | null;
}