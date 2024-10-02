import IPost from "~/server/interfaces/post.interface";



export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if (!(body?.postID)) {
        setResponseStatus(event, 400, "Not enough arguments");
        return {};
    }
    if (body?.method){
        switch(body?.method){
            case "like":
                console.log(body?.postID, body?.userID);
                return await likePost(body?.postID, body?.userID);

            case "comment":
                return await addCommentToPost(body?.postID, body?.userID, body?.comment);
            case "delete":
                return await deletePost(body?.postID);


        }
    }
})