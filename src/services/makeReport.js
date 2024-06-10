function makeReport(formData, responsible, accusations, penalty, officers) {
    if (!formData || formData.id_in === '' || formData.id_of === '' || !responsible || !accusations || accusations.length === 0 || penalty === 0) {
        alert("Algum campo está vazio, revise o relatório!");
        return '';
    }

    let accusationsString = '';
    accusations.forEach((accusation, index) => {
        if (index === accusations.length - 1)
            accusationsString += "Art. " + accusation.key;
        else
            accusationsString += "Art. " + accusation.key + ", ";
    });

    let officersString = '';
    officers.forEach((officer, index) => {
        officersString += "<@" + officer.id_dc + ">";
        if (index < officers.length - 1) {
            officersString += ", ";
        }
    });


    const date = new Date();

    const utc3Date = new Date(date.getTime() - (3 * 60 * 60 * 1000));

    const day = String(utc3Date.getUTCDate()).padStart(2, '0');
    const month = String(utc3Date.getUTCMonth() + 1).padStart(2, '0');
    const year = utc3Date.getUTCFullYear();

    const hours = String(utc3Date.getUTCHours()).padStart(2, '0');
    const minutes = String(utc3Date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(utc3Date.getUTCSeconds()).padStart(2, '0');

    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    let report = "***👮‍♂️ OFICIAL***: <@" + responsible.id_dc + "> \n\n";
    report += "================PRENDEU================\n";
    report += "***📋 PASSAPORTE***: " + formData.id_in + "\n";
    report += "***⏰ TEMPO***: " + penalty + " meses\n";
    report += "***🧨 CRIMES***: " + accusationsString + "\n";
    report += "***📆 Data***: " + formattedDateTime + "\n";
    if (officersString != '')
        report += "**🤝 Participantes**: " + officersString + "\n";

    return report;
}

export default makeReport;