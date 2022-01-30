import { Transform, TransformFnParams } from 'class-transformer';

export function Default(defaultValue: unknown) {
  return Transform((value: TransformFnParams) => {
    return value?.value ?? defaultValue;
  });
}
