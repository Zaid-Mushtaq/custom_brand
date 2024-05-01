import React from "react";

const Accordion = ({ activeKey, onToggle, children, dynamicClass }) => {
  return (
    <div className={dynamicClass}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          activeKey,
          onToggle,
        })
      )}
    </div>
  );
};

export default Accordion;
