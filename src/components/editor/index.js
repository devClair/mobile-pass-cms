import React, { Component, useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState, convertFromRaw, convertFromHTML } from 'draft-js';

import {
  Grid,
  Container,
  Box,
  Typography,
  useMediaQuery,
  Button,
  Paper,
  Divider,
  FormControl,
  Radio,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';

// import { Editor } from 'react-draft-wysiwyg';
import { Editor } from '../../components/wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// api
import { apiObject } from '../../api';

// gatsby
import { Link, navigate } from 'gatsby';

// layouts
import { Dashboard as DashboardLayout } from '../../layouts';

// query-string
import queryString from 'query-string';

// react-redux
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({});

const WYSIWYGEditor = (props) => {
  const { content_type, content_locale } = props;
  console.log('WYSIWYGEditor -> content_locale', content_locale);
  console.log('WYSIWYGEditor -> content_type', content_type);

  const reducer = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const [content, setContent] = useState(EditorState.createEmpty());
  const [isEditor, setIsEditor] = useState(true);

  const handleChange = (event) => {
    console.log('handleChange -> event.target.value', event.target.value);
    setIsEditor(event.target.value === 'true' ? true : false);
  };

  const save = async (props) => {
    try {
      var text = draftToHtml(convertToRaw(content.getCurrentContent()));
      console.log('save -> text', text);

      if (!text) {
        return;
      }

      var data = await apiObject.updateCmsContent({
        content_type,
        content_locale,
        // content_title: '정책 제목 -2',
        content_content: text,
      });

      console.log('save -> data', data);
    } catch (error) {
      console.log('save -> error', error);
    }
  };

  const load = async (props) => {
    try {
      var text = '';

      var data = await apiObject.getContent({
        content_type,
        content_locale,
      });

      console.log('load -> data', data);

      //   var data = await apiObject.getCmsContent({
      //     content_type,
      //     content_locale,
      //   });

      text = data.data.item.content_content;
      console.log('load -> content', content);

      const blocksFromHtml = htmlToDraft(text);
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
      //   console.log('Error', error.response.data);
    }
  };

  return (
    <>
      <DashboardLayout>
        <Grid style={{ width: '100%', height: 500, backgroundColor: '#eeeeee' }}>
          <Grid>
            <FormControl component="fieldset">
              <FormLabel component="legend">{`Editor : ${isEditor}`} </FormLabel>
              <RadioGroup aria-label="editor" name="editor" value={isEditor} onChange={handleChange}>
                <FormControlLabel value={true} control={<Radio />} label="yes" />
                <FormControlLabel value={false} control={<Radio />} label="no" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid>
            <Button onClick={save}>SAVE</Button>
            <Button onClick={load}>LOAD</Button>
          </Grid>

          <Editor
            editorState={content}
            toolbarHidden={!isEditor}
            readOnly={!isEditor}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={(editorState) => {
              // console.log('Test -> editorState', editorState);
              console.log('Test -> editorState', editorState.getCurrentContent());

              setContent(editorState);
            }}
          />
          <Divider />

          <textarea disabled value={draftToHtml(convertToRaw(content.getCurrentContent()))} />
          <Divider />
        </Grid>
      </DashboardLayout>
    </>
  );
};

export default WYSIWYGEditor;

// export const useWYSIWYGEditor = (props) => {

// };
