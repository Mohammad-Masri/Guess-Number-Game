/* eslint-disable prettier/prettier */
import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ServerError extends HttpException {
  @ApiProperty({ type: Number })
  statusCode: number;
  @ApiProperty({ type: String })
  message: string;
  constructor(status_code: number, message: any) {
    super(
      {
        statusCode: status_code,
        message,
      },
      status_code,
    );
  }
}
