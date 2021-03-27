import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Modal, TextField } from "@material-ui/core";
import { RootStateInterface } from "../../interfaces/rootState";
import { User, authState } from "../../interfaces/module/auth/auth.interface";
import { PostData } from "../../interfaces/module/post/post.interface";
import { PostList } from "../../components";
import { GetServerSideProps } from "next";
import { END } from "redux-saga";

const PostWrapper = styled.div`
  width: 300px;
  margin: 0 auto;
`;

const BtnWrapper = styled.div`
  text-align: right;
  padding-top: 20px;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
`;

interface PostVars extends authState {
  posts: PostData[];
}

const Post = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [todo, setTodo] = useState<string>("");
  const [dateVal, setDateVal] = useState<string>("");

  const onComplete = (
    e: React.MouseEvent<HTMLButtonElement>,
    post: PostData
  ) => {
    console.log("완료");
  };

  const onShow = () => {
    setTodo("");
    setDateVal("");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodo(value);
  };

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateVal = e.target.value;
    setDateVal(dateVal);
  };

  const body = (
    <Container>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <div>
          <TextField
            id="outlined-basic"
            label="todo"
            variant="outlined"
            size="small"
            required
            value={todo}
            onChange={onChange}
          />
        </div>
        <div>
          <TextField
            id="date"
            label="deadline"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={dateVal}
            onChange={onDateChange}
          />
        </div>
        <BtnWrapper>
          <Button variant="outlined" color="primary" size="small" type="submit">
            저장
          </Button>
          <Button variant="outlined" size="small" onClick={onClose}>
            취소
          </Button>
        </BtnWrapper>
      </form>
    </Container>
  );

  useEffect(() => {
    console.log("렌더링 완료");
  }, []);

  return (
    <PostWrapper>
      <BtnWrapper>
        <Button
          variant="contained"
          color="primary"
          size="small"
          disableElevation
          onClick={onShow}
        >
          추가
        </Button>
      </BtnWrapper>

      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </PostWrapper>
  );
};

export default Post;
