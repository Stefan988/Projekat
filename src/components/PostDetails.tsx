import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Comment, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { Post, User } from '../model/model.type';
import { StateType } from '../model/store.type';
import PostComment from './PostComment';
import { addComment } from '../actions/PostActons';

interface Props {
    post: Post,
    user?: User,
    onAddComment: (content: string, post: Post) => Promise<void>
}
function PostDetails(props: Props & RouteComponentProps) {
    const [showComments, setShowComments] = React.useState(true);
    const [comment, setComment] = React.useState('');
    if (!props.post) {
        return (<>Loading</>)
    }
    const printAuthor = () => {
        if (!props.post.author) {
            return 'User no longer exists';
        }
        if (props.post.author.id === props.user?.id) {
            return 'you';
        }
        return props.post.author.firstName + ' ' + props.post.author.lastName;
    }
    return (
        <Grid className='postDetails' centered >
            <Grid.Row >
                <Grid.Column >
                    <Header size='huge' textAlign='center'>
                        <Header.Content>
                            {props.post.title}
                        </Header.Content>
                        <Header.Subheader >
                            Author: {printAuthor()}
                        </Header.Subheader>
                        <Header.Subheader>
                            Category: {props.post.category.value}
                        </Header.Subheader>
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row stretched >
                <Grid.Column stretched >
                    <Segment basic attached='top' size='large'>
                        {props.post.description.split('\n').map(element => (
                            <p>{element}</p>
                        ))}
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row >
                <Grid.Column >
                    <Segment inverted as={Button} fluid onClick={() => setShowComments(prev => !prev)} >{(showComments) ? 'Hide ' : 'Show '}comments</Segment>
                    <Comment.Group className='center' collapsed={!showComments}>
                        {props.post.comments.map(element => {
                            return (
                                <PostComment key={element.id} comment={element} />
                            )
                        })}
                        {props.user && <Form>
                            <Form.TextArea placeholder='Add comment...' value={comment} onChange={(e, data) => {
                                setComment(e.currentTarget.value);
                            }} />
                            <Button content='Add Comment' onClick={(e) => {
                                e.preventDefault();
                                console.log(props.post);
                                props.onAddComment(comment, props.post).then(() => {
                                    setComment('');
                                });
                            }} labelPosition='left' icon='edit' primary />
                        </Form>}
                    </Comment.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
export default withRouter(connect((state: StateType, ownProps: RouteComponentProps) => {
    return {
        post: state.posts.find(element => {
            const id = (ownProps.match.params as any).id;
            // console.log({ ownProps: ownProps, equals: id == element.id });
            return id == element.id
        }) as Post,
        user: state.user
    }
}, (dispach) => {
    return {
        onAddComment: addComment(dispach)
    }
})(PostDetails));