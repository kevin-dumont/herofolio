import styled from "styled-components";

import { MEDIA } from "@/constants/constants";

export const AboutButton = styled.button`
  display: flex;
  align-content: center;
  justify-content: center;
  position: fixed;
  z-index: 20;
  bottom: 20px;
  padding: 10px 20px 10px 15px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  border: none;
  transition: box-shadow 0.3s ease;
  left: 15px;
  bottom: 15px;

  ${MEDIA.MAX_S} {
    bottom: inherit;
    top: 15px;
    padding: 10px 15px 10px 15px;
  }

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  }

  p {
    margin-left: 7px;
    line-height: 22px;

    ${MEDIA.MAX_S} {
      display: none;
    }
  }
`;

export const Title = styled.h3`
  font-size: 24px;
  text-transform: uppercase;
  margin: 20px 0 0 0;
  align-self: center;
  position: relative;
  z-index: 2;
  text-align: center;
  letter-spacing: 1px;
`;

export const Content = styled.div`
  margin-top: 40px;
  font-size: 16px;

  ul {
    list-style: none;
    margin: 20px 0 0 0;
    padding: 0;
  }

  li {
    padding: 0;
    padding-left: 20px;
    position: relative;

    &:before {
      transform-origin: right center;
      transform: rotate(45deg);
    }

    &:after {
      transform-origin: right center;
      transform: rotate(-45deg);
    }

    &:before,
    &:after {
      content: "";
      display: block;
      height: 1px;
      width: 10px;
      background-color: #306f8a;
      position: absolute;
      left: 0px;
      top: 12px;
    }

    &:not(:last-child) {
      padding-bottom: 20px;
    }
  }

  a {
    color: #044e6d;

    &:hover {
      text-decoration: none;
    }
  }
`;
