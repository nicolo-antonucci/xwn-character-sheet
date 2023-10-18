import { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ArcaneTradition } from '../../../model/characterClass';
import { Style } from '../../../styles/StyleSheet';
import ExpandableCard from '../../generics/ExpandableCard';

export default function SelectTraditionModal(props: SelectTraditionModalProps): JSX.Element {
  const isSelectable = (tradition: ArcaneTradition) => {
    if (props.traditionType === 'full')
      return [ArcaneTradition.ELEMENTALIST, ArcaneTradition.HIGH_MAGE, ArcaneTradition.NECROMANCER].includes(tradition);

    return true;
  };

  const listItem = useCallback(
    ({ item }: { item: ArcaneTradition }) => (
      <ExpandableCard
        chosen={props.selectedTradition === item}
        selectable={isSelectable(item)}
        element={item}
        type={'tradition'}
        onSelection={() => props.confirmHandler(item)}
      />
    ),
    [],
  );

  return (
    <View style={{ ...Style.modal, paddingHorizontal: 0 }}>
      <Text style={Style.title}>Select a tradition</Text>
      <FlatList
        contentContainerStyle={{ ...Style.flatGap, marginBottom: 18 }}
        data={Object.values(ArcaneTradition)}
        renderItem={listItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export interface SelectTraditionModalProps {
  selectedTradition: ArcaneTradition | null | undefined;
  traditionType: 'full' | 'partial';
  confirmHandler: (tradition: ArcaneTradition | undefined) => void;
  undoHandler: () => void;
}
