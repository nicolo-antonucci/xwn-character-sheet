import { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ArcaneTradition } from '../../model/characterClass';
import { Style } from '../../styles/StyleSheet';
import ExpandableCard from '../generics/ExpandableCard';

export default function SelectTradition(props: SelectTraditionProps): JSX.Element {
  const listItem = useCallback(
    ({ item }: { item: ArcaneTradition }) => (
      <ExpandableCard
        chosen={props.selectedTradition === item}
        selectable={true}
        element={item}
        type={'tradition'}
        onSelection={() => props.confirmHandler(item)}
      />
    ),
    [],
  );

  return (
    <View style={{ ...Style.modal, height: '95%', paddingHorizontal: 0 }}>
      <Text style={Style.title}>Select a tradition</Text>
      <FlatList
        contentContainerStyle={Style.flatGap}
        data={Object.values(ArcaneTradition)}
        renderItem={listItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export interface SelectTraditionProps {
  selectedTradition: ArcaneTradition | null | undefined;
  confirmHandler: (tradition: ArcaneTradition | undefined) => void;
  undoHandler: () => void;
}
