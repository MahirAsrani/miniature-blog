// Domain URL
export const baseURL = process.env.baseURL;

// BLOGS
export const GET_POSTS = `${baseURL}/api/posts`;
export const GET_MY_POSTS = `${baseURL}/api/posts/my`;
export const GET_POST_BY_ID = `${baseURL}/api/posts`;
export const POST_POST = `${baseURL}/api/posts`;

// Auth
export const POST_AUTH = `${baseURL}/api/auth`;
export const GET_AUTH = `${baseURL}/api/auth`;
export const GET_LOGOUT = `${baseURL}/api/logout`;

// Category
export const GET_CAT = `${baseURL}/api/category`;
export const POST_CAT = `${baseURL}/api/category`;
export const PUT_CAT = `${baseURL}/api/category`;
export const DELETE_CAT = `${baseURL}/api/category`;