import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class TimestampEntity {

  @CreateDateColumn()
  public createdAt: Date;
  @UpdateDateColumn()
  public updatedAt: Date;

}
