import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { Style } from '../../styles/StyleSheet';

export default function ClassCard(props: ClassCardProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const toggleChosen = () => props.onSelectionToggle(!props.chosen);

  return (
    <Card style={Style.bgCard}>
      <Pressable style={Style.bgCardHeader} onPress={toggleOpen}>
        <Text style={Style.bgName}>{props.class.name}</Text>
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
        <View style={Style.bgDetails}>
          <ClassTable class={props.class} />

          {props.class.perks.map((p, i) => (
            <View key={`perk-${props.class.name}-${i}`} style={Style.colFlex}>
              <Text style={Style.title}>{p.name}</Text>
              <Text>{p.description}</Text>
            </View>
          ))}

          {props.class.levelOneFoci.map((f, i) => (
            <View key={`focus-${props.class.name}-${i}`} style={Style.colFlex}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={Style.title}>Focus type:</Text>
                <Text>{f}</Text>
              </View>

              <Button>{}</Button>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}

export interface ClassCardProps {
  class: Class;
  edit: boolean;
  chosen: boolean;
  onSelectionToggle: (value: boolean) => void;
}
