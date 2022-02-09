import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid, Label } from 'semantic-ui-react';
import './App.css';
import PostDetails from './components/PostDetails';
import TopMenu from './components/TopMenu';
import ViewPosts from './components/ViewPosts';
import { connect } from 'react-redux';
import { StateType } from './model/store.type';
import { loadPosts } from './actions/PostActons';
import Login from './components/user/Login';
import UserPosts from './components/UserPosts';
import NewPost, { UpdatePost } from './components/user/NewPost';
import AdminPage from './components/AdminPage';
import { chechUser } from './actions/UserActions';
import Signup from './components/user/Signup';
import { loadCategories } from './actions/PostCategoryActions';
function App(props: any) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {

    props.loadPosts();
    props.loadCat();
    props.findUser().then((value: void) => {
      console.log('end')
      setLoading(false);
    });
  }, [])
  if (loading) {
    return (<>
      <Label>Loading...</Label>
    </>)
  }
  return (
    <Grid padded='horizontally' columns='16' className='body'>
      <Grid.Row className='firstRow' >
        <TopMenu />
      </Grid.Row>

      <Grid.Row centered className='secondRow'>
        <Switch>
          <Route exact path='/'>
            <ViewPosts />
          </Route>
          <Route exact path='/post'>
            <UserPosts />
          </Route>
          <Route path='/post/:id'>
            <PostDetails />
          </Route>
          <Route exact path='/admin'>
            <AdminPage />
          </Route>
          <Route exact path='/newPost'>
            <NewPost />
          </Route>
          <Route exact path='/update/:id'>
            <UpdatePost />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route path='/'>
            Path does not exist
          </Route>
        </Switch>
      </Grid.Row>

    </Grid>
  );
}

export default connect((state: StateType) => {
  return {
  }
}, (dispach) => {
  return {
    loadPosts: loadPosts(dispach),
    findUser: chechUser(dispach),
    loadCat: loadCategories(dispach)
  }
})(App);
