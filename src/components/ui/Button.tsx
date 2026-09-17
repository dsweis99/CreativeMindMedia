import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  href?: string;
  className?: string;
  children?: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function Button({ variant = 'primary', href, className = '', children, ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 rounded-sm text-[13px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-[var(--color-accent)] text-[var(--color-accent-fg)] hover:bg-[var(--color-accent-hover)] hover:shadow-[0_4px_20px_var(--color-accent-dim)]",
    outline: "border border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-border-subtle)]"
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a href={href} className={classes} target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={classes} {...(props as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
