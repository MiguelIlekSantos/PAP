import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Products, WareHouses, Equipments } from '@prisma/client';
import { BaseService } from '../../base/base.service';
import { ListParametersDto } from '../DTO/list/list.dto';
import { CreateProductsDto, UpdateProductsDto } from '../DTO/products.dto';
import { CreateWarehousesDto, UpdateWarehousesDto } from '../DTO/warehouses.dto';
import { CreateEquipmentsDto, UpdateEquipmentsDto } from '../DTO/equipments.dto';

@Injectable()
export class InventoryManagementService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  private readonly productModel: keyof PrismaService = 'products';
  private readonly warehouseModel: keyof PrismaService = 'wareHouses';
  private readonly equipmentModel: keyof PrismaService = 'equipments';

  // ----------------- Products -----------------
  async getProducts(parameters: ListParametersDto) {
    return this.findAll<Products>(this.productModel, parameters, 'name');
  }

  async getProductById(id: number) {
    return this.findOne(this.productModel, id);
  }

  async createProduct(data: CreateProductsDto) {
    return this.create<Products, CreateProductsDto>(this.productModel, data);
  }

  async updateProduct(id: number, data: UpdateProductsDto) {
    return this.update<Products, UpdateProductsDto>(this.productModel, id, data);
  }

  async deleteProduct(id: number) {
    return this.delete<Products>(this.productModel, id);
  }

  // ----------------- Warehouses -----------------
  async getWarehouses(parameters: ListParametersDto) {
    return this.findAll<WareHouses>(this.warehouseModel, parameters, 'name');
  }

  async getWarehouseById(id: number) {
    return this.findOne(this.warehouseModel, id);
  }

  async createWarehouse(data: CreateWarehousesDto) {
    return this.create<WareHouses, CreateWarehousesDto>(this.warehouseModel, data);
  }

  async updateWarehouse(id: number, data: UpdateWarehousesDto) {
    return this.update<WareHouses, UpdateWarehousesDto>(this.warehouseModel, id, data);
  }

  async deleteWarehouse(id: number) {
    return this.delete<WareHouses>(this.warehouseModel, id);
  }

  // ----------------- Equipments -----------------
  async getEquipments(parameters: ListParametersDto) {
    return this.findAll<Equipments>(this.equipmentModel, parameters, 'name');
  }

  async getEquipmentById(id: number) {
    return this.findOne(this.equipmentModel, id);
  }

  async createEquipment(data: CreateEquipmentsDto) {
    return this.create<Equipments, CreateEquipmentsDto>(this.equipmentModel, data);
  }

  async updateEquipment(id: number, data: UpdateEquipmentsDto) {
    return this.update<Equipments, UpdateEquipmentsDto>(this.equipmentModel, id, data);
  }

  async deleteEquipment(id: number) {
    return this.delete<Equipments>(this.equipmentModel, id);
  }
}