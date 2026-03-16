import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ClipsService } from './clips.service';
import { Clip } from './clip.schema';

@Resolver(() => Clip)
export class ClipsResolver {
  constructor(private clipsService: ClipsService) {}

  @Query(() => [Clip])
  async clips(): Promise<Clip[]> {
    return this.clipsService.findAll();
  }

  @Query(() => Clip, { nullable: true })
  async clip(@Args('id', { type: () => ID }) id: string): Promise<Clip | null> {
    return this.clipsService.findOne(id);
  }

  @Mutation(() => Clip)
  async createClip(@Args('input') input: Partial<Clip>): Promise<Clip> {
    return this.clipsService.create(input);
  }

  @Mutation(() => Clip)
  async updateClip(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: Partial<Clip>,
  ): Promise<Clip> {
    return this.clipsService.update(id, input);
  }

  @Mutation(() => Clip)
  async deleteClip(@Args('id', { type: () => ID }) id: string): Promise<Clip> {
    return this.clipsService.remove(id);
  }

  @Mutation(() => [String])
  async detectHighlights(@Args('videoUrl') videoUrl: string): Promise<string[]> {
    return this.clipsService.detectHighlights(videoUrl);
  }

  @Mutation(() => String)
  async generateCaptions(@Args('videoUrl') videoUrl: string): Promise<string> {
    return this.clipsService.generateCaptions(videoUrl);
  }
}
