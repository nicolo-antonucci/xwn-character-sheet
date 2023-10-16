import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { BGChoiceBenefit } from '../../model/backgrounds';
import { SCORE } from '../../model/character';
import { RULESET } from '../../model/properties';
import { BASESKILLS, SWNSKILLS, SWNSkills, WWNSKILLS, WWNSkills } from '../../model/skills';
import { Style } from '../../styles/StyleSheet';
import { sortAbilityScores } from '../../commons/Utils';

export default function SetBGChoice(props: SetBGChoiceProps): JSX.Element {
  const isCombatChoice = () => props.choice === BGChoiceBenefit.ANY_COMBAT;

  const isSkillChoice = () => props.choice === BGChoiceBenefit.ANY_SKILL;

  const isScoreChoice = () => props.choice === BGChoiceBenefit.ANY_SCORE;

  const isMentalChoice = () => props.choice === BGChoiceBenefit.MENTAL;

  const isPhysicalChoice = () => props.choice === BGChoiceBenefit.PHYSICAL;

  return (
    <View style={Style.modal}>
      {(isCombatChoice() || isSkillChoice()) && <Text style={Style.title}>Choose a skill</Text>}
      {(isScoreChoice() || isMentalChoice() || isPhysicalChoice()) && (
        <Text style={Style.title}>Choose an ability score</Text>
      )}

      {isCombatChoice() && (
        <View style={Style.modalOptBtnContainer}>
          {[BASESKILLS.PUNCH, BASESKILLS.SHOOT, BASESKILLS.STAB].map(k => (
            <Button
              key={`select-cb-skill-${k}`}
              mode="contained-tonal"
              onPress={() => props.onChoice(k)}
              style={Style.optionBtn}
            >
              {k}
            </Button>
          ))}
        </View>
      )}

      {isSkillChoice() && props.ruleset === RULESET.SWN && (
        <View style={Style.modalOptBtnContainer}>
          {Object.values(SWNSkills)
            .sort((a, b) => (a > b ? 1 : -1))
            .map(k => (
              <Button
                key={`select-swn-skill-${k}`}
                mode="contained-tonal"
                onPress={() => props.onChoice(k)}
                style={Style.optionBtn}
              >
                {k}
              </Button>
            ))}
        </View>
      )}

      {isSkillChoice() && props.ruleset === RULESET.WWN && (
        <View style={Style.modalOptBtnContainer}>
          {Object.values(WWNSkills)
            .sort((a, b) => (a > b ? 1 : -1))
            .map(k => (
              <Button
                key={`select-wwn-skill-${k}`}
                mode="contained-tonal"
                onPress={() => props.onChoice(k)}
                style={Style.optionBtn}
              >
                {k}
              </Button>
            ))}
        </View>
      )}

      {isScoreChoice() && (
        <View style={Style.modalOptBtnContainer}>
          {Object.values(SCORE)
            .sort(sortAbilityScores)
            .map(k => (
              <Button
                key={`select-score-${k}`}
                mode="contained-tonal"
                onPress={() => props.onChoice(k)}
                style={Style.optionBtn}
              >
                {k.toUpperCase()}
              </Button>
            ))}
        </View>
      )}

      {isMentalChoice() && (
        <View style={Style.modalOptBtnContainer}>
          {[SCORE.INT, SCORE.WIS, SCORE.CHA].sort(sortAbilityScores).map(k => (
            <Button
              key={`select-mental-${k}`}
              mode="contained-tonal"
              onPress={() => props.onChoice(k)}
              style={Style.optionBtn}
            >
              {k.toUpperCase()}
            </Button>
          ))}
        </View>
      )}

      {isPhysicalChoice() && (
        <View style={Style.modalOptBtnContainer}>
          {[SCORE.STR, SCORE.DEX, SCORE.CON].sort(sortAbilityScores).map(k => (
            <Button
              key={`select-physical-${k}`}
              mode="contained-tonal"
              onPress={() => props.onChoice(k)}
              style={Style.optionBtn}
            >
              {k.toUpperCase()}
            </Button>
          ))}
        </View>
      )}
    </View>
  );
}

export interface SetBGChoiceProps {
  choice: BGChoiceBenefit | undefined;
  ruleset: RULESET | undefined;
  onChoice: (selected: SCORE | SWNSKILLS | WWNSKILLS) => void;
}
