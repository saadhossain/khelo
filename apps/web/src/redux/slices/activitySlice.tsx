import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../api/userApi";
import { UserActivityType } from '../../types/UserActivityType';
import { MdPendingActions } from 'react-icons/md';

interface ActivitySlice {
    usersActivity: UserActivityType[];
    userFilteredActivity:UserActivityType[]
}
const initialState = {
    usersActivity: [],
    userFilteredActivity:[]
} as ActivitySlice;

export const activitySlice = createSlice({
    name: "userActivity",
    initialState,
    reducers: {
        filterActivity: (state, actions) => {
            if(actions.payload === 'all'){
                state.userFilteredActivity = state.usersActivity;
            }else{
                state.userFilteredActivity = state.usersActivity.filter(activity => activity.action === actions.payload)
            }
          }
    },
    extraReducers(builder) {
        builder.addMatcher(
            userApi.endpoints.getUsersActivity.matchFulfilled,
            (state, { payload }) => {
                if (state.usersActivity.length === 1) {
                    state.usersActivity = [...payload];
                    state.userFilteredActivity = [...payload];
                } else {
                    state.usersActivity = [...payload];
                    state.userFilteredActivity = [...payload];
                }
            }
        );
    },
});
export const {filterActivity} = activitySlice.actions;

export default activitySlice.reducer;
