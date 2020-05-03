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

class BrowsePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth,
      photographers: [],
      selectedPhotographer: [],
      profileHasBeenClicked: false,
      filteredPhotographers: [],
      filter: "All",
      sort: "alphabetical"
    }
    this.handler = this.handler.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
  }

  //Get all pertinent fields regarding all photographers
  //This will get a list of photographers, each photographer in the list is a dict
  //containing their netid (photographer_netid), first name  (first_name),
  //last name (last_name), email (email), description (description), profile picture (profile_pic)
  //urls of portfolio photos (urls)
  componentDidMount() {
    fetch('/api/browse')
    .then(response => response.json())
    .then(result => this.setState({
      photographers: result.photographers,
      filteredPhotographers: result.photographers
    }))
    .then(()=> {
      let filtered = this.state.photographers
      filtered = filtered.sort(function (a, b) {
        if (a.first_name < b.first_name) return -1;
        else if (a.first_name > b.first_name) return 1;
        return 0;
      })
      this.setState({filteredPhotographers: filtered})
    })
    .catch(e => console.log(e))
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  handler(arg1, arg2) {
    this.setState({
      selectedPhotographer:arg1,
      profileHasBeenClicked:arg2
    })
  }

  handleSortChange(event) {
    this.setState({sort:event.target.value})

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
    
    if (event.target.value === "alphabetical") {
      filtered = filtered.sort(function (a, b) {
        if (a.first_name < b.first_name) return -1;
        else if (a.first_name > b.first_name) return 1;
        return 0;
      })
    }

    else if (event.target.value === "rating") {
      filtered = filtered.sort(function (a, b) {
        if (a.average_rating > b.average_rating) return -1;
        else if (a.average_rating < b.average_rating) return 1;
        return 0;
      })
    }
    this.setState({filteredPhotographers: filtered})
  }

  handleFilterChange(event) {
    this.setState({filter:event.target.value})

    let filtered = []
    if (event.target.value === "All") {
      filtered = this.state.photographers
    }

    else {
      for (const person of this.state.photographers) {
        if (person[event.target.value])
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

  render() {
    let recentPhotographersMarkup = this.state.photographers ? (
      this.state.filteredPhotographers.map((photographer) => < ProfileCard key={photographer.netid} photographer={photographer} handler = {this.handler} /> )
    ) : (
      <p>Loading...</p>
    )
    
    const { width } = this.state;
    const isMobile = width <= 500;

    if (!isMobile) {
      return (
        <div className='hideScrollbar'>
        <Container fluid>
          <Row noGutters>
            <div>
              <Col xs={12} className="column1">

                <FormControl style = {{minWidth: "75px"}}>
                  <InputLabel id="filter-label">Filter By</InputLabel>
                  <Select
                    labelId="filter-label"
                    onChange = {this.handleFilterChange}
                    value = {this.state.filter}
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
                    value = {this.state.sort}
                    >
                      <MenuItem value={"alphabetical"}> Alphabetical </MenuItem>
                      <MenuItem value={"rating"}> Average Rating </MenuItem> 
                  </Select>
                </FormControl>
                {recentPhotographersMarkup}
              </Col>
            </div>
            <Col className='column2'>
              {this.state.profileHasBeenClicked ? 
                <ActiveProfile selectedPhotographer = {this.state.selectedPhotographer} user_netid = {this.props.netid} /> : 
                <DefaultActiveProfile/>}
            </Col>
          </Row>
        </Container>
        </div>
      )
    }
    else {
      return (
        <div className='hideScrollbar'>
        <Container fluid>
          <Row noGutters>
            <div>
              <Col className="smallColumn1">

                <FormControl style = {{minWidth: "75px"}}>
                  <InputLabel id="filter-label">Filter By</InputLabel>
                  <Select
                    labelId="filter-label"
                    onChange = {this.handleFilterChange}
                    value = {this.state.filter}
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
                    value = {this.state.sort}
                    >
                      <MenuItem value={"alphabetical"}> Alphabetical </MenuItem>
                      <MenuItem value={"rating"}> Average Rating </MenuItem> 
                  </Select>
                </FormControl>
                {recentPhotographersMarkup}
              </Col>
            </div>
            </Row>
            <hr/>
            <Row>
            <Col>
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
} 

export default BrowsePage;
