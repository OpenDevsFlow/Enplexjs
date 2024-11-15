/**
 * @class xio
 * @description Class to make HTTP request to the specified URL.
 */

class xio {
  /**
   * Makes an HTTP request to the specified URL with optional configuration.
   *
   * @param {string} url - The URL to make the request to.
   * @param {Object} options - Optional configuration for the request.
   *   - `method`: The HTTP method (default: 'GET').
   *   - `headers`: Additional headers to add to the request.
   *   - `timeout`: Timeout in milliseconds (default: 10000).
   *   - `retry`: Configuration for retries (optional).
   *     - `maxAttempts`: Maximum number of retry attempts (default: 3).
   *     - `delay`: Delay in milliseconds between retries (default: 1000).
   * @returns {Promise<any>} - Promise resolving to the response data.
   * @throws {Error} - If request fails after retries, times out, or encounters other issues.
   * @example
   * ```javascript
   * const xio = require('enplexjs').xio;
   *
   * xio.request('https://example.com/api')
   *   .then(response => console.log(response))
   *   .catch(error => console.error(error));
   *
   * xio.request('https://example.com/api', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   timeout: 5000,
   *   retry: {
   *     maxAttempts: 5,
   *     delay: 2000,
   *   },
   * })
   *   .then(response => console.log(response))
   *   .catch(error => console.error(error));
   * ```
   */
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

module.exports = xio;
