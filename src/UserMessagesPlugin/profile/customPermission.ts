import { PermissionDefinition } from "@vendure/core";

const NOTE_VIEW = new PermissionDefinition({
  name: "NOTE_VIEW",
  description: "Display notes",
});

const NOTE_ADD = new PermissionDefinition({
  name: "NOTE_ADD",
  description: "Insert notes",
});

const OWN_NOTE_MANAGE = new PermissionDefinition({
  name: "OWN_NOTE_MANAGE",
  description: "Manage notes",
});

const ALL_NOTE_MANAGE = new PermissionDefinition({
  name: "ALL_NOTE_MANAGE",
  description: "Manage notes",
});

export const CUSTOM_PERMISSION = {
  NOTE_VIEW,
  NOTE_ADD,
  OWN_NOTE_MANAGE,
  ALL_NOTE_MANAGE,
};
export const CUSTOM_PERMISSION_ARR = Object.values(CUSTOM_PERMISSION);


