async function filterQsv(id_of, selectedVtrs, users) {
    const targetUser = users.find(user => user.id_ct === id_of);

    console.log(selectedVtrs);

    const relatedUsers = users.filter(user => 
        ( user.current_call || 
        selectedVtrs.includes(user.current_call) ) && 
        user !== targetUser
    );

    return relatedUsers;
}

export default filterQsv;