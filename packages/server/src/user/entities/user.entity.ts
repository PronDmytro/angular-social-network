import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArrayMaxSize, IsArray, IsBoolean, IsEmail, IsString, IsUUID, MaxLength } from 'class-validator';
import { TimestampEntity } from '../../core/entities/timestamp.entity';
import { EducationEntity } from './education.entity';
import { Default } from '../../core/class-transformers/default';

@Entity('user')
export class UserEntity extends TimestampEntity {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @IsString()
  @MaxLength(255)
  @Column()
  public name: string;

  @IsString()
  @MaxLength(255)
  @Column()
  public surname: string;

  @IsEmail()
  @Column({ unique: true, nullable: false })
  public email: string;

  @MaxLength(255)
  @Column()
  public passwordHash: string;

  @IsBoolean()
  @Column({ default: false })
  public isAdmin: boolean;

  @ArrayMaxSize(100)
  @IsArray()
  @Default([])
  @OneToMany(() => EducationEntity, (education) => education.user, { eager: true })
  public educationData: EducationEntity[];

}
