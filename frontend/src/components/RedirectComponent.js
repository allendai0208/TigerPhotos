import React from 'react';

class RedirectComponent extends React.Component {
    componentDidMount(){
      window.location.replace(this.props.url)
    }

    render() {
        return(null)
    }
}     

export default RedirectComponent