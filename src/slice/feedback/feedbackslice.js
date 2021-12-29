import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import datas from '../../data/feedback';

export const getFeedBack = createAsyncThunk(
    'feedback/getGeedBack',
    async () => {
        let response = await fetch("/feedback?_sort=id&_order=desc");
        return response.json();
    }
)

export const addFeedback = createAsyncThunk(
    'feedback/addFeedback',
    async (data) => {
        return await fetch("/feedback", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'rating': data.rating, 'text': data.text})
        }).then(res => {
            return res.json();
        });
    }
);

export const editFeedback = createAsyncThunk(
    'feedback/editFeedback',
    async (data) => {
        let response = await fetch(`/feedback/${data}`);
        return response.json();
    }
)

export const updateFeedback = createAsyncThunk(
    'feedback/updateFeedback',
    async (data) => {
        let response = await fetch(`/feedback/${data.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        );

        return response.json();
    }
);

export const removeFeedback = createAsyncThunk(
    'feedback/removeFeedback',
    async (payload) => {
        let response = await fetch(`/feedback/${payload}`, {
            method: 'DELETE',
        });
        return payload;
    }
)

const initialState = {
    data: [],
    edit: {},
    editMode: false,
    getPending: false,
    submitLoading: false,
}
export const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
    },
    extraReducers: {
        [getFeedBack.pending]: (state, action) => {
            state.getPending = true;
        },
        [getFeedBack.fulfilled]: (state, action) => {
            state.data = action.payload
            state.getPending = false;
        },
        [getFeedBack.rejected]: (state, action) => {
            state.getPending = false;
            state.data = [];
        },
        [addFeedback.pending]: (state) => {
            state.submitLoading = true;
        },
        [addFeedback.fulfilled]: (state, action) => {
            state.data = [action.payload].concat(state.data);
            state.submitLoading = false;
        },
        [addFeedback.rejected]: (state, action) => {
            state.submitLoading = false
        },
        [editFeedback.fulfilled]: (state, action) => {

            state.editMode = true;
            state.edit = action.payload;
        },
        [updateFeedback.pending]: (state) => {
            state.submitLoading = true;
        },
        [updateFeedback.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.submitLoading = false;
            state.edit = {};
            state.editMode = false;
            state.data = state.data.map((item) => item.id == action.payload.id ? action.payload : item);
        },
        [updateFeedback.rejected]: (state) => {
            state.submitLoading = false;
        },
        [removeFeedback.fulfilled]: (state, action) => {
            state.edit = null;
            state.editMode = false;
            state.data = state.data.filter((item) => item.id != action.payload);
        }
    }
});
// export const {removeFeedBack} = feedbackSlice.actions
export default feedbackSlice.reducer