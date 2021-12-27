import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";

function AboutIcon() {
  return (
    <div className="about-link">
      <Link
        to={{
          pathname: "/about",
          search: "?name=Hello",
          hash: "#hash",
        }}
      >
        <FaQuestion size={30} />
      </Link>
    </div>
  );
}

export default AboutIcon;
