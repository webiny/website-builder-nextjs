import React from "react";
import { initializeSdk } from "@/sdk";
import { getTenant } from "@/sdk/getTenant";
import { ComponentSandbox } from "@webiny/sdk-nextjs";
import { editorComponents } from "@/editorComponents";

export default async function ComponentSandboxPage() {
    initializeSdk({ tenantId: await getTenant() });

    return <ComponentSandbox components={editorComponents} />;
}
