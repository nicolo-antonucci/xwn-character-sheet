import { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import foci from '../../../assets/rules/wwnFoci.json';
import { Focus, FocusType } from '../../model/Focus';
import { Style } from '../../styles/StyleSheet';
import ExpandableCard from '../generics/ExpandableCard';

export default function SelectFocus(props: SelectFocusProps): JSX.Element {
  const listItem = useCallback(
    ({ item }: { item: Focus }) => (
      <ExpandableCard
        chosen={props.selectedFocus === item.id}
        edit={true}
        element={item}
        type={'focus'}
        onSelection={() => props.confirmHandler(item)}
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
          data={(foci as Focus[]).filter(f => f.type === props.type)}
          renderItem={listItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

export interface SelectFocusProps {
  type: FocusType;
  selectedFocus: number | null | undefined;
  confirmHandler: (focus: Focus) => void;
  undoHandler: () => void;
}
