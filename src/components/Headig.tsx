import { ReactElement } from "react";
type HeadingProps = { title: string };

const Headig = ({ title }: HeadingProps): ReactElement => {
  return <div>{title}</div>;
};

export default Headig;
