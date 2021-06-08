import { createGlobalStyle } from "styled-components";

import { FONTS } from "@/constants/constants";

export default createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${FONTS.DEFAULT};
    font-size: 1.6rem;
    min-width: 300px;
    user-select: none;
    touch-action: manipulation;
  }

  * {
    touch-action: manipulation;
  }
 
  p {
    margin: 0;
    padding: 0;
  }

  button {
    font-size: 1.6rem;
    font-family: ${FONTS.MONO};
    cursor: pointer;
  }

  h1, h2, h3, h4 {
    font-weight: bold;
    text-transform: uppercase;
  }
`;
