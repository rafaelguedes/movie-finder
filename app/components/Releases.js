var React = require('react');
var api = require('../utils/api');
var ReleaseItem = require('./ReleaseItem');

class Releases extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            releases: [],
            loading: true,
            error: false
        }

        this.makeRequest = this.makeRequest.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.makeRequest();
    }

    makeRequest() {

        this.setState(function() {
            return {
                loading: true
            }
        });

        api.getReleases().then(function(response) {
            this.setState(function() {
                return {
                    loading: false,
                    releases: response
                }
            });
        }.bind(this));
    }

    handleClick(movie) {
        var id = movie.id;

        this.props.history.push({
            pathname: '/detail/' + id,
        });
    }

    render() {
        return(
            <div className='releases'>
                <div className='releases-heading'>
                <h2>New Releases</h2>
                </div>
                <div className='releases-grid'>
                    {this.state.releases.map(function(item) {
                        return(
                            <ReleaseItem onClick={this.handleClick.bind(this, item)} key={item.id} poster={item.poster_path} title={item.original_title} date={item.release_date}/>
                        );
                    }, this)}
                </div>    
            </div>  
        ); 
    }
}

module.exports = Releases;