async function Import(module) {
	try {
		return (await import(module)).default;
	} catch (err) {
		throw new Error("Import error: ", err);
	}
}

module.exports = Import;