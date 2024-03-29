import ModalContainer from './ModalContainer';
import styles from './ModalContainer.module.css';

interface ModalEditFolderProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFolderName: string;
}

const ModalEditContent = ({
  selectedFolderName,
}: {
  selectedFolderName: string;
}) => (
  <>
    <h2>폴더 이름 변경</h2>
    <input
      placeholder={selectedFolderName}
      className={styles.modalInput}></input>
    <button className={styles.blueButton}>변경하기</button>
  </>
);

const ModalEdit = ({
  isOpen,
  onClose,
  selectedFolderName,
}: ModalEditFolderProps) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <ModalEditContent selectedFolderName={selectedFolderName} />
    </ModalContainer>
  );
};
export default ModalEdit;
