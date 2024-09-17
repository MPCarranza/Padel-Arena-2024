import { Controller, Get, UseGuards } from "@nestjs/common";
import { GlobalChatService } from "./global-chat.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";
import { SwaggerGetMessages } from "src/decorators/SwaggerDecorators/Chat.decorator";

@ApiTags("CHAT")
@Controller('/chat')
export class ChatController{
    constructor(
        private readonly chatService: GlobalChatService
    ){}

    @ApiBearerAuth()
    @Get()
    @SwaggerGetMessages()
    @UseGuards(AuthGuard)
    getChat(){
        return this.chatService.getAllMessages()
    }
}