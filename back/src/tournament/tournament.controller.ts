import { Controller, Get, Post, Body, Param, ParseUUIDPipe, UseInterceptors, Put, UseGuards } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TransformTime } from 'src/interceptors/dateTime.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleEnum } from 'src/user/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { SwaggerCloseInscriptions, SwaggerGetAllTournaments, SwaggerGetOneTournament, SwaggerNewTournament } from 'src/decorators/SwaggerDecorators/Tournament.decorator';

@ApiTags("TORNEOS")
@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @ApiBearerAuth()
  @Post('/new')
  @SwaggerNewTournament()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(new TransformTime())
  async create(
    @Body() createTournamentDto: CreateTournamentDto) {
    return  await this.tournamentService.createTournament(createTournamentDto);
  }

  @Get()
  @SwaggerGetAllTournaments()
  getTournaments() {
    return this.tournamentService.getAllTournaments();
  }

  @Get(':id')
  @SwaggerGetOneTournament()
  getOneTournament(@Param('id', ParseUUIDPipe) id: string) {
    return this.tournamentService.getTournament(id);
  }

  @ApiBearerAuth()
  @Put('closeInscriptions/:id')
  @SwaggerCloseInscriptions()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  changeInscriptionStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.tournamentService.changeInscriptionStatus(id)
  }
}
