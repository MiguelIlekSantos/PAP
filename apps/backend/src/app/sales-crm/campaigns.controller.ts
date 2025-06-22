import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { SalesCrmService } from './sales-crm.service';
import { CreateCampaignsDto, UpdateCampaignsDto } from '../DTO/campaigns.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Campaigns } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('campaigns')
export class CampaignsController {
  constructor(
    private readonly salesCrmService: SalesCrmService,
  ) {}

  @Roles([Permissions.CAMPAIGNS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getCampaigns(@Query() parameters: ListParametersDto): Promise<ListResponse<Campaigns>> {
    return this.salesCrmService.getCampaigns(parameters);
  }

  @Roles([Permissions.CAMPAIGNS_READ])
  @Get(':id')
  getCampaign(@Param('id') id: string) {
    return this.salesCrmService.getCampaignById(+id);
  }

  @Roles([Permissions.CAMPAIGNS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createCampaign(@Body() dto: CreateCampaignsDto) {
    return this.salesCrmService.createCampaign(dto);
  }

  @Roles([Permissions.CAMPAIGNS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateCampaign(@Param('id') id: string, @Body() dto: UpdateCampaignsDto) {
    return this.salesCrmService.updateCampaign(+id, dto);
  }

  @Roles([Permissions.CAMPAIGNS_DELETE])
  @Delete(':id')
  deleteCampaign(@Param('id') id: string): Promise<boolean> {
    return this.salesCrmService.deleteCampaign(+id);
  }
}