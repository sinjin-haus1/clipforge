import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClipsService } from './clips.service';
import { ClipsResolver } from './clips.resolver';
import { Clip, ClipSchema } from './clip.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Clip.name, schema: ClipSchema }])],
  providers: [ClipsService, ClipsResolver],
})
export class ClipsModule {}
