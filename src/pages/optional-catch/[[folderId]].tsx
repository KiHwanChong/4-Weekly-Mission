import { useState } from 'react';
import CardList from '../../components/CardList';
import { getFolders } from '@/pages/api/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Profile from '../../components/SharedPage/Profile';
import SearchBar from '../../components/SearchBar';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';
import SharePage, { SharePageProps } from '../shared';

interface ProfileItems {
  title: string;
  createdAt: Date;
  created_at: Date;
  url: string;
  description: string;
  imageSource: string;
  image_source: string;
}

export const getStaticPaths = (async () => {
  const { folders } = await getFolders();

  const paths = folders.links.map((folder: any) => ({
    params: { folderId: folder.id.toString() },
  }));

  return { paths, fallback: false };
}) satisfies GetStaticPaths<any>;

// export const getStaticProps: GetStaticProps = (async (context) => {
//   if (context.params && context.params.folderId && context.params.folderId?.length > 1) {
//     return {
//       notFound: true,
//     };
//   }

//   const { folder } = await getFolders();

//   const items = folder.links;
//   const profile = {
//     name: folder.owner.name,
//     profileImageSource: folder.owner.profileImageSource,
//   };
//   const folderName = folder.name;

//   return {
//     props: {
//       items,
//       profile,
//       folderName,
//     },
//   };
// }) satisfies GetStaticProps<SharePageProps>;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await getFolders();

    if (!data || !data.folder || !data.folder.owner) {
      return {
        notFound: true,
      };
    }

    const { folder } = await getFolders();
    const items = folder.links;
    const profile = {
      name: folder.owner.name,
      profileImageSource: folder.owner.profileImageSource,
    };
    const folderName = folder.name;

    return {
      props: {
        items,
        profile,
        folderName,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export const OptionalCatch: NextPage<SharePageProps> = (props) => {
  return <SharePage {...props} />;
};

export default OptionalCatch;
