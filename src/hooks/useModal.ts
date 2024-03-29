import { useState } from 'react';

interface ModalProps {
  showModal: boolean;
  handleOpenModal: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => void;
  handleCloseModal: () => void;
}

const useModal = (): ModalProps => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return {
    showModal,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useModal;
