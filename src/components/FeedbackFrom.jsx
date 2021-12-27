import { v4 as uidv4 } from "uuid";
import Card from "./shared/Card";
import { useState, useEffect } from "react";
import Button from "./shared/Button";
import RatingSelected from "./RatingSelected";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addFeedback, updateFeedBack } from "../slice/feedback/feedbackslice";

function FeedbackFrom({ handleAdd }) {
  const dispatch = useDispatch();
  const editMode = useSelector((state) => state.feedback.editMode);
  const edit = useSelector((state) => state.feedback.edit);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editMode) {
      setBtnDisabled(false);
      setRating(edit.rating);
      setText(edit.text);
    } else {
      setBtnDisabled(true);
    }
  }, [editMode]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setMessage("Text must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length > 10) {
      let newFeedback = {
        text,
        rating,
      };

      // dispatch(addFeedback(newFeedback));
      if (editMode)
        dispatch(updateFeedBack({ id: edit.id, item: newFeedback }));
      else {
        newFeedback.id = uidv4();
        dispatch(addFeedback(newFeedback));
      }
      // handleAdd(newFeedback);
      setText("");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelected select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Enter a review here"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}
FeedbackFrom.propTypes = {
  handleAdd: PropTypes.func.isRequired,
};
export default FeedbackFrom;
