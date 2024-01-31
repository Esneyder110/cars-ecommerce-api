import { InputType, OmitType } from '@nestjs/graphql';

import { CreateCarInput } from 'src/car/dto';

@InputType()
export class CreatePostInput extends OmitType(CreateCarInput, ['id']) {}
