"use client";
import React from "react";

interface FieldErrorMessageProps {
  message: React.ReactNode;
  isValid: boolean | null;
}

export function FieldErrorMessage({ isValid, message }: FieldErrorMessageProps) {
  return (
    <div className="ml-px mt-[5px] text-sm text-red-500">{isValid === false ? message : ""}</div>
  );
}
