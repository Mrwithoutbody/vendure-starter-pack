import { VendureEntity } from "@vendure/core";
import { Column, Entity, ManyToOne } from "typeorm";
import { DeepPartial } from "@vendure/common/lib/shared-types";

export type NoteInput = Pick<Note, "content"> 

@Entity()
export class Note extends VendureEntity {
  constructor(input?: DeepPartial<Note>) {
    super(input);
  }

  @Column()
  content!: string;
}
