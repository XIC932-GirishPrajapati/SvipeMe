import {ISCANDIDATE} from '../action/candidateorrecruiter';

const initailValue = {
  isCandidate: true,
};

export default (state = initailValue, action) => {
  console.log(action, 'CANDIDATE');
  switch (action.type) {
    case ISCANDIDATE:
      return {
        isCandidate:action.isCandidate
      }
      
    default:
      return state;
  }
};
