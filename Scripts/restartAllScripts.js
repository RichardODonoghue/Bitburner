/** @param {NS} ns */
export async function main(ns) {
	const purchasedServers = ns.getPurchasedServers()

	purchasedServers.forEach(server => {
		try  {
		ns.scriptKill('early-hack-template.script', server);
		ns.scp('early-hack-template.script', 'home', server);
		ns.exec('early-hack-template.script', server, 12);
		} catch (err) {
			ns.print(err)
		}
	})
}