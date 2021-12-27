import {configureStore} from '@reduxjs/toolkit';
import feedbackReducer from '../slice/feedback/feedbackslice';


const store = configureStore({
    reducer: {
        feedback: feedbackReducer,
    }
})
export default store