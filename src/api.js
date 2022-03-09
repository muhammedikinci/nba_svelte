import { API_URL, START_SIMULATION, GET_CURRENT_ROUND, STOP_SIMULATION, GET_STATE } from "./constant"

const startSimulation = async (runAll) => {
    let fullUrl = API_URL + START_SIMULATION

    if (runAll) {
        fullUrl += "?runAll=true"
    }

    let res = await fetch(fullUrl, { 
		method: 'POST',
    })

    return await res.json()
}

const stopSimulation = async () => {
    let res = await fetch(API_URL + STOP_SIMULATION, { 
		method: 'DELETE',
    })

    return await res.json()
}

const getCurrentRound = async () => {
    let res = await fetch(API_URL + GET_CURRENT_ROUND)

    return await res.json()
}

const getState = async () => {
    let res = await fetch(API_URL + GET_STATE)

    return await res.json()
}

export {
    startSimulation,
    stopSimulation,
    getCurrentRound,
    getState
}