/** @param {NS} ns */
export async function main(ns) {

	const playerHackLevel = ns.getHackingLevel()
	const hackedServers = []
	const unhackableServers = []
	const hackScript = 'hack.js';

	//Neighbours of home at the start of the game. 
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

	const backdoor = (server) => {
		ns.getServer(server).backdoorInstalled ? ns.backdoor(server) : ns.print(server, ' not backdoored')
	}

	const openPorts = (server, ports) => {
		try {
			switch (ports) {
				case 1:
					ns.brutessh(server);
					break
				case 2:
					ns.brutessh(server);
					ns.ftpcrack(server);
					break;
				case 3:
					ns.brutessh(server);
					ns.ftpcrack(server);
					ns.relaysmtp(server);
					break;
				case 4:
					ns.brutessh(server);
					ns.ftpcrack(server);
					ns.relaysmtp(server);
					ns.httpworm(server)
					break;
				case 5:
					ns.brutessh(server);
					ns.ftpcrack(server);
					ns.relaysmtp(server);
					ns.httpworm(server);
					ns.sqlinject(server);
					break;
			}
		} catch (err) {
			ns.printf(err.message)
		}
	}

	//This function checks the server ram, and works out how many threads per script
	const getMaxThreads = (server) => {
		const serverRAM = ns.getServerMaxRam(server)
		const scriptRAM = 2 
		if (Math.floor(serverRAM / scriptRAM) === Infinity) {
			return 1
		} else {
			ns.tprint(Math.floor(serverRAM / scriptRAM / 3))
			return Math.floor(serverRAM / scriptRAM / 3)
		}
	}

	//attempt to gain root access to a server based on max number of ports that can be opened and player hacking level
	const gainRootAccess = (server) => {
		try {
			const hacked = ns.hasRootAccess(server);
			const hackable = ns.getServerRequiredHackingLevel(server) <= playerHackLevel;
			const ports = ns.getServerNumPortsRequired(server);
			const threads = getMaxThreads(server)
			ns.tprint(server, " has ", threads, " threads available")
			if (hacked || (hackable)) {
				backdoor(server)
				openPorts(server, ports)
				!hacked ? ns.nuke(server) : null;
				ns.killall(server)
				ns.scp(hackScript, server, 'home');
				if (threads > 1) {
					ns.scp('grow.js', server, 'home');
					ns.scp('weaken.js', server, 'home');
					ns.exec('grow.js', server, threads)
					ns.exec('weaken.js', server, threads)
					ns.exec(hackScript, server, threads)
				} else {
					//ns.exec(hackScript, server, threads)
					ns.exec('grow.js', server, 1)
					ns.exec('weaken.js', server, 1)
				}
				hackedServers.push(server);
			}
			else {
				unhackableServers.push(server);
			}
		} catch (err) {
			//ns.printf(err.message)
		}
	};

	const getNeighbours = (server) => {
		return ns.scan(server)
	};

	getAllHostNames(servers);

	servers.forEach(server => {
		gainRootAccess(server);
	})

	ns.tprint(`\n Root access obtained on servers: \n ${hackedServers}`);
	ns.tprint(`\n Failed to gain root access on servers: \n ${unhackableServers}`);
};