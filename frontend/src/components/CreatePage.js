import React, { useEffect, useState } from 'react';
import  ProfileForm from './ProfileForm';
import { Container } from 'semantic-ui-react';


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
        <p className="CreateProfileText">My Profile</p>
        <ProfileForm netid = {props.netid} onNewProfile={photographer => 
          setPhotographers(currentPhotographers => [...currentPhotographers, photographer])
          }/>
      </Container>
    </div>
  );
}

export default CreatePage;