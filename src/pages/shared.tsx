import { useState, useEffect } from "react";
import CardList from "../components/CardList";
import { getFolders } from "@/pages/api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile from "../components/SharedPage/Profile";
import SearchBar from "../components/SearchBar";
import { GetStaticProps } from "next";

interface ProfileItems {
  title: string;
  createdAt: Date;
  created_at: Date;
  url: string;
  description: string;
  imageSource: string;
  image_source: string;
}

export const getStaticProps: GetStaticProps = async () => {
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
};

interface SharePageProps {
  items: ProfileItems[];
  profile: { name: string; profileImageSource: string };
  folderName: string;
}

const SharePage: React.FC<SharePageProps> = ({
  items,
  profile,
  folderName,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="App">
      <Header />
      <Profile profile={profile} folderName={folderName} />
      <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <CardList items={items} searchQuery={searchQuery} />
      <Footer />
    </div>
  );
};

export default SharePage;
