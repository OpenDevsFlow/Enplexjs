
class Xio {
  static async request(url, options = {}) {
    if (!url) throw new Error('Xio Error: URL is required');

    const config = {
      method: 'GET',
      headers: {},
      timeout: 10000,
      retry: {
        maxAttempts: 3,
        delay: 1000,
        backoff: 2
      },
      ...options
    };

    let attempt = 0;
    let delay = config.retry.delay;

    while (attempt < config.retry.maxAttempts) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort('Request timeout'), config.timeout);

        const response = await fetch(url, {
          ...config,
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            ...config.headers
          }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type') || '';
        return contentType.includes('application/json') ? 
               await response.json() : 
               await response.text();

      } catch (error) {
        attempt++;
        
        if (attempt === config.retry.maxAttempts) {
          throw new Error(`Xio Error: ${error.message}`);
        }

        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= config.retry.backoff;
      }
    }
  }
}

module.exports = Xio;
