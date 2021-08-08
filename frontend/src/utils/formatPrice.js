export const formatPrice = price => {
  return new Intl.NumberFormat('vn', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};
