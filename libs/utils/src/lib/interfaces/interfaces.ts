export interface BranchesDTO {
  id: number;
  address: string;
  phone: string;
  email: string;
  purpose: string;
  enterpriseId: number;
  departments: number[];
  products: number[];
}

export interface BudgetDTO {
  id: number;
  name: string;
  amount: number;
  usedAmount: number;
  remainingAmount: number;
  status: string;
  period: string;
  category: string;

  departmentId?: number;
  subDepartmentId?: number;
  projectId?: number;
  campaignId?: number;

  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignsDTO {
  id: number;
  name: string;
  type: string;
  status: string;
  leads: number;
  conversions: number;
  roi: number;
  budget: number;
  enterpriseId: number;
}

export interface ChatsDTO {
  id: number;
  projectId: number;
  messages: number[];
}


export interface ClientsDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  address: string;
  sales: number[];
  requests: number[];
  invoices: number[];
  delivery: number[];
  projects: number[];
}

export interface DeliveryDTO {
  id: number;
  expectedDate?: Date;
  deliveryDate?: Date;
  status: string;
  clientId: number;
  transporterId: number;
  products?: number[];
}


export interface DepartmentsDTO {
  id: number;
  name: string;
  description?: string;
  responsible?: string;
  totalEmployees?: number;
  branchIds?: number[];
  employeeIds?: number[];
}

export interface DocumentsDTO {
  id: number;
  name: string;
  description?: string;
  type?: string;
  size?: number;
  path: string;
  enterpriseId: number;
}

export interface DomainsDTO {
  id: number;
  name: string;
  type?: string;
  registrator?: string;
  expirationDate?: Date;
  hosting?: string;
  status?: string;
  enterpriseId: number;
}

export interface EmployeesDTO {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  position: string | null;
  salary: number | null;
  dateOfHire: Date | null;
  shiftType: string | null;
  workingHours: number | null;
  workingDays: number | null;
  status: string | null;
  departmentId: number;
  projects: number[];
  tasks: number[];
}


export interface EnterpriseDTO {
  id: number;
  legalName: string;
  comercialName?: string;
  registerNumber?: string;
  registerCountry?: string;
  registerType?: string;
  type?: string;
  foundationDate?: Date | null;
  mainLanguage?: string;
  oficialCurrency?: string;
  email?: string;
  phone?: string;
  logo?: string;

  // Relações
  branches: number[];
  wareHouses: number[];
  equipments: number[];
  transactions: number[];
  taxes: number[];
  clients: number[];
  suppliers: number[];
  transporters: number[];
  documents: number[];
  domains: number[];
  internSystems: number[];
  users: number[];
  campaigns: number[];
  socialMedia: number[];
  reports: number[];
}


export interface EquipmentsDTO {
  id: number;
  name: string;
  serialNumber: string;
  description: string;
  model: string;
  brand: string;
  purchaseDate: Date;
  warrantyEndDate: Date;
  status: string;
  location: string;
  enterpriseId: number;
}


export interface InternSystemsDTO {
  id: number;
  name: string;
  type: string;
  version: string;
  environment: string;
  tecnology: string;
  status: string;
  logs: number[];
  enterpriseId: number;
}

export interface InvoicesDTO {
  id: number;
  number: string;
  ClientId: number;
  registerdate: Date;
  dueDate: Date;
  paymentDate: Date;
  total: number;
  status: string;
}

export interface LogsDTO {
  id: number;
  action: string;
  level: string;
  timestamp: Date;
  category: string;
  InternSystemId: number;
  userId: number;
}


export interface MessagesDTO {
  id: number;
  content: string;
  sender: string;
  createdAt: Date;
  chatId: number;
}


export interface ProductsDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  subCategory: string;
  brand: string;
  model: string;
  sku: string;
  barcode: string;
  weight: number;
  dimensions: string;
  imageUrl: string;
  wareHouseId: number;
  sales: number[];
  requests: number[];
  delivery: number[];
  branch: number;
}


export interface ProjectsDTO {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  progress: number;
  priority: string;
  manager: string;
  budget: number;  
  clientId: number;
  employees: number[];
  tasks: number[];
  chat: number;
}


export interface PurchasesDTO {
  id: number;
  number: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  brand: string;
  model: string;
  sku: string;
  weight: number;
  dimensions: string;
  imageUrl: string;
  supplierId: number;
}


export interface ReportsDTO {
  id: number;
  name: string;
  path: string;
  type: string;
  frequency: string;
  status: string;
  lastUpdate: Date;
  nextUpdate: Date;
  downloads: number;
  enterpriseId: number;
}


export interface RequestsDTO {
  id: number;
  number: string;
  clientId: number;
  deliveryDate: Date;
  status: string;
  products: number[];
}

export interface SalesDTO {
  id: number;
  total: number;
  Status: string;
  PaymentMethod: string;
  lastPurchase: Date;
  ClientId: number;
  products: number[];
}


export interface SocialMediaDTO {
  id: number;
  platform: string;
  username: string;
  followers: number;
  engagementRate: number;
  enterpriseId: number;
}

export interface SubDepartmentsDTO {
  id: number;
  name: string;
  description: string;
  responsible: string;
  totalEmployees: number;
  departmentId: number;
  budget: number;
}

export interface SuppliersDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  purchases: number[];
  enterpriseId: number;
}


export interface TasksDTO {
  id: number;
  name: string;
  description: string;
  assignedTo: string;
  dueDate: Date;
  completed: boolean;
  completedAt: Date;
  projectId: number;
  status: string;
  priority: string;
  responsible: number;
  employees: number[];
}

export interface TaxesDTO {
  id: number;
  amount: number;
  type: string;
  period: string;
  description: string;
  endDate: Date;
  enterpriseId: number;
}


export interface TransactionsDTO {
  id: number;
  amount: number;
  date: Date;
  bankAccount: string;
  category: string;
  description: string;
  status: string;
  enterpriseId: number;
}


export interface TransportersDTO {
  id: number;
  licensePlate: string;
  vehicleType: string;
  status: string;
  extEnterprise: string;
  phone: string;
  representative: string;
  operationArea: string;
  pricePerKm: number;
  rating: number;
  delivery: number[];
}


export interface UserDTO {
  id: number;
  name: string;
  email: string;
  password: string;
  permissions: string;
  role: string;
  active: boolean;
  logs: number[];
  enterpriseId: number;
}

export interface WareHousesDTO {
  id: number;
  name: string;
  location: string;
  capacity: number;
  currentStock: number;
  section: number;
  responsible: string;
  status: string;
  products: number[];
  enterpriseId: number;
}


export type CreateBranchesDTO = Omit<BranchesDTO, 'id'>;
export type UpdateBranchesDTO = Partial<CreateBranchesDTO>;
export type CreateBudgetDTO = Omit<BudgetDTO, 'id'>;
export type UpdateBudgetDTO = Partial<CreateBudgetDTO>;
export type CreateCampaignsDTO = Omit<CampaignsDTO, 'id'>;
export type UpdateCampaignsDTO = Partial<CreateCampaignsDTO>;
export type CreateChatsDTO = Omit<ChatsDTO, 'id'>;
export type UpdateChatsDTO = Partial<CreateChatsDTO>;
export type CreateClientsDTO = Omit<ClientsDTO, 'id'>;
export type UpdateClientsDTO = Partial<CreateClientsDTO>;
export type CreateDeliveryDto = Omit<DeliveryDTO, 'id'>;
export type UpdateDeliveryDto = Partial<CreateDeliveryDto>;
export type CreateDepartmentsDTO = Omit<DepartmentsDTO, 'id'>;
export type UpdateDepartmentsDTO = Partial<CreateDepartmentsDTO>;
export type CreateDocumentsDTO = Omit<DocumentsDTO, 'id'>;
export type UpdateDocumentsDTO = Partial<CreateDocumentsDTO>;
export type CreateDomainsDTO = Omit<DomainsDTO, 'id'>;
export type UpdateDomainsDTO = Partial<CreateDomainsDTO>;
export type CreateEmployeesDTO = Omit<EmployeesDTO, 'id'>;
export type UpdateEmployeesDTO = Partial<CreateEmployeesDTO>;
export type CreateEnterpriseDTO = Omit<EnterpriseDTO, 'id'>;
export type UpdateEnterpriseDTO = Partial<CreateEnterpriseDTO>;
export type CreateEquipmentsDTO = Omit<EquipmentsDTO, 'id'>;
export type UpdateEquipmentsDTO = Partial<CreateEquipmentsDTO>;
export type CreateInternSystemsDTO = Omit<InternSystemsDTO, 'id'>;
export type UpdateInternSystemsDTO = Partial<CreateInternSystemsDTO>;
export type CreateInvoicesDTO = Omit<InvoicesDTO, 'id'>;
export type UpdateInvoicesDTO = Partial<CreateInvoicesDTO>;
export type CreateLogsDTO = Omit<LogsDTO, 'id'>;
export type UpdateLogsDTO = Partial<CreateLogsDTO>;
export type CreateMessagesDTO = Omit<MessagesDTO, 'id'>;
export type UpdateMessagesDTO = Partial<CreateMessagesDTO>;
export type CreateProductsDTO = Omit<ProductsDTO, 'id'>;
export type UpdateProductsDTO = Partial<CreateProductsDTO>;
export type CreateProjectsDTO = Omit<ProjectsDTO, 'id'>;
export type UpdateProjectsDTO = Partial<CreateProjectsDTO>;
export type CreatePurchasesDTO = Omit<PurchasesDTO, 'id'>;
export type UpdatePurchasesDTO = Partial<CreatePurchasesDTO>;
export type CreateReportsDTO = Omit<ReportsDTO, 'id'>;
export type UpdateReportsDTO = Partial<CreateReportsDTO>;
export type CreateRequestsDTO = Omit<RequestsDTO, 'id'>;
export type UpdateRequestsDTO = Partial<CreateRequestsDTO>;
export type CreateSalesDTO = Omit<SalesDTO, 'id'>;
export type UpdateSalesDTO = Partial<CreateSalesDTO>;
export type CreateSocialMediaDTO = Omit<SocialMediaDTO, 'id'>;
export type UpdateSocialMediaDTO = Partial<CreateSocialMediaDTO>;
export type CreateSubDepartmentsDTO = Omit<SubDepartmentsDTO, 'id'>;
export type UpdateSubDepartmentsDTO = Partial<CreateSubDepartmentsDTO>;
export type CreateSuppliersDTO = SuppliersDTO; 
export type UpdateSuppliersDTO = Partial<SuppliersDTO>;
export type CreateTasksDTO = TasksDTO; 
export type UpdateTasksDTO = Partial<TasksDTO>;
export type CreateTaxesDTO = TaxesDTO; 
export type UpdateTaxesDTO = Partial<TaxesDTO>;
export type CreateTransactionsDTO = TransactionsDTO; 
export type UpdateTransactionsDTO = Partial<TransactionsDTO>;
export type CreateTransportersDTO = TransportersDTO; 
export type UpdateTransportersDTO = Partial<TransportersDTO>;
export type CreateUserDTO = Omit<UserDTO, 'id'>;
export type UpdateUserDTO = Partial<CreateUserDTO>;
export type CreateWareHousesDTO = WareHousesDTO; 
export type UpdateWareHousesDTO = Partial<WareHousesDTO>;




