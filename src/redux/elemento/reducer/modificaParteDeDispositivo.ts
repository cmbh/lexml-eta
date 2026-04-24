import { State, StateType } from '../../state';

export const modificaParteDeDispositivo = (state: any, action: any): State => {
  const result = { ...state };
  result.ui = {
    events: [
      {
        stateType: StateType.ModificaParteDeDispositivo,
        action,
      },
    ],
  };
  return result;
};
