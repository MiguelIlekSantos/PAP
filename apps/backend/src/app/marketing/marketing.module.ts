import { Module } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { MarketingCampaignsController } from './marketing-campaigns.controller';
import { SocialMediaController } from './social-media.controller';
import { MarketingBudgetController } from './marketing-budget.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [
    MarketingCampaignsController,
    SocialMediaController,
    MarketingBudgetController
  ],
  providers: [MarketingService, PrismaService],
})
export class MarketingModule {}
