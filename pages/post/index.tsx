import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Modal, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { doneRequest, postRequest, postsRequest } from "../../modules/post";
import { RootStateInterface } from "../../interfaces/rootState";
import { User, authState } from "../../interfaces/module/auth/auth.interface";
import { PostData } from "../../interfaces/module/post/post.interface";
import { PostList } from "../../components";
import { GetServerSideProps } from "next";
import wrapper from "../../store";
// import { checkLogin } from "../../modules/auth";
import { END } from "redux-saga";
import authSlice from "../../modules/auth";

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
  const dispatch = useDispatch();
  const { user, isLogined, posts }: PostVars = useSelector(
    (state: RootStateInterface) => ({
      user: state.auth.user,
      isLogined: state.auth.isLogined,
      posts: state.post.posts,
    })
  );
  const [open, setOpen] = useState<boolean>(false);
  const [todo, setTodo] = useState<string>("");
  const [dateVal, setDateVal] = useState<string>("");

  const onComplete = (
    e: React.MouseEvent<HTMLButtonElement>,
    post: PostData
  ) => {
    const { postId, complete } = post;

    dispatch(doneRequest({ id: postId, status: complete }));
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
    if (!isLogined) {
      console.log("로그인이 필요합니다.");
      return;
    }

    if (dateVal === "") {
      console.log("날짜를 선택해 주세요.");
      return;
    }

    if (todo === "") {
      console.log("할 일을 기입해 주세요.");
      return;
    }

    if (isLogined && user && dateVal !== "" && todo !== "") {
      const post = {
        contents: todo,
        deadline: dateVal,
        complete: "n",
        userId: user.id,
      };

      dispatch(postRequest({ post }));

      setOpen(false);
    }
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
    if (user) {
      dispatch(postsRequest({ id: user.id }));
    }
  }, []);

  return (
    <PostWrapper>
      <PostList posts={posts} onComplete={onComplete} />

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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (context: any) => {
    const { req } = context;

    if (req.cookies && req.cookies["my-cookie"]) {
      // console.log("coockie: ", req.cookies["my-cookie"]);
      const token = req.cookies["my-cookie"];
      // context.store.dispatch(checkLogin({ token }));
      context.store.dispatch(authSlice.actions.CHECK_LOGIN({ token }));
    } else {
      console.log("로그인 필요");
    }

    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
  }
);

export default Post;
