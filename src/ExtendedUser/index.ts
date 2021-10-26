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
import { AddressService } from "./address/service";
import { AddressResolver } from "./address/resolver";
import { PhysicalAddress } from "./address/entity";

@VendurePlugin({
  entities: [
    Profile,
    PhysicalAddress
  ],
  imports: [PluginCommonModule],
  providers: [  
    ProfileService,
    AddressService
  ],
  adminApiExtensions: {
    schema: schemaExtension,
    resolvers: [
      ProfileResolver,
      AddressResolver
    ],
  },
  configuration: (config) => {
    config.authOptions.customPermissions.push(...CUSTOM_PERMISSION_ARR);

    config.customFields = {
      ...config.customFields,
      User: [
        {
          name: 'stars',
          type: 'int'
        }
      ]
    }

    return config;
  },
})
export class ExtendedUser implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SeedingMiddleware).forRoutes("*");
  }
}
