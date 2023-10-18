import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { ArcaneTradition, MagicProgressionTable } from '../../model/characterClass';
import { Style } from '../../styles/StyleSheet';

export default function MagicTable(props: MagicTableProps): JSX.Element {
  const basicTable = (
    <>
      <View style={Style.tableHeader}>
        <Text style={{ ...Style.magicTableHeaderTxt, borderRightWidth: 1, width: 48 }}>Level</Text>
        <Text style={{ ...Style.magicTableHeaderTxt, borderRightWidth: 1, width: 48 }}>Max{'\n'}Level</Text>
        <Text style={{ ...Style.magicTableHeaderTxt, borderRightWidth: 1, width: 72 }}>Spells{'\n'}Cast</Text>
        <Text style={{ ...Style.magicTableHeaderTxt, borderRightWidth: 1, width: 72 }}>Spells{'\n'}Prepared</Text>
        <Text style={{ ...Style.magicTableHeaderTxt, flex: 1 }}>Arts Gained</Text>
      </View>
      {(Array.from({ length: 10 }, (x, i) => i + 1) as (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10)[]).map(level => (
        <View key={`${props.tradition}-${level}`} style={Style.tableRow}>
          <Text style={{ ...Style.magicTableRowTxt, borderRightWidth: 1, width: 48 }}>{level}</Text>
          <Text style={{ ...Style.magicTableRowTxt, borderRightWidth: 1, width: 48 }}>
            {props.table[level as keyof MagicProgressionTable].maxLevel}
          </Text>
          <Text style={{ ...Style.magicTableRowTxt, borderRightWidth: 1, width: 72 }}>
            {props.table[level as keyof MagicProgressionTable].spellsCast}
          </Text>
          <Text style={{ ...Style.magicTableRowTxt, borderRightWidth: 1, width: 72 }}>
            {props.table[level as keyof MagicProgressionTable].spellsPrepared}
          </Text>
          <Text style={{ ...Style.magicTableRowTxt, flex: 1 }}>
            {props.table[level as keyof MagicProgressionTable].basicArts
              ? props.table[level as keyof MagicProgressionTable].basicArts?.map(ba => `${ba.name}, `)
              : null}
            {props.table[level as keyof MagicProgressionTable].artsGained
              ? props.table[level as keyof MagicProgressionTable].artsGained
              : '-'}
          </Text>
        </View>
      ))}
    </>
  );

  const healerTable = (
    <>
      <View style={Style.tableHeader}>
        <Text style={{ ...Style.magicTableHeaderTxt, borderRightWidth: 1, width: 48 }}>Level</Text>
        <Text style={{ ...Style.magicTableHeaderTxt, flex: 1 }}>Arts Gained</Text>
      </View>

      {(Array.from({ length: 10 }, (x, i) => i + 1) as (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10)[]).map(level => (
        <View key={`${props.tradition}-${level}`} style={Style.tableRow}>
          <Text style={{ ...Style.magicTableRowTxt, borderRightWidth: 1, width: 48 }}>{level}</Text>
          <Text style={{ ...Style.magicTableRowTxt, flex: 1 }}>
            {props.table[level as keyof MagicProgressionTable].basicArts
              ? props.table[level as keyof MagicProgressionTable].basicArts?.map(ba => `${ba.name}, `)
              : null}
            {props.table[level as keyof MagicProgressionTable].artsGained ?? '-'}
          </Text>
        </View>
      ))}
    </>
  );

  const vowedTable = (
    <>
      <View style={Style.tableHeader}>
        <Text style={{ ...Style.magicTableHeaderTxt, borderRightWidth: 1, width: 48 }}>Level</Text>

        <Text style={{ ...Style.magicTableHeaderTxt, borderRightWidth: 1, width: 48 }}>
          Punch{'\n'}Hit{'\n'}Bonus
        </Text>
        <Text style={{ ...Style.magicTableHeaderTxt, borderRightWidth: 1, width: 54 }}>Punch{'\n'}Damage</Text>
        <Text style={{ ...Style.magicTableHeaderTxt, borderRightWidth: 1, width: 48 }}>Punch{'\n'}Shock</Text>
        <Text style={{ ...Style.magicTableHeaderTxt, flex: 1 }}>Arts Gained</Text>
      </View>
      {(Array.from({ length: 10 }, (x, i) => i + 1) as (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10)[]).map(level => (
        <View key={`${props.tradition}-${level}`} style={Style.tableRow}>
          <Text style={{ ...Style.magicTableRowTxt, borderRightWidth: 1, width: 48 }}>{level}</Text>
          <Text style={{ ...Style.magicTableRowTxt, borderRightWidth: 1, width: 48 }}>
            {props.table[level as keyof MagicProgressionTable].punchHitBonus}
          </Text>
          <Text style={{ ...Style.magicTableRowTxt, borderRightWidth: 1, width: 54 }}>
            {props.table[level as keyof MagicProgressionTable].punchDamage}
          </Text>
          <Text style={{ ...Style.magicTableRowTxt, borderRightWidth: 1, width: 48 }}>
            {`${props.table[level as keyof MagicProgressionTable].punchShock?.damage}/${props.table[
              level as keyof MagicProgressionTable
            ].punchShock?.ac}`}
          </Text>
          <Text style={{ ...Style.magicTableRowTxt, flex: 1 }}>
            {props.table[level as keyof MagicProgressionTable].basicArts
              ? props.table[level as keyof MagicProgressionTable].basicArts?.map(ba => `${ba.name}, `)
              : null}
            {props.table[level as keyof MagicProgressionTable].artsGained ?? '-'}
          </Text>
        </View>
      ))}
    </>
  );

  return (
    <View style={{ ...Style.f1, width: '100%' }}>
      {![ArcaneTradition.HEALER, ArcaneTradition.VOWED].includes(props.tradition) ? basicTable : null}

      {props.tradition === ArcaneTradition.HEALER ? healerTable : null}

      {props.tradition === ArcaneTradition.VOWED ? vowedTable : null}
    </View>
  );
}

export interface MagicTableProps {
  tradition: ArcaneTradition;
  table: MagicProgressionTable;
  tableId: string;
}
