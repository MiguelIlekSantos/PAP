import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Delivery, Transporters, Products } from '@prisma/client';
import { BaseService } from '../../base/base.service';
import { ListParametersDto } from '../DTO/list/list.dto';
import { CreateDeliveryDto, UpdateDeliveryDto } from '../DTO/delivery.dto';
import { CreateTransportersDto, UpdateTransportersDto } from '../DTO/transporters.dto';
import { CreateProductsDto, UpdateProductsDto } from '../DTO/products.dto';

@Injectable()
export class LogisticsService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  private readonly deliveryModel: keyof PrismaService = 'delivery';
  private readonly transporterModel: keyof PrismaService = 'transporters';
  private readonly productModel: keyof PrismaService = 'products';

  // ----------------- Logistics Delivery -----------------
  async getLogisticsDeliveries(parameters: ListParametersDto) {
    return this.findAll<Delivery>(this.deliveryModel, parameters, 'address');
  }

  async getLogisticsDeliveryById(id: number) {
    return this.findOne(this.deliveryModel, id);
  }

  async createLogisticsDelivery(data: CreateDeliveryDto) {
    return this.create<Delivery, CreateDeliveryDto>(this.deliveryModel, data);
  }

  async updateLogisticsDelivery(id: number, data: UpdateDeliveryDto) {
    return this.update<Delivery, UpdateDeliveryDto>(this.deliveryModel, id, data);
  }

  async deleteLogisticsDelivery(id: number) {
    return this.delete<Delivery>(this.deliveryModel, id);
  }

  // ----------------- Transporters -----------------
  async getTransporters(parameters: ListParametersDto) {
    return this.findAll<Transporters>(this.transporterModel, parameters, 'name');
  }

  async getTransporterById(id: number) {
    return this.findOne(this.transporterModel, id);
  }

  async createTransporter(data: CreateTransportersDto) {
    return this.create<Transporters, CreateTransportersDto>(this.transporterModel, data);
  }

  async updateTransporter(id: number, data: UpdateTransportersDto) {
    return this.update<Transporters, UpdateTransportersDto>(this.transporterModel, id, data);
  }

  async deleteTransporter(id: number) {
    return this.delete<Transporters>(this.transporterModel, id);
  }

  // ----------------- Logistics Products -----------------
  async getLogisticsProducts(parameters: ListParametersDto) {
    return this.findAll<Products>(this.productModel, parameters, 'name');
  }

  async getLogisticsProductById(id: number) {
    return this.findOne(this.productModel, id);
  }

  async createLogisticsProduct(data: CreateProductsDto) {
    return this.create<Products, CreateProductsDto>(this.productModel, data);
  }

  async updateLogisticsProduct(id: number, data: UpdateProductsDto) {
    return this.update<Products, UpdateProductsDto>(this.productModel, id, data);
  }

  async deleteLogisticsProduct(id: number) {
    return this.delete<Products>(this.productModel, id);
  }
}