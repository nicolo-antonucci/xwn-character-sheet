import { AbilityScores } from '../../model/properties';

function RollAbilitiesSetup(props: RollAbilitiesSetupProps): JSX.Element {
  return <></>;
}

export default RollAbilitiesSetup;

export interface RollAbilitiesSetupProps {
  scores: AbilityScores;
  setupHandler: (scores: AbilityScores) => void;
}
