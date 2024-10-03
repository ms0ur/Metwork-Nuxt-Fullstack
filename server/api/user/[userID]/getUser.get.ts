import User from "~/server/interfaces/user.interface";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "userID");

    if (!id) {
        setResponseStatus(event, 400, "Not enough arguments");
        return {};
    }

    const user = await getByID(id);
    if (!user) {
        setResponseStatus(event, 404, "User not found");
        return {};
    }
    let newUser: User;

    if (user.isPrivate){
        newUser = {
            id: user._id,
            email: user.email,
            username: user.username,
            avatar: user.avatar
        }
    } else {
        newUser = {
            id: user._id,
            email: user.email,
            username: user.username,
            name: user.name,
            surname: user.surname,
            birthdate: user.birthdate,
            sex: user.sex,
            city: user.city,
            country: user.country,
            description: user.description,
            avatar: user.avatar
        }
    }

    return newUser
})