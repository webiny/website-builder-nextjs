"use client";
import React from "react";

interface FieldHelperMessageProps {
  children: React.ReactNode;
}

export function FieldHelperMessage({ children }: FieldHelperMessageProps) {
  return <div className="ml-px mt-[-5px] mb-[5px] text-sm text-gray-500">{children}</div>;
}
