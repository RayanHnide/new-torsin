import API from "../../helpers/api";

export function getTalentProposalStatus() {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_PROPOSAL_STATUS' });
        API.apiGet('talentproposalStatus')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_PROPOSAL_STATUS`, payload: response.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_PROPOSAL_STATUS`, payload: [] });
            });
    };
}