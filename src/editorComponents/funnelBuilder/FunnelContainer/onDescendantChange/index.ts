import { syncStepOnCreate } from "./syncStepOnCreate";
import { syncStepOnUpdate } from "./syncStepOnUpdate";
import { syncStepOnDelete } from "./syncStepOnDelete";
import { syncFieldOnCreate } from "./syncFieldOnCreate";
import { syncFieldOnUpdate } from "./syncFieldOnUpdate";
import { syncFieldOnDelete } from "./syncFieldOnDelete";

export const onDescendantChange = [
  syncStepOnCreate,
  syncStepOnUpdate,
  syncStepOnDelete,
  syncFieldOnCreate,
  syncFieldOnUpdate,
  syncFieldOnDelete
];
