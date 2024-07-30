import { Layout, Radio, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { SoalProps } from '../Types/SoalProps';

const SoalCompo: React.FC<SoalProps> = ({
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
        <View>
            <Text>{text}</Text>
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
        </View>
    );
};

export default SoalCompo;
