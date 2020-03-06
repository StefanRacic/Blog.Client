import {
    GET_ALL_BLOGS,
    GET_MY_BLOGS,
    ADD_BLOG,
    DELETE_BLOG,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_BLOG
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
        case UPDATE_BLOG:
            return {
                ...state,
                myBlogs: state.myBlogs.map(blog =>
                    blog.id === action.payload.id ? action.payload : blog
                )
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
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