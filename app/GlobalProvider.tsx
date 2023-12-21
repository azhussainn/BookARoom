'use client';

import { ReactNode } from "react";
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from "next-auth/react";

export default function GlobalProvider({ children }: { children: ReactNode }) {
    
    return (
        <>
            <Toaster />
            <SessionProvider>
                {children}
            </SessionProvider>
        </>
    );
}