import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { Focus } from '../../model/Focus';
import { Style } from '../../styles/StyleSheet';

export default function FocusCard(props: FocusCardProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const toggleChosen = () => props.onSelectionToggle(!props.chosen);

  return (
    <Card style={Style.detailsCard}>
      <Pressable style={Style.detailsCardHeader} onPress={toggleOpen}>
        <Text style={Style.detailsName}>{props.focus.name}</Text>
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
          {props.focus.description && <Text>{props.focus.description}</Text>}

          {props.focus.lv1 && (
            <View style={{ ...Style.rowFlex, gap: 6 }}>
              <Text style={{ ...Style.title, fontSize: 20 }}>Lvl-1</Text>
              <Text>{props.focus.lv1.description}</Text>
            </View>
          )}

          {props.focus.lv2 && (
            <View style={{ ...Style.rowFlex, gap: 6 }}>
              <Text style={{ ...Style.title, fontSize: 20 }}>Lvl-2</Text>
              <Text>{props.focus.lv2.description}</Text>
            </View>
          )}
        </View>
      )}
    </Card>
  );
}

export interface FocusCardProps {
  focus: Focus;
  edit: boolean;
  chosen: boolean;
  onSelectionToggle: (value: boolean) => void;
}
