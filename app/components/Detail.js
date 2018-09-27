var React = require('react');
var Header = require('./Header');
var Search = require('./Search');
var Loading = require('./Loading');
var api = require('../utils/api');

function MovieDetail(props) {
    return(
        <div className='detail-info-container'>
            <div className='detail-info-data'>
                <div className='detail-info-data-poster'>
                    <img src={api.getPosterUrl() + props.poster} alt='Movie Poster'/>
                </div>
                <div className='detail-info-data-text'>
                    <h1>{props.title}</h1>
                    <h2>Release date: {props.release}</h2>
                    <h2>Rating: {props.rating}</h2>
                    <h2>Vote count: {props.vote}</h2>
                    <h2>Genres: {props.genres.map(function(genre, index){
                        return (
                            <span key={genre.id}>
                                {(index ? ', ': '') + genre.name}
                            </span>
                        );
                        })}
                    </h2>
                    <p>{props.overview}</p>
                </div>
            </div>
            <div className='detail-info-cast'>
                <h1>Cast</h1>
                <div className='detail-info-cast-grid'>
                    {props.cast.slice(0, 6).map(function(actor){
                        var avatar = actor.profile_path === null 
                                    ? 'http://via.placeholder.com/300x450' 
                                    : api.getPosterUrl() + actor.profile_path;
                        return (
                            <div key={actor.cast_id}>
                                <div className='detail-info-cast-item' style={{backgroundImage: "url('" + avatar + "')"}}></div>
                                <h2>{actor.name}</h2>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>   
    );
}

class Detail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            details: [],
            shouldRenderDetails: true
        }
    }

    componentDidMount() {
        var id = this.getMovieId();
        this.makeRequest(id);
    }

    componentDidUpdate(oldProps) {
        if(oldProps.location.pathname !== this.props.location.pathname) {
            var id = this.getMovieId();
            this.makeRequest(id);
        }
    }

    getMovieId() {
        var n = this.props.location.pathname.lastIndexOf('/');
        return this.props.location.pathname.substring(n + 1);
    }

    makeRequest(movie) {
        api.getDetails(movie).then(function(response) {
            this.setState(function() {
                return {
                    loading: false,
                    details: response,
                    shouldRenderDetails: true
                }
            });
        }.bind(this));
    }

    render() {
        return( 
            <div className='detail-container'>
                <Header />
                <Search 
                    history={this.props.history}
                    onShowingResults={
                        function(showing){
                            return showing === true ? this.setState({shouldRenderDetails: false}) : this.setState({shouldRenderDetails: true});
                        }.bind(this)
                    }
                />
                {this.state.loading === true
                    ? <Loading />
                    :  this.state.shouldRenderDetails === true
                        ? <MovieDetail 
                            poster={this.state.details.poster_path}
                            title={this.state.details.title}
                            release={this.state.details.release_date}
                            rating={this.state.details.vote_average}
                            vote={this.state.details.vote_count}
                            genres={this.state.details.genres}
                            overview={this.state.details.overview}
                            cast={this.state.details.credits.cast} />
                        : null
                }
            </div>
        );
    }
}

module.exports = Detail;