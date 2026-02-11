import { useState } from 'react';
import { PRODUCTS } from '../data/mock';
import { Heart } from 'lucide-react';


const FILTERS = ['All', 'New In', 'Tops', 'Bottoms', 'Swim', 'Dresses', 'Denim', 'Sets'];

export const Shop = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredProducts = activeFilter === 'All'
        ? PRODUCTS
        : PRODUCTS.filter(p =>
            activeFilter === 'New In' ? p.tags?.includes('NEW') :
                p.category.toUpperCase() === activeFilter.toUpperCase()
        );

    return (
        <div className="pt-6">
            {/* Search Header */}
            <div className="px-gutter-mobile mb-4">
                <h1 className="text-2xl font-black uppercase mb-3">Shop</h1>
                <input
                    type="text"
                    placeholder="SEARCH INRAMA..."
                    className="w-full h-10 bg-neutral-50 border border-neutral-200 px-3 text-sm font-medium focus:outline-none focus:border-primary placeholder:text-neutral-400 uppercase"
                />
            </div>

            {/* Filter Pills */}
            <div className="flex overflow-x-auto px-gutter-mobile space-x-2 pb-6 scrollbar-hide">
                {FILTERS.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`h-8 px-4 border text-xs font-bold uppercase whitespace-nowrap transition-colors ${activeFilter === filter
                            ? 'bg-primary text-secondary border-primary'
                            : 'bg-white text-primary border-neutral-200 hover:border-black'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-px bg-border-hairline">
                {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white group relative pb-4">
                        <div className="aspect-[2/3] bg-neutral-100 relative overflow-hidden mb-3">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <Heart size={16} />
                            </button>
                            {product.tags?.includes('NEW') && (
                                <span className="absolute bottom-2 left-2 bg-black text-white text-[9px] font-bold px-1.5 py-0.5 uppercase">
                                    New
                                </span>
                            )}
                        </div>
                        <div className="px-3">
                            <h3 className="text-xs font-bold uppercase leading-tight mb-1">{product.name}</h3>
                            <div className="flex justify-between items-baseline">
                                <span className="text-sm text-neutral-600">{product.price}</span>
                                <button className="text-[10px] font-bold uppercase border-b border-black hover:opacity-50">Add</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
