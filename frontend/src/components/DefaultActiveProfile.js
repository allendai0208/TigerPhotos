import React from 'react'
import Container from '@material-ui/core/Container'

class DefaultActiveProfile extends React.Component{

    constructor() {
        super();
        this.state = {
            width: window.innerWidth,
        };
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

    render() {
        const { width } = this.state;
        const isMobile = width <= 500;
        if (!isMobile) {
            return (
                <div style={{marginTop: 20, marginBottom: 20}}>
                    <Container maxWidth="sm">
                        <p className = "defaultActiveProfile_text">Click on a profile on the left to see more!</p>
                    </Container>
                </div>
            )
        }
        else {
            return (
                <div style={{marginTop: 20, marginBottom: 20}}>
                    <Container maxWidth="sm">
                        <p className = "defaultActiveProfile_text">Click on a profile above to see more!</p>
                    </Container>
                </div>
            )
        }
    }
}

export default DefaultActiveProfile