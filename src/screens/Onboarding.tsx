import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const Onboarding = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState<any>({});

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Finish
            localStorage.setItem('onboarding_complete', 'true');
            navigate('/');
        }
    };

    return (
        <div className="min-h-dvh bg-background flex flex-col p-gutter-mobile pt-10 pb-safe">
            {/* Progress */}
            <div className="flex space-x-1 mb-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1 flex-1 transition-colors duration-300 ${i <= step ? 'bg-primary' : 'bg-neutral-200'}`} />
                ))}
            </div>

            <div className="flex-1 flex flex-col">
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <h1 className="text-3xl font-black uppercase mb-2">What's your vibe?</h1>
                        <p className="text-neutral-500 mb-8">Select all that apply to personalise your feed.</p>

                        <div className="grid grid-cols-2 gap-3">
                            {['Streetwear', 'Glam', 'Minimal', 'Bold'].map(style => (
                                <button
                                    key={style}
                                    onClick={() => setSelections({ ...selections, style })}
                                    className={`aspect-square border flex items-center justify-center text-lg font-bold uppercase transition-all ${selections.style === style
                                        ? 'bg-primary text-secondary border-primary'
                                        : 'bg-white border-neutral-200 text-neutral-400 hover:border-primary'
                                        }`}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <h1 className="text-3xl font-black uppercase mb-2">Your Size?</h1>
                        <p className="text-neutral-500 mb-8">We'll show you what's in stock.</p>

                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold uppercase block mb-3">Tops</label>
                                <div className="flex flex-wrap gap-2">
                                    {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelections({ ...selections, topSize: size })}
                                            className={`w-12 h-12 border flex items-center justify-center font-bold ${selections.topSize === size
                                                ? 'bg-primary text-secondary border-primary'
                                                : 'bg-white border-neutral-200'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center flex flex-col items-center justify-center h-full">
                        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl">🎁</span>
                        </div>
                        <h1 className="text-3xl font-black uppercase mb-2">You're In.</h1>
                        <p className="text-neutral-500 mb-8 max-w-xs mx-auto">
                            Here's 10% off your first order. Use code <span className="text-black font-bold">INRAMA10</span>
                        </p>
                        <div className="bg-neutral-50 border border-dashed border-neutral-300 p-4 w-full mb-8 font-mono text-center tracking-widest font-bold text-xl">
                            INRAMA10
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6">
                <Button fullWidth onClick={handleNext} className="h-14 text-lg">
                    {step === 3 ? 'Start Shopping' : 'Next'} <ArrowRight size={18} className="ml-2" />
                </Button>
                {step < 3 && (
                    <button onClick={handleNext} className="w-full text-center text-xs text-neutral-400 font-bold uppercase mt-4 hover:text-primary">
                        Skip
                    </button>
                )}
            </div>
        </div>
    );
};
