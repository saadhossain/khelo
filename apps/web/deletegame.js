const deleteUsersGames = async () => {
    await fetch(`http://localhost:3000/api/game/delete`, {
        method: 'DELETE'
    })
    console.log('All Developement Data deleted...')
}
deleteUsersGames()