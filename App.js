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

  var date = new Date().getDate();
  function printText(content) {
    if (content === 'ticket') {
      // print ticket modal  :

      //** There are following some formatted TAG that supports by this library.

      // “<M> … </M>”  – for Medium text.
      // <CM> … </CM> – center align and Medium text.
      // <C> …</C> – center alignment.
      // <B> …</B> for bold text.

      RNUSBPrinter.printText('STORE NAME');
      RNUSBPrinter.printText('OrderID 125666');
      RNUSBPrinter.printText('ilies ouldmenouer');
      RNUSBPrinter.printText('---------------------------------------------');
      RNUSBPrinter.printText('Coca-cola                    150ml 1 x 190 DA');
      RNUSBPrinter.printText('ifri                                1 x 30 DA');
      RNUSBPrinter.printText('---------------------------------------------');
      RNUSBPrinter.printText('Total                                  220 DA');
      RNUSBPrinter.printText('merci pour vos achats, à bientôt');
      RNUSBPrinter.printText('---------------------------------------------');
      RNUSBPrinter.printBillTextWithCut(date);
    } else {
      // print wht user write
      RNUSBPrinter.printBillTextWithCut(content);
    }
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

        <TouchableOpacity onPress={() => printText('ticket')}>
          <Text style={{color: 'green'}}>Print Ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// npm install react-native-usb-printer --save
