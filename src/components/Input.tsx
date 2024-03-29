import { useState } from 'react';
import styles from './Input.module.css';

const Input = () => {
  const [error, setError] = useState(false);
  return (
    <div className={styles.container}>
      <form>
        <label htmlFor='input'>이메일</label>
        <input
          type='text'
          id='input'
          placeholder='codeit@codeit.com'
          className={` ${error && styles.errorInput} ${styles.input}`}
        />
      </form>
      {error && (
        <p className={` ${error && styles.errorText}`}>값을 입력해 주세요.</p>
      )}
      <form>
        <label htmlFor='input'>비밀번호</label>
        <input
          type='text'
          id='input'
          placeholder='********'
          className={` ${error && styles.errorInput} ${styles.input}`}
        />
      </form>
      {error && (
        <p className={` ${error && styles.errorText}`}>값을 입력해 주세요.</p>
      )}
    </div>
  );
};

export default Input;
