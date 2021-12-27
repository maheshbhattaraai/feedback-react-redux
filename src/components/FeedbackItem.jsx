import Card from "./shared/Card";
import PropTypes from "prop-types";
import { FaTimes, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFeedBack, editFeedBack } from "../slice/feedback/feedbackslice";

export default function FeedbackItem({ item, handleDelete }) {
  const dispatch = useDispatch();
  const removeItem = (id) => {
    dispatch(removeFeedBack(id));
  };
  const editItem = (item) => {
    dispatch(editFeedBack(item));
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
