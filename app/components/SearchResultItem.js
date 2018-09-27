var React = require('react');
var api = require('../utils/api');

function SearchResultItem(props) {
    return(   
        <div className='search-results-item' onClick={props.onClick}>
            <div className='search-results-poster'>
                <img src={props.poster === null ? 'http://via.placeholder.com/300x450' : api.getPosterUrl() + props.poster} alt='Movie Poster'/>
            </div>
            <div className='search-results-info'>
                <h1>{props.title}</h1>
                <h1>{props.date}</h1>
            </div>
        </div>
    );
}

module.exports = SearchResultItem;