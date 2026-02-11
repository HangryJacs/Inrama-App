import { USER_PROFILE } from '../data/mock';
import { Gift, Award, Share2, Instagram } from 'lucide-react';

export const Rewards = () => {
    const progressPercent = (USER_PROFILE.points / USER_PROFILE.nextTierPoints) * 100;

    return (
        <div className="pb-10">
            {/* Tier Card */}
            <div className="bg-gradient-to-br from-neutral-900 to-black text-white p-gutter-mobile pt-10 pb-16 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">Current Tier</span>
                            <h1 className="text-4xl font-black uppercase italic tracking-tighter">{USER_PROFILE.tier}</h1>
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                            <Award size={24} />
                        </div>
                    </div>

                    <div className="mb-2 flex justify-between items-end">
                        <span className="text-3xl font-bold">{USER_PROFILE.points}</span>
                        <span className="text-xs font-medium text-neutral-400 mb-1">/ {USER_PROFILE.nextTierPoints} PTS</span>
                    </div>

                    <div className="h-1 bg-white/20 w-full rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <p className="mt-4 text-xs text-neutral-400">
                        {USER_PROFILE.nextTierPoints - USER_PROFILE.points} points away from <span className="text-white font-bold">Diamond Status</span>
                    </p>
                </div>

                {/* Abstract BG pattern */}
                <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-neutral-800 rounded-full blur-3xl opacity-50"></div>
            </div>

            {/* Earn Section */}
            <div className="px-gutter-mobile -mt-8 relative z-20">
                <div className="bg-white border border-border-hairline p-6 shadow-sm">
                    <h2 className="text-lg font-black uppercase mb-6 border-b border-border-hairline pb-4">Ways to Earn</h2>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-neutral-50 flex items-center justify-center border border-neutral-100">
                                <Share2 size={18} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold uppercase text-sm">Refer a Friend</h3>
                                <p className="text-xs text-neutral-500">Give $20, Get $20</p>
                            </div>
                            <span className="font-bold text-sm">+500 pts</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-neutral-50 flex items-center justify-center border border-neutral-100">
                                <Instagram size={18} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold uppercase text-sm">Follow us</h3>
                                <p className="text-xs text-neutral-500">@inrama.au</p>
                            </div>
                            <span className="font-bold text-sm">+50 pts</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-neutral-50 flex items-center justify-center border border-neutral-100">
                                <Gift size={18} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold uppercase text-sm">Birthday Bonus</h3>
                                <p className="text-xs text-neutral-500">Add your date of birth</p>
                            </div>
                            <span className="font-bold text-sm">+200 pts</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
