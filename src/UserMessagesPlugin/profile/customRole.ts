import { Role, Permission } from "@vendure/core";
import { CUSTOM_PERMISSION } from "./customPermission";

export * from "./entity";

const permissions = Object.keys(Permission) as Permission[];

const permissionsToOmit = [
  Permission.SuperAdmin,
  Permission.CreateAdministrator,
  Permission.ReadAdministrator,
  Permission.UpdateAdministrator,
  Permission.DeleteAdministrator,
];

const commonPermissions = permissions.filter(
  (p) => !permissionsToOmit.includes(p)
);

const userPermissions = [
  ...commonPermissions,
  CUSTOM_PERMISSION.NOTE_VIEW.Permission,
  CUSTOM_PERMISSION.NOTE_ADD.Permission,
];
const ownerPermissions = [
  ...userPermissions,
  CUSTOM_PERMISSION.OWN_NOTE_MANAGE.Permission,
];
const adminPermissions = [
  ...ownerPermissions,
  CUSTOM_PERMISSION.ALL_NOTE_MANAGE.Permission,
];

export type NotesRoles = "ADMIN" | "OWNER" |  "USER";

export const NOTES_ROLES: Record<
  NotesRoles,
  Pick<Role, "code" | "description" | "channels" | "permissions">
> = {
  ADMIN: {
    code: "__notes_admin__",
    description: "Admin profile",
    channels: [{ id: 1 }] as Role["channels"],
    permissions: adminPermissions,
  },
  OWNER: {
    code: "__notes_owner__",
    description: "Owner profile",
    channels: [{ id: 1 }] as Role["channels"],
    permissions: ownerPermissions,
  },
  USER: {
    code: "__notes_user__",
    description: "Basic user profile",
    channels: [{ id: 1 }] as Role["channels"],
    permissions: userPermissions,
  },
};
