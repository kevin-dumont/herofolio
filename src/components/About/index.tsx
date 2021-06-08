import React, { useState } from 'react';

import { Warning } from '@/components/Design/Icons/Warning';
import Modal from '@/components/Modal';
import { AboutButton, Title, Content } from '@/components/About/styles';

const About = () => {
  const [showPopin, setShowPopin] = useState(false);

  return (
    <>
      <AboutButton
        aria-label="About"
        onClick={() => setShowPopin(true)}
        tabIndex={showPopin ? -1 : 0}
      >
        <Warning />
        <p>About</p>
      </AboutButton>

      <Modal show={showPopin} onEscapePress={() => setShowPopin(false)}>
        {({ CloseButton, Container }) => (
          <>
            <CloseButton
              onClick={() => setShowPopin(false)}
              size={4}
              ariaLabel="Close about modal"
            />
            <Container>
              <Title>The technical story of Herofolio</Title>
              <Content>
                <p>
                  I&apos;m looking for challenges. So, I wanted to follow some
                  rules during the conception :
                </p>
                <ul>
                  <li>
                    All illustrations (shapes, characters, icons,...) are PURE
                    CSS. Absolutely zero image, svg or font-icon was used.
                  </li>
                  <li>
                    Each illustration, taken seprately (for example, the hero),
                    are single HTML elements. It use mostly CSS gradients, and
                    pseudo-elements, before/after.
                  </li>
                  <li>
                    Elements are all animated with CSS transition property.
                  </li>
                  <li>
                    This website is developed with React and Typescript. No
                    videogame engine like PIXI was used. You can see the
                    codebase{' '}
                    <a
                      href="https://github.com/sygmaa/herofolio"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>
                  </li>
                </ul>
              </Content>
            </Container>
          </>
        )}
      </Modal>
    </>
  );
};

export default About;
