import React from 'react';

export default function WelcomeHeader({ name }) {
  return (
    <div className="pt-12 pb-2 px-6">
      <p className="text-sm text-muted-foreground font-medium tracking-wide">
        Assalamu Alaikum
      </p>
      <h1 className="text-2xl font-bold text-foreground mt-0.5">
        {name} ✨
      </h1>
      <p className="text-xs text-muted-foreground mt-2 italic font-light">
        "Small actions build big impact"
      </p>
    </div>
  );
}