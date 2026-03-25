import React, { useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { contentSdk } from "@webiny/website-builder-nextjs";
import { FunnelVm } from "../viewModels/FunnelVm";
import { FunnelModel, FunnelModelDto } from "../models/FunnelModel";
import { FunnelSubmissionVm } from "../viewModels/FunnelSubmissionVm";

interface ContainerContextValue {
  funnelVm: FunnelVm;
  funnelSubmissionVm: FunnelSubmissionVm;
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
  // 1. FunnelVm.
  const funnelVm = useMemo(() => {
    return new FunnelVm(containerData ? new FunnelModel(containerData) : undefined);
  }, []);

  useEffect(() => {
    funnelVm.populateFunnel(containerData!, { emitChange: false });
  }, [containerData]);

  // Tracks which step the editor user has clicked to preview — undefined at runtime.
  const [editorActiveStepId, setEditorActiveStepId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const editingSdk = contentSdk.getEditingSdk();
    if (!editingSdk) {
      return;
    }

    return editingSdk.messenger.on("fub.activeStepChanged", ({ stepId }: { stepId: string }) => {
      setEditorActiveStepId(stepId);
    });
  }, []);

  // 2. FunnelSubmissionVm — recreated when the editor active step changes.
  // editorActiveStepId is passed in so the correct step is restored after recreation.
  const funnelSubmissionVm = useMemo(() => {
    const vm = new FunnelSubmissionVm(funnelVm.funnel);
    if (editorActiveStepId) {
      vm.activateStep(editorActiveStepId);
    }
    return vm;
  }, [editorActiveStepId]);

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
