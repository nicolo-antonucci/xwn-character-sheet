import { useContext } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { BASESKILLS, SKILL_CHOICE, SWNSKILLS, SWNSkills, WWNSKILLS, WWNSkills } from '../../model/skills';
import { BuilderContext } from '../../store/context/builder-context';
import { Style } from '../../styles/StyleSheet';
import { RULESET } from '../../model/properties';

export default function SelectSkill(props: SelectSkillProps): JSX.Element {
  const builderCtx = useContext(BuilderContext);

  return (
    <View style={Style.modal}>
      <Text style={Style.title}>Select a skill {props.type}</Text>

      {props.type === SKILL_CHOICE.ANY_COMBAT && (
        <View style={Style.modalOptBtnContainer}>
          {[BASESKILLS.PUNCH, BASESKILLS.SHOOT, BASESKILLS.STAB].map(k => (
            <Button
              key={`select-score-${k}`}
              mode="contained-tonal"
              onPress={() => props.confirmHandler(k)}
              style={Style.optionBtn}
            >
              {k}
            </Button>
          ))}
        </View>
      )}

      {builderCtx?.character.ruleset && props.type === SKILL_CHOICE.ANY_NON_COMBAT && (
        <View style={Style.modalOptBtnContainer}>
          {Object.values(builderCtx.character.ruleset === RULESET.SWN ? SWNSkills : WWNSkills)
            .filter(k => !([BASESKILLS.PUNCH, BASESKILLS.SHOOT, BASESKILLS.STAB] as string[]).includes(k))
            .map(k => (
              <Button
                key={`select-score-${k}`}
                mode="contained-tonal"
                onPress={() => props.confirmHandler(k)}
                style={Style.optionBtn}
              >
                {k}
              </Button>
            ))}
        </View>
      )}

      {builderCtx?.character.ruleset && props.type === SKILL_CHOICE.ANY_SKILL && (
        <View style={Style.modalOptBtnContainer}>
          {Object.values(builderCtx.character.ruleset === RULESET.SWN ? SWNSkills : WWNSkills).map(k => (
            <Button
              key={`select-score-${k}`}
              mode="contained-tonal"
              onPress={() => props.confirmHandler(k)}
              style={Style.optionBtn}
            >
              {k}
            </Button>
          ))}
        </View>
      )}

      <Button mode="contained" onPress={props.undoHandler}>
        Cancel
      </Button>
    </View>
  );
}

export interface SelectSkillProps {
  type: SKILL_CHOICE;
  confirmHandler: (skill: SWNSKILLS | WWNSKILLS) => void;
  undoHandler: () => void;
}
