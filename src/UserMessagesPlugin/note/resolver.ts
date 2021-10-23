import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { Ctx, RequestContext } from "@vendure/core";

import { NoteInput } from "./entity";
import { NoteService } from "./service";

@Resolver("Note")
export class NoteResolver {
  constructor(private noteService: NoteService) {}

  @Mutation()
  async addNote(
    @Ctx() ctx: RequestContext,
    @Args() args: { input: NoteInput }
  ) {
    return this.noteService.addNote(ctx, args.input);
  }
}
