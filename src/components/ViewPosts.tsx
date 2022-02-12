import React from 'react';
import { connect } from 'react-redux';
import { Grid, Card } from 'semantic-ui-react';
import { Post } from '../model/model.type';
import { StateType } from '../model/store.type';
import PostCard from './PostCard';
import PostCategoryFilter from './PostCategoryFilter';
import PostFilter from './PostFilter';

interface StoreProps {
    posts: Post[],
}

function ViewPosts(props: StoreProps) {

    return (
        <>
            <Grid.Column floated='left' width='4'>
                <PostFilter />
            </Grid.Column>
            <Grid.Column width='8'>
                <Card.Group centered >
                    {props.posts.map(element => {
                        return (
                            <PostCard post={element} key={element.id} />
                        )
                    })}

                </Card.Group>
            </Grid.Column >
            <Grid.Column verticalAlign='top' width='4' >
                <PostCategoryFilter />
            </Grid.Column>
        </>
    );
}

export default connect((state: StateType) => {
    return {
        posts: state.posts.filter(element => element.title.toLowerCase().startsWith(state.title.toLowerCase()) && (!state.selectedCategoryId || element.category.id === state.selectedCategoryId)).sort((a, b) => b.id - a.id),

    }
})(ViewPosts);
