import React, { useEffect, useState } from 'react';
import  ProfileForm from './ProfileForm';
import { Photographers } from './Photographers'
import { Container } from 'semantic-ui-react';
import {BrowseBar} from './BrowseBar'
import Navigation from './Navigation'

function CreatePage(props) {
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
        <p className="CreateProfileText">Create Your Profile</p>
        <ProfileForm netid = {props.netid} onNewProfile={photographer => 
          setPhotographers(currentPhotographers => [...currentPhotographers, photographer])
          }/>
      </Container>
    </div>
  );
}

export default CreatePage;