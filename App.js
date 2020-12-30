import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RNUSBPrinter} from 'react-native-usb-printer';

export default function App() {
  const [textContent, settextContent] = useState('hello World');
  const [isConnected, setisConnected] = useState(false);
  const [devices, setdevices] = useState('');

  function connectPrinter() {
    RNUSBPrinter.getUSBDeviceList().then((res) => {
      console.log({res});
      setdevices(res);
      if (devices && devices.length > 0) {
        RNUSBPrinter.connectPrinter(
          devices[0].vendor_id,
          devices[0].product_id,
        ).then((res_) => {
          alert('succsefully connect to ' + JSON.stringify(devices[0]));
          setisConnected(true);
        });
      } else {
        alert('no printer found !! ');
      }
      return res;
    });
  }

  function printText_(content) {
    var toPrint = content.toString();
    // RNUSBPrinter.printText(toPrint);
    RNUSBPrinter.printBillTextWithCut(toPrint);
    // RNUSBPrinter.printText(toPrint);
    // RNUSBPrinter.printText(toPrint);
    // RNUSBPrinter.printBillTextWithCut('<C>HELLO</C>');
    // RNUSBPrinter.printText('HOLA');
  }

  const space47 = '------------------------------------------------';
  const newLine = '                                                ';
  const itemExmple = 'ProductExmple                               19DA';
  const totalPrice = 'Total                                      999DA';
  // const space47 = 'aabbccddffaabbccddffaabbccddffaabbccddffaabbccdd';
  const storeName = 'NEO POS';
  var date = Date.now();

  useEffect(() => {
    console.log('Printing');
    if (false) {
      printText_('<CM>' + storeName + '</CM>');
      printText_(
        // storeName +
        // newLine +
        itemExmple +
          newLine +
          itemExmple +
          newLine +
          itemExmple +
          space47 +
          newLine +
          totalPrice +
          newLine +
          date,
      );
      // printText_(
      //   // storeName +
      //   newLine + itemExmple,
      // );
    }
    // printText_('HELLO WORLD !');
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Connection statu : </Text>
      {isConnected ? (
        <Text style={{color: 'green', fontWeight: 'bold', fontSize: 20}}>
          connected to:printer id " {devices[0].vendor_id} "
        </Text>
      ) : (
        <Text style={{color: 'red', fontWeight: 'bold', fontSize: 20}}>
          Not connected
        </Text>
      )}
      <TextInput
        style={{borderWidth: 1, paddingHorizontal: 200, paddingVertical: 10}}
        placeholder={'text to be printed ! '}
        onChangeText={(v) => {
          settextContent(v);
        }}
        onSubmitEditing={() => {
          printText_(textContent);
        }}
      />

      <View style={{alignSelf: 'flex-end', marginRight: 20}}>
        <TouchableOpacity onPress={() => connectPrinter()}>
          <Text style={{color: 'grey'}}>connect</Text>
        </TouchableOpacity>

        <Button
          title={'test'}
          onPress={() => {
            RNUSBPrinter.printBillTextWithCut('HELLO');
          }}
        />
      </View>
    </View>
  );
}

// npm install react-native-usb-printer --save
