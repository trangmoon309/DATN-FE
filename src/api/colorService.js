import axios from "axios";


export default class ColorService{
    getAllColors(){
        return axios.get("https://springrestapi-carrental.herokuapp.com/api/colors/getAll")
    }
}