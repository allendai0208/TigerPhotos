import React, { useEffect, useState } from 'react';
import './App.css';
import { ProfileForm } from './components/ProfileForm';
import { Photographers } from './components/Photographers'
import { Container } from 'semantic-ui-react';

function App() {
  const [photographers, setPhotographers] = useState([]);

  useEffect(() => {
    fetch("/api/browse").then(response => 
      response.json().then(data => {
        setPhotographers(data.photographers);
      })
    );
  }, []);

  return (
    <div className="App">
      <Container style={{marginTop: 40}}>
        <ProfileForm onNewProfile={photographer => 
          setPhotographers(currentPhotographers => [...currentPhotographers, photographer])
          }/>
        <Photographers photographers={photographers} />
      </Container>
    </div>
  );
}

export default App;