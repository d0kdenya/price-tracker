import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PriceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product: string;

  @Column()
  seller: string;

  @Column()
  link: string;

  @Column('real')
  price: number;

  @Column()
  date: string;
}
