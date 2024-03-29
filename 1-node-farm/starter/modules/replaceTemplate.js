module.exports = (temp, card) => {
  let output = temp.replace(/{%IMAGE%}/g, card.image);
  output = output.replace(/{%PRODUCTNAME%}/g, card.productName);
  output = output.replace(/{%ID%}/g, card.id);
  output = output.replace(/{%FROM%}/g, card.from);
  output = output.replace(/{%NUTRIENTS%}/g, card.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, card.description);
  output = output.replace(/{%QUANTITY%}/g, card.quantity);
  output = output.replace(/{%PRICE%}/g, card.price);

  if (!card.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};
