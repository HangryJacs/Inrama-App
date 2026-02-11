import { Bell, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white z-40 border-b border-border-hairline h-14 px-gutter-mobile flex items-center justify-between">
            {/* Brand */}
            <Link to="/" className="hover:opacity-80 transition-opacity">
                <img src="/logo/inrama-logo.png" alt="INRAMA" className="h-5 w-auto object-contain" />
            </Link>

            {/* Actions */}
            <div className="flex items-center space-x-5">
                <Link to="/cart" className="relative text-primary hover:text-accent transition-colors">
                    <ShoppingBag size={20} strokeWidth={1.5} />
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-black text-white text-[9px] font-bold flex items-center justify-center rounded-full">2</span>
                </Link>
                <button className="relative text-primary hover:text-accent transition-colors">
                    <Bell size={20} strokeWidth={1.5} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-sale rounded-full border border-background"></span>
                </button>
                <Link to="/profile" className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center border border-border-hairline overflow-hidden">
                    <img
                        src="/photos/Screenshot 2026-02-11 104538.png"
                        alt="Profile"
                        className="w-full h-full object-cover opacity-90"
                    />
                </Link>
            </div>
        </header>
    );
};
