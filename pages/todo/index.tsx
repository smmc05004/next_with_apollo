import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Button, Modal, TextField  } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { postRequest, postsRequest } from '../../modules/post';
import { RootStateInterface } from '../../interfaces/rootState';
import { User } from '../../interfaces/module/auth/auth.interface';
import { Post } from '../../interfaces/module/post/post.interface';
import { postItem } from '../../components';

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

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

interface postProps {
  user: User | null,
  isLogined: boolean,
  posts: Post[] | [],
}

const list = [1, 2];

const Todo = () => {
  const dispatch = useDispatch();
  const { user, isLogined, posts }: postProps = useSelector((state: RootStateInterface) =>({
    user: state.auth.user,
    isLogined: state.auth.isLogined,
    posts: state.post.posts,
  }))
  const [open, setOpen] = useState<boolean>(false);
  const [todo, setTodo] = useState<string>('');
  const [dateVal, setDateVal] = useState<string>('');

  const onShow = () => {
    setTodo('');
    setDateVal('');
    setOpen(true);
  }
  
  const onClose = () => {
    setOpen(false);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLogined) {
      console.log('로그인이 필요합니다.');
      return;
    }

    if (dateVal === '') {
      console.log('날짜를 선택해 주세요.');
      return;
    }

    if (todo === '') {
      console.log('할 일을 기입해 주세요.');
      return;
    }

    if (isLogined && user && dateVal !== '' && todo !== '') {
      const post = {
        content: todo,
        deadline: dateVal,
        iscomplete: false,
        userId: user.id,
      };
      dispatch(postRequest({ post }));
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodo(value);
  }

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateVal = e.target.value;
    setDateVal(dateVal);
  }

  const body = (
    <Container>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <div>
        <TextField id="outlined-basic" label="todo" variant="outlined" size="small" required value={todo} onChange={onChange}/>
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
        <Button variant="outlined" color="primary" size="small" type="submit" >저장</Button>
        <Button variant="outlined" size="small" onClick={onClose}>취소</Button>
      </BtnWrapper>
      </form>
    </Container>
  );
  
  console.log('posts: ', Array.isArray(posts));

  useEffect(() => {
    if (user) {
      dispatch(postsRequest({id: user.id}));
    }
  }, []);
  return (
    <div>
      <h1>POST</h1>

      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>할일</th>
            <th>완료여부</th>
          </tr>
        </thead>
        <tbody>
          {
            posts
            ? (
              posts.map((post, index) => <div>aaa</div>)
              // posts.map((post: Post, index: number) => <div key={index}>{post.content}</div>)
            ): null
          }
          {/* <tr>
            <td>2012.02.02</td>
            <td>청소</td>
            <td>완료</td>
          </tr>
          <tr>
            <td>2012.02.02</td>
            <td>청소</td>
            <td>완료</td>
          </tr>
          <tr>
            <td>2012.02.02</td>
            <td>청소</td>
            <td>완료</td>
          </tr> */}
        </tbody>
      </table>

      <div>
        <Button variant="contained" color="primary" size="small" disableElevation onClick={onShow}>추가</Button>
      </div>

      <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
        {body}
      </Modal>
    </div>
  )
}

export default Todo;