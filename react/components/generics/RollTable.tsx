import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Style } from '../../styles/StyleSheet';

export default function RollTable(props: RollTableProps): JSX.Element {
  return (
    <View style={Style.f1}>
      <View style={Style.tableHeader}>
        <Text style={{ ...Style.tableHeaderTxt, borderRightWidth: 1, width: 36 }}>
          d{Math.ceil(props.elements.reduce((prev, curr) => prev + curr.weight, 0))}
        </Text>
        <Text style={Style.tableHeaderTxt}>{props.title ?? ''}</Text>
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
          <View key={`${props.tableId}-${i}`} style={Style.tableRow}>
            <Text style={{ ...Style.tableRowTxt, borderRightWidth: 1, width: 36 }}>
              {el.result ?? `${el.min}-${el.max}`}
            </Text>
            <Text style={Style.tableRowTxt}>{el.label ?? ''}</Text>
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
