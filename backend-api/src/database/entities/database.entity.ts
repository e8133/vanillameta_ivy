import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { CreateDatabaseDto } from '../dto/create-database.dto';

@Entity()
export class Database extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '데이터베이스 ID' })
  id: number;

  @Column({ length: 300, comment: '데이터베이스명' })
  name: string;

  @Column({ length: 1000, nullable: true, comment: '설명' })
  description: string;

  @Column({ type: 'text', comment: '속성' })
  sequelizeConfig: string; // 기타 속성 json으로 .. host, schema, filePath...

  @Column({ length: 100, comment: '데이터베이스 구분' })
  engine: string;

  @Column({ length: 100, comment: '타임존', nullable: true })
  timezone: string;

  static of(
    name: string,
    description: string,
    details: string,
    engine: string,
    timezone: string,
  ): Database {
    const obj = new Database();
    obj.name = name;
    obj.description = description;
    obj.sequelizeConfig = details;
    obj.engine = engine;
    obj.timezone = timezone;
    return obj;
  }

  static toDto(dto: CreateDatabaseDto): Database {
    return Database.of(dto.name, dto.description, dto.sequelizeConfig, dto.engine, dto.timezone);
  }

  getFullDescription(): string {
    return `${this.name} ${this.description}`;
  }
}
