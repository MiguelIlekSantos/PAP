import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { Branches, Departments, Enterprise, SubDepartments } from '@prisma/client';
import { BaseService } from '../../base/base.service';
import { ListParametersDto } from '../DTO/list/list.dto';
import { CreateEnterpriseDto, UpdateEnterpriseDto } from '../DTO/enterprise.dto';
import { CreateBranchesDto, UpdateBranchesDto } from '../DTO/branches.dto';
import { CreateDepartmentsDto, UpdateDepartmentsDto } from '../DTO/departments.dto';
import { CreateSubDepartmentsDto, UpdateSubDepartmentsDto } from '../DTO/subdepartments.dto';

@Injectable()
export class EnterpriseManagementService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  private readonly model: keyof PrismaService = 'enterprise';
  private readonly branchModel: keyof PrismaService = 'branches';
  private readonly departmentModel: keyof PrismaService = 'departments';
  private readonly subDepartmentModel: keyof PrismaService = 'subDepartments';




  // ----------------- Enterprises -----------------
  async getEnterprises(parameters: ListParametersDto) {
    return this.findAll<Enterprise>(this.model, parameters, 'legalName');
  }

  async getEnterpriseById(id: number) {
    return this.findOne(this.model, id);
  }

  async createEnterprise(enterpriseInfo: CreateEnterpriseDto) {
    return this.create<Enterprise, CreateEnterpriseDto>(this.model, enterpriseInfo);
  }

  async updateEnterprise(id: number, enterpriseInfo: UpdateEnterpriseDto) {
    return this.update<Enterprise, UpdateEnterpriseDto>(this.model, id, enterpriseInfo);
  }

  async deleteEnterprise(id: number) {
    return this.delete<Enterprise>(this.model, id);
  }




  // ----------------- Branches -----------------
  async getBranches(parameters: ListParametersDto) {
    return this.findAll<Branches>(this.branchModel, parameters, 'address');
  }

  async getBranchById(id: number) {
    return this.findOne(this.branchModel, id);
  }

  async createBranch(data: CreateBranchesDto) {
    return this.create<Branches, CreateBranchesDto>(this.branchModel, data);
  }

  async updateBranch(id: number, data: UpdateBranchesDto) {
    return this.update<Branches, UpdateBranchesDto>(this.branchModel, id, data);
  }

  async deleteBranch(id: number) {
    return this.delete<Branches>(this.branchModel, id);
  }




  // ----------------- Departments -----------------
  async getDepartments(parameters: ListParametersDto) {
    return this.findAll<Departments>(this.departmentModel, parameters, 'name');
  }

  async getDepartmentById(id: number) {
    return this.findOne(this.departmentModel, id);
  }

  async createDepartment(data: CreateDepartmentsDto) {
    return this.create<Departments, CreateDepartmentsDto>(this.departmentModel, data);
  }

  async updateDepartment(id: number, data: UpdateDepartmentsDto) {
    return this.update<Departments, UpdateDepartmentsDto>(this.departmentModel, id, data);
  }

  async deleteDepartment(id: number) {
    return this.delete<Departments>(this.departmentModel, id);
  }




  
  // ----------------- Sub-departments -----------------
  async getSubDepartments(parameters: ListParametersDto) {
    return this.findAll<SubDepartments>(this.subDepartmentModel, parameters, 'name');
  }

  async getSubDepartmentById(id: number) {
    return this.findOne(this.subDepartmentModel, id);
  }

  async createSubDepartment(data: CreateSubDepartmentsDto) {
    return this.create<SubDepartments, CreateSubDepartmentsDto>(this.subDepartmentModel, data);
  }

  async updateSubDepartment(id: number, data: UpdateSubDepartmentsDto) {
    return this.update<SubDepartments, UpdateSubDepartmentsDto>(this.subDepartmentModel, id, data);
  }

  async deleteSubDepartment(id: number) {
    return this.delete<SubDepartments>(this.subDepartmentModel, id);
  }
}
