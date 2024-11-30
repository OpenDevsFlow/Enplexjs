class Xio {
  static async request(url, options = {}) {
    const defaultOptions = {
      method: "GET",
      headers: {},
      timeout: 10000,
      retry: {
        maxAttempts: 3,
        delay: 1000,
      },
    };

    const mergedOptions = { ...defaultOptions, ...options };

    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        mergedOptions.timeout,
      );

      fetch(url, {
        ...mergedOptions,
        signal: controller.signal,
      })
        .then((resp) => {
          clearTimeout(timeoutId);
          if (!resp.ok) {
            throw new Error(`Xio Error: Status: ${resp.status}`);
          }
          return resp;
        })
        .then((resp) => {
          const contentType = resp.headers.get("content-type");
          if (contentType.includes("application/json")) {
            return resp.json();
          } else {
            return resp.text();
          }
        })
        .then((data) => resolve(data))
        .catch((error) => {
          if (error.name === "AbortError") {
            reject(new Error("Request timed out"));
          } else if (mergedOptions.retry.maxAttempts > 0) {
            mergedOptions.retry.maxAttempts--;
            setTimeout(
              () => Xio.request(url, mergedOptions).then(resolve).catch(reject),
              mergedOptions.retry.delay,
            );
          } else {
            reject(error);
          }
        });
    });
  }
}

module.exports = Xio;
