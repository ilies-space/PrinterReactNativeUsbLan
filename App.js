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

export default function App() {
  const [devices, setdevices] = useState([]);
  const [isConnected, setisConnected] = useState(false);
  const [printDate, setprintDate] = useState(true);

  // happynew year
  function happyNewYear() {
    RNUSBPrinter.printBillTextWithCut(
      '<CM>                 Happy New Year !                 </CM>                from Neo Team                    01/01/2021, 00:00:00 ',
    );
  }
  // happynew year

  function connectPrinter() {
    console.log('connectPrinter');
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
    connectPrinter();
    // happyNewYear();
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
            <View
              style={{
                height: 55,
                width: 55,
                backgroundColor: 'black',
                borderRadius: 55 / 2,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 20,
              }}>
              <ActivityIndicator color={mainColor} />
            </View>
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
          <View>
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
            happyNewYear();
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
