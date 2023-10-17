import { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import traditions from '../../../assets/rules/wwnArcaneTraditions.json';
import { ArcaneTradition, ArcaneTraditionTable } from '../../model/characterClass';
import { Style } from '../../styles/StyleSheet';
import ExpandableCard from '../generics/ExpandableCard';

export default function SelectTradition(props: SelectTraditionProps): JSX.Element {
  const listItem = useCallback(
    ({ item }: { item: ArcaneTraditionTable }) => (
      <ExpandableCard
        chosen={props.selectedTradition === item.name}
        edit={true}
        element={item}
        type={'tradition'}
        onSelection={() => props.confirmHandler(item.name)}
      />
    ),
    [],
  );

  listItem.name;

  return (
    <View style={{ ...Style.modal, height: '90%' }}>
      <Text style={Style.title}>Select a focus</Text>
      <View style={Style.f1}>
        <FlatList
          contentContainerStyle={Style.flatGap}
          data={traditions as ArcaneTraditionTable[]}
          renderItem={listItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

export interface SelectTraditionProps {
  selectedTradition: ArcaneTradition | null | undefined;
  confirmHandler: (tradition: ArcaneTradition | undefined) => void;
  undoHandler: () => void;
}
