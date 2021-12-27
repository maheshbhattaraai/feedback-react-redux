import { Link } from "react-router-dom";
import Card from "../components/shared/Card";

function AboutPage() {
  return (
    <Card>
      <div className="container">
        <h4>This is about page</h4>
        <Link to="/">Back To Home</Link>
      </div>
    </Card>
  );
}

export default AboutPage;
