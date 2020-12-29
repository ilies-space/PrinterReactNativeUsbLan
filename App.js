import React from 'react';
import {Button, Text, View} from 'react-native';
import {RNUSBPrinter} from 'react-native-usb-printer';

export default function App() {
  function connectPrinter() {
    RNUSBPrinter.getUSBDeviceList().then((res) => {
      console.log({res});
      const devices = res;
      if (devices && devices.length > 0) {
        RNUSBPrinter.connectPrinter(
          devices[0].vendor_id,
          devices[0].product_id,
        ).then((res_) => {
          alert('succsefully connect to ' + JSON.stringify(devices[0]));
        });
      } else {
        alert('no printer found !! ');
      }
      return res;
    });
  }

  function printText() {
    RNUSBPrinter.printBillTextWithCut('<C>HELLO PRINTER</C>');
  }

  return (
    <View>
      <Text>APP</Text>

      <Button title={'connect printer'} onPress={() => connectPrinter()} />
      <Button
        title={'Test Printer'}
        onPress={() => {
          printText();
        }}
      />
    </View>
  );
}

// npm install react-native-usb-printer --save
