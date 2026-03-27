import { syncStepOnCreate } from "./syncStepOnCreate";
import { syncStepOnDelete } from "./syncStepOnDelete";
import { syncFieldOnCreate } from "./syncFieldOnCreate";
import { syncFieldOnUpdate } from "./syncFieldOnUpdate";
import { syncFieldOnDelete } from "./syncFieldOnDelete";

export const onDescendantChange = [
  syncStepOnCreate,
  syncStepOnDelete,
  syncFieldOnCreate,
  syncFieldOnUpdate,
  syncFieldOnDelete
];
