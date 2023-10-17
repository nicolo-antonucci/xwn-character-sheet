import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { CharacterClass } from '../../model/characterClass';
import { Style } from '../../styles/StyleSheet';

export default function ClassTable(props: ClassTableProps): JSX.Element {
  const getBab = (level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10) => props.characterClass.bab?.[level] ?? 0;

  return (
    <View style={{ ...Style.f1, width: '100%' }}>
      <View style={Style.tableHeader}>
        <Text style={{ ...Style.tableHeaderTxt, borderRightWidth: 1, width: 72 }}>Level</Text>
        <Text style={{ ...Style.tableHeaderTxt, borderRightWidth: 1, width: 72 }}>Hit Dice</Text>
        <Text style={{ ...Style.tableHeaderTxt, flex: 1 }}>Attack Bonus</Text>
      </View>
      {(Array.from({ length: 10 }, (x, i) => i + 1) as (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10)[]).map(level => (
        <View key={`${props.characterClass.name}-${level}`} style={Style.tableRow}>
          <Text style={{ ...Style.tableRowTxt, borderRightWidth: 1, width: 72 }}>{level}</Text>
          <Text style={{ ...Style.tableRowTxt, borderRightWidth: 1, width: 72 }}>{`${level}d6${
            props.characterClass.hitDiceModifier
              ? props.characterClass.hitDiceModifier > 0
                ? `+${props.characterClass.hitDiceModifier * level}`
                : props.characterClass.hitDiceModifier * level
              : ''
          }`}</Text>
          <Text style={{ ...Style.tableRowTxt, flex: 1 }}>
            {getBab(level) >= 0 ? '+' : '-'}
            {getBab(level)}
          </Text>
        </View>
      ))}
    </View>
  );
}

export interface ClassTableProps {
  characterClass: CharacterClass;
  tableId: string;
}
