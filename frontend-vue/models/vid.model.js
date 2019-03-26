define(function () {
  return function Vid(vid) {
    this.id = vid.id;
    this.title = vid.title;
    this.description = vid.description;
    this.origin = vid.origin;
    this.releaseDate = vid.releaseDate;
    this.url = vid.url;
  }
});