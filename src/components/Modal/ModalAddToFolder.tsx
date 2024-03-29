import ModalContainer from './ModalContainer';
import useFolderList from '../../hooks/useFolderList';
import { useState } from 'react';
import checkIcon from 'assets/check.svg';
import styles from './ModalAddToFolder.module.css';
import Image from 'next/image';

interface Link {
  count: number;
}

interface FolderList {
  id: number;
  name: string;
  link: Link;
}
interface ModalAddToFolderContentProps {
  url: string;
  folderList: FolderList[];
  selectedFolder: number;
  handleFolderChange: (folderId: number) => void;
  handleAddToFolder: () => void;
}

const ModalAddToFolderContent = ({
  url,
  folderList,
  selectedFolder,
  handleFolderChange,
  handleAddToFolder,
}: ModalAddToFolderContentProps) => (
  <>
    <h2>폴더에 추가</h2>
    <p>{url}</p>
    <div className={styles.folderOptionsContainer}>
      {folderList.map((folder) => (
        <div
          key={folder.id}
          className={`${styles.folderOption} ${
            selectedFolder === folder.id ? `${styles.selectedFolder}` : ''
          }`}
          onClick={() => handleFolderChange(folder.id)}>
          <h4>{folder.name}</h4>
          <p>{folder.link.count}개 링크</p>
          {selectedFolder === folder.id ? (
            <Image src={checkIcon} alt='check' className={styles.checkIcon} />
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
    <button className={styles.blueButton} onClick={handleAddToFolder}>
      추가하기
    </button>
  </>
);

interface ModalAddToFolderProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const ModalAddToFolder = ({ isOpen, onClose, url }: ModalAddToFolderProps) => {
  const folderList = useFolderList();
  const [selectedFolder, setSelectedFolder] = useState<number>(0);
  const handleFolderChange = (folderId: number) => {
    setSelectedFolder(folderId);
  };
  const handleAddToFolder = () => {
    //implement add to folder logic later
    onClose();
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <ModalAddToFolderContent
        url={url}
        folderList={folderList}
        selectedFolder={selectedFolder}
        handleFolderChange={handleFolderChange}
        handleAddToFolder={handleAddToFolder}
      />
    </ModalContainer>
  );
};

export default ModalAddToFolder;
