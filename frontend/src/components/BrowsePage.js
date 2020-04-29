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
import DefaultActiveProfile from './DefaultActiveProfile.js'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'

class BrowsePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photographers: [],
      selectedPhotographer: [],
      profileHasBeenClicked: false,
      filteredPhotographers: [],
      filter: "All",
      sort: "alphebetical"
    }
    this.handler = this.handler.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
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
      photographers: result.photographers,
      filteredPhotographers: result.photographers
    }))
    .then(console.log(this.state.photographers))
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

  handleSearch() {
    let filtered = []
    if (this.state.filter === "All") {
      filtered = this.state.photographers
    }

    else {
      for (const person of this.state.photographers) {
        if (person[this.state.filter])
          filtered.push(person)
      }
    }
    
    if (this.state.sort === "alphabetical") {
      filtered = filtered.sort(function (a, b) {
        if (a.first_name < b.first_name) return -1;
        else if (a.first_name > b.first_name) return 1;
        return 0;
      })
    }

    else if (this.state.sort === "rating") {
      filtered = filtered.sort(function (a, b) {
        if (a.average_rating > b.average_rating) return -1;
        else if (a.average_rating < b.average_rating) return 1;
        return 0;
      })
    }
    this.setState({filteredPhotographers: filtered})
  }

  handleSortChange(event) {
    this.setState({sort:event.target.value})
  }

  handleFilterChange(event) {
    this.setState({filter:event.target.value})
  }

  render() {
    let recentPhotographersMarkup = this.state.photographers ? (
      this.state.filteredPhotographers.map((photographer) => < ProfileCard key={photographer.netid} photographer={photographer} handler = {this.handler} /> )
    ) : (
      <p>Loading...</p>
    )
    return (
      <div className='hideScrollbar'>
      <Container fluid>
        <Row noGutters>
          <div>
            <Col xs = {12} className="column1">
              <FormControl style = {{minWidth: "75px"}}>
                <InputLabel id="filter-label">Filter By</InputLabel>
                <Select
                  labelId="filter-label"
                  onChange = {this.handleFilterChange}
                  >
                    <MenuItem value={"All"}> All </MenuItem>
                    <MenuItem value={"photography_exp"}> Photographers </MenuItem>
                    <MenuItem value={"videography_exp"}> Videographers </MenuItem> 
                    <MenuItem value={"editing_exp"}> Editors </MenuItem>
                </Select>
              </FormControl>

              <FormControl style = {{minWidth: "75px"}}>
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  onChange = {this.handleSortChange}
                  >
                    <MenuItem value={"alphabetical"}> Alphabetical </MenuItem>
                    <MenuItem value={"rating"}> Average Rating </MenuItem> 
                </Select>
              </FormControl>

              <Button color="primary" variant="contained" onClick = {this.handleSearch} style = {{marginTop:"10px"}}>Search</Button>
              {recentPhotographersMarkup}
            </Col>
          </div>
          <Col className="column1">
            {this.state.profileHasBeenClicked ? 
              <ActiveProfile selectedPhotographer = {this.state.selectedPhotographer} user_netid = {this.props.netid} /> : 
              <DefaultActiveProfile/>}
          </Col>
        </Row>
      </Container>
      </div>
    )
  }
} 

export default BrowsePage;

/*
<Container fluid>
        <Row >
          <div>
            <Col xs = {12} className="column1">
              <FormControl style = {{minWidth: "75px"}}>
                <InputLabel id="filter-label">Filter By</InputLabel>
                <Select
                  labelId="filter-label"
                  onChange = {this.handleFilterChange}
                  >
                    <MenuItem value={"All"}> All </MenuItem>
                    <MenuItem value={"photography_exp"}> Photographers </MenuItem>
                    <MenuItem value={"videography_exp"}> Videographers </MenuItem> 
                    <MenuItem value={"editing_exp"}> Editors </MenuItem>
                </Select>
              </FormControl>

              <FormControl style = {{minWidth: "75px"}}>
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  onChange = {this.handleSortChange}
                  >
                    <MenuItem value={"alphabetical"}> Alphabetical </MenuItem>
                    <MenuItem value={"rating"}> Average Rating </MenuItem> 
                </Select>
              </FormControl>

              <Button color="primary" variant="contained" onClick = {this.handleSearch} style = {{marginTop:"10px"}}>Search</Button>
              {recentPhotographersMarkup}
            </Col>
          </div>
          <Col>
            {this.state.profileHasBeenClicked ? 
              <ActiveProfile selectedPhotographer = {this.state.selectedPhotographer} user_netid = {this.props.netid} /> : 
              <DefaultActiveProfile/>}
          </Col>
        </Row>
      </Container>
    )
    */