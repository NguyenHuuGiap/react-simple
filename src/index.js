  import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAAFHIey3jG86-6nMkwSfjvvyBnK3L8NmM';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500);
    return (
      <Fragment>
        <SearchBar onSearchTermChange={videoSearch} />
        <div class="row">
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
        </div>
      </Fragment>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
