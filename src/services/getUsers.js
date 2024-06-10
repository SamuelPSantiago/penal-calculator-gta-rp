import requests from '../assets/config/requests.json';

async function getUsers() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    try {
        const response = await fetch(requests.api_get_all_users, requestOptions);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === "sucess") {
            return result.data;
        } else if (result.status === "error") {
            console.error(result.data);
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export default getUsers;
