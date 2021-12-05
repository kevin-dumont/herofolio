import Modal from '@components/Modal';
import { ModalRight } from '@containers/Profile/styles';

export type ModalProfileProps = {
  show: boolean;
  onClose: () => void;
};

const ModalProfile = ({ show, onClose }: ModalProfileProps) => (
  <Modal show={show} onEscapePress={onClose}>
    {({ CloseButton, Container }) => (
      <>
        <CloseButton
          onClick={onClose}
          size={4}
          ariaLabel="CLose profile modal"
        />
        <Container>
          <ModalRight>
            <h2>
              I&apos;m <strong>Kévin Dumont</strong>, a web artisan
            </h2>
            <p>
              I&apos;m creative. I create websites in their entirety. Design,
              development, deployment. So, we can say I&apos;m a full stack
              developer. I love challenges. I&apos;m a real passionate. I&apos;m
              100% self-taught, I&apos;m interested by the back-end web
              development since I was 14. Today, I prefer the front-end
              development because it&apos;s more sophisticated. I am still
              learning new technologies to stay up to date and improve my
              knowledge.
            </p>
          </ModalRight>
        </Container>
      </>
    )}
  </Modal>
);

export default ModalProfile;
