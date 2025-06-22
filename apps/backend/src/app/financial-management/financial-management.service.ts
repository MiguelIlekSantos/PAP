import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Transactions, Taxes, Budget, Invoices } from '@prisma/client';
import { BaseService } from '../../base/base.service';
import { ListParametersDto } from '../DTO/list/list.dto';
import { CreateTransactionsDto, UpdateTransactionsDto } from '../DTO/transactions.dto';
import { CreateTaxesDto, UpdateTaxesDto } from '../DTO/taxes.dto';
import { CreateBudgetDto, UpdateBudgetDto } from '../DTO/budget.dto';
import { CreateInvoicesDto, UpdateInvoicesDto } from '../DTO/invoices.dto';

@Injectable()
export class FinancialManagementService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  private readonly transactionModel: keyof PrismaService = 'transactions';
  private readonly taxModel: keyof PrismaService = 'taxes';
  private readonly budgetModel: keyof PrismaService = 'budget';
  private readonly invoiceModel: keyof PrismaService = 'invoices';

  // ----------------- Transactions -----------------
  async getTransactions(parameters: ListParametersDto) {
    return this.findAll<Transactions>(this.transactionModel, parameters, 'description');
  }

  async getTransactionById(id: number) {
    return this.findOne(this.transactionModel, id);
  }

  async createTransaction(data: CreateTransactionsDto) {
    return this.create<Transactions, CreateTransactionsDto>(this.transactionModel, data);
  }

  async updateTransaction(id: number, data: UpdateTransactionsDto) {
    return this.update<Transactions, UpdateTransactionsDto>(this.transactionModel, id, data);
  }

  async deleteTransaction(id: number) {
    return this.delete<Transactions>(this.transactionModel, id);
  }

  // ----------------- Taxes -----------------
  async getTaxes(parameters: ListParametersDto) {
    return this.findAll<Taxes>(this.taxModel, parameters, 'name');
  }

  async getTaxById(id: number) {
    return this.findOne(this.taxModel, id);
  }

  async createTax(data: CreateTaxesDto) {
    return this.create<Taxes, CreateTaxesDto>(this.taxModel, data);
  }

  async updateTax(id: number, data: UpdateTaxesDto) {
    return this.update<Taxes, UpdateTaxesDto>(this.taxModel, id, data);
  }

  async deleteTax(id: number) {
    return this.delete<Taxes>(this.taxModel, id);
  }

  // ----------------- Budget -----------------
  async getBudgets(parameters: ListParametersDto) {
    return this.findAll<Budget>(this.budgetModel, parameters, 'name');
  }

  async getBudgetById(id: number) {
    return this.findOne(this.budgetModel, id);
  }

  async createBudget(data: CreateBudgetDto) {
    return this.create<Budget, CreateBudgetDto>(this.budgetModel, data);
  }

  async updateBudget(id: number, data: UpdateBudgetDto) {
    return this.update<Budget, UpdateBudgetDto>(this.budgetModel, id, data);
  }

  async deleteBudget(id: number) {
    return this.delete<Budget>(this.budgetModel, id);
  }

  // ----------------- Invoices -----------------
  async getInvoices(parameters: ListParametersDto) {
    return this.findAll<Invoices>(this.invoiceModel, parameters, 'number');
  }

  async getInvoiceById(id: number) {
    return this.findOne(this.invoiceModel, id);
  }

  async createInvoice(data: CreateInvoicesDto) {
    return this.create<Invoices, CreateInvoicesDto>(this.invoiceModel, data);
  }

  async updateInvoice(id: number, data: UpdateInvoicesDto) {
    return this.update<Invoices, UpdateInvoicesDto>(this.invoiceModel, id, data);
  }

  async deleteInvoice(id: number) {
    return this.delete<Invoices>(this.invoiceModel, id);
  }
}