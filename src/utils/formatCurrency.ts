export const formatCurrency = (value: number, currency: string) => {
  if (currency !== "USD") {
    return `${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
    }).format(value)} ${currency}`;
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  }
};
