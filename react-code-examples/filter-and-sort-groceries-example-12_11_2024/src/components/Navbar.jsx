import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/groceries">Groceries</Link>
    </nav>
  );
}
