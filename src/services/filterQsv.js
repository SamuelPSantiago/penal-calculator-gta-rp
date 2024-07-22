async function filterQsv(id_of, selectedVtrs, users) {
    const targetUser = users.find(user => user.id_ct === id_of);

    if (targetUser) {
        const relatedUsers = targetUser.current_call !== null
            ? users.filter(user =>
                (user.current_call === targetUser.current_call ||
                    selectedVtrs.includes(user.current_call)) &&
                user !== targetUser
            )
            : users.filter(user =>
                selectedVtrs.includes(user.current_call) &&
                user !== targetUser
            );

        return relatedUsers;
    } else
        return;
}

export default filterQsv;