import axios from "axios";

const instance = axios.create({
    baseURL: process.env.BASE_URL,
})

export const checkoutAPI = {
    postEmail: (form:FormData) => instance.post('api/email', form, {
        headers: {
            'Content-Type': "multipart/form-data"
        },
    })
}
