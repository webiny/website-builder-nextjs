import React, { useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { contentSdk } from "@webiny/website-builder-nextjs";
import { FunnelVm } from "../viewModels/FunnelVm";
import { FunnelModel, FunnelModelDto } from "../models/FunnelModel";
import { FunnelSubmissionVm } from "../viewModels/FunnelSubmissionVm";
import { ThemeSettings } from "../types";

interface ContainerContextValue {
  funnelVm: FunnelVm;
  funnelSubmissionVm: FunnelSubmissionVm;
  theme: ThemeSettings["theme"];
}

const createDefaultThemeSettings = (): ThemeSettings => {
  return {
    theme: {
      primaryColor: "",
      secondaryColor: "",
      logo: ""
    }
  };
};

const createInitialContextValue = (): ContainerContextValue => {
  const funnelVm = new FunnelVm();
  const funnelSubmissionVm = new FunnelSubmissionVm(funnelVm.funnel);

  return {
    funnelVm,
    funnelSubmissionVm,
    theme: createDefaultThemeSettings()["theme"]
  };
};

const ContainerContext = React.createContext<ContainerContextValue>(createInitialContextValue());

export interface ContainerProviderProps {
  children: React.ReactNode;
  containerData?: FunnelModelDto;

  // Used only within the Admin (editor) renderer.
  updateElementData?: (data: FunnelModelDto) => void;
}

// const GET_THEME_SETTINGS = /* GraphQL */ `
//   query GetThemeSettings {
//     themeSettings {
//       data {
//         id
//         theme {
//           primaryColor
//           secondaryColor
//           logo
//         }
//       }
//       error {
//         code
//         message
//         data
//       }
//     }
//   }
// `;

export const ContainerProvider = ({ children, containerData }: ContainerProviderProps) => {
  // 1. FunnelVm.
  const funnelVm = useMemo(() => {
    return new FunnelVm(containerData ? new FunnelModel(containerData) : undefined);
  }, []);

  useEffect(() => {
    // No change needed — containerData and funnelVm are already in sync,
    // and the updated containerData has triggered a rerender.
    funnelVm.populateFunnel(containerData!, { emitChange: false });
  }, [containerData]);

  // Do we need this!?
  // useSyncExternalStore(funnelVm.subscribe.bind(funnelVm), funnelVm.getChecksum.bind(funnelVm));

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

  // 2. FunnelSubmissionVm — recreated when the funnel definition or editor active step changes.
  // editorActiveStepId is passed in so the correct step is restored after recreation.
  const funnelSubmissionVm = useMemo(() => {
    const vm = new FunnelSubmissionVm(funnelVm.funnel);
    if (editorActiveStepId) {
      vm.activateStep(editorActiveStepId);
    }
    return vm;
    // }, [funnelVm.getChecksum(), editorActiveStepId]);
  }, [editorActiveStepId]);

  useSyncExternalStore(
    funnelSubmissionVm.subscribe.bind(funnelSubmissionVm),
    funnelSubmissionVm.getChecksum.bind(funnelSubmissionVm)
  );

  // const { data, error } = useLoader<ThemeSettings, Error>(() => {
  //   return request<any>(getGqlApiUrl(), GET_THEME_SETTINGS).then(res => {
  //     if (res.themeSettings.error) {
  //       throw new Error(res.themeSettings.error.message);
  //     }
  //
  //     return res.themeSettings.data;
  //   });
  // });

  // const themeSettings = useMemo(() => {
  //   if (!data) {
  //     return createDefaultThemeSettings();
  //   }
  //
  //   return {
  //     theme: {
  //       primaryColor: data.theme.primaryColor,
  //       secondaryColor: data.theme.secondaryColor,
  //       logo: data.theme.logo
  //     }
  //   } as ThemeSettings;
  // }, [data]);

  const themeSettings = {
    theme: {
      primaryColor: "red",
      secondaryColor: "green",
      logo: "https://test.com/test.svg"
    }
  };

  // if (error) {
  //   console.error("An error occurred while fetching theme settings:", error);
  //   return <>An error occurred: {error.message}</>;
  // }

  return (
    <ContainerContext.Provider value={{ funnelVm, funnelSubmissionVm, theme: themeSettings.theme }}>
      {children}
    </ContainerContext.Provider>
  );
};

ContainerProvider.displayName = "ContainerProvider";

export const useContainer = () => {
  return useContext(ContainerContext);
};
