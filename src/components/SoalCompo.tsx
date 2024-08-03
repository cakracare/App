import {Card, Layout, Radio, Text} from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { SoalProps } from '../Types/SoalProps';
import styles from "react-native-webview/lib/WebView.styles";

const SoalCompo: React.FC<SoalProps> = ({
/*
  text,
  checked,
  setChecked,
  selectedOption,
  setSelectedOption,
}) => {
  console.log('checked', checked);
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          marginStart: 10,
          padding: 2,
          marginTop: 10,
        }}>
        {text}
      </Text>
      <Radio
        style={{
          marginStart: 10,
          padding: 2,
          marginTop: 10,
        }}
        checked={checked === false}
        onChange={() => setChecked(false)}>
        Tidak
      </Radio>
      <Radio
        style={{
          marginStart: 10,
          padding: 2,
          marginTop: 10,
        }}
        checked={checked === true}
        onChange={() => setChecked(true)}>
        Ya
      </Radio>
      {checked === true && (
        <View style={{marginStart: 40}}>
          <Radio
            style={{
              marginStart: 10,
              padding: 2,
              marginTop: 10,
            }}
            checked={selectedOption === '1-3 kali'}
            onChange={() => setSelectedOption('1-3 kali')}>
            1-3 kali
          </Radio>
          <Radio
            style={{
              marginStart: 10,
              padding: 2,
              marginTop: 10,
            }}
            checked={selectedOption === '4-6 kali'}
            onChange={() => setSelectedOption('4-6 kali')}>
            4-6 kali
          </Radio>
          <Radio
            style={{
              marginStart: 10,
              padding: 2,
              marginTop: 10,
            }}
            checked={selectedOption === 'Lebih dari 6 kali'}
            onChange={() => setSelectedOption('Lebih dari 6 kali')}>
            Lebih dari 6 kali
          </Radio>
*/
                                            text,
                                            checked,
                                            setChecked,
                                            selectedOption,
                                            setSelectedOption,
                                        }) => {
    const options = [
        { label: '1-3 kali', value: 1 },
        { label: '4-6 kali', value: 2 },
        { label: 'Lebih dari 6 kali', value: 3 },
    ];

    const handleCheckChange = (value: boolean) => {
        setChecked(value);
        if (!value) {
            setSelectedOption(0);
        }
    };

    return (
        <Card style={{marginBottom: 10}}>
            <Text>{text!}</Text>
            <Radio checked={!checked} onChange={() => handleCheckChange(false)}>
                Tidak
            </Radio>
            <Radio checked={!!checked} onChange={() => handleCheckChange(true)}>
                Ya
            </Radio>
            {checked && (
                <View style={{ marginStart: 40 }}>
                    {options.map(option => (
                        <Radio
                            key={option.value}
                            checked={selectedOption === option.value}
                            onChange={() => setSelectedOption(option.value)}
                        >
                            {option.label}
                        </Radio>
                    ))}
                </View>
            )}
        </Card>
    );
};

export default SoalCompo;
