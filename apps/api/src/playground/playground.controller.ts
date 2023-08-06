import { Controller, Res, Body, Post } from '@nestjs/common';
import { Response } from 'express';
import { data } from './dumyCode/code';

@Controller('playground')
export class PlaygroundController {
  @Post()
  getInstruction(@Body() body: any, @Res() res: Response) {
    const { comment } = body;
    let code: string = 'console.log("Hello world")';
    if (comment === 'Create a word guessing game') {
      code = data.word;
    } else if (comment === 'Use an emoji to say hello') {
      code = data.hello;
    } else if (
      comment === 'Make a ping pong ball on a black background and move'
    ) {
      code = data.ball;
    } else if (comment === 'Make a snowstorm on a black background') {
      code = data.storm;
    }
    res.send({
      code,
    });
  }
}
