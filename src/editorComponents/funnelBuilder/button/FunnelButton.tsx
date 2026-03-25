"use client";
import React, { useCallback, useState } from "react";
import type { ComponentProps } from "@webiny/website-builder-nextjs";
import { useContainer } from "../FunnelContainer/ContainerProvider";
import { ButtonElementData } from "./types";
import { registry } from "./buttonActions/registry";

type FunnelButtonProps = ComponentProps<{
  buttonData: ButtonElementData;
}>;

export function FunnelButton({ inputs }: FunnelButtonProps) {
  const { funnelVm, funnelSubmissionVm, theme } = useContainer();
  const [running, setRunning] = useState(false);

  const onClick = useCallback(async () => {
    setRunning(true);
    try {
      for (const action of inputs.buttonData.actions) {
        const actionDef = registry.find(a => a.type === action.type);
        if (!actionDef) {
          console.warn(`Button action type "${action.type}" not found.`);
          continue;
        }
        const result = await actionDef.action({ funnelVm, funnelSubmissionVm });
        if (result === false) {
          break;
        }
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setRunning(false);
    }
  }, [inputs.buttonData.actions, funnelVm, funnelSubmissionVm]);

  return (
    <button
      style={{ background: theme.primaryColor }}
      className="border-none rounded px-[10px] py-[10px] text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:opacity-80"
      onClick={onClick}
      disabled={running}
    >
      {inputs.buttonData.label || "No label"}
    </button>
  );
}
