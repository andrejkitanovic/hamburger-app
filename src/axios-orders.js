import axios from 'axios'

const instance = axios.create({
    baseURL: "https://hamburger-app-a51af.firebaseio.com/"
})

export default instance;