import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { UserEntity } from './user.entity';
import * as argon2 from 'argon2';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {

  public constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  public listenTo() {
    return UserEntity;
  }

  public async hashPassword(entity: UserEntity): Promise<void> {
    entity.passwordHash = await argon2.hash(entity.passwordHash);
  }

  public beforeInsert(event: InsertEvent<UserEntity>): Promise<void> {
    return this.hashPassword(event.entity);
  }

  public async beforeUpdate({ entity, databaseEntity }: UpdateEvent<UserEntity>): Promise<void> {
    if (entity.passwordHash !== databaseEntity?.passwordHash) {
      await this.hashPassword(entity as UserEntity);
    }
  }

}
