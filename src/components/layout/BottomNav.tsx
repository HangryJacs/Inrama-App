import { Home, ShoppingBag, Zap, Award, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

export const BottomNav = () => {
    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: ShoppingBag, label: 'Shop', path: '/shop' },
        { icon: Zap, label: 'Drops', path: '/drops' },
        { icon: Award, label: 'Rewards', path: '/rewards' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border-hairline z-50 pb-safe">
            <div className="flex justify-around items-center h-16">
                {navItems.map(({ icon: Icon, label, path }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            clsx(
                                "flex flex-col items-center justify-center w-full h-full space-y-1",
                                isActive ? "text-primary" : "text-neutral-400 hover:text-neutral-600"
                            )
                        }
                    >
                        <Icon size={20} className="stroke-[1.5px]" />
                        <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};
