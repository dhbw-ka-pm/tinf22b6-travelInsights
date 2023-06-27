import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { City } from "./City";

@Entity()
export class Country {
  @PrimaryColumn()
  name: string;

  @Column('float', { nullable: true })
  lat: number;

  @Column('float', { nullable: true })
  lng: number;

  @OneToMany((type) => City, (city) => city.country) cities: City[];
}
