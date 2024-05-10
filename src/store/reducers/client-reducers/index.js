import { combineReducers } from 'redux';
import ProfileReducers from './profile';
import PublishJobReducers from './publishJob';
import DashboardReducers from './client-dashboard';
import ChatReducers from './chat';
import ContractReducers from './contract';
import PaymentReducers from './Payment';
import FeedsReducers from './feeds';
import ReportReducers from './report';
import SupportReducers from './support';
import TalentReducers from './talentDetails';

const appReducer = combineReducers({
    ProfileReducers,
    PublishJobReducers,
    DashboardReducers,
    ChatReducers,
    ContractReducers,
    PaymentReducers,
    FeedsReducers,
    ReportReducers,
    SupportReducers,
    TalentReducers
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = {};
    }
    return appReducer(state, action);
};

export default rootReducer;