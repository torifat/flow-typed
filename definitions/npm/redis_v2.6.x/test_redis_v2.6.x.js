/* @flow */
import redis from 'redis';

let client;

client = redis.createClient();
client = redis.createClient({});
client = redis.createClient('/tmp/redis.sock');
client = redis.createClient('/tmp/redis.sock', {});
client = redis.createClient(6379);
client = redis.createClient(6379, {});
client = redis.createClient(6379, 'localhost');
client = redis.createClient(6379, 'localhost', {});

// $ExpectError
client = redis.createClient('localhost', 'localhost', {});
// $ExpectError
client = redis.createClient({ port: '80' });
// $ExpectError
client = redis.createClient('/tmp/redis.sock', { port: '80' });

// A valid reference for furthur testing
client = redis.createClient();

client.on('subscribe', (channel, count) => { channel.length + count.toFixed() });
