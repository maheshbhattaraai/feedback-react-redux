import React from 'react'
import FeedBackList from './components/FeedbackList'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import datas from './data/feedback';
import FeedbackStats from './components/FeedbackStats';
import FeedbackFrom from './components/FeedbackFrom';
import AboutPage from './pages/AboutPage'
import AboutIcon from './components/AboutIcon'
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react';

export default function App() {

    const dispatch = useDispatch();
    const [feedback, setFeedback] = useState(datas);
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    }
    const handleAdd = (newFeedback) => {
        setFeedback([newFeedback, ...feedback]);
    }
    return (
        <Router>
            <div className='container'>
                <Header />
                <Routes>
                    <Route exact path="/" element={
                        <>
                            <h1>Hello from App Component</h1>
                            <FeedbackFrom handleAdd={handleAdd} />
                            <FeedbackStats feedback={feedback} />
                            <FeedBackList feedback={feedback} handleDelete={handleDelete} />
                        </>
                    }>
                    </Route>
                    <Route exact path="/about" element={<AboutPage />}></Route>
                </Routes>
                <AboutIcon />

            </div>
        </Router >
    )
}
