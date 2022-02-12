import React from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Segment } from 'semantic-ui-react';
import { deleteComment } from '../actions/PostActons';
import { Comment as ModelComment, User } from '../model/model.type';
import { StateType } from '../model/store.type';

interface Props {
    comment: ModelComment,
    user: User | null,
    onDelete: (comment: ModelComment) => Promise<void>
}
function PostComment(props: Props) {

    const canDelete = () => {
        if (!props.user) {
            return false;
        }
        if (props.user.category === 'admin') {
            return true;
        }
        if (!props.comment.user) {
            return false;
        }
        return props.comment.user.id === props.user.id || props.comment.post.author.id === props.user.id
    }
    return (
        <Segment>
            <Comment>
                {canDelete() && <Comment.Actions >
                    <Comment.Action as={Button} onClick={() => {
                        props.onDelete(props.comment);
                    }} size='tiny' color='red' floated='right' >X</Comment.Action>
                </Comment.Actions>}
                <Comment.Content>

                    <Comment.Author >{(props.comment.user) ? (props.comment.user.firstName + " " + props.comment.user.lastName) : 'user is not found'}</Comment.Author>

                    <Comment.Text>
                        <p>{props.comment.content}</p>
                    </Comment.Text>

                </Comment.Content>
            </Comment>
        </Segment>
    );
}
export default connect((state: StateType) => {
    return {
        user: state.user
    }
}, dispach => {
    return {
        onDelete: deleteComment(dispach)
    }
})(PostComment)