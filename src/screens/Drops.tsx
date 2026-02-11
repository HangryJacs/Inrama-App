import { DROPS } from '../data/mock';
import { Bell, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

export const Drops = () => {
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        const timer = setInterval(() => {
            const dropDate = new Date(DROPS[0].date);
            const diff = differenceInSeconds(dropDate, new Date());

            const days = Math.floor(diff / (3600 * 24));
            const hours = Math.floor((diff % (3600 * 24)) / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;

            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="pb-10 pt-6">
            <div className="px-gutter-mobile mb-6">
                <h1 className="text-2xl font-black uppercase mb-1">Drops</h1>
                <p className="text-neutral-500 text-sm">Limited releases. Don't miss out.</p>
            </div>

            {DROPS.map(drop => (
                <div key={drop.id} className="relative aspect-[3/4] bg-neutral-900 group">
                    <img
                        src={drop.image}
                        alt={drop.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />

                    <div className="absolute inset-0 flex flex-col justify-between p-gutter-mobile pb-10">
                        <div className="flex justify-between items-start">
                            <span className="bg-sale text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider animate-pulse">
                                Upcoming
                            </span>
                            <button className="bg-black/50 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-black transition-colors">
                                <Bell size={14} /> Notify Me
                            </button>
                        </div>

                        <div className="text-center">
                            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2 leading-none">
                                {drop.name}
                            </h2>
                            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 border border-white/20">
                                <Clock size={16} />
                                <span className="font-mono text-lg font-bold tracking-widest">{timeLeft}</span>
                            </div>
                            <p className="text-white/80 text-xs mt-3 font-medium uppercase tracking-widest">{drop.pieceCount} Piece Collection</p>
                        </div>

                        <div className="w-full">
                            <button className="w-full h-12 bg-white text-black font-bold uppercase tracking-tight hover:bg-neutral-200 transition-colors">
                                View Lookbook
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Past Drops */}
            <div className="px-gutter-mobile mt-10">
                <h3 className="text-sm font-bold uppercase text-neutral-400 mb-4 tracking-widest">Past Drops</h3>
                <div className="space-y-4 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                    <div className="flex gap-4">
                        <div className="w-20 h-20 bg-neutral-200">
                            <img src="/photos/Screenshot 2026-02-11 104514.png" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 className="font-black uppercase">Jaded Summer</h4>
                            <span className="text-xs bg-black text-white px-1.5 py-0.5 font-bold uppercase">Sold Out</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
