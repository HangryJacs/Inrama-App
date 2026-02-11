import { PRODUCTS } from '../data/mock';
import { X, Minus, Plus, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const Cart = () => {
    // Mock cart items (just take first 2 products)
    const cartItems = [PRODUCTS[0], PRODUCTS[3]];

    return (
        <div className="pb-20">
            <div className="px-gutter-mobile mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-black uppercase">Your Bag</h1>
                <span className="text-sm font-bold text-neutral-500">2 ITEMS</span>
            </div>

            <div className="space-y-6 px-gutter-mobile">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-border-hairline pb-6">
                        <div className="w-24 aspect-[3/4] bg-neutral-100">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-sm font-bold uppercase leading-tight pr-4">{item.name}</h3>
                                    <button className="text-neutral-400 hover:text-black transition-colors"><X size={16} /></button>
                                </div>
                                <p className="text-xs text-neutral-500 mb-2">Size: M</p>
                                <p className="text-sm font-medium">{item.price}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="w-6 h-6 border border-neutral-200 flex items-center justify-center hover:border-black"><Minus size={12} /></button>
                                <span className="text-xs font-bold">1</span>
                                <button className="w-6 h-6 border border-neutral-200 flex items-center justify-center hover:border-black"><Plus size={12} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="px-gutter-mobile mt-8 space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Subtotal</span>
                    <span className="font-bold">$195.00 AUD</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Shipping</span>
                    <span className="font-bold">Calculated at checkout</span>
                </div>
                <div className="pt-4 border-t border-dashed border-neutral-300 flex justify-between items-end">
                    <span className="font-black uppercase text-lg">Total</span>
                    <div className="text-right">
                        <span className="block font-black text-lg">$195.00 AUD</span>
                        <span className="text-[10px] text-neutral-400">Including GST</span>
                    </div>
                </div>

                <div className="bg-neutral-50 p-3 flex items-center justify-center gap-2 border border-border-hairline mt-4">
                    <span className="text-xs font-bold uppercase text-sale">🎉 You'll earn +195 Points</span>
                </div>

                <Button fullWidth size="lg" className="mt-4 group">
                    Checkout <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="text-center">
                    <Link to="/shop" className="text-xs font-bold underline underline-offset-2">Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
};
