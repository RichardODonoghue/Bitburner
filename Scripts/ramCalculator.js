/** @param {NS} ns */
export async function main(ns) {
	const args = ns.args
	const ram = Math.pow(2, args[0])
	ns.tprint(ram)
}