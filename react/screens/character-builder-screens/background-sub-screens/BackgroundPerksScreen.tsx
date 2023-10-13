import { useContext } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import backgrounds from '../../../../assets/rules/backgrounds.json';
import ChooseBGPerks from '../../../components/character-builder-components/ChooseBGPerks';
import QuickBGPerks from '../../../components/character-builder-components/QuickBGPerks';
import { BGBenefitPickType, BGBenefitType, Background } from '../../../model/backgrounds';
import { BuilderContext } from '../../../store/context/builder-context';
import { Style } from '../../../styles/StyleSheet';
import RollBGPerks from '../../../components/character-builder-components/RollBGPerks';

export default function BackgroundPerksScreen(): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  const getBackground = () =>
    (backgrounds as Background[]).find(bg => bg.id === builderCtx?.character.characterBackground.background?.id);

  const getPickType = () => builderCtx?.character.characterBackground.benefitPickType;

  const setQuickPerks = () => {
    builderCtx?.setBackgroundPickType(BGBenefitPickType.QUICK);
    builderCtx?.setBackgroundPerks(
      getBackground()?.quickPicks?.map(qp => ({
        type: BGBenefitType.QUICK,
        value: qp,
      })) ?? [],
    );
  };

  return (
    <View style={{ ...Style.colFlex, paddingHorizontal: 12 }}>
      <Text>
        You can choose to gain your background's quick picks, choose twice from its Learning table or roll three times
        combined on its Growth and Learning tables.
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold' }}>Free Skill: </Text>
        <Text>{getBackground()?.freeSkill}</Text>
      </View>
      <View style={{ ...Style.rowFlex, flexWrap: 'wrap' }}>
        <Button
          icon="list"
          mode={getPickType() === BGBenefitPickType.QUICK ? 'contained' : 'contained-tonal'}
          onPress={setQuickPerks}
          style={Style.f1}
        >
          Quick
        </Button>
        <Button
          icon="check-circle"
          mode={getPickType() === BGBenefitPickType.CHOSEN ? 'contained' : 'contained-tonal'}
          onPress={() => builderCtx?.setBackgroundPickType(BGBenefitPickType.CHOSEN)}
          style={Style.f1}
        >
          Choose
        </Button>
        <Button
          icon="dice"
          mode={getPickType() === BGBenefitPickType.ROLLED ? 'contained' : 'contained-tonal'}
          onPress={() => builderCtx?.setBackgroundPickType(BGBenefitPickType.ROLLED)}
          style={Style.f1}
        >
          Roll
        </Button>
      </View>
      {getPickType() === BGBenefitPickType.QUICK && <QuickBGPerks />}

      {getPickType() === BGBenefitPickType.CHOSEN && <ChooseBGPerks />}

      {getPickType() === BGBenefitPickType.ROLLED && <RollBGPerks />}
    </View>
  );
}
