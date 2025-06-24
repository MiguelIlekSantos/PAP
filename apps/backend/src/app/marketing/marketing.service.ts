import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Campaigns, SocialMedia, Budget } from '@prisma/client';
import { BaseService } from '../../base/base.service';
import { ListParametersDto } from '../DTO/list/list.dto';
import { CreateCampaignsDto, UpdateCampaignsDto } from '../DTO/campaigns.dto';
import { CreateSocialMediaDto, UpdateSocialMediaDto } from '../DTO/socialmedia.dto';
import { CreateBudgetDto, UpdateBudgetDto } from '../DTO/budget.dto';

@Injectable()
export class MarketingService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  private readonly campaignModel: keyof PrismaService = 'campaigns';
  private readonly socialMediaModel: keyof PrismaService = 'socialMedia';
  private readonly budgetModel: keyof PrismaService = 'budget';

  // ----------------- Marketing Campaigns -----------------
  async getMarketingCampaigns(parameters: ListParametersDto) {
    return this.findAll<Campaigns>(this.campaignModel, parameters, 'name');
  }

  async getMarketingCampaignById(id: number) {
    return this.findOne(this.campaignModel, id);
  }

  async createMarketingCampaign(data: CreateCampaignsDto) {
    return this.create<Campaigns, CreateCampaignsDto>(this.campaignModel, data);
  }

  async updateMarketingCampaign(id: number, data: UpdateCampaignsDto) {
    return this.update<Campaigns, UpdateCampaignsDto>(this.campaignModel, id, data);
  }

  async deleteMarketingCampaign(id: number) {
    return this.delete<Campaigns>(this.campaignModel, id);
  }

  // ----------------- Social Media -----------------
  async getSocialMedia(parameters: ListParametersDto) {
    return this.findAll<SocialMedia>(this.socialMediaModel, parameters, 'platform');
  }

  async getSocialMediaById(id: number) {
    return this.findOne(this.socialMediaModel, id);
  }

  async createSocialMedia(data: CreateSocialMediaDto) {
    return this.create<SocialMedia, CreateSocialMediaDto>(this.socialMediaModel, data);
  }

  async updateSocialMedia(id: number, data: UpdateSocialMediaDto) {
    return this.update<SocialMedia, UpdateSocialMediaDto>(this.socialMediaModel, id, data);
  }

  async deleteSocialMedia(id: number) {
    return this.delete<SocialMedia>(this.socialMediaModel, id);
  }

  // ----------------- Marketing Budget -----------------
  async getMarketingBudgets(parameters: ListParametersDto) {
    return this.findAll<Budget>(this.budgetModel, parameters, 'name');
  }

  async getMarketingBudgetById(id: number) {
    return this.findOne(this.budgetModel, id);
  }

  async createMarketingBudget(data: CreateBudgetDto) {
    return this.create<Budget, CreateBudgetDto>(this.budgetModel, data);
  }

  async updateMarketingBudget(id: number, data: UpdateBudgetDto) {
    return this.update<Budget, UpdateBudgetDto>(this.budgetModel, id, data);
  }

  async deleteMarketingBudget(id: number) {
    return this.delete<Budget>(this.budgetModel, id);
  }
}