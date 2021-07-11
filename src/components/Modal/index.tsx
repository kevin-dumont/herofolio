import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import useKeyPress from '@hooks/useKeyPress';
import { Container, ModalBg } from '@components/Modal/styles';
import CloseButton from '@components/Modal/CloseButton';

export interface ChildrenParams {
  CloseButton: typeof CloseButton;
  Container: typeof Container;
}

export interface ModalProps {
  children: (params: ChildrenParams) => ReactNode;
  show: boolean;
  onEscapePress?: () => any;
  disableStartAnimation?: boolean;
  [k: string]: any;
}

const Modal = ({
  children,
  show,
  disableStartAnimation,
  onEscapePress,
  ...props
}: ModalProps) => {
  const [disappear, setDisappear] = useState(false);
  const [toBeVisible, setToBeVisible] = useState(false);

  const escapePressed = useKeyPress(['Escape']);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (show === true) {
      setToBeVisible(true);
      setDisappear(false);
    } else {
      setDisappear(true);
      timeout = setTimeout(() => setToBeVisible(false), 500);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [show]);

  useEffect(() => {
    if (escapePressed && onEscapePress) {
      onEscapePress();
    }
  }, [escapePressed]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    toBeVisible ? (
      <ModalBg
        disappear={disappear}
        animationDisabled={disableStartAnimation}
        {...props}
      >
        {children({ CloseButton, Container })}
      </ModalBg>
    ) : (
      <></>
    ),
    document.body
  );
};

export default Modal;
