import React, {useEffect, useState} from 'react';
import moment from 'moment';

import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Home from './src/screens/Home';
import {RNUSBPrinter} from 'react-native-usb-printer';
import CheckBox from '@react-native-community/checkbox';
import {Data} from './src/Data/quotes';
import {
  calculateNumberofSpaces,
  generateSpaces,
} from './src/functions/TicketGenerator';

export default function App() {
  const [devices, setdevices] = useState([]);
  const [isConnected, setisConnected] = useState(false);
  const [printDate, setprintDate] = useState(true);

  // happynew year
  function happyNewYear() {
    var newLane = '                                               ';
    const space47 = '------------------------------------------------';

    RNUSBPrinter.printBillTextWithCut(
      space47 +
        '<CM><B>     Happy New Year !    </B></CM>                ' +
        newLane +
        'from Neo Team                   ' +
        newLane +
        space47 +
        newLane +
        ' 01/01/2021, 00:00:00 ',
      +newLane,
    );
  }
  // happynew year

  function connectPrinter() {
    // console.log('connectPrinter');
    RNUSBPrinter.getUSBDeviceList().then((res) => {
      setdevices(res);
      if (devices && devices.length > 0) {
        RNUSBPrinter.connectPrinter(
          devices[0].vendor_id,
          devices[0].product_id,
        ).then((res_) => {
          // ToastAndroid.showWithGravity(
          //   'succesfully connected to : ' + devices[0].device_name,
          //   ToastAndroid.SHORT,
          //   ToastAndroid.CENTER,
          // );

          setisConnected(true);
        });
      } else {
        // ToastAndroid.showWithGravity('no printer found !!', ToastAndroid.SHORT);
        setisConnected(false);
      }
      return res;
    });
  }

  useEffect(() => {
    const listofProducts = [
      {
        productName: 'Elio 5L',

        price: '635',
      },
      {
        productName: 'Tomate 500G',

        price: '98',
      },
      {
        productName: 'Ifri 1.5L',

        price: '30',
      },
      {
        productName: 'RIZO RIS',

        price: '68',
      },
      {
        productName: 'GARRIDO Pois Chiche Garrido 1Kg',

        price: '410',
      },
    ];

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

    var date = moment().format('DD/MMMMM/YYYY, hh:mm:ss');

    // RNUSBPrinter.printText('HI');

    // ***-*-*-*-* print the ticket :---------------------------------------------------------------------

    var storeNAME = 'Superette Marwan';
    // storeNAME = "'<CB>" + storeNAME + "</CB>'";

    // RNUSBPrinter.printText(storeNAME);
    RNUSBPrinter.printText(generateSpaces(46 / 2) + storeNAME);

    var dateFormated = date;

    const totalPrice = '1241 DA';

    ///--------------------------------------------------------

    var change = '210 DA';
    var discount = '250 DA';

    const numberOfSpaces2 = calculateNumberofSpaces(
      'Collected Amount',
      totalPrice,
    );

    const numberOfSpacesdiscount = calculateNumberofSpaces(
      'Discount',
      discount,
    );

    const numberOfSpaces3 = calculateNumberofSpaces('Chnage Amount', change);
    const numberOfSpaces4 = calculateNumberofSpaces('Discount', change);

    const spaces2 = generateSpaces(numberOfSpaces2);
    const numberOfSpacesdiscountspaces = generateSpaces(numberOfSpacesdiscount);
    const spaces3 = generateSpaces(numberOfSpaces3);
    const spaces4 = generateSpaces(numberOfSpaces4);

    const ticketElements2 =
      'Collected Amount' +
      spaces2 +
      totalPrice +
      'Discount' +
      numberOfSpacesdiscountspaces +
      discount +
      'Chnage Amount' +
      spaces3 +
      change;

    // RNUSBPrinter.printText(ticketElements2);
    RNUSBPrinter.printText(
      ticketElements +
        '------------------------------------------------' +
        ticketElements2,
    );

    var total = '<CB>' + 'TOTAL :  ' + totalPrice + ' DA </CB>';

    RNUSBPrinter.printText(total);

    RNUSBPrinter.printBillTextWithCut(
      '------------------------------------------------' +
        dateFormated +
        generateSpaces(date.length - 9) +
        'Order id : #545454' +
        generateSpaces(29),
      // '------------------------------------------------',
    );

    // ***-*-*-*-* print the ticket :---------------------------------------------------------

    var productName = 'COCA COLA';

    var price = '161';

    if (productName.length > 20) {
      productName = productName.substring(0, 20) + '...';
    }

    const numberOfSpaces = calculateNumberofSpaces(productName, price);

    const spaces = generateSpaces(numberOfSpaces);

    const ItemFormated = productName + spaces + price;

    // RNUSBPrinter.printBillTextWithCut(
    //   ItemFormated + ItemFormated + ItemFormated,
    // );

    connectPrinter();
    // happyNewYear();

    // console.log('________________________________________________');
    // const productName = 'COCACO';
    // const productPrice = '300';

    // function calculateLeftSpace(name) {
    //   return 33 - name.length;
    // }

    // function generateSpaces(numberOfSpaces) {
    //   // for (let index = 0; index < numberOfSpaces; index++) {
    //   //   return '&nbsp';
    //   // }
    //   let spaces = ' ';

    //   for (let index = 0; index < numberOfSpaces; index++) {
    //     spaces = spaces + ' ';
    //   }
    //   return spaces;
    // }

    // let productArticle =
    //   productName.substring(0, 20) +
    //   '' +
    //   generateSpaces(calculateLeftSpace(productName.substring(0, 20))) +
    //   productPrice;

    // RNUSBPrinter.printBillTextWithCut('     ' + productArticle);
  }, []);

  const [textToPrint, settextToPrint] = useState('');

  /////////// const
  const mainColor = '#53CA83';
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        paddingTop: '3%',
      }}>
      {isConnected ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>
            Connected to : {devices[0].device_id}
          </Text>
        </View>
      ) : (
        <View>
          <View
            style={{
              // flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>Connect your printer usb</Text>
          </View>
        </View>
      )}

      <View
        style={{
          alignSelf: 'flex-end',
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isConnected ? (
          <View
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{width: 200, height: 200}}>
              <Image
                source={require('./assets/printer.png')}
                style={{width: 200, height: 200, padding: 10}}
              />
              <Image
                source={require('./assets/check.png')}
                style={{
                  width: 90,
                  height: 90,
                  position: 'absolute',
                  bottom: 20,
                  right: -50,
                }}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('./assets/usbcable.png')}
              style={{width: 250, height: 250, padding: 10}}
            />
            <ActivityIndicator
              color={mainColor}
              size={300}
              style={{position: 'absolute'}}
            />
          </View>
        )}
      </View>

      <View
        style={{
          backgroundColor: '#1e272e',
          height: '30%',
          borderTopLeftRadius: 80,
          borderTopRightRadius: 80,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 20,
          width: '100%',
        }}>
        {isConnected ? (
          <View style={{width: '60%', height: '50%'}}>
            <TextInput
              value={textToPrint}
              onChangeText={(value) => {
                settextToPrint(value);
              }}
              placeholder={'text to be printed'}
              placeholderTextColor={'#a4b0be'}
              style={{
                borderWidth: 0.5,
                borderColor: 'white',
                // paddingHorizontal: '20%',
                borderRadius: 10,
                marginVertical: '2%',
                color: 'white',
                padding: 20,
              }}
            />
            <View style={{flexDirection: 'row', marginBottom: 8}}>
              <CheckBox
                value={printDate}
                onValueChange={() => {
                  setprintDate(!printDate);
                }}
                style={{alignSelf: 'center'}}
              />
              <Text style={{margin: 8, color: 'grey'}}>
                print also current time and date ?
              </Text>
            </View>
          </View>
        ) : (
          <View />
        )}
        {/* <Home /> */}
        <TouchableOpacity
          onLongPress={() => {
            // happyNewYear();
            var randomQuoteIndex = 0;
            randomQuoteIndex = Math.floor(Math.random() * Math.floor(102));
            var randomQuote = Data.quotes[randomQuoteIndex];
            RNUSBPrinter.printBillTextWithCut(
              randomQuote.quote + ' - ' + randomQuote.author,
            );
          }}
          onPress={() => {
            if (isConnected) {
              //print
              if (printDate) {
                var newLane = '                                               ';
                var date = moment().format('DD/MMMMM/YYYY, hh:mm:ss');
                RNUSBPrinter.printBillTextWithCut(
                  textToPrint + newLane + newLane + date,
                );
              } else {
                RNUSBPrinter.printBillTextWithCut(textToPrint);
              }
            } else {
              connectPrinter();
            }
          }}
          style={{
            backgroundColor: mainColor,

            borderRadius: 20,
            height: 50,
            width: 150,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isConnected ? (
            <Text style={{color: 'white'}}>PRINT</Text>
          ) : (
            <Text style={{color: 'white'}}>Connect</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
