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
const GetUserList = '/users';
export const UserEndpoint = {
    Profile,
    Register,
    ProfileAvatar,
    GetUserList
}

// Profile
const GetProfileImage = 'profile-images/byName';
export const ProfileImageEndpoint = {
    GetProfileImage
}

// VehicleLine
const VehicleLine = 'vehicle-lines';
export const VehicleLineEndpoint = {
    VehicleLine
}

// VehicleType
const VehicleType = 'vehicle-types';
export const VehicleTypeEndpoint = {
    VehicleType
}

// Vehicle
const Vehicle = 'vehicles';
const UploadImages = 'upload-vehicle-images';
const GetListByCondition = 'by-condition';
const GetItemListByDate = 'by-date';
export const VehicleEndpoint = {
    Vehicle,
    UploadImages,
    GetListByCondition,
    GetItemListByDate
}

// Recommend
const Recommend = 'recommend';
const GetRecommendList = 'get-props/by-user';
const TrackingChange = 'tracking-changes';
export const RecommendEndpoint = {
    Recommend,
    GetRecommendList,
    TrackingChange,
}


// User Transaction
const UserTransaction = 'user-transactions';
const Summary = 'summary';
export const UserTransactionEndpoint = {
    UserTransaction,
    Summary
}

// User Cart
const UserCart = 'user-carts';
const GetByUser = 'by-user';
const CreatePayment = 'paypals/payment/create';
const SuccessPayment = 'paypals/payment/success';
export const UserCartEndpoint = {
    UserCart,
    GetByUser,
    CreatePayment,
    SuccessPayment
}