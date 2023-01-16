import './App.css';
import {Component} from 'react';
import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace';
import styled from 'styled-components';
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
          <Split>
              <CodeWindow>
                <AceEditor
                  mode="markdown"
                  theme="dracula"
                  onChange={(updatedText) => { this.setState({loadedFile: updatedText}) }}
                  name="markdown-editor"
                  value={this.state.loadedFile}
                />
              </CodeWindow>
              <RenderedWindow>
                  <Markdown>{this.state.loadedFile}</Markdown>
              </RenderedWindow>
          </Split>
        </div>
    );
  }
}

export default App;

const Split = styled.div`
  display: flex;
  height: 100vh;
`

const CodeWindow = styled.div`
  flex: 1;
  padding-top: 2rem;
  background-color: #191324;
`

const RenderedWindow = styled.div`
  background-color: #191324;
  width: 35%;
  padding: 20px;
  color: #fff;
  border-left: 1px solid #302b3a;
  h1, h2, h3, h4, h5, h6 {
    color: #82d8d8;
  }
  h1 {
    border-bottom: solid 3px #82d8d8;
    padding-bottom: 10px;
  }
  a {
    color: #82d8d8; 
  }
`