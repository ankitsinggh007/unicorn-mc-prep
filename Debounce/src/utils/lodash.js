export const DebounceWrapper = (fn, delay) => {
  let timer = null;
  return {
    DebouncedFn: function DebouncedFn(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    Cancel: function cancelfn() {
      clearTimeout(timer);
    },
  };
};
