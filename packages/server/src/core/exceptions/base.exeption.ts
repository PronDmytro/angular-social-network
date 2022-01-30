export class BaseException extends Error {

  public get type(): string {
    return this.constructor.name;
  }

}
