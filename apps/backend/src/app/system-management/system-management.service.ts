import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, InternSystems, Logs, Documents, Domains } from '@prisma/client';
import { BaseService } from '../../base/base.service';
import { ListParametersDto } from '../DTO/list/list.dto';
import { CreateUserDto, UpdateUserDto } from '../DTO/user.dto';
import { CreateInternSystemsDto, UpdateInternSystemsDto } from '../DTO/internsystems.dto';
import { CreateLogsDto, UpdateLogsDto } from '../DTO/logs.dto';
import { CreateDocumentsDto, UpdateDocumentsDto } from '../DTO/documents.dto';
import { CreateDomainsDto, UpdateDomainsDto } from '../DTO/domains.dto';

@Injectable()
export class SystemManagementService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  private readonly userModel: keyof PrismaService = 'user';
  private readonly internSystemModel: keyof PrismaService = 'internSystems';
  private readonly logModel: keyof PrismaService = 'logs';
  private readonly documentModel: keyof PrismaService = 'documents';
  private readonly domainModel: keyof PrismaService = 'domains';

  // ----------------- System Users -----------------
  async getSystemUsers(parameters: ListParametersDto) {
    return this.findAll<User>(this.userModel, parameters, 'username');
  }

  async getSystemUserById(id: number) {
    return this.findOne(this.userModel, id);
  }

  async createSystemUser(data: CreateUserDto) {
    return this.create<User, CreateUserDto>(this.userModel, data);
  }

  async updateSystemUser(id: number, data: UpdateUserDto) {
    return this.update<User, UpdateUserDto>(this.userModel, id, data);
  }

  async deleteSystemUser(id: number) {
    return this.delete<User>(this.userModel, id);
  }

  // ----------------- Intern Systems -----------------
  async getInternSystems(parameters: ListParametersDto) {
    return this.findAll<InternSystems>(this.internSystemModel, parameters, 'name');
  }

  async getInternSystemById(id: number) {
    return this.findOne(this.internSystemModel, id);
  }

  async createInternSystem(data: CreateInternSystemsDto) {
    return this.create<InternSystems, CreateInternSystemsDto>(this.internSystemModel, data);
  }

  async updateInternSystem(id: number, data: UpdateInternSystemsDto) {
    return this.update<InternSystems, UpdateInternSystemsDto>(this.internSystemModel, id, data);
  }

  async deleteInternSystem(id: number) {
    return this.delete<InternSystems>(this.internSystemModel, id);
  }

  // ----------------- System Logs -----------------
  async getSystemLogs(parameters: ListParametersDto) {
    return this.findAll<Logs>(this.logModel, parameters, 'action');
  }

  async getSystemLogById(id: number) {
    return this.findOne(this.logModel, id);
  }

  async createSystemLog(data: CreateLogsDto) {
    return this.create<Logs, CreateLogsDto>(this.logModel, data);
  }

  async updateSystemLog(id: number, data: UpdateLogsDto) {
    return this.update<Logs, UpdateLogsDto>(this.logModel, id, data);
  }

  async deleteSystemLog(id: number) {
    return this.delete<Logs>(this.logModel, id);
  }

  // ----------------- Documents -----------------
  async getDocuments(parameters: ListParametersDto) {
    return this.findAll<Documents>(this.documentModel, parameters, 'name');
  }

  async getDocumentById(id: number) {
    return this.findOne(this.documentModel, id);
  }

  async createDocument(data: CreateDocumentsDto) {
    return this.create<Documents, CreateDocumentsDto>(this.documentModel, data);
  }

  async updateDocument(id: number, data: UpdateDocumentsDto) {
    return this.update<Documents, UpdateDocumentsDto>(this.documentModel, id, data);
  }

  async deleteDocument(id: number) {
    return this.delete<Documents>(this.documentModel, id);
  }

  // ----------------- Domains -----------------
  async getDomains(parameters: ListParametersDto) {
    return this.findAll<Domains>(this.domainModel, parameters, 'name');
  }

  async getDomainById(id: number) {
    return this.findOne(this.domainModel, id);
  }

  async createDomain(data: CreateDomainsDto) {
    return this.create<Domains, CreateDomainsDto>(this.domainModel, data);
  }

  async updateDomain(id: number, data: UpdateDomainsDto) {
    return this.update<Domains, UpdateDomainsDto>(this.domainModel, id, data);
  }

  async deleteDomain(id: number) {
    return this.delete<Domains>(this.domainModel, id);
  }
}