import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { GenerateGame } from '../model/generate.dto';
import { UserGame } from 'src/model/responseType/userGame';

@Injectable()
export class GenerateService {
  constructor(
    @InjectQueue('gameGenerate') private processGameQueue: Queue,
    @InjectQueue('cloneGame') private cloneGameQueue: Queue,
  ) {}

  async addGameToQueueForProcess(
    queue: 'process' | 'clone',
    generateGame: GenerateGame,
  ): Promise<{ id: number }> {
    try {
      let data;
      if (queue === 'process') {
        data = await this.processGameQueue.add(generateGame);
      } else {
        data = await this.cloneGameQueue.add(generateGame);
      }

      return { id: data.id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getGameProcessStatusFromQueue(id: string): Promise<UserGame> {
    try {
      const job = await this.processGameQueue.getJob(id);
      if (job.progress() === 'completed') {
        return job.returnvalue;
      }
      return job.progress();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getGameCloneStatusFromQueue(id: string): Promise<UserGame> {
    try {
      const job = await this.cloneGameQueue.getJob(id);
      if (job.progress() === 'completed') {
        return job.returnvalue;
      }

      return job.progress();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
