"use client";
import React from "react";

interface FieldProps {
  disabled?: boolean;
  children: React.ReactNode;
}

export function Field({ disabled, children }: FieldProps) {
  return (
    <div
      className={`w-full box-border text-base${disabled ? " cursor-not-allowed [&>*]:opacity-75 [&>*]:pointer-events-none" : ""}`}
    >
      {children}
    </div>
  );
}
