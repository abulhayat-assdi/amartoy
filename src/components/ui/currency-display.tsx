"use client";

interface CurrencyDisplayProps {
  amount: number;
  className?: string;
}

export function CurrencyDisplay({ amount, className = "" }: CurrencyDisplayProps) {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return (
    <span className={className}>
      <span className="currency-symbol">৳</span>
      <span className="currency-amount">{formattedNumber}</span>
    </span>
  );
}
