import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { CreateCampaignsDto, UpdateCampaignsDto } from '../DTO/campaigns.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Campaigns } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('marketing-campaigns')
export class MarketingCampaignsController {
  constructor(
    private readonly marketingService: MarketingService,
  ) {}

  @Roles([Permissions.MARKETING_CAMPAIGNS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getMarketingCampaigns(@Query() parameters: ListParametersDto): Promise<ListResponse<Campaigns>> {
    return this.marketingService.getMarketingCampaigns(parameters);
  }

  @Roles([Permissions.MARKETING_CAMPAIGNS_READ])
  @Get(':id')
  getMarketingCampaign(@Param('id') id: string) {
    return this.marketingService.getMarketingCampaignById(+id);
  }

  @Roles([Permissions.MARKETING_CAMPAIGNS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createMarketingCampaign(@Body() dto: CreateCampaignsDto) {
    return this.marketingService.createMarketingCampaign(dto);
  }

  @Roles([Permissions.MARKETING_CAMPAIGNS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateMarketingCampaign(@Param('id') id: string, @Body() dto: UpdateCampaignsDto) {
    return this.marketingService.updateMarketingCampaign(+id, dto);
  }

  @Roles([Permissions.MARKETING_CAMPAIGNS_DELETE])
  @Delete(':id')
  deleteMarketingCampaign(@Param('id') id: string): Promise<boolean> {
    return this.marketingService.deleteMarketingCampaign(+id);
  }
}