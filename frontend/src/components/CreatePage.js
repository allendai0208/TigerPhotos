// This component is just the parent component to the ProfileForm component, wrapped in a Container to make it resizable
import React from 'react';
import  ProfileForm from './ProfileForm';
import { Container } from 'semantic-ui-react';


function CreatePage(props) {
  
  return (
    <div className="ProfilePage">
      <Container style={{marginTop: 40}}>
        <p className="CreateProfileText">My Profile</p>
        <ProfileForm netid = {props.netid} />
      </Container>
    </div>
  );
}

export default CreatePage;