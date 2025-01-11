import React from "react";

const UIListCell = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="list-item" ref={ref}>
      <div className="title">title</div>
      <div className="check">x</div>
    </div>
  );
});

export default UIListCell;
