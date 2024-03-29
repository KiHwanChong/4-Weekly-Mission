import styles from './FolderButtons.module.css';

interface FolderList {
  id: number;
  name: string;
}

interface FolderButtonsProps {
  folderList: FolderList[];
  handleFolderClick: (id?: number) => void;
  currentFolderName: string;
}

const FolderButtons = ({
  folderList,
  handleFolderClick,
  currentFolderName,
}: FolderButtonsProps) => (
  <>
    <button className={styles.folderButton} onClick={() => handleFolderClick()}>
      전체
    </button>
    {folderList.map((folder) => (
      <button
        key={folder.id}
        className={
          currentFolderName === folder.name
            ? `${styles.folderButton} ${styles.selected}`
            : `${styles.folderButton}`
        }
        onClick={() => handleFolderClick(folder.id)}>
        {folder.name}
      </button>
    ))}
  </>
);

export default FolderButtons;
