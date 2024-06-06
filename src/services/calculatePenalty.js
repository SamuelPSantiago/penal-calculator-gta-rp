function calculatePenalty(accusations, mitigation, aggravating) {
    const desacato = accusations.some(accusation => accusation.key === 59);

    let percentage = 0;
    let penalty = 0;

    accusations.forEach(accusation => {
        penalty += accusation.pena;
    });

    if(mitigation.adv)
        percentage -= 0.3;
    if(mitigation.cc && !mitigation.adv)
        percentage -= 0.1;
    if(mitigation.cc && mitigation.adv)
        percentage -= 0.2;
    if(mitigation.rp)
        percentage -= 0.1;

    if(aggravating.rm)
        percentage += 0.3;
    if(aggravating.rd)
        percentage += 0.2;
    if(aggravating.rm)
        percentage -= 0.5;
    if(aggravating.rm)
        percentage += 0.5;

    if(desacato)
        percentage += 0.5;

    let finalPenalty = Math.ceil(penalty * (1 + percentage));

    if (finalPenalty > 60)
        finalPenalty = 60;

    return finalPenalty;
}

export default calculatePenalty;