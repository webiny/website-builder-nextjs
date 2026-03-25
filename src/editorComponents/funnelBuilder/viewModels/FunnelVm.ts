import { FunnelModel, FunnelModelDto } from "../models/FunnelModel";
import {
  FunnelFieldDefinitionModel,
  FunnelFieldDefinitionModelDto
} from "../models/FunnelFieldDefinitionModel";
import { FunnelStepModel, FunnelStepModelDto } from "../models/FunnelStepModel";

type Listener = (dto: FunnelModelDto) => void;

export class FunnelVm {
  funnel: FunnelModel;
  listeners: Set<Listener> = new Set();

  constructor(funnel?: FunnelModel | FunnelModelDto) {
    if (funnel instanceof FunnelModel) {
      this.funnel = funnel;
    } else {
      this.funnel = new FunnelModel(funnel);
    }
  }

  // Fields. 👇
  addField(dto: FunnelFieldDefinitionModelDto) {
    const newField = new FunnelFieldDefinitionModel(dto);
    this.funnel.fields.push(newField);
    this.emitChange();
  }

  removeField(id: string) {
    this.funnel.fields = this.funnel.fields.filter(field => field.id !== id);
    this.emitChange();
  }

  updateField(fieldId: string, fieldData: Partial<FunnelFieldDefinitionModelDto>) {
    const field = this.funnel.fields.find(field => field.id === fieldId);
    if (field) {
      field.populate(fieldData);
      this.emitChange();
    }
  }

  getFields() {
    return this.funnel.fields;
  }

  getFieldById(id: string) {
    return this.funnel.fields.find(field => field.id === id);
  }

  getFieldByFieldId(fieldId: string) {
    return this.funnel.fields.find(field => field.fieldId === fieldId);
  }

  // Steps. 👇
  addStep(dto: FunnelStepModelDto) {
    const newStep = new FunnelStepModel(dto);
    this.funnel.steps.push(newStep);
    this.emitChange();
  }

  removeStep(stepId: string) {
    this.funnel.removeStep(stepId);
    this.emitChange();
  }

  updateStep(stepId: string, stepData: Partial<FunnelStepModelDto>) {
    this.funnel.updateStep(stepId, stepData);
    this.emitChange();
  }

  getSteps() {
    return this.funnel.steps;
  }

  // Other methods. 👇
  populateFunnel(funnel: Partial<FunnelModelDto>, options?: { emitChange?: boolean }) {
    this.funnel.populate(funnel);

    if (options?.emitChange !== false) {
      this.emitChange();
    }
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getChecksum() {
    return this.funnel.getChecksum();
  }

  private emitChange() {
    for (const listener of this.listeners) {
      listener(this.funnel.toDto());
    }
  }
}
