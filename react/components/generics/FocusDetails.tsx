import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Focus } from '../../model/Focus';
import { Style } from '../../styles/StyleSheet';

export default function FocusDetails(props: FocusDetailsProps): JSX.Element {
  return (
    <View style={Style.detailsBody}>
      {props.focus.description && <Text>{props.focus.description}</Text>}

      {props.focus.lv1 && (
        <View style={{ ...Style.rowFlex, gap: 6, alignItems: 'flex-start' }}>
          <Text style={{ ...Style.title, fontSize: 16 }}>Lvl-1</Text>
          <Text style={Style.f1}>{props.focus.lv1.description}</Text>
          {props.focus.lv1.perks?.map((p, i) => <Text key={`lv1-perk-${i}`}>{p.description}</Text>)}
        </View>
      )}

      {props.focus.lv2 && (
        <View style={{ ...Style.rowFlex, gap: 6, alignItems: 'flex-start' }}>
          <Text style={{ ...Style.title, fontSize: 16 }}>Lvl-2</Text>
          <Text style={Style.f1}>{props.focus.lv2.description}</Text>
          {props.focus.lv2.perks?.map((p, i) => <Text key={`lv2-perk-${i}`}>{p.description}</Text>)}
        </View>
      )}
    </View>
  );
}

export interface FocusDetailsProps {
  focus: Focus;
}
