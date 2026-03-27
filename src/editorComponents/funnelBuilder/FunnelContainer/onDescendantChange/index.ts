import { syncStepOnCreate } from "./syncStepOnCreate";
import { syncStepOnDelete } from "./syncStepOnDelete";
import { syncFieldOnUpdate } from "./syncFieldOnUpdate";
import { syncFieldOnDelete } from "./syncFieldOnDelete";

export const onDescendantChange = [
  syncStepOnCreate,
  syncStepOnDelete,
  syncFieldOnUpdate,
  syncFieldOnDelete
];
