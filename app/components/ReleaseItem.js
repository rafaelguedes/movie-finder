var React = require('react');
var api = require('../utils/api');

function ReleaseItem(props) {

    var title = props.title;
    var date = props.date;
    var poster = props.poster === null ? 'http://via.placeholder.com/300x450' : props.poster;

    return(
        <div onClick={props.onClick} className='releases-grid-item'>
            <div className='releases-grid-item-image'>
                <img src={api.getPosterUrl() + poster} alt='Movie Poster'/>
            </div>
            <div className='releases-grid-item-info'>
                <h2>{title}</h2>
                <h2>{date}</h2>
            </div>
        </div>
    )
}

module.exports = ReleaseItem;