import {BaseService} from "./BaseService.ts";
import {
    AddContactDto,
    AuthenticateOrganizationDto,
    AuthenticateUserDto,
    AuthenticationResourceOrganization,
    AuthenticationResourceUser, ChangeMessagingModeDto, Chat, Chatbot,
    ChatDetailsResource, ChatResource, CreateChatbotDto,
    CreateOrganizationDto, CreateUserDto, FindUserByDisplayNameDto,
    GetChatDetailsDto, GetUserContactsDto, Message, Organization, PreKeyBundle, SendMessageDto, User
} from "./models";

export class SnappyHTTPClient extends BaseService {
    projectId?: string;
    bearerToken?: string;
    basePath: string;

    constructor(basePath: string, bearerToken?: string, projectId?: string) {
        super(basePath)
        this.projectId = projectId;
        this.bearerToken = bearerToken;
        this.basePath = basePath;
        if (!this.bearerToken)
            this.loadBearerToken()
    }

    setProjectId = (projectId: string) => this.projectId = projectId;
    setBearerToken = (bearerToken: string) => this.bearerToken = bearerToken;
    saveBearerToken = () => this.bearerToken && localStorage.setItem("bearer", this.bearerToken);
    loadBearerToken = () => localStorage.getItem("bearer") && this.setBearerToken(localStorage.getItem("bearer")!);

    // Organization
    async createOrganization(dto: CreateOrganizationDto) {
        this.refreshApiInstance(this.basePath, false)
        const authenticationResourceOrganization = await this.post<CreateOrganizationDto, AuthenticationResourceOrganization>(dto, "/organizations");
        this.setBearerToken(authenticationResourceOrganization.token)
        this.setProjectId(authenticationResourceOrganization.data.projectId!)
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        this.saveBearerToken()
        return authenticationResourceOrganization;
    }

    async getOrganization(id: string): Promise<Organization> {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return this.get<Organization>(`/organizations/${id}`);
    }

    async deleteOrganization(id: string) {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return this.delete(`/organizations/${id}`);
    }

    async getAllOrganizations(key: string) {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return this.get<Organization[]>(`/organizations/getAll/${key}`);
    }

    // Home
    async home() {
        this.refreshApiInstance(this.basePath, false)
        return this.get().then(res => {
            this.refreshApiInstance(this.basePath, true)
            return res
        })
    }

    async homePost(o: Record<string, string>): Promise<Record<string, string>> {
        this.refreshApiInstance(this.basePath, false)
        return this.post<Record<string, string>, Record<string, string>>(o)
    }

    // Authentication
    async authenticateOrganization(dto: AuthenticateOrganizationDto): Promise<AuthenticationResourceOrganization> {
        this.refreshApiInstance(this.basePath, false)
        const authenticationResourceOrganization = await this.post<AuthenticateOrganizationDto, AuthenticationResourceOrganization>(dto, "/auth/organization");
        this.setBearerToken(authenticationResourceOrganization.token)
        this.setProjectId(authenticationResourceOrganization.data.projectId!)
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        this.saveBearerToken()
        return authenticationResourceOrganization;
    }

    async authenticateUser(dto: AuthenticateUserDto): Promise<AuthenticationResourceUser> {
        this.refreshApiInstance(this.basePath, false)
        const authenticationResourceUser = await this.post<AuthenticateUserDto, AuthenticationResourceUser>(dto, "/auth/user");
        this.setBearerToken(authenticationResourceUser.token)
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        this.saveBearerToken()
        return authenticationResourceUser;
    }

    // CHATBOT
    async getAllChatbots(): Promise<Chatbot[]> {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return this.get<Chatbot[]>(`/chatbots`);
    }

    async createChatbot(dto: CreateChatbotDto): Promise<Chatbot> {
        const headers: Record<string, string> = {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${this.bearerToken}`
        }
        return this.post<CreateChatbotDto, Chatbot>(dto, "/chatbots", headers);
    }

    async getChatbotsForProject(projectId: string): Promise<Chatbot[]> {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return this.get<Chatbot[]>(`/chatbot/project-chatbot/:projectId?projectId=${projectId}`);
    }

    async getAvailableModels(): Promise<string[]> {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return this.get<string[]>(`/chatbot/available-models`);
    }

    // SIGNAL
    async getPreKeyBundle(userId: string): Promise<PreKeyBundle> {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return this.get<PreKeyBundle>(`/signal/pre-key-bundle/${userId}`);
    }

    async savePreKeyBundle(userId: string, dto: PreKeyBundle): Promise<PreKeyBundle> {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return this.post<PreKeyBundle, Record<string, string>>(dto, `/signal/pre-key-bundle/${userId}`);
    }

    // USER
    async getUserContacts(dto: GetUserContactsDto): Promise<User[]> {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return this.post<GetUserContactsDto, User[]>(dto, "/users/get-contacts");
    }

    async filterUserByDisplayName(dto: FindUserByDisplayNameDto): Promise<User[]> {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return this.post<FindUserByDisplayNameDto, User[]>(dto, "/users/filter/display-name");
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return this.post<CreateUserDto, User>(dto, "/users/create");
    }

    async addContact(dto: AddContactDto): Promise<User[]> {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return this.post<AddContactDto, User[]>(dto, "/users/add-contact");
    }

    async findOrganizationUsers(projectId: string): Promise<User[]> {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return this.get<User[]>(`/users/find-all/${projectId}`);
    }

    // CHAT
    async changeMessagingMode(dto: ChangeMessagingModeDto): Promise<Chat> {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return this.post<ChangeMessagingModeDto, Chat>(dto, "/chat/changeMode");
    }

    // Dans le cas de sendMessage, il faudra modifier reconstruire le header,
    async sendMessage(dto: SendMessageDto): Promise<Message> {
        const headers: Record<string, string> = {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${this.bearerToken}`
        }
        return await this.post<SendMessageDto, Message>(dto, "/chat/send", headers)
    }

    async getChatDetails(dto: GetChatDetailsDto): Promise<ChatDetailsResource> {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return await this.post<GetChatDetailsDto, ChatDetailsResource>(dto);
    }

    async getUserChats(user: string, projectId: string): Promise<ChatResource[]> {
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return await this.get<ChatResource[]>(`/chat/${user}/chats?projectId=${projectId}`);
    }


}