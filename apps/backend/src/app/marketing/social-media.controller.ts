import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { CreateSocialMediaDto, UpdateSocialMediaDto } from '../DTO/socialmedia.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { SocialMedia } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('social-media')
export class SocialMediaController {
  constructor(
    private readonly marketingService: MarketingService,
  ) {}

  @Roles([Permissions.SOCIAL_MEDIA_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getSocialMedia(@Query() parameters: ListParametersDto): Promise<ListResponse<SocialMedia>> {
    return this.marketingService.getSocialMedia(parameters);
  }

  @Roles([Permissions.SOCIAL_MEDIA_READ])
  @Get(':id')
  getSocialMediaPost(@Param('id') id: string) {
    return this.marketingService.getSocialMediaById(+id);
  }

  @Roles([Permissions.SOCIAL_MEDIA_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createSocialMediaPost(@Body() dto: CreateSocialMediaDto) {
    return this.marketingService.createSocialMedia(dto);
  }

  @Roles([Permissions.SOCIAL_MEDIA_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateSocialMediaPost(@Param('id') id: string, @Body() dto: UpdateSocialMediaDto) {
    return this.marketingService.updateSocialMedia(+id, dto);
  }

  @Roles([Permissions.SOCIAL_MEDIA_DELETE])
  @Delete(':id')
  deleteSocialMediaPost(@Param('id') id: string): Promise<boolean> {
    return this.marketingService.deleteSocialMedia(+id);
  }
}