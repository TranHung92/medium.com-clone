import React, { Component } from 'react'
import { render } from 'react-dom' // eslint-disable-line no-unused-vars
import Editor, { composeDecorators } from 'draft-js-plugins-editor'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import request from 'superagent';
import axios from 'axios'

import * as StoriesActions from '../actions';

 /* eslint-disable*/
import '../styles/last-draft/example.css'
import '../styles/last-draft/draft.css'

/* Emoji plugin */
import createEmojiPlugin from 'draft-js-emoji-plugin'
import 'draft-js-emoji-plugin/lib/plugin.css'
const emojiPlugin = createEmojiPlugin()
const { EmojiSuggestions } = emojiPlugin

/* Hashtag plugin */
import createHashtagPlugin from 'draft-js-hashtag-plugin'
import 'draft-js-hashtag-plugin/lib/plugin.css'
const hashtagPlugin = createHashtagPlugin()

/* Image with Alignment, dnd, focus, resize plugin */
import createImagePlugin from 'draft-js-image-plugin'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import createResizeablePlugin from 'draft-js-resizeable-plugin'
import createDndPlugin from 'draft-js-drag-n-drop-plugin'

import 'draft-js-alignment-plugin/lib/plugin.css'
import 'draft-js-focus-plugin/lib/plugin.css'

const focusPlugin = createFocusPlugin()
const resizeablePlugin = createResizeablePlugin()
const dndPlugin = createDndPlugin()
const alignmentPlugin = createAlignmentPlugin()
const { AlignmentTool } = alignmentPlugin

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  dndPlugin.decorator
)
const imagePlugin = createImagePlugin({ decorator })

/* Linkify */
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import 'draft-js-linkify-plugin/lib/plugin.css'
const linkifyPlugin = createLinkifyPlugin()


/* Toolbar */
import createToolbarPlugin from 'last-draft-js-toolbar-plugin'
import 'last-draft-js-toolbar-plugin/lib/plugin.css'
const toolbarPlugin = createToolbarPlugin()
const { Toolbar } = toolbarPlugin

/* Side Toolbar */
import createSidebarPlugin from 'last-draft-js-sidebar-plugin'
import 'last-draft-js-sidebar-plugin/lib/plugin.css'
const sidebarPlugin = createSidebarPlugin()
const { Sidebar } = sidebarPlugin

/* Embed plugin */
import createEmbedPlugin from 'draft-js-embed-plugin'
import 'draft-js-embed-plugin/lib/plugin.css'
const embedPlugin = createEmbedPlugin()

/* Link plugin */
import createLinkPlugin from 'draft-js-link-plugin'
import 'draft-js-link-plugin/lib/plugin.css'
const linkPlugin = createLinkPlugin()

/* Color */
import {colorStyleMap} from 'draft-js-color-picker-plugin'

/* init the plugins */
const plugins = [
  dndPlugin, focusPlugin, alignmentPlugin, resizeablePlugin, imagePlugin,
  emojiPlugin, hashtagPlugin, linkifyPlugin, 
  toolbarPlugin, sidebarPlugin, embedPlugin, linkPlugin
]
  
/* eslint-enable*/


const CLOUDINARY_UPLOAD_PRESET = 'medium-clone';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mrhubo/upload';

function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}


class StoriesNew extends Component {
  constructor() {
    super()
    this.state = {
      title: EditorState.createEmpty(),
      content: EditorState.createEmpty(),
    }
  }

  onChangeTitle = (title) => {
    this.setState({ title })
  }

  onChangeContent = (content) => {
    this.setState({ content })
  }

  focus = () => {
    this.editor.focus()
  }

  onUpload = () => {
  	const contentObj = this.state.content.getCurrentContent()
  	const img = convertToRaw(contentObj).entityMap[0].data.src
  	axios({
  	  method: 'get',
  	  url: img,
  	  responseType: 'blob'
  	}).then(res => {
  		const myBlob = res.data
  		const imgFile = blobToFile(myBlob, 'hubo')
  		this.handleImageUpload(imgFile)
  	})
  }

	handleImageUpload = (file) => {
	  let upload = request.post(CLOUDINARY_UPLOAD_URL)
	                      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
	                      .field('file', file);

	  upload.end((err, response) => {
	    if (err) {
	      console.error(err);
	    }
	    if (response.body.secure_url !== '') {
	    	console.log('image url', response.body.secure_url)
	    	const contentObj = this.state.content.getCurrentContent()
	    	const rawContent = convertToRaw(contentObj)
	    	rawContent.entityMap[0].data.src = response.body.secure_url
	    	const contentState = convertFromRaw(rawContent)
	    	this.setState({ content: EditorState.createWithContent(contentState)})
	    }
	  });
	}



  onSubmit = () => {
    const titleObj = this.state.title.getCurrentContent()
    const contentObj = this.state.content.getCurrentContent()
    const title = JSON.stringify(convertToRaw(titleObj))
    const content = JSON.stringify(convertToRaw(contentObj))
    console.log('editorState', this.state.content.getCurrentContent())
    console.log('raw', convertToRaw(contentObj))
    const author = this.props.author
    const values = {
      title,
      content,
      author
    }
    console.log('values', values)
    this.props.createStory(values, () => {
      this.props.history.push('/')
    })
    console.log('values', convertFromRaw(JSON.parse(values.content)))
  }

  render () {
    return (
      <div>
        <div className='editor'>
          <h3>Title</h3>
          <Editor 
            editorState={this.state.title}
            onChange={this.onChangeTitle}
            placeholder='add title'
          />
          <h3>Content</h3>
          <Editor
            editorState={this.state.content}
            onChange={this.onChangeContent}
            plugins={plugins}
            placeholder='add text'
            customStyleMap={colorStyleMap}
            ref={(element) => { this.editor = element }}
          />
          <AlignmentTool />
          <Toolbar />
          <Sidebar />
          <EmojiSuggestions />
          <button onClick={this.onSubmit}>Submit</button>
          <button onClick={this.onUpload}>Upload</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { author: state.auth.user };
}

export default connect(mapStateToProps, StoriesActions)(StoriesNew);