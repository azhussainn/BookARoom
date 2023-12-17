import { ReactNode } from "react";
import { Toaster } from 'react-hot-toast';

export default function GlobalProvider({ children }: { children: ReactNode }) {
    return (
        <>
            <Toaster />
            {children}
        </>
    );
}