import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ProfileCard from './ProfileCard'
import Typography from '@material-ui/core/Typography'
import ActiveProfile from './ActiveProfile.js'

class BrowsePage extends React.Component {

  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
  }

  state = {
    photographers: [],
    selectedPhotographer: []
  }

  fetchPhotographers = () => {
    fetch('/api/browse')
    .then(response => response.json())
    .then(result => this.setState({
      photographers: result.photographers
    }))
    .catch(e => console.log(e))
  }

  componentDidMount() {
    this.fetchPhotographers()
  }

  handler(arg1) {
    console.log(arg1)
    this.setState({
      selectedPhotographer:arg1
    })
  }

  render() {
    let recentPhotographersMarkup = this.state.photographers ? (
      this.state.photographers.map((photographer) => < ProfileCard photographer={photographer} handler = {this.handler}/> )
    ) : (
      <p>Loading...</p>
    )

    return (
      <Container fluid>
        <Row >
          <Col xs = {4}>
            {recentPhotographersMarkup}
          </Col>
          <Col>
            <Container>
              <ActiveProfile selectedPhotographer = {this.state.selectedPhotographer}/>
            </Container>
          </Col>
        </Row>
      </Container>
 
    )
  }

} 

/*function BrowsePage() {
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
        <BrowseBar photographers={photographers} />
      </Container>
    </div>
  );
} */

export default BrowsePage;