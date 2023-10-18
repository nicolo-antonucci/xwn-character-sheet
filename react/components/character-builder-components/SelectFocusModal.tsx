import { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import foci from '../../../assets/rules/wwnFoci.json';
import { Focus, FocusType } from '../../model/focus';
import { Style } from '../../styles/StyleSheet';
import ExpandableCard from '../generics/ExpandableCard';

export default function SelectFocusModal(props: SelectFocusModalProps): JSX.Element {
  const listItem = useCallback(
    ({ item }: { item: Focus }) => (
      <ExpandableCard
        chosen={props.selectedFocus === item.id}
        selectable={true}
        element={item}
        type={'focus'}
        onSelection={() => props.confirmHandler(item)}
      />
    ),
    [],
  );

  return (
    <View style={{ ...Style.modal, paddingHorizontal: 0 }}>
      <Text style={Style.title}>Select a focus</Text>
      <FlatList
        contentContainerStyle={Style.flatGap}
        data={(foci as Focus[]).filter(f => f.type === props.type)}
        renderItem={listItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export interface SelectFocusModalProps {
  type: FocusType;
  selectedFocus: number | null | undefined;
  confirmHandler: (focus: Focus) => void;
  undoHandler: () => void;
}
