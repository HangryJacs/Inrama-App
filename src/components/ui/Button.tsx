import React from 'react';

import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-bold uppercase transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed tracking-tight';

        const variants = {
            primary: 'bg-primary text-secondary hover:bg-neutral-800 active:bg-neutral-900 border border-primary',
            secondary: 'bg-secondary text-primary border border-secondary hover:bg-neutral-50',
            outline: 'bg-transparent border border-primary text-primary hover:bg-primary/5',
            ghost: 'bg-transparent text-primary hover:bg-neutral-100',
        };

        const sizes = {
            sm: 'h-9 px-4 text-xs',
            md: 'h-11 px-6 text-sm',
            lg: 'h-14 px-8 text-base',
        };

        return (
            <button
                ref={ref}
                className={twMerge(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    fullWidth ? 'w-full' : '',
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
