import Card from "./shared/Card";
import PropTypes from "prop-types";
import { FaTimes, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFeedback, editFeedback } from "../slice/feedback/feedbackslice";

export default function FeedbackItem({ item, handleDelete }) {
  const dispatch = useDispatch();
  const removeItem = (id) => {
    if (window.confirm("Are you sure you want to delete the record?"))
      dispatch(removeFeedback(id));
  };
  const editItem = (item) => {
    dispatch(editFeedback(item.id));
  };
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close">
        <FaTimes color="purple" onClick={() => removeItem(item.id)} />
      </button>
      <button className="edit" onClick={() => editItem(item)}>
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}
FeedbackItem.propType = {
  item: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
