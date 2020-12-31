import moment from 'moment';

export function generateSpaces(numberOfspaces) {
  var spaces = ' ';
  for (let index = 0; index < numberOfspaces; index++) {
    spaces = spaces + ' ';
  }
  return spaces;
}

export function calculateNumberofSpaces(productName, price) {
  const GeneralSpaces = 47;
  return GeneralSpaces - (productName.length + price.length);
}

// THIS Function format Json data to be printed as (product name + price)
export function FormateOrderItems(listofProducts) {
  var ticketElements = '';
  listofProducts.forEach((elm) => {
    var productName = elm.productName;

    var price = elm.price + ' DA';

    if (productName.length > 40) {
      productName = productName.substring(0, 40) + '...';
    }

    const numberOfSpaces = calculateNumberofSpaces(productName, price);

    const spaces = generateSpaces(numberOfSpaces);

    const ItemFormated = productName + spaces + price;
    ticketElements = ticketElements + ItemFormated;
  });

  return ticketElements;
}

export function formateStoreName(storeNAME) {
  return '<CB>' + storeNAME + '</CB>';
}

export function transactiondetailsFormated(collected, discount, change) {
  return (
    '------------------------------------------------' +
    'Collected Amount' +
    generateSpaces(calculateNumberofSpaces('Collected Amount', collected)) +
    collected +
    'Discount' +
    generateSpaces(calculateNumberofSpaces('Discount', discount)) +
    discount +
    'Chnage Amount' +
    generateSpaces(calculateNumberofSpaces('Chnage Amount', change)) +
    change +
    '------------------------------------------------'
  );
}

export function formatedDate() {
  var date = moment().format('DD/MM/YYYY, hh:mm:ss');
  return 'Date     : ' + date;
}

export function totalPriceFormated(total) {
  return '<CB>' + 'TOTAL :  ' + total + ' DA </CB>';
}

export function listFooterFormated(ticketID, adress) {
  return (
    '------------------------------------------------' +
    ticketID +
    generateSpaces(calculateNumberofSpaces(ticketID, '')) +
    formatedDate() +
    generateSpaces(calculateNumberofSpaces(formatedDate(), '')) +
    'Adress   : ' +
    adress
  );
}
