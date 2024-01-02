import { IsNumberString, IsString, Max, MinLength, isString } from "class-validator";

export class CreateTodoDto {
    @IsNumberString()
    @Max(10)
    id: number;
    title: string;
}

