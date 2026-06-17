import type React from "react";

interface FoldersIconProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const FoldersIcon = ({
  width = 28,
  height = 28,
  stroke = "currentColor",
  strokeWidth = 2,
  ...rest
}: FoldersIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="folder"
    viewBox="0 0 256 256"
    width={width}
    height={height}
    stroke={stroke}
    strokeWidth={strokeWidth}
    {...rest}
  >
    <path
      // fill="#e5b765"
      className="fill-cerulean"
      d="M202.1 212.2H27.6c-8.1 0-14.6-6.5-14.6-14.6V57.9c0-8.1 6.5-14.6 14.6-14.6h49.6c9.3 0 17.4 6.4 19.5 15.6l2.7 11.8c.7 3.2 3.6 5.5 6.9 5.5H202c8.1 0 14.6 6.5 14.6 14.6v106.9c.1 8-6.5 14.5-14.5 14.5"
    ></path>
    <path
      // fill="#ffcf83"
      className="fill-fresh-sky"
      d="M233.4 94H53.9c-6.7 0-13.3 4.7-14.9 10.6l-25.7 97.5c-1.5 5.8 2.6 10.6 9.3 10.6h179.5c6.7 0 13.3-4.7 14.9-10.6l25.7-97.5c1.5-5.8-2.6-10.6-9.3-10.6"
    ></path>
  </svg>
);

export default FoldersIcon;
