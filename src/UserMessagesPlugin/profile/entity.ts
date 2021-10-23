import { VendureEntity, Administrator } from "@vendure/core";
import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { DeepPartial } from "@vendure/common/lib/shared-types";

export type CreateUserInput = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
};

export type ExtendedAdministrator = Administrator & {
  profile: Profile;
};

@Entity()
export class Profile extends VendureEntity {
  constructor(input?: DeepPartial<Profile>) {
    super(input);
  }

  @Column({ default: false })
  blocked!: boolean;

  @OneToOne(() => Administrator, { nullable: false, eager: true })
  @JoinColumn()
  user!: Administrator;
}


