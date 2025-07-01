# 🗑️ Implementação de Deleção em Cascata - Correção de Foreign Key Constraints

## 🚨 **Problema Identificado**
```
Foreign key constraint violated on the foreign key
PrismaClientKnownRequestError: Invalid `prisma.enterprise.delete()` invocation
```

**Causa**: O Prisma não estava configurado para deleção em cascata automática, causando violações de chave estrangeira ao tentar deletar registros com dependências.

## ✅ **Solução Implementada**

### **1. Enterprise - Deleção em Cascata Completa**

**Ordem de deleção implementada:**

1. **Logs** (dependem de Users e InternSystems)
2. **Messages** (dependem de Chats)
3. **Chats** (dependem de Projects)
4. **Tasks** (dependem de Projects e Employees)
5. **Delivery** (dependem de Clients e Transporters)
6. **Invoices** (dependem de Clients)
7. **Requests** (dependem de Clients)
8. **Sales** (dependem de Clients)
9. **Purchases** (dependem de Suppliers)
10. **Products** (dependem de WareHouses e Branches)
11. **Budget** (dependem de Projects e Campaigns)
12. **Employees** (dependem de Departments)
13. **SubDepartments**
14. **Departments**
15. **Branches**
16. **Todos os outros dados diretos** (Projects, WareHouses, Equipments, etc.)
17. **Enterprise** (por último)

### **2. Branch - Deleção Seletiva**

**Dados removidos:**
- ✅ Products específicos da branch (`branchId`)
- ✅ Associações many-to-many com departments (automático)

**Dados preservados:**
- ✅ Departments (ligados à enterprise)
- ✅ Employees (ligados aos departments)

### **3. Department - Deleção com Dependências**

**Ordem de deleção:**
1. **Tasks** dos employees do departamento
2. **Employees** do departamento
3. **SubDepartments** do departamento
4. **Department** (por último)

### **4. SubDepartment - Deleção Simples**
- Mantido o método original (sem dependências diretas)

## 🔧 **Código Implementado**

### **Enterprise Service**
```typescript
async deleteEnterprise(id: number) {
  try {
    console.log(`Iniciando deleção em cascata para enterprise ${id}`);
    
    // Deletar em ordem específica para evitar violações de FK
    await this.prisma.logs.deleteMany({ /* ... */ });
    await this.prisma.messages.deleteMany({ /* ... */ });
    // ... (ordem completa implementada)
    
    // Finalmente deletar a enterprise
    const result = await this.prisma.enterprise.delete({
      where: { id: id }
    });
    
    return !!result;
  } catch (error) {
    console.error(`Erro ao deletar enterprise ${id}:`, error);
    throw error;
  }
}
```

### **Branch Service**
```typescript
async deleteBranch(id: number) {
  try {
    // Deletar produtos da filial
    await this.prisma.products.deleteMany({
      where: { branchId: id }
    });
    
    // Deletar a branch
    const result = await this.prisma.branches.delete({
      where: { id: id }
    });
    
    return !!result;
  } catch (error) {
    throw error;
  }
}
```

### **Department Service**
```typescript
async deleteDepartment(id: number) {
  try {
    // Deletar tasks dos employees
    await this.prisma.tasks.deleteMany({ /* ... */ });
    
    // Deletar employees
    await this.prisma.employees.deleteMany({
      where: { departmentId: id }
    });
    
    // Deletar subdepartments
    await this.prisma.subDepartments.deleteMany({
      where: { departmentId: id }
    });
    
    // Deletar department
    const result = await this.prisma.departments.delete({
      where: { id: id }
    });
    
    return !!result;
  } catch (error) {
    throw error;
  }
}
```

## 🧪 **Como Testar**

### **1. Teste de SubDepartment (Mais Seguro)**
1. Criar um subdepartamento
2. Tentar deletá-lo
3. ✅ Deve funcionar sem problemas

### **2. Teste de Department**
1. Criar department com employees e subdepartments
2. Tentar deletar o department
3. ✅ Deve remover employees e subdepartments automaticamente

### **3. Teste de Branch**
1. Criar branch com produtos
2. Tentar deletar a branch
3. ✅ Deve remover produtos da branch

### **4. Teste de Enterprise (CUIDADO!)**
1. ⚠️ **USAR APENAS DADOS DE TESTE**
2. Criar enterprise com dados relacionados
3. Tentar deletar a enterprise
4. ✅ Deve remover todos os dados relacionados

## 📋 **Logs de Debug**

Os métodos agora incluem logs detalhados:
```
Iniciando deleção em cascata para enterprise 1
Enterprise 1 deletada com sucesso
```

## ⚠️ **Avisos Importantes**

### **1. Performance**
- A deleção de enterprise pode ser **lenta** com muitos dados
- Considerar implementar em background para grandes volumes

### **2. Transações**
- Cada operação é independente
- Se houver erro no meio, alguns dados podem ficar órfãos
- **Melhoria futura**: Envolver tudo em uma transação

### **3. Backup**
- **SEMPRE** fazer backup antes de deletar enterprises
- Dados deletados não podem ser recuperados

## 🚀 **Melhorias Futuras**

### **1. Transações Atômicas**
```typescript
await this.prisma.$transaction(async (prisma) => {
  // Todas as operações de deleção aqui
});
```

### **2. Soft Delete**
```typescript
// Em vez de deletar, marcar como deletado
await this.prisma.enterprise.update({
  where: { id },
  data: { deletedAt: new Date(), active: false }
});
```

### **3. Background Jobs**
```typescript
// Para enterprises grandes, processar em background
await this.queueService.add('delete-enterprise', { enterpriseId: id });
```

## ✅ **Status da Implementação**

- ✅ **Enterprise**: Deleção em cascata completa implementada
- ✅ **Branch**: Deleção seletiva implementada
- ✅ **Department**: Deleção com dependências implementada
- ✅ **SubDepartment**: Mantido método original
- ✅ **Logs de debug**: Implementados
- ✅ **Tratamento de erros**: Implementado

## 🎯 **Próximos Passos**

1. **Testar** cada tipo de deleção
2. **Verificar logs** no console do backend
3. **Confirmar** que não há mais erros de FK
4. **Considerar** implementar transações atômicas
5. **Avaliar** necessidade de soft delete para enterprises