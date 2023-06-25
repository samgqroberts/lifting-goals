import './App.css';

import { array, is } from 'superstruct';

import { Bottom } from './Bottom';
import { Distances } from './Distances';
import { Inputs } from './Inputs';
import { Legend } from './Legend';
import {
  beginnerValuesFromNippard,
  computeThresholds,
  Goal,
  LiftSlice,
  maximums,
  minimums,
  NIPPARD_GOALS,
} from './Lifts';
import { Ratios } from './Ratios';
import { Sliders } from './Sliders';
import { useRequiredLocalStorage } from './useLocalStorage';
import { parseNumber, safeJSONParse } from './utils';

// all keys used to access data in localstorage
const LOCALSTORAGE_KEYS = {
  hasDismissedHelpModal: 'hasDismissedHelpModal',
  goals: 'goals',
  squat: 'squat',
  bp: 'bp',
  row: 'row',
  ohp: 'ohp',
  dl: 'dl',
} as const;

const deserializeGoals = (value: string): Goal[] | undefined => {
  const rawParsed = safeJSONParse(value);
  if (is(rawParsed, array(Goal))) {
    return rawParsed;
  }
  return undefined;
};

function App() {
  // on app load, check localstorage to see if this is the user's first visit
  // if so, show help modal
  const [hasDismissedHelpModal, setHasDismissedHelpModal] = useRequiredLocalStorage(
    LOCALSTORAGE_KEYS.hasDismissedHelpModal,
    false,
    [(raw) => (raw === 'true' ? true : raw === 'false' ? false : undefined), (parsed) => (parsed ? 'true' : 'false')],
  );
  // other app state that we persist in localstorage
  const [goals, setGoals] = useRequiredLocalStorage(LOCALSTORAGE_KEYS.goals, NIPPARD_GOALS, [
    deserializeGoals,
    JSON.stringify,
  ]);
  const bodyWeightInfo = useRequiredLocalStorage('bodyWeight', 190, [parseNumber, (value) => '' + value]);
  const [bodyWeight, setBodyWeight] = bodyWeightInfo;
  const [currentSquat, setCurrentSquat] = useRequiredLocalStorage(
    LOCALSTORAGE_KEYS.squat,
    beginnerValuesFromNippard.squat as number,
    [parseNumber, (value) => '' + value],
  );
  const [currentBp, setCurrentBp] = useRequiredLocalStorage(
    LOCALSTORAGE_KEYS.bp,
    beginnerValuesFromNippard.bp as number,
    [parseNumber, (value) => '' + value],
  );
  const [currentRow, setCurrentRow] = useRequiredLocalStorage(
    LOCALSTORAGE_KEYS.row,
    beginnerValuesFromNippard.row as number,
    [parseNumber, (value) => '' + value],
  );
  const [currentOhp, setCurrentOhp] = useRequiredLocalStorage(
    LOCALSTORAGE_KEYS.ohp,
    beginnerValuesFromNippard.ohp as number,
    [parseNumber, (value) => '' + value],
  );
  const [currentDl, setCurrentDl] = useRequiredLocalStorage(
    LOCALSTORAGE_KEYS.dl,
    beginnerValuesFromNippard.dl as number,
    [parseNumber, (value) => '' + value],
  );
  // derived state
  const thresholds = computeThresholds(goals, bodyWeight);
  const currentWeights: LiftSlice = {
    squat: currentSquat,
    bp: currentBp,
    row: currentRow,
    ohp: currentOhp,
    dl: currentDl,
  };
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontSize: 14,
          maxWidth: 1080,
          flexGrow: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            flexGrow: 1,
            paddingBottom: 10,
          }}
        >
          <Sliders {...{ thresholds, currentWeights }} />
          <Legend {...{ goals }} />
          <Distances {...{ currentWeights, thresholds }} />
          <Ratios bodyWeight={bodyWeight} weights={currentWeights} />
        </div>
        <h3 style={{ textAlign: 'center', margin: 0, marginTop: 10 }}>Current values</h3>
        <Inputs
          {...{
            minimums: minimums,
            maximums: maximums,
            asRatio: false,
            bodyWeightInfo,
            bodyWeight,
            currentSquat,
            currentBp,
            currentRow,
            currentOhp,
            currentDl,
            setBodyWeight,
            setCurrentSquat,
            setCurrentBp,
            setCurrentRow,
            setCurrentOhp,
            setCurrentDl,
          }}
        />
        <Bottom {...{ bodyWeight, goals, setGoals, hasDismissedHelpModal, setHasDismissedHelpModal }} />
      </div>
    </div>
  );
}

export default App;
