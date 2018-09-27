var React = require('react');
var Header = require('./Header');
var Releases = require('./Releases');
var Search = require('./Search');

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldRenderReleases: true
        }
    }

    render() {
       return(
            <div className='home-container'>
                <Header />
                <Search 
                    history={this.props.history}
                    onShowingResults={
                        function(showing){
                            return showing === true 
                                ? this.setState({shouldRenderReleases: false}) 
                                : this.setState({shouldRenderReleases: true});
                        }.bind(this)
                    }
                />
                {this.state.shouldRenderReleases ? <Releases history={this.props.history}/> : null} 
            </div>
        ) 
    } 
}

module.exports = Home;