import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function FeedbackStats({ feedback }) {
  const feedbackList = useSelector((state) => state.feedback);
  let average =
    feedbackList.data.reduce((acc, item) => acc + item.rating, 0) /
    feedbackList.data.length;
  average = average.toFixed(1).replace(/[.,]0$/, "");
  return (
    <div className="feedback-stats">
      <h4>{feedbackList.data.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  );
}
FeedbackStats.propTypes = {
  feedback: PropTypes.array,
};

export default FeedbackStats;
