"use client"
import React, { ReactNode, useState } from 'react';

type HoverLabelComponentProps = {
  children: ReactNode;
  label: string;
  tooltipLeft: string;
};

const HoverLabelComponent = ({
  children,
  label,
  tooltipLeft,
}: HoverLabelComponentProps) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onClick={() => setHovered(false)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {isHovered && (
        <span className={`absolute ${tooltipLeft} top-1/2 transform -translate-y-1/2 p-1 text-sm`}>
          {label}
        </span>
      )}
    </div>
  );
};

export default HoverLabelComponent;