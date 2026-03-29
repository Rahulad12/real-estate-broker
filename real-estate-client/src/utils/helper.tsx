// Placeholder image by property type
export const placeholderImage = (type: string) => {
  const map: Record<string, string> = {
    villa: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    house: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    commercial: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    apartment: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
  };
  return map[type] ?? map.apartment;
};


export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);