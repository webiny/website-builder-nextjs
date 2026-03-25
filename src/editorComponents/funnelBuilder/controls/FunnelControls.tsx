"use client";
import React from "react";
import { useContainer } from "../FunnelContainer/ContainerProvider";

export function FunnelControls() {
  const { funnelSubmissionVm } = useContainer();

  return (
    <div className="flex justify-between p-[5px]">
      {funnelSubmissionVm.isFirstStep() ? (
        <div className="flex-1" />
      ) : (
        <button
          style={{ background: "var(--fub-primary-color)" }}
          className="border-none rounded px-[10px] py-[10px] text-white cursor-pointer hover:opacity-90"
          onClick={() => funnelSubmissionVm.activatePreviousStep()}
        >
          Previous
        </button>
      )}
      <button
        style={{ background: "var(--fub-primary-color)" }}
        className="border-none rounded px-[10px] py-[10px] text-white cursor-pointer hover:opacity-90"
        onClick={() => funnelSubmissionVm.submitActiveStep()}
      >
        {funnelSubmissionVm.isFinalStep() ? "Finish" : "Next"}
      </button>
    </div>
  );
}
