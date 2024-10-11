import * as React from "react";
import { SVGProps } from "react";

const GhostSvg = ({ width = 10, height = 10, fill = "#921516", ...props }: SVGProps<SVGSVGElement> & { width?: number, height?: number, fill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M2 6a6 6 0 1 1 12 0v10h-2l-2-2-2 2-2-2-2 2H2V6Zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      clipRule="evenodd"
    />
  </svg>
);

export default GhostSvg;
