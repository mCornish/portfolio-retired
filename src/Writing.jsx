import React from 'react';
// import './Writing.css';
import Blog from './Blog'


// const content = () => (
//     <div className="excerpt">
//         <p>I remember the moment I felt like I <em>might</em> actually belong. Before that moment, I was never fully aware of the importance of community in web development. For years, I was just a web developer; after that moment, I was part of the web development community.</p>
//         <a role="button" href="http://devstory.mikecornish.me/posts/chapter-5" target="_blank" onClick={handleClick}>Explore My Story</a>
//     </div>
// );


export default function(props) {
    return (
        <div id="writing" className="writing">
          <Blog />
        </div>
    );
}
