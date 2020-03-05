import {
    GET_ALL_BLOGS,
    GET_MY_BLOGS,
    ADD_BLOG,
    DELETE_BLOG
} from "../types"

export default (state, action) => {
    switch (action.type) {
        case GET_ALL_BLOGS:
            return {
                ...state,
                allBlogs: action.payload
            }
        case GET_MY_BLOGS:
            return {
                ...state,
                myBlogs: action.payload,
            }
        case ADD_BLOG:
            return {
                ...state,
                myBlogs: [...state.myBlogs, action.payload],
            }
        case DELETE_BLOG:
            return {
                ...state,
                myBlogs: state.myBlogs.filter(blog => blog.id !== action.payload)
            }
        default:
            return state;
    }
}