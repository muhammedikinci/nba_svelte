<script>
	import { getCurrentRound, startSimulation, stopSimulation, getState } from "./api"

	let apiMessage = ""
	let minterval = null
	let data = { matches: [] }
	let state = { }

	async function start() {
		let response = await startSimulation()

		if (response.status) {
			minterval = setInterval(getRounds, 5 * 1000);
		}

		apiMessage = response.message
	}

	async function startAll() {
		let response = await startSimulation(true)

		if (response.status) {
			minterval = setInterval(getRounds, 5 * 1000);
		}

		apiMessage = response.message
	}

	async function stop() {
		let response = await stopSimulation()

		apiMessage = response.message

		clearInterval(minterval)

		state = await getState()
	}

	async function getRounds() {
		data = await getCurrentRound()
		data.matches.forEach((match) => {
			match.home.players = match.home.players.map(setRate)
			match.away.players = match.away.players.map(setRate)
		})

		state = await getState()
	}

	function setRate(player) {
		let total = player.successShoots + player.failShoots
		let rate = player.successShoots

		if (total != 0 && player.failShoots != 0) {
			rate = (total / player.failShoots).toFixed(2)
		}

		return {
			...player,
			rate
		}
	}
	
</script>

<main>
	<div class="flex justify-center">
		<div class="flex flex-col w-8/12">
			<div class="flex flex-col justify-center">
				<span class="text-3xl font-bold mb-4 text-center">Simulation Control</span>
			
				<div class="flex justify-center">
					<button class="rounded p-2 px-4 border-none bg-slate-700 text-white mr-2" on:click={start} >Start Week 1</button>
					<button class="rounded p-2 px-4 border-none bg-slate-700 text-white mr-2" on:click={startAll} >Start All Weeks</button>
					<button class="rounded p-2 px-4 border-none bg-slate-700 text-white" on:click={stop} >Stop Simulation</button>
				</div>
		
				<div class="font-bold mt-4 text-center">
					{apiMessage}
				</div>

				<div class="mt-4">
					<div>
						Status: {state.status ? "Running":"Stopped"}
					</div>
					<div>
						Week: {(state.currentRound || 0) + 1}
					</div>
				</div>
			</div>
		
			<div>
				{#each data.matches as match }
					<div class="flex flex-col rounded bg-slate-200 p-4 m-4">
						<div class="text-center p-2 rounded bg-slate-300 mb-3">
							Attack Count : {match.attackCount}
						</div>

						<div class="flex place-content-between">
							<div class="flex flex-col">
								<div class="flex place-content-between">
									<span class="text-bold p-2 bg-slate-300 rounded">Home Team: {match.home.name}</span>
									<span class="text-bold p-2 bg-slate-300 rounded">Score: {match.home.points}</span>
								</div>
	
								<div class="flex flex-col mt-4">
									<table class="bg-slate-300 rounded">
										<thead>
											<td class="px-4 py-1">Name</td>
											<td class="px-4 py-1">Points</td>
											<td class="px-4 py-1">Blocks</td>
											<td class="px-4 py-1">Assists</td>
											<td class="px-4 py-1">Rate</td>
										</thead>
										<tbody>
											{#each match.home.players as player }
												<tr>
													<td class="px-4 py-1">{player.name}</td>
													<td class="px-4 py-1">{player.points}</td>
													<td class="px-4 py-1">{player.blocks}</td>
													<td class="px-4 py-1">{player.assists}</td>
													<td class="px-4 py-1">{player.rate}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</div>
			
							<div class="flex flex-col">
								<div class="flex place-content-between">
									<span class="text-bold p-2 bg-slate-300 rounded">Score: {match.away.points}</span>
									<span class="text-bold p-2 bg-slate-300 rounded">Away Team: {match.away.name}</span>
								</div>
	
								<div class="flex flex-col mt-4">
									<table class="bg-slate-300 rounded">
										<thead>
											<td class="px-4 py-1">Name</td>
											<td class="px-4 py-1">Points</td>
											<td class="px-4 py-1">Blocks</td>
											<td class="px-4 py-1">Assists</td>
											<td class="px-4 py-1">Rate</td>
										</thead>
										<tbody>
											{#each match.away.players as player }
												<tr>
													<td class="px-4 py-1">{player.name}</td>
													<td class="px-4 py-1">{player.points}</td>
													<td class="px-4 py-1">{player.blocks}</td>
													<td class="px-4 py-1">{player.assists}</td>
													<td class="px-4 py-1">{player.rate}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</main>

<style>
</style>