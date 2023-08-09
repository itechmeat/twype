import { FC } from "react";
import styles from "./Accomplishments.module.scss";

type AccomplishmentsProps = {
  data: [];
};

export const Accomplishments: FC<AccomplishmentsProps> = ({ data }) => {
  return <div className={styles.wrapper}>Accomplishments</div>;
};
