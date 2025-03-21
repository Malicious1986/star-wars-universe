// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => Promise<any>;

export function createMemoizedFetcher<F extends AnyFunction>(fetchFn: F) {
  const cache = new Map<string, Promise<ReturnType<F>>>();

  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const promise = fetchFn(...args);
    cache.set(key, promise);
    return promise;
  };
}
