async function getResponsible(id_of, users) {
    const targetUser = users.find(user => user.id_ct === id_of);

    return targetUser;
}

export default getResponsible;