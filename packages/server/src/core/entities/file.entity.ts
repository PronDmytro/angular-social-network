import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { TimestampEntity } from './timestamp.entity';

@Entity('file')
export class FileEntity extends TimestampEntity {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @IsString()
  @Column({ unique: true })
  public url: string;

  @IsString()
  @Column({ unique: true })
  public key: string;

}
