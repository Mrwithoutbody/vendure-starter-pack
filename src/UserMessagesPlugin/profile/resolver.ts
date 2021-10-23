import { Query, Resolver, Mutation, Args } from "@nestjs/graphql";
import { Ctx, RequestContext, Allow, Transaction } from "@vendure/core";

import { ProfileService } from "./profileService";

@Resolver()
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  @Query()
  async getProfiles(@Ctx() ctx: RequestContext) {
    return this.profileService.getProfiles(ctx);
  }

  
}
