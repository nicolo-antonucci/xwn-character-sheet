import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { CharacterClass } from '../../model/characterClass';
import { Style } from '../../styles/StyleSheet';
import ClassTable from './ClassTable';

export default function ClassCard(props: ClassCardProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const toggleChosen = () => props.onSelectionToggle(!props.chosen);

  return (
    <Card style={Style.detailsCard}>
      <Pressable style={Style.detailsCardHeader} onPress={toggleOpen}>
        <Text style={Style.detailsName}>{props.characterClass.name}</Text>
        {props.edit && (
          <Button
            icon={props.chosen ? 'check' : 'plus'}
            mode={props.chosen ? 'contained' : 'outlined'}
            onPress={toggleChosen}
          >
            {props.chosen ? 'CHOSEN' : 'CHOOSE'}
          </Button>
        )}
      </Pressable>
      {isOpen && <Divider />}
      {isOpen && (
        <View style={{ ...Style.colFlex, ...Style.detailsBody, width: '100%' }}>
          <ClassTable characterClass={props.characterClass} tableId={props.characterClass.id.toString()} />

          {props.characterClass.perks?.map((p, i) => (
            <View key={`perk-${props.characterClass.name}-${i}`} style={{ ...Style.colFlex, gap: 6 }}>
              <Text style={{ ...Style.title, fontSize: 20 }}>{p.name}</Text>
              <Text>{p.description}</Text>
            </View>
          ))}

          {props.characterClass.levelOneFoci?.map((f, i) => (
            <View key={`focus-${props.characterClass.name}-${i}`} style={Style.colFlex}>
              <View style={Style.rowFlex}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Bonus focus type:</Text>
                <Text style={{ fontSize: 20 }}>{f}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}

export interface ClassCardProps {
  characterClass: CharacterClass;
  edit: boolean;
  chosen: boolean;
  onSelectionToggle: (value: boolean) => void;
}
