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
        const response = await fetch("https://discord.com/api/webhooks/1247687178801254410/VYHoxLL0HUrvm0adcUjsYgzPVC9CmjHZ-6g3PGnEztMRf9OQEZhWOdfg89nzBaqd2Sqx", requestOptions);
    } catch (error) {
        console.error(error);
    }
}

export default sendReport;