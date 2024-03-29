import useFolderList from '../../hooks/useFolderList';
import styles from './FolderList.module.css';
import CardList from '../CardList';
import { getFolderLinks, fetchFolderLinks } from '@/pages/api/api';
import { useState, useEffect } from 'react';
import UtilIcons from './UtilIcons';
import add from 'assets/add.svg';
import FolderButtons from './FolderButtons';
import useModal from '../../hooks/useModal';
import ModalAddFolder from '../Modal/ModalAddFolder';
import Image from 'next/image';

interface Item {
  title: string;
  createdAt: Date;
  created_at: Date;
  url: string;
  description: string;
  imageSource: string;
  image_source: string;
}

interface FolderListProps {
  searchQuery: string;
}

const FolderList = ({ searchQuery }: FolderListProps) => {
  const folderList = useFolderList();
  const [links, setLinks] = useState<Item[]>([]);
  const [selectedFolderName, setSelectedFolderName] = useState<string>('');
  const [selectedFolderId, setSelectedFolderId] = useState<number>(0);

  const { showModal, handleOpenModal, handleCloseModal } = useModal();

  const handleLoadAllLinksData = async () => {
    const { data } = await getFolderLinks();
    setLinks(data);
  };

  useEffect(() => {
    handleLoadAllLinksData();
  }, []);

  const handleFolderClick = async (folderId: number) => {
    if (!folderId) {
      handleLoadAllLinksData();
      setSelectedFolderName('');
    } else {
      setSelectedFolderName(
        folderList.find((folder) => folder.id === folderId)?.name ?? ''
      );
      setSelectedFolderId(folderId);
      try {
        const { links } = await fetchFolderLinks(folderId);
        setLinks(links);
      } catch (error) {
        setLinks([]);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.folderListWrapper}>
        <div className={styles.folderList}>
          <FolderButtons
            folderList={folderList}
            handleFolderClick={(folderId: number = 0) =>
              handleFolderClick(folderId)
            }
            currentFolderName={selectedFolderName}
          />
        </div>
        <button className={styles.addFolderButton} onClick={handleOpenModal}>
          폴더 추가
          <Image src={add} alt='add icon' />
        </button>
        <ModalAddFolder isOpen={showModal} onClose={handleCloseModal} />
      </div>
      <div className={styles.selectedFolderName}>
        {selectedFolderName}
        {selectedFolderName && selectedFolderName.length > 0 && (
          <UtilIcons
            selectedFolderName={selectedFolderName}
            selectedFolderId={selectedFolderId}
          />
        )}
      </div>
      {links ? (
        <CardList items={links} searchQuery={searchQuery} />
      ) : (
        <p className={styles.noLink}>저장된 링크가 없습니다.</p>
      )}
    </div>
  );
};

export default FolderList;
