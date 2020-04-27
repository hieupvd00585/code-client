import React,{useContext} from 'react'
import {Card,Icon,Label,Image,Button} from 'semantic-ui-react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton'
import MyPopup from '../util/MyPopup'

const PostCard = ({post:{body,createdAt,id,username,likeCount,commentCount,likes}}) =>{
  const { user } = useContext(AuthContext);
  
    return(
       <Card>
           <Card.Content>
               <Image floated="right"
               size="mini"
               src="https://noidangsong.vn/files/uploads/fb1735058496563345/1526444239-tt_avatar_small.jpg" />
               <Card.Header>{username}</Card.Header>
    <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
    <Card.Description>{body}</Card.Description>
           </Card.Content>
           <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }}/>
       
        <MyPopup content='Comment on post'> 
        <Button  labelPosition="right" as={Link} to={`/posts/${id}`} >
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        </MyPopup>
        {user && user.username === username && (
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => console.log('Delete post')}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
       </Card>
    )
}
export default PostCard