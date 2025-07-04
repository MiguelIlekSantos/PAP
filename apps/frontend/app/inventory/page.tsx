'use client'

import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { DataTable } from '../components/DataTable'
import { Filter } from '../components/Filter'
import { ModalForms } from '../components/forms/ModalForms'
import { Input } from '../components/forms/Input'
import { Select } from '../components/forms/Select'
import { SelectString } from '../components/forms/SelectString'
import { Fieldset } from '../components/forms/Fieldset'
import { Pagination } from '../components/Pagination'
import { create, getAll, getById, update, remove, ListResponse } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'
import { Products, WareHouses, Branches } from '@prisma/client'
import { CreateProductsDTO, UpdateProductsDTO, ProductsWithAllRelations } from '@pap/utils'

const APIMODULE = "products"

export default function InventoryPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [products, setProducts] = useState<ListResponse<Products>>();
  const [warehouses, setWarehouses] = useState<ListResponse<WareHouses>>();
  const [branches, setBranches] = useState<ListResponse<Branches>>();
  const [paginationNum, setPaginationNum] = useState<number>(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);

  const [inputDataCreate, setInputDataCreate] = useState<Partial<CreateProductsDTO>>({});
  const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdateProductsDTO>>({});

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');

  const [warehouseOptions, setWarehouseOptions] = useState<{ value: number, label: string }[]>([]);
  const [branchOptions, setBranchOptions] = useState<{ value: number, label: string }[]>([]);

  const { getEnterprise } = useEnterpriseStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const formatPrice = (price: number | null): string => {
    if (!price) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getWarehouseName = (warehouseId: number, warehouseOptions: { value: number, label: string }[]): string => {
    const warehouse = warehouseOptions.find(wh => wh.value === warehouseId);
    return warehouse?.label || 'Warehouse not found';
  };

  const getBranchName = (branchId: number, branchOptions: { value: number, label: string }[]): string => {
    const branch = branchOptions.find(br => br.value === branchId);
    return branch?.label || 'Branch not found';
  };

  const getInventoryColumns = (
    warehouseOptions: { value: number, label: string }[],
    branchOptions: { value: number, label: string }[]
  ) => [
      {
        header: 'Nome',
        accessor: 'name',
        cell: (value: any) => renderCellValue('name', value, { warehouseOptions, branchOptions }),
      },
      {
        header: 'SKU',
        accessor: 'sku',
        cell: (value: any) => renderCellValue('sku', value, { warehouseOptions, branchOptions }),
      },
      {
        header: 'Preço',
        accessor: 'price',
        cell: (value: any) => renderCellValue('price', value, { warehouseOptions, branchOptions }),
      },
      {
        header: 'Estoque',
        accessor: 'stock',
        cell: (value: any) => renderCellValue('stock', value, { warehouseOptions, branchOptions }),
      },
      {
        header: 'Categoria',
        accessor: 'category',
        cell: (value: any) => renderCellValue('category', value, { warehouseOptions, branchOptions }),
      },
      {
        header: 'Marca',
        accessor: 'brand',
        cell: (value: any) => renderCellValue('brand', value, { warehouseOptions, branchOptions }),
      },
      {
        header: 'Modelo',
        accessor: 'model',
        cell: (value: any) => renderCellValue('model', value, { warehouseOptions, branchOptions }),
      },
      {
        header: 'Armazém',
        accessor: 'wareHouseId',
        cell: (value: any) => renderCellValue('wareHouseId', value, { warehouseOptions, branchOptions }),
      },
      {
        header: 'Filial',
        accessor: 'branchId',
        cell: (value: any) => renderCellValue('branchId', value, { warehouseOptions, branchOptions }),
      },
    ];

  const renderCellValue = (accessor: string, value: any, context?: any) => {
    if (accessor === 'name') {
      return value || 'Não informado';
    }
    
    if (accessor === 'sku') {
      return value || 'Não informado';
    }
    
    if (accessor === 'price') {
      return formatPrice(value);
    }
    
    if (accessor === 'stock') {
      return value?.toString() || '0';
    }
    
    if (accessor === 'category') {
      return value || 'Não informada';
    }
    
    if (accessor === 'brand') {
      return value || 'Não informada';
    }
    
    if (accessor === 'model') {
      return value || 'Não informado';
    }
    
    if (accessor === 'wareHouseId') {
      if (!value) return 'Não atribuído';
      return getWarehouseName(value, context?.warehouseOptions || []);
    }
    
    if (accessor === 'branchId') {
      if (!value) return 'Não atribuída';
      return getBranchName(value, context?.branchOptions || []);
    }
    
    return value;
  };

  const reloadProductsList = async () => {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) return;

    console.log('🔄 Reloading products list...');
    console.log('Filters:', { warehouseFilter, branchFilter, categoryFilter, statusFilter });
    console.log('Options available:', {
      warehouses: warehouseOptions.length,
      branches: branchOptions.length
    });

    try {
      let allProducts: Products[] = [];

      if (warehouseFilter && warehouseFilter.trim() !== '') {
        // Filter by specific warehouse
        const params: any = {
          "page": paginationNum,
          "quantity": 8,
          "relationFilter": ["wareHouseId", parseInt(warehouseFilter)]
        };

        if (debouncedSearchTerm) {
          params.term = debouncedSearchTerm;
        }

        const data = await getAll<ListResponse<Products>>(APIMODULE, params);
        allProducts = data.data.items;
      } else if (branchFilter && branchFilter.trim() !== '') {
        // Filter by specific branch
        const params: any = {
          "page": paginationNum,
          "quantity": 8,
          "relationFilter": ["branchId", parseInt(branchFilter)]
        };

        if (debouncedSearchTerm) {
          params.term = debouncedSearchTerm;
        }

        const data = await getAll<ListResponse<Products>>(APIMODULE, params);
        allProducts = data.data.items;
      } else {
        const params: any = {
          "page": 1,
          "quantity": 100
        };

        if (debouncedSearchTerm) {
          params.term = debouncedSearchTerm;
        }

        const warehousePromises = warehouseOptions.map(warehouse => {
          const warehouseParams = { ...params, "relationFilter": ["wareHouseId", warehouse.value] };
          return getAll<ListResponse<Products>>(APIMODULE, warehouseParams);
        });

        const branchPromises = branchOptions.map(branch => {
          const branchParams = { ...params, "relationFilter": ["branchId", branch.value] };
          return getAll<ListResponse<Products>>(APIMODULE, branchParams);
        });

        const allPromises = [...warehousePromises, ...branchPromises];

        if (allPromises.length > 0) {
          const results = await Promise.all(allPromises);
          allProducts = results.flatMap(result => result.data.items);

          const uniqueProducts = allProducts.filter((product, index, self) =>
            index === self.findIndex(p => p.id === product.id)
          );
          allProducts = uniqueProducts;
          console.log(`📦 Found ${allProducts.length} unique products`);
        } else {
          console.log('⚠️ No warehouses or branches available to query');
        }
      }

      let filteredItems = allProducts;

      if (categoryFilter && categoryFilter.trim() !== '') {
        filteredItems = filteredItems.filter(product =>
          product.category?.toLowerCase() === categoryFilter.toLowerCase()
        );
      }

      if (statusFilter && statusFilter.trim() !== '') {
        filteredItems = filteredItems.filter(product => {
          let productStatus = 'active';

          if (product.category === 'Serviços') {
            productStatus = 'service';
          } else if (!product.stock || product.stock === 0) {
            productStatus = 'out';
          } else if (product.stock <= 10) {
            productStatus = 'low';
          }

          return productStatus === statusFilter;
        });
      }

      const startIndex = (paginationNum - 1) * 8;
      const endIndex = startIndex + 8;
      const paginatedItems = filteredItems.slice(startIndex, endIndex);

      const totalPages = Math.ceil(filteredItems.length / 8);

      const finalData: ListResponse<Products> = {
        statusCode: 200,
        message: 'Products retrieved successfully',
        data: {
          items: paginatedItems,
          metadata: {
            page: paginationNum,
            quantity: 8,
            last: totalPages,
            total: filteredItems.length
          }
        }
      };

      console.log('✅ Products loaded:', {
        total: allProducts.length,
        filtered: filteredItems.length,
        paginated: paginatedItems.length
      });

      setProducts(finalData);
    } catch (err) {
      console.error('❌ Error loading products:', err);
      showError('Error loading products');
    }
  };

  useEffect(() => {
    setLoaded(false);
    reloadProductsList().then(() => {
      setLoaded(true);
    });
  }, [paginationNum, debouncedSearchTerm, categoryFilter, warehouseFilter, statusFilter, branchFilter, branchOptions, warehouseOptions]);

  useEffect(() => {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) return;

    // Load warehouses
    getAll<ListResponse<WareHouses>>("warehouses", {
      "page": 1,
      "quantity": 100,
      "relationFilter": ["enterpriseId", enterpriseId]
    })
      .then((data) => {
        setWarehouses(data);
        const options = data.data.items.map(warehouse => ({
          value: warehouse.id,
          label: warehouse.name
        }));
        setWarehouseOptions(options);
      })
      .catch(err => {
        console.error('Error loading warehouses:', err);
      });

    // Load branches
    getAll<ListResponse<Branches>>("branches", {
      "page": 1,
      "quantity": 100,
      "relationFilter": ["enterpriseId", enterpriseId]
    })
      .then((data) => {
        setBranches(data);
        const options = data.data.items.map(branch => ({
          value: branch.id,
          label: branch.address
        }));
        setBranchOptions(options);
      })
      .catch(err => {
        console.error('Error loading branches:', err);
      });
  }, [getEnterprise]);

  function createProduct(): Promise<boolean> {
    if (!inputDataCreate.name) {
      showError('Product name is required');
      return Promise.resolve(false);
    }

    // At least one location (warehouse or branch) must be provided
    if (!inputDataCreate.wareHouseId && !inputDataCreate.branch) {
      showError('Product must be assigned to either a warehouse or a branch');
      return Promise.resolve(false);
    }

    // Filter only fields that have value and convert numeric fields
    const payload: Partial<CreateProductsDTO> = {};

    Object.entries(inputDataCreate).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        // Convert numeric fields from string to number
        if (key === 'wareHouseId' || key === 'branchId' || key === 'price' || key === 'stock' || key === 'weight') {
          (payload as any)[key] = Number(value);
        } else {
          (payload as any)[key] = value;
        }
      }
    });

    console.log('Payload for create:', payload);

    return create<CreateProductsDTO, Products>(APIMODULE, payload as CreateProductsDTO)
      .then((data) => {
        console.log('✅ Product created:', data);
        showSuccess('Produto criado com sucesso!');
        setShowAddModal(false);
        setInputDataCreate({});
        console.log('🔄 Calling reloadProductsList after creation...');
        reloadProductsList();
        return true;
      })
      .catch(err => {
        console.error('Error creating product:', err);
        showError('Error creating product');
        return false;
      });
  }

  function updateProduct(): Promise<boolean> {
    if (!selectedProduct) {
      showError('No product selected');
      return Promise.resolve(false);
    }

    // Filter only fields that were actually changed and have value
    const payload: Partial<UpdateProductsDTO> = {};

    Object.entries(inputDataUpdate).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        // Convert numeric fields from string to number
        if (key === 'wareHouseId' || key === 'branchId' || key === 'price' || key === 'stock' || key === 'weight') {
          (payload as any)[key] = Number(value);
        } else {
          (payload as any)[key] = value;
        }
      }
    });

    console.log('Payload for update:', payload);

    return update<UpdateProductsDTO, Products>(APIMODULE, selectedProduct.id, payload as UpdateProductsDTO)
      .then((data) => {
        console.log('Product updated:', data);
        showSuccess('Produto atualizado com sucesso!');
        setShowEditModal(false);
        setSelectedProduct(null);
        setInputDataUpdate({});

        reloadProductsList();
        return true;
      })
      .catch(err => {
        console.error('Error updating product:', err);
        showError('Error updating product');
        return false;
      });
  }

  const deleteProduct = async (product: Products) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await remove(APIMODULE, product.id);
        showSuccess('Produto deletado com sucesso!');
        reloadProductsList();
      } catch (err) {
        console.error('Error deleting product:', err);
        showError('Erro ao deletar produto');
      }
    }
  };

  const deleteBulkProducts = async (selectedIds: number[]) => {
    try {
      const deletePromises = selectedIds.map(id => remove(APIMODULE, id));
      await Promise.all(deletePromises);
      showSuccess(`${selectedIds.length} produto(s) deletado(s) com sucesso!`);
      reloadProductsList();
    } catch (err) {
      console.error('Error deleting products:', err);
      showError('Erro ao deletar produtos');
    }
  };

  const handleEditProduct = (product: Products) => {
    setSelectedProduct(product);
    // Only include fields that have value
    const updateData: Partial<UpdateProductsDTO> = {
      name: product.name,
    };

    if (product.description) updateData.description = product.description;
    if (product.price) updateData.price = product.price;
    if (product.stock) updateData.stock = product.stock;
    if (product.category) updateData.category = product.category;
    if (product.subCategory) updateData.subCategory = product.subCategory;
    if (product.brand) updateData.brand = product.brand;
    if (product.model) updateData.model = product.model;
    if (product.sku) updateData.sku = product.sku;
    if (product.barcode) updateData.barcode = product.barcode;
    if (product.weight) updateData.weight = product.weight;
    if (product.dimensions) updateData.dimensions = product.dimensions;
    if (product.imageUrl) updateData.imageUrl = product.imageUrl;
    if (product.wareHouseId) updateData.wareHouseId = product.wareHouseId;
    if (product.branchId) updateData.branch = product.branchId;

    setInputDataUpdate(updateData);
    setShowEditModal(true);
  };



  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setWarehouseFilter('');
    setStatusFilter('');
    setBranchFilter('');
    setPaginationNum(1);
  };



  const categoryOptions = [
    { value: 'Equipamentos', label: 'Equipamentos' },
    { value: 'Periféricos', label: 'Periféricos' },
    { value: 'Áudio', label: 'Áudio' },
    { value: 'Armazenamento', label: 'Armazenamento' },
    { value: 'Cabos', label: 'Cabos' },
    { value: 'Rede', label: 'Rede' },
    { value: 'Móveis', label: 'Móveis' },
    { value: 'Acessórios', label: 'Acessórios' },
    { value: 'Componentes', label: 'Componentes' },
    { value: 'Energia', label: 'Energia' },
    { value: 'Serviços', label: 'Serviços' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Em estoque' },
    { value: 'low', label: 'Estoque baixo' },
    { value: 'out', label: 'Sem estoque' },
    { value: 'service', label: 'Serviço' },
  ];

  // Filter fields
  const filterFields = [
    {
      name: 'categoryFilter',
      label: 'Todas as categorias',
      type: 'select' as const,
      options: categoryOptions,
    },
    {
      name: 'statusFilter',
      label: 'Todos os status',
      type: 'select' as const,
      options: statusOptions,
    },
    {
      name: 'branchFilter',
      label: 'Todas as filiais',
      type: 'select' as const,
      options: branchOptions,
    },
    {
      name: 'warehouseFilter',
      label: 'Todos os armazéns',
      type: 'select' as const,
      options: warehouseOptions,
    },
  ];

  const filterValues = {
    categoryFilter,
    statusFilter,
    branchFilter,
    warehouseFilter,
  };

  const handleFilterChange = (name: string, value: any) => {
    switch (name) {
      case 'categoryFilter':
        setCategoryFilter(value);
        break;
      case 'statusFilter':
        setStatusFilter(value);
        break;
      case 'branchFilter':
        setBranchFilter(value);
        break;
      case 'warehouseFilter':
        setWarehouseFilter(value);
        break;
    }
  };

  // Table columns
  const columns = getInventoryColumns(warehouseOptions, branchOptions);

  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-10">
        <div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
          <h1 className="text-4xl font-bold text-white">
            📦 Inventory Management
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Add Product</span>
          </button>
        </div>

        {/* Filters */}
        <Filter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Pesquisar produtos por nome, SKU, categoria ou marca..."
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Product table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <DataTable
            columns={columns}
            data={loaded && products ? products.data.items : []}
            onEdit={handleEditProduct}
            onDelete={deleteProduct}
            onBulkDelete={deleteBulkProducts}
            selectable={true}
            idField="id"
          />
        </div>

        {/* Pagination */}
        {loaded && products && (
          <div className="mt-10">
            <Pagination
              updatePage={setPaginationNum}
              actualPage={paginationNum}
              last={products.data.metadata.last ?? 1}
            />
          </div>
        )}
      </div>

      {/* Modal to add product */}
      {showAddModal && (
        <ModalForms create={createProduct} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
          <p className='text-2xl p-5 lg:p-10'>Add new product</p>

          <Fieldset title='Product Information'>
            <Input nameOnDB='name' name='Product name' />
            <Input nameOnDB='description' name='Description' />
            <Input nameOnDB='sku' name='SKU' />
            <Input nameOnDB='barcode' name='Barcode' />
            <SelectString
              nameOnDB='category'
              name='Category'
              options={categoryOptions}
            />
            <Input nameOnDB='subCategory' name='Sub Category' />
            <Input nameOnDB='brand' name='Brand' />
            <Input nameOnDB='model' name='Model' />
          </Fieldset>

          <Fieldset title='Pricing & Stock'>
            <Input nameOnDB='price' name='Price' type='number' />
            <Input nameOnDB='stock' name='Stock quantity' type='number' />
            <Input nameOnDB='weight' name='Weight (kg)' type='number' />
            <Input nameOnDB='dimensions' name='Dimensions' />
            <Input nameOnDB='imageUrl' name='Image URL' type='url' />
          </Fieldset>

          <Fieldset title='Location (select at least one)'>
            <Select
              nameOnDB='wareHouseId'
              name='Warehouse'
              options={warehouseOptions}
            />
            <Select
              nameOnDB='branchId'
              name='Branch'
              options={branchOptions}
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal to edit product */}
      {showEditModal && selectedProduct && (
        <ModalForms
          create={updateProduct}
          setInputData={setInputDataUpdate}
          onclick={() => setShowEditModal(false)}
          initialData={inputDataUpdate}
        >
          <p className='text-2xl p-5 lg:p-10'>Edit product: {selectedProduct.name}</p>

          <Fieldset title='Product Information'>
            <Input nameOnDB='name' name='Product name' />
            <Input nameOnDB='description' name='Description' />
            <Input nameOnDB='sku' name='SKU' />
            <Input nameOnDB='barcode' name='Barcode' />
            <SelectString
              nameOnDB='category'
              name='Category'
              options={categoryOptions}
            />
            <Input nameOnDB='subCategory' name='Sub Category' />
            <Input nameOnDB='brand' name='Brand' />
            <Input nameOnDB='model' name='Model' />
          </Fieldset>

          <Fieldset title='Pricing & Stock'>
            <Input nameOnDB='price' name='Price' type='number' />
            <Input nameOnDB='stock' name='Stock quantity' type='number' />
            <Input nameOnDB='weight' name='Weight (kg)' type='number' />
            <Input nameOnDB='dimensions' name='Dimensions' />
            <Input nameOnDB='imageUrl' name='Image URL' type='url' />
          </Fieldset>

          <Fieldset title='Location (select at least one)'>
            <Select
              nameOnDB='wareHouseId'
              name='Warehouse'
              options={warehouseOptions}
            />
            <Select
              nameOnDB='branchId'
              name='Branch'
              options={branchOptions}
            />
          </Fieldset>
        </ModalForms>
      )}


    </>
  );
}