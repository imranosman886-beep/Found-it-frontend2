
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h2>FoundIt</h2>
          <p>Helping lost belongings find their way home.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/items">Browse Items</Link>
          <Link to="/report-lost">Report Lost</Link>
          <Link to="/report-found">Report Found</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FoundIt. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
