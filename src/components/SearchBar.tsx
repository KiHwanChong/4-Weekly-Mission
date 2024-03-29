import styles from './SearchBar.module.css';
import searchIcon from 'assets/searchIcon.svg';
import closeIcon from 'assets/close.svg';
import { Dispatch } from 'react';
import Image from 'next/image';

interface SearchBarProps {
  setSearchQuery: Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
}

function SearchBar({ setSearchQuery, searchQuery }: SearchBarProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  return (
    <div className={styles['search-container']}>
      <form className={styles['search-form']}>
        <label htmlFor='searchInput' className={styles.hiddenLabel}>
          링크를 검색해 보세요.
        </label>
        <Image src={searchIcon} alt='search' className={styles.search} />
        <input
          type='text'
          id='searchInput'
          placeholder='링크를 검색해 보세요.'
          className={styles['search-input']}
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery.length > 0 && (
          <Image
            src={closeIcon}
            alt='close'
            className={styles.close}
            onClick={handleSearchClear}
          />
        )}
      </form>
    </div>
  );
}

export default SearchBar;
