import { Heart } from 'lucide-react';
import { PRODUCTS, USER_PROFILE } from '../data/mock';
import { Link } from 'react-router-dom';

export const Home = () => {
    const trendingProducts = PRODUCTS.filter(p => p.tags?.includes('TRENDING') || p.tags?.includes('BESTSELLER') || p.tags?.includes('new'));

    return (
        <div className="pb-8">
            {/* Hero Banner */}
            <section className="relative h-[500px] w-full group overflow-hidden">
                <img
                    src="/photos/Hero-Screenshot_2025-05-29_at_5.16.06_pm.webp"
                    alt="Summer Campaign"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-gutter-mobile pb-10">
                    <span className="text-white text-xs font-bold tracking-widest uppercase mb-2">New Collection</span>
                    <h1 className="text-white text-4xl font-black uppercase leading-[0.9] mb-4">
                        Summer<br />Essentials
                    </h1>
                    <button className="bg-white text-black h-12 px-6 uppercase font-bold tracking-tight w-fit hover:bg-neutral-200 transition-colors">
                        Shop Now
                    </button>
                </div>
            </section>

            {/* Member Status Strip */}
            <div className="bg-neutral-50 px-gutter-mobile py-3 flex justify-between items-center text-xs font-medium border-b border-border-hairline mb-8">
                <span className="text-neutral-500 uppercase tracking-wide">
                    <span className="text-black font-bold">{USER_PROFILE.tier} Insider</span> · {USER_PROFILE.points} pts
                </span>
                <Link to="/rewards" className="underline decoration-1 underline-offset-2">Redeem</Link>
            </div>

            <div className="space-y-8">
                {/* Quick Actions */}
                <section className="grid grid-cols-4 gap-2 px-gutter-mobile">
                    {[
                        { label: 'New In', icon: <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center"><Heart size={16} /></div> },
                        { label: 'Wishlist', icon: <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center"><Heart size={16} fill="black" /></div> },
                        { label: 'Rewards', icon: <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center"><span className="text-xs font-bold">★</span></div> },
                        { label: 'Refer', icon: <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center"><span className="text-xs font-bold">→</span></div> }
                    ].map((action) => (
                        <button key={action.label} className="aspect-square bg-neutral-50 border border-border-hairline flex flex-col items-center justify-center space-y-2 hover:border-black transition-colors">
                            {action.icon}
                            <span className="text-[10px] font-bold uppercase">{action.label}</span>
                        </button>
                    ))}
                </section>

                {/* Trending Now */}
                <section>
                    <div className="px-gutter-mobile flex justify-between items-end mb-4">
                        <h2 className="text-xl font-black uppercase tracking-tight">Trending Now</h2>
                        <Link to="/shop" className="text-xs border-b border-black pb-0.5">View All</Link>
                    </div>

                    <div className="flex overflow-x-auto space-x-2 px-gutter-mobile pb-4 scrollbar-hide snap-x">
                        {trendingProducts.map((product) => (
                            <div key={product.id} className="min-w-[160px] w-[160px] snap-start group relative">
                                <div className="aspect-[2/3] bg-neutral-100 overflow-hidden mb-3 relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Heart size={14} />
                                    </button>
                                    {product.tags?.[0] && (
                                        <span className="absolute bottom-2 left-2 bg-black text-white text-[9px] font-bold px-1.5 py-0.5 uppercase">
                                            {product.tags[0]}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-sm font-bold uppercase leading-tight line-clamp-2 mb-1">{product.name}</h3>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm text-neutral-600">{product.price}</span>
                                    <span className="text-[10px] font-bold text-sale">+65 pts</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Collections Grid */}
                <section className="px-gutter-mobile">
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4">Collections</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="aspect-square bg-neutral-100 relative group overflow-hidden">
                            <img src="/photos/KEHLANI1_2048x2048.webp" className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 transition-transform" />
                            <span className="absolute bottom-3 left-3 text-white font-black text-lg uppercase">Swim</span>
                        </div>
                        <div className="aspect-square bg-neutral-100 relative group overflow-hidden">
                            <img src="/photos/Screenshot 2026-02-11 104331.png" className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 transition-transform" />
                            <span className="absolute bottom-3 left-3 text-white font-black text-lg uppercase">Denim</span>
                        </div>
                        <div className="col-span-2 aspect-[2/1] bg-neutral-100 relative group overflow-hidden">
                            <img src="/photos/Screenshot 2026-02-11 104217.png" className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 transition-transform" />
                            <span className="absolute bottom-3 left-3 text-white font-black text-lg uppercase">Evening Edit</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
