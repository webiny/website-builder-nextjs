import React, { useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { contentSdk } from "@webiny/website-builder-nextjs";
import { FunnelVm } from "../viewModels/FunnelVm";
import { FunnelModel, FunnelModelDto } from "../models/FunnelModel";
import { FunnelSubmissionVm } from "../viewModels/FunnelSubmissionVm";

interface ContainerContextValue {
  funnelVm: FunnelVm;
  funnelSubmissionVm: FunnelSubmissionVm;
}

interface ActiveStepChangedPayload {
  stepId: string;
}

const createInitialContextValue = (): ContainerContextValue => {
  const funnelVm = new FunnelVm();
  const funnelSubmissionVm = new FunnelSubmissionVm(funnelVm.funnel);
  return { funnelVm, funnelSubmissionVm };
};

const ContainerContext = React.createContext<ContainerContextValue>(createInitialContextValue());

export interface ContainerProviderProps {
  children: React.ReactNode;
  containerData?: FunnelModelDto;

  // Used only within the Admin (editor) renderer.
  updateElementData?: (data: FunnelModelDto) => void;
}

export const ContainerProvider = ({ children, containerData }: ContainerProviderProps) => {
  const funnelVm = useMemo(() => {
    return new FunnelVm(containerData ? new FunnelModel(containerData) : undefined);
  }, [containerData]);

  // Tracks which step the editor user has clicked to preview — undefined at runtime.
  const [editorActiveStepId, setEditorActiveStepId] = useState<string | undefined>(undefined);

  const editingSdk = contentSdk.getEditingSdk();
  if (editingSdk) {
    useEffect(() => {
      return editingSdk.messenger.on<ActiveStepChangedPayload>(
        "fub.activeStepChanged",
        ({ stepId }) => {
          setEditorActiveStepId(stepId);
        }
      );
    }, []);
  }

  // 2. FunnelSubmissionVm
  const funnelSubmissionVm = useMemo(() => {
    const vm = new FunnelSubmissionVm(funnelVm.funnel);
    if (editorActiveStepId) {
      vm.activateStep(editorActiveStepId);
    }
    vm.start();
    return vm;
  }, [funnelVm, editorActiveStepId]);

  const getChecksum = funnelSubmissionVm.getChecksum.bind(funnelSubmissionVm);

  useSyncExternalStore(
    funnelSubmissionVm.subscribe.bind(funnelSubmissionVm),
    getChecksum,
    getChecksum
  );

  return (
    <ContainerContext.Provider value={{ funnelVm, funnelSubmissionVm }}>
      {children}
    </ContainerContext.Provider>
  );
};

ContainerProvider.displayName = "ContainerProvider";

export const useContainer = () => {
  return useContext(ContainerContext);
};
