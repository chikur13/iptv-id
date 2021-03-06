const express = require("express")
const Dm = require("./dm")
const loggerMiddleware = require("./logger")
const Playlist = require("./playlist")
const Vidio = require("./vidio")
const server = express()

server.use(loggerMiddleware)

server.get("/playlist.m3u", (req, res) => {
  const playlist = new Playlist()
  res.end(playlist.getHLS())
})

server.get("/vidio", async (req, res) => {
  const { id } = req.query
  if (!id) return res.status(400).end()
  const vidio = new Vidio(id)
  return res.end(await vidio.getHLS())
})

server.get("/dm", async (req, res) => {
  const { id } = req.query
  if (!id) return res.status(400).end()
  const dm = new Dm(id)
  return res.end(await dm.getHLS())
})

module.exports = server
