import React, { useState } from 'react';
import {DELETE_POST_MUTATION,DELETE_COMMENT_MUTATION} from '../util/grap';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import MyPopup from '../util/MyPopup';
import { FETCH_POSTS_QUERY } from '../util/grap'

function DeleteButton({ postId, callback ,commentId}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if(!commentId){
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        });
        data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId
    }
  });
  return (
    <>
     <MyPopup content={commentId ? 'Delete comment':'Delete post'}>
     <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
     </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}



export default DeleteButton;