import requests from '../assets/config/requests.json';

async function sendReport(content, file, responsible, officersPresent) {
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

        let id_list = [];
        id_list.push(responsible.id_dc);
        officersPresent.forEach(officer => {
            id_list.push(officer.id_dc);
        });

        const formdata = new FormData();
        formdata.append("json", JSON.stringify({ id_dc_list: id_list }));

        const requestOptions2 = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        try {
            const response = await fetch("https://vlittle.site/bot_pf/update_prisons.php", requestOptions2)
        } catch (error) {
            console.error(error);
        }

    } catch (error) {
        console.error(error);
    }
}

export default sendReport;