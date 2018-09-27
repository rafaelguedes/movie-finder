var React = require('react');
var api = require('../utils/api');
var SearchResultItem = require('./SearchResultItem');

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            query: '',
            displayResults: false
        }

        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event) {
        this.setState({query: event.target.value}, function(){
            this.getMovieByQuery(this.state.query);
        });
        
    }

    getMovieByQuery(query) {
        if(query.length > 0){
            api.getMovieByQuery(query).then(function(response) {
            this.setState(function() {
                return {
                    results: response,
                    displayResults: true
                }
            });
            this.props.onShowingResults(true);
        }.bind(this));
        } else {
            this.setState(function() {
                return {
                    results: [],
                    displayResults: false
                }
            });
            this.props.onShowingResults(false);
        } 
    }

    handleClick(id) {
        this.setState(function() {
            return {
                results: [],
                displayResults: false
            }
        });

        this.props.history.push({
            pathname: '/detail/' + id,
        })
    }

    render() {
        return(
            <div className='search-container'>
                <div className='search-input'>
                    <form>
                        <img src='../app/static/magnifier.svg' alt='Search Icon' className='search-input-icon' />
                        <input type='text' 
                               placeholder='Search a movie'
                               onChange={this.searchHandler}
                               value={this.state.query}/>
                    </form>
                </div>
            {this.state.displayResults === true
                ?   <div className='search-results'>
                        {this.state.results.map(function(result){
                            return(
                                <SearchResultItem key={result.id} 
                                                poster={result.poster_path}
                                                title={result.title}
                                                date={result.release_date}
                                                onClick={this.handleClick.bind(this, result.id)}/>
                            );
                        }.bind(this))}
                    </div>
                : null
            }   
            </div>
        )
    }
}

module.exports = Search;
