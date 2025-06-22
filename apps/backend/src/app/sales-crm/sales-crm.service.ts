import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Clients, Sales, Requests, Delivery, Campaigns } from '@prisma/client';
import { BaseService } from '../../base/base.service';
import { ListParametersDto } from '../DTO/list/list.dto';
import { CreateClientsDto, UpdateClientsDto } from '../DTO/clients.dto';
import { CreateSalesDto, UpdateSalesDto } from '../DTO/sales.dto';
import { CreateRequestsDto, UpdateRequestsDto } from '../DTO/requests.dto';
import { CreateDeliveryDto, UpdateDeliveryDto } from '../DTO/delivery.dto';
import { CreateCampaignsDto, UpdateCampaignsDto } from '../DTO/campaigns.dto';

@Injectable()
export class SalesCrmService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  private readonly clientModel: keyof PrismaService = 'clients';
  private readonly saleModel: keyof PrismaService = 'sales';
  private readonly requestModel: keyof PrismaService = 'requests';
  private readonly deliveryModel: keyof PrismaService = 'delivery';
  private readonly campaignModel: keyof PrismaService = 'campaigns';

  // ----------------- Clients -----------------
  async getClients(parameters: ListParametersDto) {
    return this.findAll<Clients>(this.clientModel, parameters, 'name');
  }

  async getClientById(id: number) {
    return this.findOne(this.clientModel, id);
  }

  async createClient(data: CreateClientsDto) {
    return this.create<Clients, CreateClientsDto>(this.clientModel, data);
  }

  async updateClient(id: number, data: UpdateClientsDto) {
    return this.update<Clients, UpdateClientsDto>(this.clientModel, id, data);
  }

  async deleteClient(id: number) {
    return this.delete<Clients>(this.clientModel, id);
  }

  // ----------------- Sales -----------------
  async getSales(parameters: ListParametersDto) {
    return this.findAll<Sales>(this.saleModel, parameters, 'description');
  }

  async getSaleById(id: number) {
    return this.findOne(this.saleModel, id);
  }

  async createSale(data: CreateSalesDto) {
    return this.create<Sales, CreateSalesDto>(this.saleModel, data);
  }

  async updateSale(id: number, data: UpdateSalesDto) {
    return this.update<Sales, UpdateSalesDto>(this.saleModel, id, data);
  }

  async deleteSale(id: number) {
    return this.delete<Sales>(this.saleModel, id);
  }

  // ----------------- Requests -----------------
  async getRequests(parameters: ListParametersDto) {
    return this.findAll<Requests>(this.requestModel, parameters, 'title');
  }

  async getRequestById(id: number) {
    return this.findOne(this.requestModel, id);
  }

  async createRequest(data: CreateRequestsDto) {
    return this.create<Requests, CreateRequestsDto>(this.requestModel, data);
  }

  async updateRequest(id: number, data: UpdateRequestsDto) {
    return this.update<Requests, UpdateRequestsDto>(this.requestModel, id, data);
  }

  async deleteRequest(id: number) {
    return this.delete<Requests>(this.requestModel, id);
  }

  // ----------------- Delivery -----------------
  async getDeliveries(parameters: ListParametersDto) {
    return this.findAll<Delivery>(this.deliveryModel, parameters, 'address');
  }

  async getDeliveryById(id: number) {
    return this.findOne(this.deliveryModel, id);
  }

  async createDelivery(data: CreateDeliveryDto) {
    return this.create<Delivery, CreateDeliveryDto>(this.deliveryModel, data);
  }

  async updateDelivery(id: number, data: UpdateDeliveryDto) {
    return this.update<Delivery, UpdateDeliveryDto>(this.deliveryModel, id, data);
  }

  async deleteDelivery(id: number) {
    return this.delete<Delivery>(this.deliveryModel, id);
  }

  // ----------------- Campaigns -----------------
  async getCampaigns(parameters: ListParametersDto) {
    return this.findAll<Campaigns>(this.campaignModel, parameters, 'name');
  }

  async getCampaignById(id: number) {
    return this.findOne(this.campaignModel, id);
  }

  async createCampaign(data: CreateCampaignsDto) {
    return this.create<Campaigns, CreateCampaignsDto>(this.campaignModel, data);
  }

  async updateCampaign(id: number, data: UpdateCampaignsDto) {
    return this.update<Campaigns, UpdateCampaignsDto>(this.campaignModel, id, data);
  }

  async deleteCampaign(id: number) {
    return this.delete<Campaigns>(this.campaignModel, id);
  }
}