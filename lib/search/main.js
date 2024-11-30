class Search {
	static async yt(q) {
		return await (await fetch(`${api}search?query=${q}`)).json();
	}

	static async github(q) {
		return await (await fetch(`${api}search/repo?query=${q}`)).json();
	}

	static async pin(q) {
		return await (await fetch(`${api}api/pin?query=${q}&count=3`)).json();
	}

	static async pexels(q) {
		return await (await fetch(`${api}api/pexels?query=${q}number=3`)).json();
	}

	static async wallpaper(q) {
		return await (await fetch(`${api}api/wallpaper?query=${q}&number=3`)).json();
	}

	static async animeWallpaper(q) {
		return await (await fetch(`${api}api/wsanime?query=${q}&number=3`)).json();
	}
}

const api = "https://aryanchauhanapi.onrender.com/";

module.exports = Search;