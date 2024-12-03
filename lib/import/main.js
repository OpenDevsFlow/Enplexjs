async function Import(module) {
	try {
		return (await import(module)).default;
	} catch (err) {
		throw new Error("Import Error:" +  error);
	}
}

module.exports = Import;