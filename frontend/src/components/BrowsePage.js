// This component is the parent component to two subcomponents - ProfileCard and ActiveProfile
// These two components do the actual rendering of the profiles and their information
// This component simply formats those two components into a bootstrap grid
// This component also gets all the pertinent information about ALL photographers (we call flask api in componentDidMount).
// The photographer information for ALL photographers is stored in state.
// When a profile card is clicked, the selectedPhotographer field in state is updated to reflect the information about the clicked profile.
// The selectedPhotographer field is passed as a prop to ActiveProfile where it is formatted and rendered.

import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ProfileCard from './ProfileCard'
import ActiveProfile from './ActiveProfile.js'

// This is commented out because it wasn't being used, whoever wrote this should check to see if we need it and if not we should delete it - Keith
/*const styles = {
  main: { 
    display: 'inline-block',
    height: "inherit"
  }
}
*/

class BrowsePage extends React.Component {

  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
  }

  state = {
    photographers: [],
    selectedPhotographer: [],
    profileHasBeenClicked: false
  }

  //Get all pertinent fields regarding all photographers
  //This will get a list of photographers, each photographer in the list is a dict
  //containing their netid (photographer_netid), first name  (first_name),
  //last name (last_name), email (email), description (description), profile picture (profile_pic)
  //urls of portfolio photos (urls)
  fetchPhotographers = () => {
    fetch('/api/browse')
    .then(response => response.json())
    .then(result => this.setState({
      photographers: result.photographers
    })).then(console.log(this.state.photographers))
    .catch(e => console.log(e))
  }

  componentDidMount() {
    this.fetchPhotographers()
  }

  handler(arg1, arg2) {
    this.setState({
      selectedPhotographer:arg1,
      profileHasBeenClicked:arg2
    })
  }

  
  render() {
    let recentPhotographersMarkup = this.state.photographers ? (
      this.state.photographers.map((photographer) => < ProfileCard photographer={photographer} handler = {this.handler} /> )
    ) : (
      <p>Loading...</p>
    )

    return (
      <Container fluid>
        <Row >
          <div>
            <Col xs = {12} className="column1">
                {recentPhotographersMarkup}
            </Col>
          </div>
            <Col>
              {this.state.profileHasBeenClicked ? <ActiveProfile selectedPhotographer = {this.state.selectedPhotographer}/> : null}
            </Col>
        </Row>
      </Container>
    )
  }

} 

export default BrowsePage;