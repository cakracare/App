import {Layout, Radio, Text} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {SoalProps} from '../Types/SoalProps';

const SoalCompo: React.FC<SoalProps> = ({
  text,
  checked,
  setChecked,
  selectedOption,
  setSelectedOption,
  keye,
}) => {
  console.log('checked', checked, keye);
  return (
    <View key={keye}>
      <Text>{text}</Text>
      <Radio checked={checked === false} onChange={() => setChecked(false)}>
        Tidak
      </Radio>
      <Radio checked={checked === true} onChange={() => setChecked(true)}>
        Ya
      </Radio>
      {checked === true && (
        <View style={{marginStart: 40}}>
          <Radio
            checked={selectedOption === '1-3 kali'}
            onChange={() => setSelectedOption('1-3 kali')}>
            1-3 kali
          </Radio>
          <Radio
            checked={selectedOption === '4-6 kali'}
            onChange={() => setSelectedOption('4-6 kali')}>
            4-6 kali
          </Radio>
          <Radio
            checked={selectedOption === 'Lebih dari 6 kali'}
            onChange={() => setSelectedOption('Lebih dari 6 kali')}>
            Lebih dari 6 kali
          </Radio>
        </View>
      )}
    </View>
  );
};

export default SoalCompo;
