import React, { useState } from 'react';
import { Text } from 'react-native';
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';

interface GenderSelectProps {
    onGenderChange: (gender: 'male' | 'female') => void;
}

const GenderSelect: React.FC<GenderSelectProps> = ({ onGenderChange }) => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));

    const handleSelect = (index: IndexPath) => {
        setSelectedIndex(index);
        const gender = index.row === 1 ? 'male' : 'female';
        onGenderChange(gender);
    };

    let gender
    switch (selectedIndex.row) {
        case 0:
            gender = 'Pilih Gender'
            break
        case 1:
            gender = 'Laki - Laki'
            break
        case 2:
            gender= 'Perempuan'
            break
        default:
            gender='Pilih Gender'
    }

    return (
        <Select
            label={() => (
                <Text style={{ marginStart: 10, marginTop: 10, color: 'grey', paddingVertical: 5 }}>
                    Gender
                </Text>
            )}
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
            value={gender}
            style={{ width: '100%',marginBottom: 10 }}
        >
            <SelectItem title="Pilih gender" />
            <SelectItem title="Laki-laki" />
            <SelectItem title="Perempuan" />
        </Select>
    );
};

export default GenderSelect;
