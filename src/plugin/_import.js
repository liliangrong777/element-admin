var importFn = null;

if (process.env.NODE_ENV === "production") {
  importFn = file => () => import("@/views/" + file);
} else {
  importFn = file => require("@/views/" + file).default;
}

module.exports = importFn;
