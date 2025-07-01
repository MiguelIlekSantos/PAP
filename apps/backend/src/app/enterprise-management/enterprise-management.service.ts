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
    // Versão simplificada para teste - deletar apenas o essencial
    try {
      console.log(`Iniciando deleção simplificada para enterprise ${id}`);
      
      // Verificar se a enterprise existe
      const enterprise = await this.prisma.enterprise.findUnique({
        where: { id: id }
      });
      
      if (!enterprise) {
        throw new Error(`Enterprise com ID ${id} não encontrada`);
      }
      
      // Usar transação para garantir atomicidade
      const result = await this.prisma.$transaction(async (prisma) => {
        console.log('Iniciando transação de deleção...');
        
        // 1. Deletar subdepartments primeiro
        const deletedSubDepts = await prisma.subDepartments.deleteMany({
          where: { enterpriseId: id }
        });
        console.log(`Deletados ${deletedSubDepts.count} subdepartments`);
        
        // 2. Deletar employees (que dependem de departments)
        const employees = await prisma.employees.findMany({
          where: { department: { enterpriseId: id } }
        });
        
        if (employees.length > 0) {
          // Deletar tasks dos employees primeiro
          await prisma.tasks.deleteMany({
            where: { Employee: { some: { id: { in: employees.map(e => e.id) } } } }
          });
          console.log(`Deletadas tasks de ${employees.length} employees`);
          
          // Deletar employees
          await prisma.employees.deleteMany({
            where: { department: { enterpriseId: id } }
          });
          console.log(`Deletados ${employees.length} employees`);
        }
        
        // 3. Deletar departments
        const deletedDepts = await prisma.departments.deleteMany({
          where: { enterpriseId: id }
        });
        console.log(`Deletados ${deletedDepts.count} departments`);
        
        // 4. Deletar products (que dependem de branches)
        const deletedProducts = await prisma.products.deleteMany({
          where: { branch: { enterpriseId: id } }
        });
        console.log(`Deletados ${deletedProducts.count} products`);
        
        // 5. Deletar branches
        const deletedBranches = await prisma.branches.deleteMany({
          where: { enterpriseId: id }
        });
        console.log(`Deletadas ${deletedBranches.count} branches`);
        
        // 6. Deletar outros dados simples (sem dependências complexas)
        const deletions = await Promise.all([
          prisma.wareHouses.deleteMany({ where: { enterpriseId: id } }),
          prisma.equipments.deleteMany({ where: { enterpriseId: id } }),
          prisma.transactions.deleteMany({ where: { enterpriseId: id } }),
          prisma.taxes.deleteMany({ where: { enterpriseId: id } }),
          prisma.documents.deleteMany({ where: { enterpriseId: id } }),
          prisma.domains.deleteMany({ where: { enterpriseId: id } }),
          prisma.socialMedia.deleteMany({ where: { enterpriseId: id } }),
          prisma.reports.deleteMany({ where: { enterpriseId: id } })
        ]);
        
        console.log('Deletados dados auxiliares:', deletions.map(d => d.count));
        
        // 7. Deletar dados com possíveis dependências mais complexas
        try {
          await prisma.clients.deleteMany({ where: { enterpriseId: id } });
          console.log('Clients deletados');
        } catch (e) {
          console.log('Erro ao deletar clients, tentando deletar dependências primeiro...');
          // Se falhar, pode ser por causa de sales, invoices, etc.
          await prisma.sales.deleteMany({ where: { Client: { enterpriseId: id } } });
          await prisma.invoices.deleteMany({ where: { Client: { enterpriseId: id } } });
          await prisma.requests.deleteMany({ where: { Client: { enterpriseId: id } } });
          await prisma.delivery.deleteMany({ where: { Client: { enterpriseId: id } } });
          await prisma.clients.deleteMany({ where: { enterpriseId: id } });
          console.log('Clients e dependências deletados');
        }
        
        try {
          await prisma.suppliers.deleteMany({ where: { enterpriseId: id } });
          console.log('Suppliers deletados');
        } catch (e) {
          console.log('Erro ao deletar suppliers, tentando deletar dependências primeiro...');
          await prisma.purchases.deleteMany({ where: { Supplier: { enterpriseId: id } } });
          await prisma.suppliers.deleteMany({ where: { enterpriseId: id } });
          console.log('Suppliers e dependências deletados');
        }
        
        // 8. Deletar dados restantes
        await prisma.transporters.deleteMany({ where: { enterpriseId: id } });
        await prisma.campaigns.deleteMany({ where: { enterpriseId: id } });
        await prisma.projects.deleteMany({ where: { enterpriseId: id } });
        await prisma.internSystems.deleteMany({ where: { enterpriseId: id } });
        await prisma.user.deleteMany({ where: { enterpriseId: id } });
        
        console.log('Todos os dados relacionados deletados, deletando enterprise...');
        
        // 9. Finalmente, deletar a enterprise
        const deletedEnterprise = await prisma.enterprise.delete({
          where: { id: id }
        });
        
        console.log('Enterprise deletada com sucesso!');
        return deletedEnterprise;
      });
      
      console.log(`Enterprise ${id} deletada com sucesso`);
      return !!result;
      
    } catch (error) {
      console.error(`Erro ao deletar enterprise ${id}:`, error);
      throw error;
    }
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
    // Implementar deleção em cascata manual para branches
    try {
      console.log(`Iniciando deleção em cascata para branch ${id}`);
      
      // 1. Deletar produtos da filial
      await this.prisma.products.deleteMany({
        where: {
          branchId: id
        }
      });
      
      // 2. Remover associações com departamentos (many-to-many)
      // Como é uma relação many-to-many implícita, o Prisma deve lidar automaticamente
      
      // 3. Deletar a branch
      const result = await this.prisma.branches.delete({
        where: { id: id }
      });
      
      console.log(`Branch ${id} deletada com sucesso`);
      return !!result;
      
    } catch (error) {
      console.error(`Erro ao deletar branch ${id}:`, error);
      throw error;
    }
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
    // Implementar deleção em cascata manual para departments
    try {
      console.log(`Iniciando deleção em cascata para department ${id}`);
      
      // 1. Deletar tasks dos employees deste departamento
      await this.prisma.tasks.deleteMany({
        where: {
          Employee: {
            some: {
              departmentId: id
            }
          }
        }
      });
      
      // 2. Deletar employees do departamento
      await this.prisma.employees.deleteMany({
        where: {
          departmentId: id
        }
      });
      
      // 3. Deletar subdepartments
      await this.prisma.subDepartments.deleteMany({
        where: {
          departmentId: id
        }
      });
      
      // 4. Deletar o department
      const result = await this.prisma.departments.delete({
        where: { id: id }
      });
      
      console.log(`Department ${id} deletado com sucesso`);
      return !!result;
      
    } catch (error) {
      console.error(`Erro ao deletar department ${id}:`, error);
      throw error;
    }
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
