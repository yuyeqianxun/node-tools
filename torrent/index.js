const fs = require('fs');
const bencode = require('bencode');
const tracker = require('./tracker');
const torrentParser = require('./torrent-parser');
const download = require('./download');
const torrent = torrentParser.open('movie.torrent');

download(torrent);