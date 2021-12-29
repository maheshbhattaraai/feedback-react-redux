import FeedbackItem from "./FeedbackItem";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Spinner from "./shared/Spinner";

function FeedbackList({ feedback, handleDelete }) {
  const result = useSelector((state) => state.feedback);
  if (result.getPending) {
    return <Spinner />;
  }
  if ((!result.getPending && !result.data) || result.data.length === 0) {
    return <p>No Feedback yet</p>;
  }

  return (
    <div className="feedback-list">
      <AnimatePresence>
        {result.data.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem
              key={item.id}
              item={item}
              handleDelete={handleDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
FeedbackList.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ),
};

export default FeedbackList;
