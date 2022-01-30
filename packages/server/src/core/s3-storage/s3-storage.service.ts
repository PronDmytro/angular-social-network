import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import conf from '../../conf';

export class S3StorageService {

  private bucketName = conf.awsCredentials.bucketName;

  public async uploadFile(file: Buffer) {
    const s3 = new S3();
    return (await s3.upload({
      Bucket: this.bucketName,
      Body: file,
      Key: uuid() + '.png',
    }).promise());
  }

}
