const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'snappy' 
});


const users = [ // Renommé 'users' au lieu de 'user'
  {
    uuid: '1a2b3c4d-5678-9101-1121-314151617181',
    name: 'Alice',
    email: 'alice@example.com',
    password: 'password123',
    phone: '1234567890',
    picture: 'https://example.com/alice.jpg',
    bio: 'Hello, I am Alice.',
    createdat: new Date().toISOString(),
    updatedat: new Date().toISOString()
  },
  {
    uuid: '1b2c3d4e-5678-9101-1121-314151617181',
    name: 'Bob',
    email: 'bob@example.com',
    password: 'password123',
    phone: '0987654321',
    picture: 'https://example.com/bob.jpg',
    bio: 'Hi, I am Bob.',
    createdat: new Date().toISOString(),
    updatedat: new Date().toISOString()
  },
  {
    uuid: '1b2c3d4e-5678-9101-1121-314151617182',
    name: 'Loic Aron',
    email: 'loic@example.com',
    password: 'password123',
    phone: '0987654321',
    picture: 'https://example.com/bob.jpg',
    bio: 'Hi, i use snappy',
    createdat: new Date().toISOString(),
    updatedat: new Date().toISOString()
  }
];

const conversations = [{
  uuid: '2a2b3c4d-5678-9101-1121-314151617181',
  users: [
    cassandra.types.Uuid.fromString('1a2b3c4d-5678-9101-1121-314151617181'),
    cassandra.types.Uuid.fromString('1b2c3d4e-5678-9101-1121-314151617181')
  ],
  states: { '1a2b3c4d-5678-9101-1121-314151617181': -1, '1b2c3d4e-5678-9101-1121-314151617181': -1 },
  createdat: new Date().toISOString(),
  updatedat: new Date().toISOString()
},
{
  uuid: '2a2b3c4d-5678-9101-1121-314151617182',
  users: [
    cassandra.types.Uuid.fromString('1a2b3c4d-5678-9101-1121-314151617181'),
    cassandra.types.Uuid.fromString('1b2c3d4e-5678-9101-1121-314151617182')
  ],
  states: { '1a2b3c4d-5678-9101-1121-314151617181': -1, '1b2c3d4e-5678-9101-1121-314151617182': -1 },
  createdat: new Date().toISOString(),
  updatedat: new Date().toISOString()
},

];



const messages = [
  {
    uuid: '3a2b3c4d-5678-9101-1121-314151617181',
    author: cassandra.types.Uuid.fromString('1a2b3c4d-5678-9101-1121-314151617181'),
    conversation: cassandra.types.Uuid.fromString('2a2b3c4d-5678-9101-1121-314151617181'),
    content: 'Hello, Bob!',
    isRead: false,
    replyTo: null,
    createdat: new Date().toISOString(),
    updatedat: new Date().toISOString()
  },
  {
    uuid: '3a2b3c4d-5678-9101-1121-314151617189',
    author: cassandra.types.Uuid.fromString('1a2b3c4d-5678-9101-1121-314151617181'),
    conversation: cassandra.types.Uuid.fromString('2a2b3c4d-5678-9101-1121-314151617182'),
    content: 'Hello, Loic',
    isRead: false,
    replyTo: null,
    createdat: new Date().toISOString(),
    updatedat: new Date().toISOString()
  },
  {
    uuid: '3a2b3c4d-5678-9101-1121-314151617188',
    author: cassandra.types.Uuid.fromString('1b2c3d4e-5678-9101-1121-314151617182'),
    conversation: cassandra.types.Uuid.fromString('2a2b3c4d-5678-9101-1121-314151617182'),
    content: 'Bonjour Alice , comment tu vas ce matin ?',
    isRead: false,
    replyTo:"1a2b3c4d-5678-9101-1121-314151617181",
    createdat: new Date().toISOString(),
    updatedat: new Date().toISOString()
  },//oui
  {
    uuid: '4a2b3c4d-5678-9101-1121-314151617181',
    author: cassandra.types.Uuid.fromString('1a2b3c4d-5678-9101-1121-314151617181'),
    conversation: '2a2b3c4d-5678-9101-1121-314151617181',
    content: 'Comment tu vas Bob?',
    isRead: false,
    replyTo: null,
    createdat: new Date().toISOString(),
    updatedat: new Date().toISOString()
  },
  {
    uuid: '3b2c3d4e-5678-9101-1121-314151617183',
    author: '1b2c3d4e-5678-9101-1121-314151617181',
    conversation: '2a2b3c4d-5678-9101-1121-314151617181',
    content: 'Hey, Alice!',
    isRead: false,
    replyTo: '3a2b3c4d-5678-9101-1121-314151617181',
    createdat: new Date().toISOString(),
    updatedat: new Date().toISOString()
  },
  {
    uuid: '3b2c3d4e-5678-9101-1121-314151617182',
    author: '1b2c3d4e-5678-9101-1121-314151617181',
    conversation: '2a2b3c4d-5678-9101-1121-314151617181',
    content: 'Je vais bien, merci.',
    isRead: false,
    replyTo: null,
    createdat: new Date().toISOString(),
    updatedat: new Date().toISOString()
  }

];
// Insert functions
async function insertuser() {
  const query = `INSERT INTO user (uuid, name, email, password, phone, picture, bio, createdat, updatedat)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  for (const u of users) { // Renommé 'u' au lieu de 'user'
    await client.execute(query, Object.values(u), { prepare: true });
  }
}

async function insertConversations() {
  const query = `INSERT INTO conversation (uuid, users, states, createdat, updatedat)
                 VALUES (?, ?, ?, ?, ?)`;
  for (const conversation of conversations) {
    await client.execute(query, [
      conversation.uuid,
      conversation.users,
      conversation.states,
      conversation.createdAt,
      conversation.updatedAt,
    ], { prepare: true });
  }
}

async function insertMessages() {
  const query = `INSERT INTO message (uuid, author, conversation, content, isread, replyto, createdat, updatedat)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  for (const message of messages) {
    await client.execute(query, Object.values(message), { prepare: true });
  }
}

async function clearDatabase() {
  console.log('Cleaning up database...');
  await client.execute('TRUNCATE user');
  await client.execute('TRUNCATE conversation');
  await client.execute('TRUNCATE message');
  console.log('Database cleaned.');
}


async function main() {
  try {
    await client.connect();
    console.log('Connected to ScyllaDB.');

    await clearDatabase(); 
    console.log("Cleanning database");

    console.log('Inserting user...');
    await insertuser();

    console.log('Inserting conversations...');
    await insertConversations();

    console.log('Inserting message...');
    await insertMessages();

    console.log('Data insertion complete!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.shutdown();
  }
}

main();
//voila donc que tu dones