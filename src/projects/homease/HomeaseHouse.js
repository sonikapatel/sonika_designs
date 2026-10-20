import React from "react";

/* The Homease house mark, drawing itself on a loop (Figma: Homease, node 107:5363,
   "Vector 1": path trim over 2s, ease-in-out to 94.1%, then hold).

   Figma exports the mark as an outlined (filled) shape, which a stroke-dash
   animation can't draw. So the exact outline is used as a mask, and a wide stroke
   along its centre line is the thing that animates: the reveal is clipped to the
   real shape, flared tail and angled eave included. The timing lives in index.css
   (.homease-house-line). */

const OUTLINE =
  "M21.2487 102.876C21.2487 110.34 21.2487 117.804 21.2487 125.268C21.9032 124.868 22.5577 124.706 23.2122 124.069C24.0848 123.219 24.9575 119.851 25.8302 119.47C27.3573 118.803 28.8845 118.071 30.4117 118.071C32.8115 118.071 35.2113 118.071 37.6112 118.071C38.702 118.071 39.7929 118.071 40.8837 118.071C69.9627 118.071 99.0417 118.071 128.121 118.071H132.119V114.072C132.119 102.148 132.119 90.2245 132.119 78.3007C132.119 65.6755 132.119 53.0503 132.119 40.4252V38.1788L130.201 37.0102C110.626 25.0864 91.0507 13.1626 71.4756 1.23884L69.4418 0L67.3838 1.19805C50.5789 10.9805 33.7741 20.7629 16.9693 30.5453C16.0265 31.0941 15.0838 31.6429 14.1411 32.1916C12.067 33.399 9.99303 34.6063 7.919 35.8136C6.59917 36.5819 5.27934 37.3502 3.9595 38.1185C3.20531 38.5576 2.45111 38.9966 1.69692 39.4356C1.1313 39.7649 0.565636 40.0942 0 40.4234C1.34112 42.7273 2.68224 45.0312 4.02336 47.335C4.589 47.0057 5.15466 46.6765 5.72028 46.3472C6.47447 45.9082 7.22867 45.4691 7.98286 45.0301C9.3027 44.2618 10.6225 43.4935 11.9424 42.7252C14.0164 41.5179 16.0904 40.3106 18.1644 39.1032C19.1072 38.5544 20.0499 38.0057 20.9926 37.4569C37.7975 27.6745 54.6023 17.892 71.4071 8.10962L67.3153 8.06883C86.8904 19.9926 106.465 31.9164 126.041 43.8402L124.122 40.4252C124.122 53.0503 124.122 65.6755 124.122 78.3007C124.122 90.2245 124.122 102.148 124.122 114.072L128.121 110.073C99.0417 110.073 69.9627 110.073 40.8837 110.073C39.7929 110.073 38.702 110.073 37.6112 110.073C35.2113 110.073 32.8115 110.073 30.4117 110.073C28.8845 110.073 27.3573 109.341 25.8302 108.674C24.9575 108.293 24.0848 104.925 23.2122 104.075C22.5577 103.438 21.9032 103.276 21.2487 102.876Z";

/* Centre line of the outline, in the vector's own direction (tail → eave). The
   trim reveals from the end, so the eave draws first and the tail last. 24 wide so
   it covers the tail's flare; the mask trims it to the real 8px line. */
const CENTRE_LINE = "M21 114.072 H128.12 V40.43 L69.39 4.65 L2.01 43.88";

export default function HomeaseHouse({ style }) {
  return (
    <svg
      className="homease-house"
      viewBox="0 0 132.119 125.268"
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask id="homease-house-shape" maskUnits="userSpaceOnUse" x="0" y="0" width="132.119" height="125.268">
          <path d={OUTLINE} fill="#fff" />
        </mask>
      </defs>
      <path
        className="homease-house-line"
        d={CENTRE_LINE}
        pathLength="1"
        fill="none"
        stroke="#D8845A"
        strokeWidth="24"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        mask="url(#homease-house-shape)"
      />
    </svg>
  );
}
