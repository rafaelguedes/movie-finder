var React = require('react');

function Header() {
    return (
        <div className='header'>
            <div className='logo'>
                <a href='/'>
                    <h1>MovieFinder</h1>
                </a>
            </div>
        </div>
    );
}

module.exports = Header;