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

  @Column("float")
  lat: number;

  @Column("float")
  lng: number;

  @OneToMany((type) => City, (city) => city.country) cities: City[];
}
