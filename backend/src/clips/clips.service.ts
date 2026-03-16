import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clip, ClipDocument } from './clip.schema';

@Injectable()
export class ClipsService {
  constructor(@InjectModel(Clip.name) private clipModel: Model<ClipDocument>) {}

  async findAll(): Promise<Clip[]> {
    return this.clipModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Clip> {
    return this.clipModel.findById(id).exec();
  }

  async create(input: Partial<Clip>): Promise<Clip> {
    const clip = new this.clipModel(input);
    return clip.save();
  }

  async update(id: string, input: Partial<Clip>): Promise<Clip> {
    return this.clipModel.findByIdAndUpdate(id, input, { new: true }).exec();
  }

  async remove(id: string): Promise<Clip> {
    return this.clipModel.findByIdAndDelete(id).exec();
  }

  // Mock AI highlight detection
  async detectHighlights(videoUrl: string): Promise<string[]> {
    // In production, this would call an AI video analysis API
    return ['00:15-00:22', '00:45-00:52', '01:10-01:18'];
  }

  // Mock AI caption generation
  async generateCaptions(videoUrl: string): Promise<string> {
    // In production, this would call a speech-to-text API
    return "This is an epic gaming moment!";
  }
}
