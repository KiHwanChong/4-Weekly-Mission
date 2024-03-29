import styles from './CardList.module.css';
import star from 'assets/star.svg';
import kebab from 'assets/kebab.svg';
import transformData from '../utils/transformData';
import KebabPopover from './KebabPopover';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardListProps {
  items: Item[];
  searchQuery?: string;
}
interface Item {
  title: string;
  createdAt: Date;
  created_at: Date;
  url: string;
  description: string;
  imageSource: string;
  image_source: string;
}

const Card = ({ item }: { item: Item }) => {
  const { title, url, description, src, timeDifference, formattedDate } =
    transformData(item);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const handleKebabClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setPopoverVisible(!popoverVisible);
  };

  return (
    <div>
      <Link href={url} target='_blank' rel='noopener noreferrer'>
        <Image
          width={300}
          height={200}
          src={src}
          alt='link thumbnail'
          className={styles['card-box-img']}
        />
        <Image src={star} alt='favorite' className={styles.starIcon} />
        <div className={styles['text-container']}>
          <div className={styles.kebabWrapper}>
            <p className={styles['time-difference']}>{timeDifference}</p>
            <Image
              src={kebab}
              alt='kebab'
              className={styles.kebabIcon}
              onClick={handleKebabClick}
            />
            {popoverVisible && <KebabPopover url={url} />}
          </div>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
          <p className={styles.date}> {formattedDate}</p>
        </div>
      </Link>
    </div>
  );
};

function CardList({ items, searchQuery }: CardListProps) {
  const filteredItems = items.filter(
    (item) =>
      item.title?.toLowerCase().includes((searchQuery ?? '').toLowerCase()) ||
      item.url?.toLowerCase().includes((searchQuery ?? '').toLowerCase()) ||
      item.description
        ?.toLowerCase()
        .includes((searchQuery ?? '').toLowerCase())
  );
  return (
    <div className={styles['card-container-center']}>
      <div className={styles['card-container']}>
        {filteredItems.map((item) => (
          <div key={item.title} className={styles['card-box']}>
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardList;
