import { USER_PROFILE } from '../data/mock';
import { Package, MapPin, CreditCard, Settings, LogOut, ChevronRight } from 'lucide-react';

export const Profile = () => {
    const menuItems = [
        { icon: Package, label: 'Orders' },
        { icon: MapPin, label: 'Addresses' },
        { icon: CreditCard, label: 'Payment Methods' },
        { icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="pb-10 pt-6">
            <div className="px-gutter-mobile mb-8">
                <h1 className="text-2xl font-black uppercase mb-6">Profile</h1>

                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full border border-border-hairline overflow-hidden">
                        <img src="/photos/Screenshot 2026-02-11 104538.png" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold uppercase">{USER_PROFILE.name}</h2>
                        <p className="text-sm text-neutral-500">{USER_PROFILE.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 uppercase tracking-wide">
                            {USER_PROFILE.tier} Member
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-8">
                    <div className="bg-neutral-50 p-4 border border-border-hairline text-center hover:border-black transition-colors">
                        <span className="block text-2xl font-bold">12</span>
                        <span className="text-[10px] uppercase font-bold text-neutral-400">Orders</span>
                    </div>
                    <div className="bg-neutral-50 p-4 border border-border-hairline text-center hover:border-black transition-colors">
                        <span className="block text-2xl font-bold">4</span>
                        <span className="text-[10px] uppercase font-bold text-neutral-400">Wishlist</span>
                    </div>
                </div>

                <div className="space-y-px bg-border-hairline border-t border-b border-border-hairline">
                    {menuItems.map((item) => (
                        <button key={item.label} className="w-full h-14 bg-white flex items-center justify-between px-2 hover:bg-neutral-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <item.icon size={18} className="text-neutral-400" />
                                <span className="text-sm font-bold uppercase">{item.label}</span>
                            </div>
                            <ChevronRight size={16} className="text-neutral-300" />
                        </button>
                    ))}
                    <button className="w-full h-14 bg-white flex items-center justify-between px-2 hover:bg-neutral-50 transition-colors text-error">
                        <div className="flex items-center gap-4">
                            <LogOut size={18} />
                            <span className="text-sm font-bold uppercase">Log Out</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
