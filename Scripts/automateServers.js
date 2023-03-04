export async function main(ns) {
	ns.disableLog('sleep')
	ns.disableLog('getHackingLevel')
	let currHackLevel = ns.getHackingLevel()
	let targetHackLevel = currHackLevel + 10
	ns.run('getServers.js');

	while (true) {
		currHackLevel = ns.getHackingLevel()
		if (currHackLevel < targetHackLevel) {
			ns.print(`Player hacking level is ${currHackLevel} and target is ${targetHackLevel}`)
			await ns.sleep(6000)
		}
		else {
			targetHackLevel = currHackLevel + 10
			ns.run('getServers.js')
			await ns.sleep(6000)
		}
		ns.clearLog()
	}
}