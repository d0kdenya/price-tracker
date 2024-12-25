import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PriceHistoryService } from './price-history.service';
import { CreatePriceHistoryDto } from './dto/create.price-history.dto';
import { PriceHistory } from './entities/price-history.entity';
import { UpdatePriceHistoryDto } from './dto/update.price-history.dto';

@Controller('price-history')
export class PriceHistoryController {
  constructor(private readonly priceHistoryService: PriceHistoryService) {}

  @Post()
  async addPriceHistory(
    @Body() createPriceHistoryDto: CreatePriceHistoryDto,
  ): Promise<PriceHistory> {
    return this.priceHistoryService.create(createPriceHistoryDto);
  }

  @Get()
  async getPriceHistories(
    @Query('product') product: string,
  ): Promise<PriceHistory[]> {
    if (product) {
      return this.priceHistoryService.findByProduct(product);
    }
    return this.priceHistoryService.findAll();
  }

  @Get(':id')
  async getPriceHistoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PriceHistory> {
    const record = await this.priceHistoryService.findOne(id);
    if (!record) {
      throw new NotFoundException(`PriceHistory with ID ${id} not found`);
    }
    return record;
  }

  @Put(':id')
  async updatePriceHistory(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updatePriceHistoryDto: UpdatePriceHistoryDto,
  ): Promise<PriceHistory> {
    return this.priceHistoryService.update(id, updatePriceHistoryDto);
  }

  @Delete(':id')
  async deletePriceHistory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.priceHistoryService.remove(id);
  }
}
