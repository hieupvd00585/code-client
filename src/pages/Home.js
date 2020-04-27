import React,{useEffect,useState,useContext} from "react";
import { useQuery } from "@apollo/react-hooks";
import {FETCH_POSTS_QUERY} from "../util/grap"
import {Grid} from "semantic-ui-react"
import PostCard from "../components/PostCard"
import{AuthContext} from '../context/auth'
import PostForm from '../components/PostForm'

const Home = () => {
  const {user} = useContext(AuthContext)
    const [posts, setPosts] = useState([]);
   const {
       loading,
       data
   } = useQuery(FETCH_POSTS_QUERY)

   useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
      console.log(data);
      
    }
  },[data])
  
  if (posts.length === 0) {
    return <h3>No posts as of yet</h3>
  }
  return(
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
            {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
              {
                  loading ? (<h1>Loading post...</h1>):(posts && posts.map(post =>(
                    <Grid.Column key={post.id} style ={{marginBottom:20}}>
                        <PostCard post={post}/>
                    </Grid.Column>
                ))
                )
              }
            </Grid.Row>
        </Grid>
        
  )
}

export default Home;
