import React, { useEffect, useState } from 'react';
import './App.css';
import { ReviewForm } from './components/ReviewForm';
import { Reviews } from './components/Reviews'
import { Container } from 'semantic-ui-react';

function App() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/api/reviews").then(response => 
      response.json().then(data => {
        setReviews(data.reviews);
      })
    );
  }, []);

  return (
    <div className="App">
      <Container style={{marginTop: 40}}>
        <ReviewForm onNewReview={review => 
          setReviews(currentReviews => [...currentReviews, review])
          }/>
        <Reviews reviews={reviews} />
      </Container>
    </div>
  );
}

export default App;