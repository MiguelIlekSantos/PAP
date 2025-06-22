import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchasesDto, UpdatePurchasesDto } from '../DTO/purchases.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Purchases } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('purchases')
export class PurchasesOrdersController {
  constructor(
    private readonly purchasesService: PurchasesService,
  ) {}

  @Roles([Permissions.PURCHASES_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getPurchases(@Query() parameters: ListParametersDto): Promise<ListResponse<Purchases>> {
    return this.purchasesService.getPurchases(parameters);
  }

  @Roles([Permissions.PURCHASES_READ])
  @Get(':id')
  getPurchase(@Param('id') id: string) {
    return this.purchasesService.getPurchaseById(+id);
  }

  @Roles([Permissions.PURCHASES_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createPurchase(@Body() dto: CreatePurchasesDto) {
    return this.purchasesService.createPurchase(dto);
  }

  @Roles([Permissions.PURCHASES_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updatePurchase(@Param('id') id: string, @Body() dto: UpdatePurchasesDto) {
    return this.purchasesService.updatePurchase(+id, dto);
  }

  @Roles([Permissions.PURCHASES_DELETE])
  @Delete(':id')
  deletePurchase(@Param('id') id: string): Promise<boolean> {
    return this.purchasesService.deletePurchase(+id);
  }
}