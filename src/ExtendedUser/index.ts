import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { NestModule, MiddlewareConsumer } from "@nestjs/common";
import { schemaExtension } from "./schema";

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
    Profile,
  ],
  imports: [PluginCommonModule],
  providers: [  
    ProfileService,
  ],
  adminApiExtensions: {
    schema: schemaExtension,
    resolvers: [
      ProfileResolver,
    ],
  },
  configuration: (config) => {
    config.authOptions.customPermissions.push(...CUSTOM_PERMISSION_ARR);
    return config;
  },
})
export class ExtendedUser implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SeedingMiddleware).forRoutes("*");
  }
}
