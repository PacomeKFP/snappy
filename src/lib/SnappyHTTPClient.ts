import {BaseService} from "./BaseService.ts";
import {
    AuthenticateOrganizationDto,
    AuthenticateUserDto,
    AuthenticationResourceOrganization,
    AuthenticationResourceUser,
    ChatDetailsResource,
    CreateOrganizationDto,
    GetChatDetailsDto, Message, SendMessageDto
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

    async getOrganization() {
    }

    async deleteOrganization() {
    }

    async getAllOrganizations() {
    }

    // Home
    async home() {
        this.refreshApiInstance(this.basePath, false)
        return this.get().then(res => {
            this.refreshApiInstance(this.basePath, true)
            return res
        })
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

    // TODO: les endpoints liés au chat controller, user controller, signal controller,
    // Exemple détails de chat
    async getChatDetails(dto: GetChatDetailsDto): Promise<ChatDetailsResource> {
        // TODO verifier si le token existe, sinon, exiger de s'authentifier
        this.refreshApiInstance(this.basePath, true, this.bearerToken!)
        return await this.post<GetChatDetailsDto, ChatDetailsResource>(dto);
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

}