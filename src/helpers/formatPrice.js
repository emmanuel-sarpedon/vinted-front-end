const formatPrice = (number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(parseInt(number));
};

export default formatPrice;
