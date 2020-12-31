import React, {useEffect, useState} from 'react';
import moment from 'moment';

import {
  ActivityIndicator,
  Button,
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
  FormateOrderItems,
  formateStoreName,
  generateSpaces,
  listFooterFormated,
  totalPriceFormated,
  transactiondetailsFormated,
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
  var storeNAME = 'Superette Marwan';
  const collected = '1241 DA';
  var change = '210 DA';
  var discount = '250 DA';

  const ticketID = 'Order id : #64521';

  const adress = 'Mostaganem , cite bellevue 27000';

  const totalPrice = '4500';

  useEffect(() => {}, []);

  const [textToPrint, settextToPrint] = useState('');

  /////////// const
  const mainColor = '#53CA83';

  function printTicket(
    storeNAME,
    listofProducts,
    totalPrice,
    collected,
    change,
    discount,
    ticketID,
    adress,
  ) {
    RNUSBPrinter.printText(formateStoreName(storeNAME));
    RNUSBPrinter.printText(
      FormateOrderItems(listofProducts) +
        transactiondetailsFormated(collected, change, discount),
    );
    RNUSBPrinter.printText(totalPriceFormated(totalPrice));
    RNUSBPrinter.printBillTextWithCut(listFooterFormated(ticketID, adress));
  }
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
            <Button
              title={'print ticket'}
              onPress={() => {
                printTicket(
                  'STORE NAME',
                  listofProducts,
                  '2200',
                  '2500',
                  '300',
                  '00',
                  '93125',
                  'Mostaganem salamander cite bellvue',
                );
              }}
            />
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
