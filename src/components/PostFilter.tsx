
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StateType } from '../model/store.type'
import { Container, Form, Input, Segment, Header, Dropdown, Label, Divider, DropdownItemProps, Button } from 'semantic-ui-react'

import { setTitle } from '../actions/TitleActions'

interface Props {
    title: string,
    onTitleChange: (text: string) => void;
}

const PostFilter = (props: Props) => {

    React.useEffect(() => {
        /*  return () => {
 
         } */
        console.log({ props: props })
    }, [])

    return (
        <Container>
            <Header size='huge'> Filter posts </Header>
            <Form>
                <Label>Title</Label>
                <Input value={props.title} fluid onChange={(e, data) => {
                    props.onTitleChange(e.currentTarget.value);
                }} />


            </Form>


        </Container>
    )
}

const mapStateToProps = (state: StateType) => {
    return {
        title: state.title
    }
}

const mapDispatchToProps = (dispach: any) => {
    return {
        onTitleChange: (title: string) => { dispach(setTitle(title)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFilter)
