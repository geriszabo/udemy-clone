"use client";

import StoreProvider from "@/state/redux";
import { ReactNode } from "react";

interface ProvidersProps {
    children: ReactNode
}

const Providers = ({children}: ProvidersProps) =>{
return <StoreProvider>{children}</StoreProvider>
};

export default Providers