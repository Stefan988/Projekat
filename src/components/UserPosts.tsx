import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Container, Header, Pagination, Table } from 'semantic-ui-react';
import { deletePost } from '../actions/PostActons';
import { Post, User } from '../model/model.type';
import { StateType } from '../model/store.type';
interface Props {
    user?: User,
    posts: Post[],
    onDelete: (id: number) => void
}
function UserPosts(props: Props) {
    const [page, setPage] = React.useState(1);
    const [posts, setPosts] = React.useState<Post[]>(props.posts);
    const [direction, setDirection] = React.useState<'ascending' | 'descending' | undefined>(undefined);
    const [column, setColumn] = React.useState<string | null>(null);

    React.useEffect(() => {
        setPosts(props.posts)
    }, [props.posts])
    if (!props.user) {
        return (
            <Redirect to='/login' />
        )
    }
    const handleSort = (selCol: string) => {
        if (selCol !== column) {
            setColumn(selCol);
            setDirection('ascending');
            if (selCol === 'title') {
                setPosts(props.posts.sort((a, b) => {
                    return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
                }))
                return;
            }
            if (selCol === 'comm') {
                setPosts(props.posts.sort((a, b) => a.comments.length - b.comments.length));
                return;
            }
            if (selCol === 'author') {
                setPosts(props.posts.sort((a, b) => (a.author.id === props.user?.id || a.author.username > b.author.username) ? 1 : -1));
                return;
            }
            if (selCol === 'category') {
                setPosts(props.posts.sort((a, b) => a.category.value > b.category.value ? 1 : -1))
            }




        } else {
            setPosts(posts.reverse());
            setDirection(direction === 'descending' ? 'ascending' : 'descending')
        }
    }
    return (
        <Container fluid   >
            <Header as='h1'>Your posts</Header>
            <Table sortable >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'title' ? direction : undefined} onClick={() => { handleSort('title') }} >Title</Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'comm' ? direction : undefined} onClick={() => { handleSort('comm') }}>No. of comments</Table.HeaderCell>
                        {props.user && props.user.category === 'admin' && <Table.HeaderCell onClick={() => { handleSort('author') }} sorted={column === 'author' ? direction : undefined}>Author</Table.HeaderCell>
                        }
                        <Table.HeaderCell sorted={column === 'category' ? direction : undefined} onClick={() => { handleSort('category') }}  >Category</Table.HeaderCell>
                        <Table.HeaderCell>Details</Table.HeaderCell>
                        <Table.HeaderCell>Modify</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {posts.slice((page - 1) * 5, 5 * page).map((element, index) => {
                        return (
                            <Table.Row key={element.id}>
                                <Table.Cell>{(page - 1) * 5 + index + 1}</Table.Cell>
                                <Table.Cell>{element.title}</Table.Cell>
                                <Table.Cell>{element.comments ? element.comments.length : 0}</Table.Cell>
                                {(props.user && props.user.category === 'admin') ? (<Table.Cell>{(element.author && element.author.id === props.user?.id) ? 'You' : (element.author?.username || 'not found')}</Table.Cell>) : null
                                }
                                <Table.Cell>{element.category.value}</Table.Cell>
                                <Table.Cell >
                                    <Link to={`/post/${element.id}`}>Details</Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={`/update/${element.id}`}> Modify</Link>
                                </Table.Cell>
                                <Table.Cell >
                                    <Button onClick={(e, data) => {
                                        props.onDelete(element.id);
                                    }} color='red'>Delete</Button>
                                </Table.Cell>

                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <Pagination activePage={page} onPageChange={(event, data) => {
                console.log(data);
                if (typeof data.activePage === 'string') {

                    setPage(parseInt(data.activePage))
                } else {
                    setPage(data.activePage || 1);
                }
            }} totalPages={Math.ceil(posts.length / 5)} />

        </Container>
    );
}
export default connect((state: StateType) => {
    return {
        user: state.user,
        posts: state.posts.filter(element => state.user && (state.user.category === 'admin' || (element.author && element.author.id === state.user.id)))
    }
}, (dispach) => {
    return {
        onDelete: deletePost(dispach)
    }
})(UserPosts);