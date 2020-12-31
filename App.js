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
        productName: 'COCA COLA',

        price: '161',
      },
      {
        productName: 'ifri',

        price: '25',
      },
      {
        productName: 'Mina choco',

        price: '250',
      },
      {
        productName: 'maxon',

        price: '55',
      },
      {
        productName: 'COCA COLA',

        price: '161',
      },
      {
        productName: 'ifri',

        price: '25',
      },
      {
        productName: 'Mina choco',

        price: '250',
      },
      {
        productName: 'maxon',

        price: '55',
      },
    ];

    var ticketElements = '';

    listofProducts.forEach((elm) => {
      var productName = elm.productName;

      var price = elm.price;

      if (productName.length > 20) {
        productName = productName.substring(0, 20) + '...';
      }

      const numberOfSpaces = calculateNumberofSpaces(productName, price);

      const spaces = generateSpaces(numberOfSpaces);

      const ItemFormated = productName + spaces + price + ' DZ';
      ticketElements = ticketElements + ItemFormated;
    });
    RNUSBPrinter.printBillTextWithCut(ticketElements);

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
      {/* <Text style={{color: 'white', fontWeight: 'bold'}}>
        ticket printer tester
      </Text> */}

      {/* <View style={{alignSelf: 'flex-end'}}>
        <TouchableOpacity
          onPress={() => {
            connectPrinter();
          }}>
          <View
            style={{
              height: 55,
              width: 55,
              backgroundColor: mainColor,
              borderRadius: 55 / 2,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 20,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 25}}>
              ⟳
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={{color: 'white'}}>Reconnect</Text>
      </View> */}

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
