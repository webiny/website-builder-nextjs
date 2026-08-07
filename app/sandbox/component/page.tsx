import React from "react";
import { initializeSdk, getTenant } from "@/sdk";
import { ComponentSandbox } from "@webiny/sdk-nextjs";
import { editorComponents } from "@/editorComponents";

export default async function ComponentSandboxPage() {
    initializeSdk({ tenantId: await getTenant() });

    return <ComponentSandbox components={editorComponents} />;
}
