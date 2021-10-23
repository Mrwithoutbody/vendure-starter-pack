import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { NestModule, MiddlewareConsumer } from "@nestjs/common";
import { schemaExtension } from "./schema";

import { Note } from "./note/entity";
import { NoteService } from "./note/service";
import { NoteResolver } from "./note/resolver";

import {
  CUSTOM_PERMISSION_ARR,
  Profile,
  AdministratorProfileResolver,
  ProfileService,
  ProfileResolver,
} from "./profile";

import { SeedingMiddleware } from "./seedingMeddleware";


@VendurePlugin({
  entities: [
    Note,
  ],
  imports: [PluginCommonModule],
  providers: [
    NoteService,
  ],
  adminApiExtensions: {
    schema: schemaExtension,
    resolvers: [
      NoteResolver,
    ],
  },
  configuration: (config) => {
    config.authOptions.customPermissions.push(...CUSTOM_PERMISSION_ARR);
    return config;
  },
})
export class UserMessagesPlugin implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SeedingMiddleware).forRoutes("*");
  }
}
