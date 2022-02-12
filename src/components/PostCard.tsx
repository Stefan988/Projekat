import React from 'react';
import { Card } from 'semantic-ui-react';
import { Post } from '../model/model.type';
import { Link } from 'react-router-dom';
interface Props {
    post: Post,
    showComments?: boolean
}
export default function PostCard(props: Props) {
    return (
        <Card fluid as={Link} to={`/post/${props.post.id}`} color='black'>
            <Card.Content >
                <Card.Header textAlign='center' >{props.post.title}</Card.Header>
                <Card.Meta textAlign='center'>Category: {props.post.category.value}</Card.Meta>
                <Card.Meta textAlign='center'>Author: {props.post.author.username}</Card.Meta>

            </Card.Content>

        </Card>
    );
}
