export default class Store {
  constructor () {
    this.vid = null;
    this.lastVid = null;
    this.player = null;
    this.time = null;
  }

  setVid(vid) {
    if (this.lastVid == null) this.lastVid = vid;
    else this.lastVid = this.vid;
    this.vid = vid;
  }

  getVid() {
    return this.vid;
  }

  clearVid() {
    this.vid = null;
  }

  setLastVid(vid) {
    this.lastVid = vid;
  }

  getLastVid() {
    return this.lastVid;
  }

  clearLastVid() {
    this.lastVid = null;
  }

  setPlayer(player) {
    this.player = player;
  }

  getPlayer() {
    return this.player;
  }

  clearPlayer() {
    this.player = null;
  }

  setTime(player) {
    this.time = player.controller.getCurrentTime();
  }

  getTime() {
    return this.time;
  }

  clearTime() {
    this.time = null;
  }

}