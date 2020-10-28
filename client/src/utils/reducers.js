// import actions
import {
    SAVE_FOOD_CAMP,
    SAVE_HOSPITAL,
    SAVE_STATISTIC,
    UPDATE_FOOD_CAMPS,
    UPDATE_HOSPITALS,
    UPDATE_STATISTICS,
    UPDATE_PROFILE
} from './actions';

const initialState = {
    statistics: [],
    foodCamps: [],
    hospitals: [],
    savedStatistics: [],
    savedFoodCamps: [],
    savedHospitals: [],
    userProfile: {}
};

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_STATISTIC:
            return {
                ...state,
                savedStatistics: [
                    ...state.savedStatistics,
                    action.statistic
                ]
            };
        case SAVE_FOOD_CAMP:
            return {
                ...state,
                savedFoodCamps: [
                    ...state.savedFoodCamps,
                    action.foodCamp
                ]
            }
        case SAVE_HOSPITAL:
            return {
                ...state,
                savedHospitals: [
                    ...state.savedHospitals,
                    action.hospital
                ]
            }
        case UPDATE_STATISTICS:
            return {
                ...state,
                statistics: action.statistics
            }
        case UPDATE_FOOD_CAMPS:
            return {
                ...state,
                foodCamps: action.foodCamps
            }
        case UPDATE_HOSPITALS:
            return {
                ...state,
                hospitals: action.hospitals
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                userProfile: action.newProfile
            }
    }
}

export default reducers;