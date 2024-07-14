import classes from "@/styles/Card.module.css";

export default function Card({ children, onClick = null, fullWidth = false }) {
  return (
    <div
      className={`${classes.container} ${onClick && classes.isButton} ${
        fullWidth && classes.fullWidth
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
