// src/prisma/includes.map.ts

export const includesMap: Record<string, any> = {
  enterprise: {
    branches: true,
    wareHouses: true,
    equipments: true,
    transactions: true,
    taxes: true,
    clients: true,
    suppliers: true,
    transporters: true,
    documents: true,
    domains: true,
    internSystems: true,
    users: true,
    campaigns: true,
    socialMedia: true,
    reports: true,
    departments: true,
    projects: true,
  },

  branches: {
    departments: true,
    products: true,
    enterprise: true,
  },

  departments: {
    subDepartments: true,
    branches: true,
    employees: true,
    enterprise: true,
  },

  subDepartments: {
    department: true,
  },

  employees: {
    department: true,
    Projects: true,
    Tasks: true,
  },

  products: {
    wareHouse: true,
    sales: true,
    requests: true,
    Delivery: true,
    branch: true,
  },

  wareHouses: {
    products: true,
    enterprise: true,
  },

  equipments: {
    enterprise: true,
  },

  transactions: {
    enterprise: true,
  },

  taxes: {
    enterprise: true,
  },

  clients: {
    Sales: true,
    Requests: true,
    Invoices: true,
    Delivery: true,
    Projects: true,
    enterprise: true,
  },

  sales: {
    Products: true,
    Client: true,
  },

  requests: {
    products: true,
    Client: true,
  },

  invoices: {
    Client: true,
  },

  suppliers: {
    purchases: true,
    enterprise: true,
  },

  purchases: {
    Supplier: true,
  },

  transporters: {
    delivery: true,
    enterprise: true,
  },

  delivery: {
    products: true,
    Client: true,
    Transporter: true,
  },

  tasks: {
    Project: true,
    Employee: true,
  },

  projects: {
    budget: true,
    Client: true,
    Employees: true,
    Tasks: true,
    chat: true,
    enterprise: true,
  },

  chats: {
    project: true,
    Messages: true,
  },

  messages: {
    chat: true,
  },

  documents: {
    enterprise: true,
  },

  domains: {
    enterprise: true,
  },

  internSystems: {
    Logs: true,
    enterprise: true,
  },

  user: {
    Logs: true,
    enterprise: true,
  },

  logs: {
    InternSystem: true,
    User: true,
  },

  campaigns: {
    budget: true,
    enterprise: true,
  },

  socialMedia: {
    enterprise: true,
  },

  reports: {
    enterprise: true,
  },

  budget: {
    project: true,
    campaign: true,
  },
};