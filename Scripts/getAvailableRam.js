/** @param {NS} ns */
export async function main(ns) {
	const servers = [
		"n00dles", "foodnstuff", "sigma-cosmetics",
		"joesguns", "nectar-net", "hong-fang-tea",
		"harakiri-sushi", "iron-gym"
	];

	//iterate through all servers to find their neighbours, their neighbours neighbours and so on... 
	const getAllHostNames = (servers) => {
		let i = 0
		while (i < servers.length) {
			//ns.print(servers.length)
			servers.forEach(server => {
				const neighbours = getNeighbours(server)
				neighbours.forEach(neighbour => {
					if (!servers.includes(neighbour)) {
						servers.push(neighbour)
					}
				})
			})
			i++;
		}
		ns.printf(`Found ${servers.length} servers`)
	}

	const getNeighbours = (server) => {
		return ns.scan(server)
	};

	getAllHostNames(servers)

	servers.forEach(server => {
		ns.tprint(server, " ", Math.floor(ns.getServerMaxRam(server) - ns.getServerUsedRam(server)),"GB")
	})
}