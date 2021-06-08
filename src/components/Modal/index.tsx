import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import useKeyPress from '@/hooks/useKeyPress';
import { Container, ModalBg } from '@/components/Modal/styles';
import CloseButton from '@/components/Modal/CloseButton';

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

const modalRoot = document.getElementById('modal-root') as Element;

const Modal = ({
  children,
  show,
  disableStartAnimation,
  onEscapePress,
  ...props
}: ModalProps) => {
  const el = document.createElement('div');

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

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, []);

  return createPortal(
    toBeVisible ? (
      <ModalBg
        disappear={disappear}
        animationDisabled={disableStartAnimation}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {children({ CloseButton, Container })}
      </ModalBg>
    ) : (
      <></>
    ),
    modalRoot
  );
};

export default Modal;
