import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Employees, Tasks, User, Logs } from '@prisma/client';
import { BaseService } from '../../base/base.service';
import { ListParametersDto } from '../DTO/list/list.dto';
import { CreateEmployeesDto, UpdateEmployeesDto } from '../DTO/employees.dto';
import { CreateTasksDto, UpdateTasksDto } from '../DTO/tasks.dto';
import { CreateUserDto, UpdateUserDto } from '../DTO/user.dto';
import { CreateLogsDto, UpdateLogsDto } from '../DTO/logs.dto';

@Injectable()
export class HumanResourcesService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  private readonly employeeModel: keyof PrismaService = 'employees';
  private readonly taskModel: keyof PrismaService = 'tasks';
  private readonly userModel: keyof PrismaService = 'user';
  private readonly logModel: keyof PrismaService = 'logs';

  // ----------------- Employees -----------------
  async getEmployees(parameters: ListParametersDto) {
    return this.findAll<Employees>(this.employeeModel, parameters, 'name');
  }

  async getEmployeeById(id: number) {
    return this.findOne(this.employeeModel, id);
  }

  async createEmployee(data: CreateEmployeesDto) {
    return this.create<Employees, CreateEmployeesDto>(this.employeeModel, data);
  }

  async updateEmployee(id: number, data: UpdateEmployeesDto) {
    return this.update<Employees, UpdateEmployeesDto>(this.employeeModel, id, data);
  }

  async deleteEmployee(id: number) {
    return this.delete<Employees>(this.employeeModel, id);
  }

  // ----------------- Tasks -----------------
  async getTasks(parameters: ListParametersDto) {
    return this.findAll<Tasks>(this.taskModel, parameters, 'title');
  }

  async getTaskById(id: number) {
    return this.findOne(this.taskModel, id);
  }

  async createTask(data: CreateTasksDto) {
    return this.create<Tasks, CreateTasksDto>(this.taskModel, data);
  }

  async updateTask(id: number, data: UpdateTasksDto) {
    return this.update<Tasks, UpdateTasksDto>(this.taskModel, id, data);
  }

  async deleteTask(id: number) {
    return this.delete<Tasks>(this.taskModel, id);
  }

  // ----------------- Users -----------------
  async getUsers(parameters: ListParametersDto) {
    return this.findAll<User>(this.userModel, parameters, 'username');
  }

  async getUserById(id: number) {
    return this.findOne(this.userModel, id);
  }

  async createUser(data: CreateUserDto) {
    return this.create<User, CreateUserDto>(this.userModel, data);
  }

  async updateUser(id: number, data: UpdateUserDto) {
    return this.update<User, UpdateUserDto>(this.userModel, id, data);
  }

  async deleteUser(id: number) {
    return this.delete<User>(this.userModel, id);
  }

  // ----------------- Logs -----------------
  async getLogs(parameters: ListParametersDto) {
    return this.findAll<Logs>(this.logModel, parameters, 'action');
  }

  async getLogById(id: number) {
    return this.findOne(this.logModel, id);
  }

  async createLog(data: CreateLogsDto) {
    return this.create<Logs, CreateLogsDto>(this.logModel, data);
  }

  async updateLog(id: number, data: UpdateLogsDto) {
    return this.update<Logs, UpdateLogsDto>(this.logModel, id, data);
  }

  async deleteLog(id: number) {
    return this.delete<Logs>(this.logModel, id);
  }
}