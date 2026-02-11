import React from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-dvh bg-background text-primary font-sans selection:bg-black selection:text-white">
            <Header />
            <main className="pt-14 pb-16 min-h-dvh">
                {children}
            </main>
            <BottomNav />
        </div>
    );
};
