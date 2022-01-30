import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsService {

  public imageBase64ToBuffer(imageBase64: string): Buffer {
    const imageBase64Format = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    return Buffer.from(imageBase64Format, 'base64');
  }

}
