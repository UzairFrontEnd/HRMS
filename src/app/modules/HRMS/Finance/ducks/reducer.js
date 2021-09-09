import * as action_types from './constant';
const initialState = {
  tabClose: false,
  overallFinanceData: [],
};
export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.CHANGE_TAB:
      return { ...state, tabClose: data };
    case action_types.OVERALL_FINANCE:
      return { ...state, overallFinanceData: data };
    default:
      return state;
  }
};
