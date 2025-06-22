// ===== BranchesDTO =====

export interface BranchesDTO {
  id: number;
  address: string;
  phone: string;
  email: string;
  purpose: string;
  enterpriseId: number;
}

export type CreateBranchesDTO = Omit<BranchesDTO, 'id'>;
export type UpdateBranchesDTO = Partial<CreateBranchesDTO>;

// ===== BudgetDTO =====

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
  saleId?: number;
}

export type CreateBudgetDTO = Omit<BudgetDTO, 'id'>;
export type UpdateBudgetDTO = Partial<CreateBudgetDTO>;

// ===== CampaignsDTO =====

export interface CampaignsDTO {
  id: number;
  name: string;
  type: string;
  status: string;
  leads: number;
  conversions: number;
  roi: number;
}

export type CreateCampaignsDTO = Omit<CampaignsDTO, 'id'>;
export type UpdateCampaignsDTO = Partial<CreateCampaignsDTO>;

// ===== ChatsDTO =====

export interface ChatsDTO {
  id: number;
  projectId: number;
}

export type CreateChatsDTO = Omit<ChatsDTO, 'id'>;
export type UpdateChatsDTO = Partial<CreateChatsDTO>;

// ===== ClientsDTO =====

export interface ClientsDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  address: string;
}

export type CreateClientsDTO = Omit<ClientsDTO, 'id'>;
export type UpdateClientsDTO = Partial<CreateClientsDTO>;

// ===== DeliveryDto =====

export interface DeliveryDto {
  expectedDate: string
  deliveryDate: string
  status: string
  clientId: number
  transporterId: number
}

export type CreateDeliveryDto = Omit<DeliveryDto, 'id'>;
export type UpdateDeliveryDto = Partial<CreateDeliveryDto>;

// ===== DepartmentsDTO =====

export interface DepartmentsDTO {
  id: number;
  name: string;
  description: string;
  responsible: string;
  totalEmployees: number;
}

export type CreateDepartmentsDTO = Omit<DepartmentsDTO, 'id'>;
export type UpdateDepartmentsDTO = Partial<CreateDepartmentsDTO>;

// ===== DocumentsDTO =====

export interface DocumentsDTO {
  id: number;
  name: string;
  description: string;
  type: string;
  size: number;
  path: string;
}

export type CreateDocumentsDTO = Omit<DocumentsDTO, 'id'>;
export type UpdateDocumentsDTO = Partial<CreateDocumentsDTO>;

// ===== DomainsDTO =====

export interface DomainsDTO {
  id: number;
  name: string;
  type: string;
  registrator: string;
  expirationDate: Date;
  hosting: string;
  status: string;
}

export type CreateDomainsDTO = Omit<DomainsDTO, 'id'>;
export type UpdateDomainsDTO = Partial<CreateDomainsDTO>;

// ===== EmployeesDTO =====

export interface EmployeesDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  salary: number;
  dateOfHire: Date;
  shiftType: string;
  workingHours: number;
  workingDays: number;
  status: string;
  departmentId: number;
}

export type CreateEmployeesDTO = Omit<EmployeesDTO, 'id'>;
export type UpdateEmployeesDTO = Partial<CreateEmployeesDTO>;

// ===== EnterpriseDTO =====

export interface EnterpriseDTO {
  id: number;
  legalName: string;
  ComercialName?: string;
  nif?: string;
  niss?: string;
  nipc?: string;
  type?: string;
  foundationDate?: Date | null;
  registeredCountry?: string;
  mainLanguage?: string;
  oficialCurrency?: string;
  email?: string;
  phone?: string;
  logo?: string;
}

export type CreateEnterpriseDTO = Omit<EnterpriseDTO, 'id'>;
export type UpdateEnterpriseDTO = Partial<CreateEnterpriseDTO>;

// ===== EquipmentsDTO =====

export interface EquipmentsDTO {
  id: number;
  name: string;
  description: string;
  serialNumber: string;
  model: string;
  brand: string;
  purchaseDate: Date;
  warrantyEndDate: Date;
  status: string;
  location: string;
}

export type CreateEquipmentsDTO = Omit<EquipmentsDTO, 'id'>;
export type UpdateEquipmentsDTO = Partial<CreateEquipmentsDTO>;

// ===== InternSystemsDTO =====

export interface InternSystemsDTO {
  id: number;
  name: string;
  type: string;
  version: string;
  environment: string;
  tecnology: string;
  status: string;
}

export type CreateInternSystemsDTO = Omit<InternSystemsDTO, 'id'>;
export type UpdateInternSystemsDTO = Partial<CreateInternSystemsDTO>;

// ===== InvoicesDTO =====

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

export type CreateInvoicesDTO = Omit<InvoicesDTO, 'id'>;
export type UpdateInvoicesDTO = Partial<CreateInvoicesDTO>;

// ===== LogsDTO =====

export interface LogsDTO {
  id: number;
  action: string;
  level: string;
  timestamp: Date;
  category: string;
  InternSystemId: number;
  userId: number;
}

export type CreateLogsDTO = Omit<LogsDTO, 'id'>;
export type UpdateLogsDTO = Partial<CreateLogsDTO>;

// ===== MessagesDTO =====

export interface MessagesDTO {
  id: number;
  content: string;
  sender: string;
  createdAt: Date;
  chatId: number;
}

export type CreateMessagesDTO = Omit<MessagesDTO, 'id'>;
export type UpdateMessagesDTO = Partial<CreateMessagesDTO>;

// ===== ProductsDTO =====

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
}

export type CreateProductsDTO = Omit<ProductsDTO, 'id'>;
export type UpdateProductsDTO = Partial<CreateProductsDTO>;

// ===== ProjectsDTO =====

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
  clientId: number;
}

export type CreateProjectsDTO = Omit<ProjectsDTO, 'id'>;
export type UpdateProjectsDTO = Partial<CreateProjectsDTO>;

// ===== PurchasesDTO =====

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

export type CreatePurchasesDTO = Omit<PurchasesDTO, 'id'>;
export type UpdatePurchasesDTO = Partial<CreatePurchasesDTO>;

// ===== ReportsDTO =====

export interface ReportsDTO {
  id: number;
  name: string;
  type: string;
  frequency: string;
  status: string;
  lastUpdate: Date;
  nextUpdate: Date;
  downloads: number;
  path: string;
}

export type CreateReportsDTO = Omit<ReportsDTO, 'id'>;
export type UpdateReportsDTO = Partial<CreateReportsDTO>;

// ===== RequestsDTO =====

export interface RequestsDTO {
  id: number;
  number: string;
  clientId: number;
  deliveryDate: Date;
  status: string;
}

export type CreateRequestsDTO = Omit<RequestsDTO, 'id'>;
export type UpdateRequestsDTO = Partial<CreateRequestsDTO>;

// ===== SalesDTO =====

export interface SalesDTO {
  id: number;
  Status: string;
  Total: number;
  PaymentMethod: string;
  lastPurchase: Date;
  ClientId: number;
}

export type CreateSalesDTO = Omit<SalesDTO, 'id'>;
export type UpdateSalesDTO = Partial<CreateSalesDTO>;

// ===== SocialMediaDTO =====

export interface SocialMediaDTO {
  id: number;
  platform: string;
  username: string;
  followers: number;
  engagementRate: number;
}

export type CreateSocialMediaDTO = Omit<SocialMediaDTO, 'id'>;
export type UpdateSocialMediaDTO = Partial<CreateSocialMediaDTO>;

// ===== SubDepartmentsDTO =====

export interface SubDepartmentsDTO {
  id: number;
  name: string;
  description: string;
  responsible: string;
  totalEmployees: number;
  departmentId: number;
}

export type CreateSubDepartmentsDTO = Omit<SubDepartmentsDTO, 'id'>;
export type UpdateSubDepartmentsDTO = Partial<CreateSubDepartmentsDTO>;

// ===== SuppliersDto =====

export interface SuppliersDto {
  name: string
  email: string
  phone: string
  address: string
}

export type CreateSuppliersDto = SuppliersDto; // já não tem id
export type UpdateSuppliersDto = Partial<SuppliersDto>;

// ===== TasksDto =====

export interface TasksDto {
  name: string
  description: string
  assignedTo: string
  dueDate: string
  completed: boolean
  completedAt: string
  projectId: number
  status: string
  priority: string
  responsible: number
}

export type CreateTasksDto = TasksDto; // já não tem id
export type UpdateTasksDto = Partial<TasksDto>;

// ===== TaxesDto =====

export interface TaxesDto {
  type: string
  period: string
  description: string
  endDate: string
  amount: number
}

export type CreateTaxesDto = TaxesDto; // já não tem id
export type UpdateTaxesDto = Partial<TaxesDto>;

// ===== TransactionsDto =====

export interface TransactionsDto {
  amount: number
  date: string
  category: string
  description: string
  bankAccount: string
  status: string
}

export type CreateTransactionsDto = TransactionsDto; // já não tem id
export type UpdateTransactionsDto = Partial<TransactionsDto>;

// ===== TransportersDto =====

export interface TransportersDto {
  vehicleType: string
  status: string
  extEnterprise: string
  phone: string
  representative: string
  operationArea: string
  pricePerKm: number
  rating: number
}

export type CreateTransportersDto = TransportersDto; // já não tem id
export type UpdateTransportersDto = Partial<TransportersDto>;

// ===== UserDTO =====

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  password: string;
  permissions: string;
  role: string;
  active: boolean;
}

export type CreateUserDTO = Omit<UserDTO, 'id'>;
export type UpdateUserDTO = Partial<CreateUserDTO>;

// ===== WareHousesDto =====

export interface WareHousesDto {
  name: string
  location: string
  capacity: number
  currentStock: number
  section: number
  responsible: string
  status: string
}

export type CreateWareHousesDto = WareHousesDto; // já não tem id
export type UpdateWareHousesDto = Partial<WareHousesDto>;
