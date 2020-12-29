import React, {useState} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RNUSBPrinter} from 'react-native-usb-printer';

export default function App() {
  const [textContent, settextContent] = useState('hello World');
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

  function printText(content) {
    RNUSBPrinter.printBillTextWithCut(content);
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        style={{borderWidth: 1, paddingHorizontal: 200, paddingVertical: 10}}
        placeholder={'text to be printed ! '}
        onChangeText={(v) => {
          settextContent(v);
        }}
        onSubmitEditing={() => {
          printText(textContent);
        }}
      />

      <View style={{alignSelf: 'flex-end', marginRight: 20}}>
        <TouchableOpacity onPress={() => connectPrinter()}>
          <Text style={{color: 'grey'}}>connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// npm install react-native-usb-printer --save
