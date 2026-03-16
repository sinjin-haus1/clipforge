import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClipDocument = Clip & Document;

@Schema({ timestamps: true })
export class Clip {
  @Prop({ required: true })
  title: string;

  @Prop()
  originalVideoUrl: string;

  @Prop()
  outputVideoUrl: string;

  @Prop({ enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' })
  status: string;

  @Prop()
  duration: number;

  @Prop()
  highlights: string[];

  @Prop()
  captions: string;

  @Prop()
  aspectRatio: string;

  @Prop()
  trendingAudio: string;

  @Prop()
  platform: string;
}

export const ClipSchema = SchemaFactory.createForClass(Clip);
