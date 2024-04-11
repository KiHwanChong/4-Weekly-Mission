import { useState, useEffect } from "react";
import CardList from "../components/CardList";
import { getFolders } from "@/pages/api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile from "../components/SharedPage/Profile";
import SearchBar from "../components/SearchBar";

interface Item {
  title: string;
  createdAt: Date;
  created_at: Date;
  url: string;
  description: string;
  imageSource: string;
  image_source: string;
}

function SharePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [profile, setProfile] = useState({ name: "", profileImageSource: "" });
  const [folderName, setFolderName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLoad = async () => {
    const { folder } = await getFolders();
    setItems(folder.links);
    setProfile({
      name: folder.owner.name,
      profileImageSource: folder.owner.profileImageSource,
    });
    setFolderName(folder.name);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="App">
      <Header />
      <Profile profile={profile} folderName={folderName} />
      <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <CardList items={items} searchQuery={searchQuery} />
      <Footer />
    </div>
  );
}

export default SharePage;
