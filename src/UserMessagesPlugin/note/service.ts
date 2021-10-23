import { Injectable } from "@nestjs/common";

import { RequestContext, TransactionalConnection } from "@vendure/core";

import { Note, NoteInput } from "./entity";

@Injectable()
export class NoteService {
  constructor(private connection: TransactionalConnection) {}

  async addNote(
    ctx: RequestContext,
    args: NoteInput
  ): Promise<Note | undefined> {
    const repository = this.connection.getRepository(ctx, Note);

    const note = repository.create({
      ...args,
    });

    await repository.save(note);
    return note;
  }
}
