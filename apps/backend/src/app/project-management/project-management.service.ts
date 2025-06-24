import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Projects, Tasks, Chats, Messages, Budget } from '@prisma/client';
import { BaseService } from '../../base/base.service';
import { ListParametersDto } from '../DTO/list/list.dto';
import { CreateProjectsDto, UpdateProjectsDto } from '../DTO/projects.dto';
import { CreateTasksDto, UpdateTasksDto } from '../DTO/tasks.dto';
import { CreateChatsDto, UpdateChatsDto } from '../DTO/chats.dto';
import { CreateMessagesDto, UpdateMessagesDto } from '../DTO/messages.dto';
import { CreateBudgetDto, UpdateBudgetDto } from '../DTO/budget.dto';

@Injectable()
export class ProjectManagementService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  private readonly projectModel: keyof PrismaService = 'projects';
  private readonly taskModel: keyof PrismaService = 'tasks';
  private readonly chatModel: keyof PrismaService = 'chats';
  private readonly messageModel: keyof PrismaService = 'messages';
  private readonly budgetModel: keyof PrismaService = 'budget';

  // ----------------- Projects -----------------
  async getProjects(parameters: ListParametersDto) {
    return this.findAll<Projects>(this.projectModel, parameters, 'name');
  }

  async getProjectById(id: number) {
    return this.findOne(this.projectModel, id);
  }

  async createProject(data: CreateProjectsDto) {
    return this.create<Projects, CreateProjectsDto>(this.projectModel, data);
  }

  async updateProject(id: number, data: UpdateProjectsDto) {
    return this.update<Projects, UpdateProjectsDto>(this.projectModel, id, data);
  }

  async deleteProject(id: number) {
    return this.delete<Projects>(this.projectModel, id);
  }

  // ----------------- Project Tasks -----------------
  async getProjectTasks(parameters: ListParametersDto) {
    return this.findAll<Tasks>(this.taskModel, parameters, 'title');
  }

  async getProjectTaskById(id: number) {
    return this.findOne(this.taskModel, id);
  }

  async createProjectTask(data: CreateTasksDto) {
    return this.create<Tasks, CreateTasksDto>(this.taskModel, data);
  }

  async updateProjectTask(id: number, data: UpdateTasksDto) {
    return this.update<Tasks, UpdateTasksDto>(this.taskModel, id, data);
  }

  async deleteProjectTask(id: number) {
    return this.delete<Tasks>(this.taskModel, id);
  }

  // ----------------- Chats -----------------
  async getChats(parameters: ListParametersDto) {
    return this.findAll<Chats>(this.chatModel, parameters, 'name');
  }

  async getChatById(id: number) {
    return this.findOne(this.chatModel, id);
  }

  async createChat(data: CreateChatsDto) {
    return this.create<Chats, CreateChatsDto>(this.chatModel, data);
  }

  async updateChat(id: number, data: UpdateChatsDto) {
    return this.update<Chats, UpdateChatsDto>(this.chatModel, id, data);
  }

  async deleteChat(id: number) {
    return this.delete<Chats>(this.chatModel, id);
  }

  // ----------------- Messages -----------------
  async getMessages(parameters: ListParametersDto) {
    return this.findAll<Messages>(this.messageModel, parameters, 'content');
  }

  async getMessageById(id: number) {
    return this.findOne(this.messageModel, id);
  }

  async createMessage(data: CreateMessagesDto) {
    return this.create<Messages, CreateMessagesDto>(this.messageModel, data);
  }

  async updateMessage(id: number, data: UpdateMessagesDto) {
    return this.update<Messages, UpdateMessagesDto>(this.messageModel, id, data);
  }

  async deleteMessage(id: number) {
    return this.delete<Messages>(this.messageModel, id);
  }

  // ----------------- Project Budget -----------------
  async getProjectBudgets(parameters: ListParametersDto) {
    return this.findAll<Budget>(this.budgetModel, parameters, 'name');
  }

  async getProjectBudgetById(id: number) {
    return this.findOne(this.budgetModel, id);
  }

  async createProjectBudget(data: CreateBudgetDto) {
    return this.create<Budget, CreateBudgetDto>(this.budgetModel, data);
  }

  async updateProjectBudget(id: number, data: UpdateBudgetDto) {
    return this.update<Budget, UpdateBudgetDto>(this.budgetModel, id, data);
  }

  async deleteProjectBudget(id: number) {
    return this.delete<Budget>(this.budgetModel, id);
  }
}