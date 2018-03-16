exports.getCurrentYear = () => new Date().getFullYear();

exports.siteName = `SOYOAG`;

exports.menu = [
  { slug: "/help", title: "Help" },
  { slug: "/about", title: "About" }
];

exports.uper = text => text.toUpperCase();
