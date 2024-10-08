import BError from "~/server/classes/Error";
import {searchPosts} from "~/server/utils/PostManage";
import IPost from "../../interfaces/post.interface";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if (!body?.query) {
        setResponseStatus(event, 400, "Not enough arguments");
        return {};
    }
    let posts: IPost[] | BError;
    try {
        posts = await searchPosts(body?.query);
    } catch (e) {
        console.error(e);
        setResponseStatus(event, 500, "errors.server");
        return {};
    }
    return posts;
})