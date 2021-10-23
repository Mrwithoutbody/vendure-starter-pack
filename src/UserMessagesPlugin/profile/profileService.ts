import { Injectable } from "@nestjs/common";

import {
  Role,
  AdministratorService,
  ID,
  RequestContext,
  TransactionalConnection,
  Administrator,
} from "@vendure/core";

import { Profile,  CreateUserInput, ExtendedAdministrator } from "./entity";
import { NOTES_ROLES } from "./customRole";

import { ListWithItems, listWithItems } from "../advancedQuery";

@Injectable()
export class ProfileService {
  constructor(
    private connection: TransactionalConnection,
    private administratorService: AdministratorService
  ) {}

  private async createProfile(
    ctx: RequestContext,
    userId: ID
  ): Promise<Profile | undefined> {
    const repository = this.connection.getRepository(ctx, Profile);

    const profile = repository.create({
      blocked: false,
      user: { id: userId },
    });

    await repository.save(profile);
    return profile;
  }

  async registerByPassword(
    ctx: RequestContext,
    args: CreateUserInput,
    _role: keyof typeof NOTES_ROLES
  ): Promise<ExtendedAdministrator | undefined> {
    const role = await this.connection
      .getRepository(ctx, Role)
      .findOne({ where: { code: NOTES_ROLES[_role].code } });

    if (!role) return;

    const newAdmin = await this.administratorService.create(ctx, {
      ...args,
      roleIds: [role.id],
    });

    const profile = await this.createProfile(ctx, newAdmin.id);

    return profile ? { ...newAdmin, profile } : undefined;
  }

  async getProfileByAdministratorId(ctx: RequestContext, id: ID) {
    return this.connection
      .getRepository(ctx, Profile)
      .findOne({ where: { user: id } });
  }

  async getProfiles(
    ctx: RequestContext
  ): Promise<ListWithItems<Administrator>> {
    const adminRepo = this.connection.getRepository(ctx, Administrator);
    return adminRepo.findAndCount().then(listWithItems);
  }
}
