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

  @Column('float', { nullable: true })
  lat: number;

  @Column('float', { nullable: true })
  lng: number;

  @Column()
  shortDescription: string;

  @Column()
  longDescription: string;

  @ManyToOne((type) => Country, (country) => country.cities) country: Country;
}
