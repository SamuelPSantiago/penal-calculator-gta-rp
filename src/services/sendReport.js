import requests from '../../assets/config/requests.json';

async function sendReport(content, file) {

    const formdata = new FormData();
    formdata.append("content", content);
    formdata.append("file", file, file.name);

    const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    try {
        const response = await fetch(requests.webhook, requestOptions);
    } catch (error) {
        console.error(error);
    }
}

export default sendReport;