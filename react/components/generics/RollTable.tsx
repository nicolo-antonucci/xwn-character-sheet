import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { Style } from '../../styles/StyleSheet';
import { Theme } from '../../styles/Theme';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Theme.colors.primaryContainer,
    borderWidth: 1,
    borderColor: Theme.colors.onPrimaryContainer,
    flexDirection: 'row',
  },
  headerTxt: {
    padding: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.onPrimaryContainer,
    borderColor: Theme.colors.onPrimaryContainer,
  },
  row: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: Theme.colors.onPrimaryContainer,
  },
  rowTxt: {
    padding: 6,
    fontSize: 12,
    borderColor: Theme.colors.onPrimaryContainer,
    textAlign: 'center',
  },
});

export default function RollTable(props: RollTableProps): JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={{ ...styles.headerTxt, borderRightWidth: 1, width: 36 }}>
          d{Math.ceil(props.elements.reduce((prev, curr) => prev + curr.weight, 0))}
        </Text>
        <Text style={styles.headerTxt}>{props.title ?? ''}</Text>
      </View>
      {props.elements
        .map((el, i, array) => {
          const res: { label: string; result?: number; min?: number; max?: number } = {
            label: el.label,
          };

          if (el.weight === 1) res.result = array.slice(0, i).reduce((prev, curr) => prev + curr.weight, 1);
          else {
            res.min = array.slice(0, i).reduce((prev, curr) => prev + curr.weight, 1);
            res.max = res.min + el.weight - 1;
          }

          return res;
        })
        .map((el, i) => (
          <View key={`${props.tableId}-${i}`} style={styles.row}>
            <Text style={{ ...styles.rowTxt, borderRightWidth: 1, width: 36 }}>
              {el.result ?? `${el.min}-${el.max}`}
            </Text>
            <Text style={styles.rowTxt}>{el.label ?? ''}</Text>
          </View>
        ))}
    </View>
  );
}

export interface RollTableProps {
  elements: {
    label: string;
    weight: number;
  }[];
  tableId: string;
  title?: string;
}
