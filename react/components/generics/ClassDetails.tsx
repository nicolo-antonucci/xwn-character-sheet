import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { CharacterClass } from '../../model/characterClass';
import { Style } from '../../styles/StyleSheet';
import ClassTable from './ClassTable';

export default function ClassDetails(props: ClassDetailsProps): JSX.Element {
  return (
    <View style={Style.detailsBody}>
      <ClassTable characterClass={props.characterClass} tableId={props.characterClass.id.toString()} />

      {props.characterClass.name?.includes('Warrior') ? (
        <View style={Style.colFlex}>
          <View style={Style.rowFlex}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bonus focus:</Text>
            <Text style={{ fontSize: 16 }}>Any combat</Text>
          </View>
        </View>
      ) : null}

      {props.characterClass.name?.includes('Expert') ? (
        <View style={Style.colFlex}>
          <View style={Style.rowFlex}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bonus focus:</Text>
            <Text style={{ fontSize: 16 }}>Any Non-Combat</Text>
          </View>
        </View>
      ) : null}

      {props.characterClass.perks?.map((p, i) => (
        <View key={`perk-${props.characterClass.name}-${i}`} style={{ ...Style.colFlex, gap: 6 }}>
          <Text style={{ ...Style.title, fontSize: 18 }}>{p.name}</Text>
          <Text>{p.description}</Text>
        </View>
      ))}
    </View>
  );
}

export interface ClassDetailsProps {
  characterClass: CharacterClass;
}
