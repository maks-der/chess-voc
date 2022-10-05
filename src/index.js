import Fastify from 'fastify';
import Static from '@fastify/static';
import Postgres from '@fastify/postgres';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const fastify = Fastify();

const { PORT, DATABASE_URL } = process.env;

fastify.register(Postgres, {
  connectionString: DATABASE_URL
})

fastify.register(Static, {
  root: path.resolve('./src/public'),
})

fastify.get('/', (req, reply) => reply.sendFile('index.html'));

const getQuery = (query) => {
  if (query.partOfSpeech) {
    switch (query.partOfSpeech) {
      case "noun":
        return "SELECT * FROM vocabulary WHERE part_of_speech LIKE '%іменник%' ORDER BY id";
      case "verb":
        return "SELECT * FROM vocabulary WHERE part_of_speech LIKE '%дієслово%' ORDER BY id";
      case "verbAdjective":
        return "SELECT * FROM vocabulary WHERE part_of_speech LIKE '%дієприкметник%' ORDER BY id";
      case "adjective":
        return "SELECT * FROM vocabulary WHERE part_of_speech LIKE '%прикметник%' ORDER BY id";
    }
  } else if (query.lexisClass) {
    switch (query.lexisClass) {
      case "styles":
        return "SELECT * FROM vocabulary WHERE lexical_group LIKE '%стилі%' ORDER BY id";
      case "nameOfPerson":
        return "SELECT * FROM vocabulary WHERE lexical_group LIKE '%особа%' ORDER BY id";
      case "sportsGear":
        return "SELECT * FROM vocabulary WHERE lexical_group LIKE '%знаряддя%' ORDER BY id";
    }
  } else if (query.classChar) {
    switch (query.classChar) {
      case "generalUse":
        return "SELECT * FROM vocabulary WHERE characteristic LIKE '%загальновживаний%' ORDER BY id";
      case "generalSports":
        return "SELECT * FROM vocabulary WHERE characteristic LIKE '%загальноспортивний%' ORDER BY id";
      case "own":
        return "SELECT * FROM vocabulary WHERE characteristic LIKE '%власне%' ORDER BY id";
    }
  } else if (query.search) {
    return `SELECT * FROM vocabulary WHERE name_1 ILIKE '%${query.search}%' OR name_2 ILIKE '%${query.search}%' ORDER BY id`;
  }
  return 'SELECT * FROM vocabulary';
}

fastify.get('/api/vocabulary', (req, reply) => {
  fastify.pg.query(getQuery(req.query), function onResult(err, result) {
    reply.send(err || result)
  });
})

fastify.listen({port: PORT}, err => {
  if (err) throw err
  console.log(`Server listening on ${fastify.server.address().port}`)
})