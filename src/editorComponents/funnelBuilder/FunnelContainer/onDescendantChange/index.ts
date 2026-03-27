import { syncStepOnCreate } from "./syncStepOnCreate";
import { syncStepOnDelete } from "./syncStepOnDelete";
import { syncFieldOnDelete } from "./syncFieldOnDelete";

export const onDescendantChange = [syncStepOnCreate, syncStepOnDelete, syncFieldOnDelete];
