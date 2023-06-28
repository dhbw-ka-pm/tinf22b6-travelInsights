import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Country } from './Country';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageSrc: string;

  @Column('float')
  lat: number;

  @Column('float')
  lng: number;

  @Column()
  shortDescription: string;

  @Column({ nullable: true })
  longDescription: string;

  @ManyToOne((type) => Country, (country) => country.cities) country: Country;
}
