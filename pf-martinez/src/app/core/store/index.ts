import { authReducer, featureNameAuth } from './auth/reducers';
import { featureNameProfile, profileReducer } from './profile/reducers/index';

export const appReducer = {
    [featureNameProfile]: profileReducer,
    [featureNameAuth]: authReducer
}