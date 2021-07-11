import React from 'react';

import { Loader } from '@components/Design/Loader';
import Flex from '@components/Flex';
import Modal from '@components/Modal';

interface GameLoaderProps {
  show: boolean;
}

const GameLoader = ({ show }: GameLoaderProps) => (
  <Modal disableStartAnimation show={show}>
    {({ Container }) => (
      <Container>
        <Flex direction="column" align="center" justify="center">
          <Loader />
        </Flex>
      </Container>
    )}
  </Modal>
);

export default GameLoader;
