import { Injectable, NotFoundException } from '@nestjs/common';
import { PriceHistory } from './entities/price-history.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PriceHistoryService {
  constructor(
    @InjectRepository(PriceHistory)
    private priceHistoryRepository: Repository<PriceHistory>,
  ) {}

  create(priceHistory: Partial<PriceHistory>): Promise<PriceHistory> {
    const newRecord = this.priceHistoryRepository.create(priceHistory);
    return this.priceHistoryRepository.save(newRecord);
  }

  findAll(): Promise<PriceHistory[]> {
    return this.priceHistoryRepository.find();
  }

  findByProduct(product: string): Promise<PriceHistory[]> {
    return this.priceHistoryRepository.find({ where: { product } });
  }

  findOne(id: number): Promise<PriceHistory> {
    return this.priceHistoryRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateData: Partial<PriceHistory>,
  ): Promise<PriceHistory> {
    const record = await this.findOne(id);
    if (!record) {
      throw new NotFoundException(`PriceHistory with ID ${id} not found`);
    }
    Object.assign(record, updateData);
    return this.priceHistoryRepository.save(record);
  }

  async remove(id: number): Promise<void> {
    const result = await this.priceHistoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`PriceHistory with ID ${id} not found`);
    }
  }
}
