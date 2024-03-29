import { getUser } from '@/pages/api/api';
import { useState, useEffect } from 'react';

const useUser = () => {
  const [user, setUser] = useState({
    email: '',
    imageSource: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      const userData = user.data[0];
      setUser({
        email: userData.email,
        imageSource: userData.image_source,
      });
    };

    fetchUser();
  }, []);

  return user;
};

export default useUser;
