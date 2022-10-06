import Fastify from 'fastify';
import Static from '@fastify/static';
import {MongoClient} from 'mongodb';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const fastify = Fastify({logger: Boolean(process.env.LOGGER || null)});

const client = new MongoClient(process.env.DATABASE_URL);

await client.connect();
console.log('Connected successfully to server');
const collection = client.db('chess-voc').collection('vocabulary');


fastify.register(Static, {
  root: path.resolve('./src/public'),
})

fastify.get('/', (req, reply) => reply.sendFile('index.html'));

const getQuery = (query) => {
  if (query.partOfSpeech) {
    switch (query.partOfSpeech) {
      case "noun":
        return {partOfSpeech: 'іменник'}
      case "verb":
        return {partOfSpeech: 'дієслово'}
      case "verbAdjective":
        return {partOfSpeech: 'дієприкметник'}
      case "adjective":
        return {partOfSpeech: 'прикметник'}
    }
  } else if (query.lexicalGroup) {
    switch (query.lexicalGroup) {
      case "styles":
        return {lexicalGroup: 'стилі, прийоми'}
      case "nameOfPerson":
        return {lexicalGroup: 'особа'}
      case "sportsGear":
        return {lexicalGroup: 'знаряддя'}
    }
  } else if (query.characteristic) {
    switch (query.characteristic) {
      case "generalUse":
        return {characteristic: 'загальновживаний'}
      case "generalSports":
        return {characteristic: 'загальноспортивний'}
      case "own":
        return {characteristic: 'власне шаховий'}
    }
  } else if (query.search) {
    const re = new RegExp(query.search, 'i');
    return {keyWords: re}
  }
  return {};
}

fastify.get('/api/vocabulary', async (req, reply) => {
  const res = await collection.find(getQuery(req.query)).toArray();
  reply.send(res)
});

fastify.listen({port: process.env.PORT || 5000, path: '0.0.0.0'}, err => {
  if (err) throw err
  console.log(`Server listening on ${fastify.server.address().port}`)
});
