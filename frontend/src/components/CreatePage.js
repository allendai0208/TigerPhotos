import React, { useEffect, useState } from 'react';
import { ProfileForm } from './ProfileForm';
import { Photographers } from './Photographers'
import { Container } from 'semantic-ui-react';
import {BrowseBar} from './BrowseBar'

function CreatePage() {
  const [photographers, setPhotographers] = useState([]);

  useEffect(() => {
    fetch("/api/browse").then(response => 
      response.json().then(data => {
        setPhotographers(data.photographers);
      })
    );
  }, []);

  return (
    <div className="ProfilePage">
      <Container style={{marginTop: 40}}>
        <ProfileForm onNewProfile={photographer => 
          setPhotographers(currentPhotographers => [...currentPhotographers, photographer])
          }/>
        <Photographers photographers={photographers} />
        <BrowseBar photographers={photographers} />
      </Container>
    </div>
  );
}

export default CreatePage;