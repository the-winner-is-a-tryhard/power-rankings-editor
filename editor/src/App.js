import './App.css';
import {Component} from 'react';
import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';

class App extends Component {
  state = {
    loadedFile: ''
  }

  constructor() {
    super();
    window.api.receive('fromMainNewFile', (fileContent) => {
      this.setState({
        loadedFile: fileContent
      });
    });
  }

  render() {
    return (
        <div className="App">
          <AceEditor
              mode="markdown"
              theme="dracula"
              onChange={(updatedText) => { this.setState({loadedFile: updatedText}) }}
              name="markdown-editor"
              value={this.state.loadedFile}
          />
          <Markdown>{this.state.loadedFile}</Markdown>
        </div>
    );
  }
}

export default App;
