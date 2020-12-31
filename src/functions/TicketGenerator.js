export function generateSpaces(numberOfspaces) {
  var spaces = ' ';
  for (let index = 0; index < numberOfspaces; index++) {
    spaces = spaces + ' ';
  }
  return spaces;
}

export function calculateNumberofSpaces(productName, price) {
  const GeneralSpaces = 44;
  return GeneralSpaces - (productName.length + price.length);
}
