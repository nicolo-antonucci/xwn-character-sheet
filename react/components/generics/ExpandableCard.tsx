import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { Focus } from '../../model/focus';
import { Background } from '../../model/backgrounds';
import { ArcaneTradition, CharacterClass } from '../../model/characterClass';
import { Style } from '../../styles/StyleSheet';
import ArcaneTraditionDetails from './ArcaneTraditionDetails';
import BackgroundDetails from './BackgroundDetails';
import ClassDetails from './ClassDetails';
import FocusDetails from './FocusDetails';

export default function ExpandableCard(props: ExpandableCardProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const getDetailsTemplate = () => {
    switch (props.type) {
      case 'bg':
        return <BackgroundDetails background={props.element as Background} />;
      case 'charClass':
        return <ClassDetails characterClass={props.element as CharacterClass} />;
      case 'focus':
        return <FocusDetails focus={props.element as Focus} />;
      case 'tradition':
        return <ArcaneTraditionDetails tradition={props.element as ArcaneTradition} />;
      default:
        return <></>;
    }
  };

  return (
    <Card style={Style.detailsCard}>
      <Pressable style={Style.detailsCardHeader} onPress={toggleOpen}>
        <Text style={Style.detailsName}>
          {props.type === 'tradition'
            ? (props.element as ArcaneTradition)
            : (props.element as Background | Focus | CharacterClass).name}
        </Text>
        {props.selectable ? (
          <Button mode={props.chosen ? 'contained' : 'outlined'} onPress={() => props.onSelection?.(props.element)}>
            {props.chosen ? 'CHOSEN' : 'CHOOSE'}
          </Button>
        ) : null}
      </Pressable>

      {isOpen ? (
        <View style={{ ...Style.colFlex, ...Style.detailsBody }}>
          {getDetailsTemplate()}
          <Button icon="chevron-up" onPress={() => setIsOpen(false)} style={{ margin: 0 }}>
            Collapse
          </Button>
        </View>
      ) : null}
    </Card>
  );
}

export interface ExpandableCardProps {
  element: Background | Focus | CharacterClass | ArcaneTradition;
  type: 'bg' | 'focus' | 'charClass' | 'tradition';
  selectable?: boolean;
  chosen?: boolean;
  onSelection?: (value: Background | Focus | CharacterClass | ArcaneTradition) => void;
}
