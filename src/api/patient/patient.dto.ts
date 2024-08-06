interface BasePatientDto {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class CreatePatientDto implements Required<BasePatientDto> {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
}

export class UpdatePatientDto implements Partial<BasePatientDto> {}
