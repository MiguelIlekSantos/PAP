# Teste dos Botões de Deletar - Departamentos e Subdepartamentos

## Funcionalidades Implementadas

### 1. **DepartmentCard**
- ✅ Adicionado botão de deletar (ícone de lixeira) no canto superior direito
- ✅ Botão aparece apenas quando a prop `onDelete` é fornecida
- ✅ Hover effects: vermelho claro com fundo vermelho transparente
- ✅ Tooltip explicativo: "Deletar departamento"

### 2. **SubDepartmentCard**
- ✅ Adicionado botão de deletar (ícone de lixeira) no canto superior direito
- ✅ Botão aparece apenas quando a prop `onDelete` é fornecida
- ✅ Hover effects: vermelho claro com fundo vermelho transparente
- ✅ Tooltip explicativo: "Deletar subdepartamento"

### 3. **Página Departments**
- ✅ Importado função `remove` da API
- ✅ Importado toasts para feedback
- ✅ Implementadas funções `handleDeleteDepartment` e `handleDeleteSubDepartment`
- ✅ Confirmação antes de deletar (window.confirm)
- ✅ Feedback visual com toasts de sucesso/erro
- ✅ Recarregamento automático das listas após deletar

## Fluxo de Funcionamento

### Para Departamentos:
1. Usuário clica no ícone de lixeira no card do departamento
2. Aparece confirmação: "Tem certeza que deseja deletar este departamento?"
3. Se confirmar:
   - Chama API `DELETE /departments/{id}`
   - Mostra toast de sucesso
   - Recarrega lista de departamentos
   - Atualiza opções do select de departamentos
4. Se houver erro:
   - Mostra toast de erro
   - Lista permanece inalterada

### Para Subdepartamentos:
1. Usuário clica no ícone de lixeira no card do subdepartamento
2. Aparece confirmação: "Tem certeza que deseja deletar este subdepartamento?"
3. Se confirmar:
   - Chama API `DELETE /subdepartments/{id}`
   - Mostra toast de sucesso
   - Recarrega lista de subdepartamentos
4. Se houver erro:
   - Mostra toast de erro
   - Lista permanece inalterada

## Arquivos Modificados

1. **`/components/DepartmentCard.tsx`**
   - Adicionado import `Trash2`
   - Adicionado prop `onDelete?: (departmentId: number) => void`
   - Adicionado função `handleDeleteClick`
   - Adicionado botão de deletar com posicionamento absoluto

2. **`/components/SubDepartmentCard.tsx`**
   - Adicionado import `Trash2`
   - Adicionado prop `onDelete?: (subDepartmentId: number) => void`
   - Adicionado função `handleDeleteClick`
   - Adicionado botão de deletar com posicionamento absoluto

3. **`/enterprise/departments/page.tsx`**
   - Adicionado import `remove` da API
   - Adicionado import dos toasts
   - Implementadas funções de deletar
   - Passadas props `onDelete` para os componentes

## Estilos CSS Aplicados

```css
/* Botão de deletar */
.absolute.top-3.right-3 {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}

/* Hover effects */
.text-red-400.hover:text-red-300.hover:bg-red-900/20 {
  color: rgb(248 113 113); /* red-400 */
  transition: all 0.2s;
}

.hover:text-red-300:hover {
  color: rgb(252 165 165); /* red-300 */
}

.hover:bg-red-900/20:hover {
  background-color: rgba(127 29 29 / 0.2); /* red-900 with 20% opacity */
}
```

## Teste Manual

1. **Navegar para**: `/enterprise/departments`
2. **Verificar**: Botões de lixeira aparecem nos cards
3. **Testar hover**: Botões ficam mais claros e com fundo
4. **Testar deletar departamento**: Clicar na lixeira de um departamento
5. **Testar deletar subdepartamento**: Clicar na lixeira de um subdepartamento
6. **Verificar**: Confirmações aparecem
7. **Verificar**: Toasts de sucesso/erro funcionam
8. **Verificar**: Listas são recarregadas após deletar

## Possíveis Melhorias Futuras

- [ ] Modal de confirmação customizado em vez de `window.confirm`
- [ ] Animação de fade-out antes de remover o card
- [ ] Undo functionality (desfazer ação)
- [ ] Bulk delete (deletar múltiplos itens)
- [ ] Verificação de dependências antes de deletar