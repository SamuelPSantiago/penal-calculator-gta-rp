import requests from '../assets/config/requests.json';

async function getUsers() {

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    try {
        const response = await fetch(requests.api_get_all_users, requestOptions);

        const result = await response.json();
        if (result.status === "sucess") {
            return result.data;
        } else if (result.status === "error") {
            console.error(result.data);
        }
    } catch (error) {
        console.error(error);
    }
}

export default getUsers;