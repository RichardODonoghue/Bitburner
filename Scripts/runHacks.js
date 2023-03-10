/** @param {NS} ns */
export async function main(ns) {
	const args = ns.args
	const server = args[0]
	const threads = args[1]
	ns.run('hack.js', threads, server)
	ns.run('grow.js', threads, server)
	ns.run('weaken.js', threads, server)
}