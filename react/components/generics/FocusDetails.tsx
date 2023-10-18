import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Focus } from '../../model/focus';
import { Style } from '../../styles/StyleSheet';
import foci from '../../../assets/rules/wwnFoci.json';
import { useState } from 'react';

export default function FocusDetails(props: FocusDetailsProps): JSX.Element {
  const [focus] = useState<Focus | undefined>((foci as Focus[]).find(f => f.id === props.focus.id));

  return (
    <View style={Style.detailsBody}>
      {focus?.description ? <Text>{focus.description}</Text> : null}

      {focus?.lv1 ? (
        <View style={{ ...Style.rowFlex, gap: 6, alignItems: 'flex-start' }}>
          <Text style={{ ...Style.title, fontSize: 16 }}>Lvl-1</Text>
          <Text style={Style.f1}>{focus.lv1.description}</Text>
          {focus.lv1.perks?.map((p, i) => <Text key={`lv1-perk-${i}`}>{p.description}</Text>)}
        </View>
      ) : null}

      {focus?.lv2 ? (
        <View style={{ ...Style.rowFlex, gap: 6, alignItems: 'flex-start' }}>
          <Text style={{ ...Style.title, fontSize: 16 }}>Lvl-2</Text>
          <Text style={Style.f1}>{focus.lv2.description}</Text>
          {focus.lv2.perks?.map((p, i) => <Text key={`lv2-perk-${i}`}>{p.description}</Text>)}
        </View>
      ) : null}
    </View>
  );
}

export interface FocusDetailsProps {
  focus: Focus;
}
