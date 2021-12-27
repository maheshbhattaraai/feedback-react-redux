import {createSlice} from "@reduxjs/toolkit";
import datas from '../../data/feedback';


const initialState = {
    data: datas,
    edit: {},
    editMode: false,
}
export const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        addFeedback: (state, action) => {
            state.data.push(action.payload);
        },
        removeFeedBack: (state, action) => {
            state.data = state.data.filter((item) => item.id != action.payload);
        },
        editFeedBack: (state, action) => {
            state.edit = action.payload;
            state.editMode = true;
        },
        updateFeedBack: (state, action) => {

            state.data = state.data.map(item => {
                return item.id == action.payload.id ? action.payload.item : item
            });
            state.edit = {};
            state.editMode = false;
        },
        getFeedBack: (state) => {
            state.data = state.data;
        }
    }
});
export const {addFeedback, removeFeedBack, getFeedBack, editFeedBack, updateFeedBack} = feedbackSlice.actions
export default feedbackSlice.reducer