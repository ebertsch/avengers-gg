import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ToLowerCasePipe implements PipeTransform<string, string> {
    transform(value: string): string {
        if (!value) return value
        return value.toLowerCase();
    }
}