import { IsOptional } from 'class-validator';

import { TitleValidation } from '../../utils/validationDecorators';

/**
 * Base specialization DTO
 */

interface BaseSpecializationDto {
  title: string;
}

/**
 * DTO for specialization creation
 */

export class CreateSpecializationDto
  implements Required<BaseSpecializationDto>
{
  @TitleValidation() title: string;

  constructor({ title }: Record<string, string>) {
    this.title = title;
  }
}

/**
 * DTO for updating specialization
 */

export class UpdateSpecializationDto implements Partial<BaseSpecializationDto> {
  @TitleValidation()
  @IsOptional()
  title: string;

  constructor({ title }: Record<string, string>) {
    this.title = title;
  }
}
