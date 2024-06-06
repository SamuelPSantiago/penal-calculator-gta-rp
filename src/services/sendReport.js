import requests from '../assets/config/requests.json';

async function sendReport(content, file) {
    if (!file) {
        alert("Anexe a foto do indivíduo!");
        return;
    }

    if (content.trim() === '') {
        alert("Gere o relatório antes, e o revise!");
        return;
    }

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