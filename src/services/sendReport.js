import requests from '../assets/config/requests.json';

async function sendReport(content, file, responsible, officersPresent) {
    if (!file) {
        alert("Anexe a foto do indivíduo!");
        return false;
    }

    if (content.trim() === '') {
        alert("Gere o relatório antes, e o revise!");
        return false;
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
        if (!response.ok) {
            throw new Error("Failed to send report");
        }

        let id_list = [];
        id_list.push(responsible.id_dc);
        officersPresent.forEach(officer => {
            id_list.push(officer.id_dc);
        });

        const formdata2 = new FormData();
        formdata2.append("json", JSON.stringify({ id_dc_list: id_list }));

        const requestOptions2 = {
            method: "POST",
            body: formdata2,
            redirect: "follow"
        };

        const response2 = await fetch(requests.api_update_prisons, requestOptions2);
        if (!response2.ok) {
            throw new Error("Failed to update prisons");
        }

        return true;

    } catch (error) {
        console.error(error);
        return false;
    }
}

export default sendReport;