import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Purchases, Suppliers } from '@prisma/client';
import { BaseService } from '../../base/base.service';
import { ListParametersDto } from '../DTO/list/list.dto';
import { CreatePurchasesDto, UpdatePurchasesDto } from '../DTO/purchases.dto';
import { CreateSuppliersDto, UpdateSuppliersDto } from '../DTO/suppliers.dto';

@Injectable()
export class PurchasesService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  private readonly purchaseModel: keyof PrismaService = 'purchases';
  private readonly supplierModel: keyof PrismaService = 'suppliers';

  // ----------------- Purchases -----------------
  async getPurchases(parameters: ListParametersDto) {
    return this.findAll<Purchases>(this.purchaseModel, parameters, 'description');
  }

  async getPurchaseById(id: number) {
    return this.findOne(this.purchaseModel, id);
  }

  async createPurchase(data: CreatePurchasesDto) {
    return this.create<Purchases, CreatePurchasesDto>(this.purchaseModel, data);
  }

  async updatePurchase(id: number, data: UpdatePurchasesDto) {
    return this.update<Purchases, UpdatePurchasesDto>(this.purchaseModel, id, data);
  }

  async deletePurchase(id: number) {
    return this.delete<Purchases>(this.purchaseModel, id);
  }

  // ----------------- Suppliers -----------------
  async getSuppliers(parameters: ListParametersDto) {
    return this.findAll<Suppliers>(this.supplierModel, parameters, 'name');
  }

  async getSupplierById(id: number) {
    return this.findOne(this.supplierModel, id);
  }

  async createSupplier(data: CreateSuppliersDto) {
    return this.create<Suppliers, CreateSuppliersDto>(this.supplierModel, data);
  }

  async updateSupplier(id: number, data: UpdateSuppliersDto) {
    return this.update<Suppliers, UpdateSuppliersDto>(this.supplierModel, id, data);
  }

  async deleteSupplier(id: number) {
    return this.delete<Suppliers>(this.supplierModel, id);
  }
}