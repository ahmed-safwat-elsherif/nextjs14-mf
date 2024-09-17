import React from "react";

type Props = Partial<{
  id: string;
  details: string;
}>;
const Test = (props: Props) => {
  return (
    <div>
      Test changed {props.id} - {props.details}
    </div>
  );
};

export default Test;
