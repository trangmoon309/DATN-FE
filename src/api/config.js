export const API_URL = "http://localhost:3333/api";
export const API_URL_IDENTITY_API = "http://localhost:2222/api";
export const API_URL_TOKEN = "http://localhost:2222/connect/token";


const POST = "post";
const GET = "get";
const DELETE = "delete";
const PUT = "put";


export const HttpMethod = {
    POST,
    GET,
    DELETE,
    PUT
};

// USER
const Profile = '/users/current';
const ProfileAvatar = '/users/avatar/current';
const Register = '/users';
export const UserEndpoint = {
    Profile,
    Register,
    ProfileAvatar,
}

const GetProfileImage = 'profile-images/byName';
export const ProfileImageEndpoint = {
    GetProfileImage
}
