import React, { useState, useEffect } from 'react';

// wysiwyg
import { EditorState, convertToRaw, ContentState, convertFromRaw, convertFromHTML } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const WysiwygContent = (props) => {
  const { isEditable, value, onChange, wrapperClassName, editorClassName } = props;
  const [content, setContent] = useState(EditorState.createEmpty());

  const autoSave = () => {
    try {
      var text = draftToHtml(convertToRaw(content.getCurrentContent()));
      onChange(text);
    } catch (error) {
      console.log('autoSave -> error', error);
    }
  };

  const convertText = async (text) => {
    try {
      const blocksFromHtml = htmlToDraft(text ? text : '');
      if (blocksFromHtml) {
        const { contentBlocks, entityMap } = blocksFromHtml;
        // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        // ContentState를 EditorState기반으로 새 개체를 반환.
        // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
        const editorState = EditorState.createWithContent(contentState);
        setContent(editorState);
      }
    } catch (error) {
      console.log('Error', error);
      console.log('Error', error.code);
      console.log('Error', error.message);
    }
  };

  useEffect(() => {
    convertText(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Editor
      onBlur={autoSave}
      editorState={content}
      toolbarHidden={!isEditable}
      readOnly={!isEditable}
      toolbarClassName="toolbarClassName"
      wrapperClassName={wrapperClassName}
      editorClassName={editorClassName}
      onEditorStateChange={(editorState) => {
        setContent(editorState);
      }}
    />
  );
};

export default WysiwygContent;
