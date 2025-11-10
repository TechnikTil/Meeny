module.exports = {
	apps: [{
		name: "meeny-beta",
		script: "build/index.js",
		watch: ["assets/", ".env", "build/"],
		watch_delay: 1000,
		instances: 1,
		exec_mode: "fork",
	}],
};
