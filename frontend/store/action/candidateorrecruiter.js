export const ISCANDIDATE = 'ISCANDIDATE';

export const candidateorrecruiter = Candidate => {
  return async dispatch => {
    console.log(Candidate, 'CANDI');
    dispatch({
      type: ISCANDIDATE,
      isCandidate: Candidate,
    });
  };
};
