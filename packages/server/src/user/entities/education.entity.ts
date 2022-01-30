import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../core/entities/timestamp.entity';
import { IsDate, IsString, IsUUID } from 'class-validator';
import { UserEntity } from './user.entity';

@Entity('education')
export class EducationEntity extends TimestampEntity {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @IsString()
  @Column()
  public school: string;

  @IsString()
  @Column()
  public degree: string;

  @IsString()
  @Column()
  public fieldOfStudy: string;

  @IsDate()
  @Column()
  public startDate: Date;

  @IsDate()
  @Column()
  public endDate: Date;

  @IsString()
  @Column()
  public grade: string;

  @ManyToOne(() => UserEntity, (user) => user.educationData, { onDelete: 'CASCADE' })
  public user: UserEntity;

}
