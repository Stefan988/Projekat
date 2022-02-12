import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { loadCategories, setActiveCategory } from '../actions/PostCategoryActions';
import { PostCategory } from '../model/model.type';
import { StateType } from '../model/store.type';

interface Props {
    categories: PostCategory[],
    active: number,
    onClick: (cat: PostCategory) => void
    loadCat: () => Promise<void>
}
function PostFilter(props: Props) {


    return (
        <Menu vertical fluid >
            <Menu.Item className='inverted' >Categories</Menu.Item>
            {props.categories.map(element => {
                return (
                    <Menu.Item link key={element.id} active={element.id === props.active} onClick={(e) => {
                        props.onClick(element);
                    }}>
                        {element.value}
                    </Menu.Item>
                )
            })}
        </Menu>
    );
}
export default connect((state: StateType) => {
    return {
        categories: state.postCategories,
        active: state.selectedCategoryId
    }
}, (dispach) => {
    return {
        onClick: (cat: PostCategory) => {
            dispach(setActiveCategory(cat))
        },
        loadCat: loadCategories(dispach)
    }
})(PostFilter)
