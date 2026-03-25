import { FunnelModel } from "../models/FunnelModel";
import { FunnelSubmissionModel } from "../models/FunnelSubmissionModel";

type Listener = () => void;

export class FunnelSubmissionVm {
  funnel: FunnelModel;
  funnelSubmission: FunnelSubmissionModel;
  listeners: Set<Listener> = new Set();

  constructor(funnel: FunnelModel) {
    this.funnel = funnel;
    this.funnelSubmission = new FunnelSubmissionModel(funnel);
  }

  start() {
    this.funnelSubmission.start();
    this.emitChange();
  }

  getField(fieldId: string) {
    return this.funnelSubmission.getField(fieldId);
  }

  fieldExists(fieldId: string) {
    return this.funnelSubmission.fieldExists(fieldId);
  }

  setData(data: any) {
    this.funnelSubmission.setData(data);
    this.emitChange();
  }

  submitActiveStep() {
    this.funnelSubmission.submitActiveStep().then(this.emitChange.bind(this));
  }

  activatePreviousStep() {
    this.funnelSubmission.activatePreviousStep();
    this.emitChange();
  }

  activateStep(stepId: string) {
    const step = this.funnel.steps.find(s => s.id === stepId);
    if (step) {
      this.funnelSubmission.activateStep(step);
      this.emitChange();
    }
  }

  evaluateConditionRulesForActiveStep() {
    this.funnelSubmission.evaluateRelatedConditionRules();
    this.emitChange();
  }

  get activeStepIndex() {
    return this.funnelSubmission.getActiveStepIndex();
  }

  get activeStepId() {
    return this.funnelSubmission.activeStepId;
  }

  isFinalStep() {
    return this.funnelSubmission.isFinalStep();
  }

  isFirstStep() {
    return this.funnelSubmission.isFirstStep();
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emitChange() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  getChecksum() {
    return this.funnelSubmission.getChecksum();
  }
}
