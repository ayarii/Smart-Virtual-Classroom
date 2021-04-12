import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Comment, Form, Header, Icon } from "semantic-ui-react";
import {
  fetchCommentsCourse,
  selectComments,
  fetchCommentsTask
} from "../../redux/slices/commentslice";
import { CommentsApi } from "../../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputEmoji from "react-input-emoji";
import EditComment from "./EditComment";

function CommentComponent(props) {
  const documentData = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  useEffect(() => {
      if(props.courseID!=null)
   { dispatch(fetchCommentsCourse(props.courseID));}
   else
   { dispatch(fetchCommentsTask(props.courseID));}

  }, [dispatch]);
  const [commentss, er] = useSelector(selectComments);
  const [text, setText] = useState("");
  function handleOnEnter(text) {
    console.log("enter", text);
  }
  const formik = useFormik({
    initialValues: {
      Body: " ",
      Writer: { _id: "" + documentData._id },
      Course: { _id: "" + props.courseID },
      task: { _id: "" + props.taskID },
    },
    validationSchema: yupSchema,

    onSubmit: async (values) => {
      values.Body = text;

      try {
        if (values.Body !== " ") {
          const res = await CommentsApi.postComments(values);
          console.log(res);
          dispatch(fetchCommentsCourse(props.courseID));
        }
      } catch (error) {
        alert(error);
      }
    },
  });
  const deletecomment = async (idcomment) => {
    try {
      const res = await CommentsApi.deleteComments(idcomment);
      dispatch(fetchCommentsCourse(props.courseID));
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <Comment.Group size="small">
        <div style={{ display: "flex" }}>
          <InputEmoji
            onChange={setText}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Type a message"
          />
          <Form onSubmit={formik.handleSubmit}>
            <Button
              style={{ maxHeight: "40px" }}
              type="submit"
              content=""
              icon="edit"
            />
          </Form>
        </div>

        <Header as="h3" dividing>
          Comments added to this courses
        </Header>
        {commentss.map((commentt, index) => (
          <Comment key={index}>
            <Comment.Avatar
              as="a"
              src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
            />
            <Comment.Content>
              <Comment.Author as="a">{commentt.Writer.name}</Comment.Author>
              <Comment.Metadata>
                <span>{commentt.Date}</span>
              </Comment.Metadata>
              <Comment.Text>{commentt.Body}</Comment.Text>
              <Comment.Actions>
                <Icon
                  name="delete"
                  onClick={() => deletecomment(commentt._id)}
                  color="red"
                />
                <EditComment comment={commentt} />
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </div>
  );
}
const yupSchema = Yup.object({
  Body: Yup.string().required("Champs requis!"),
});
export default CommentComponent;
