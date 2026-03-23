import React, { useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { contentSdk } from "@webiny/website-builder-nextjs";
import { FunnelVm } from "../viewModels/FunnelVm";
import { FunnelModelDto, FunnelModel } from "../models/FunnelModel";
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

export const ContainerProvider = ({
  children,
  containerData,
  updateElementData = () => undefined
}: ContainerProviderProps) => {
  // 1. FunnelVm.
  const funnelVm = useMemo(() => {
    return new FunnelVm(containerData ? new FunnelModel(containerData) : undefined);
  }, []);

  useEffect(() => {
    return funnelVm.subscribe(updateElementData);
  }, [funnelVm, updateElementData]);

  useEffect(() => {
    const editingSdk = contentSdk.getEditingSdk();
    if (!editingSdk) {
      return;
    }
    return editingSdk.messenger.on("fub.activeStepChanged", ({ stepId }: { stepId: string }) => {
      funnelVm.activateStep(stepId);
    });
  }, [funnelVm]);

  // useEffect(() => {
  //   funnelVm.populateFunnel(element.data, { emitChange: false });
  // }, [element.data]);
  //
  useSyncExternalStore(funnelVm.subscribe.bind(funnelVm), funnelVm.getChecksum.bind(funnelVm));

  // 2. FunnelSubmissionVm.
  const funnelSubmissionVm = useMemo(() => {
    return new FunnelSubmissionVm(funnelVm.funnel);
  }, [funnelVm.getChecksum()]);

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
