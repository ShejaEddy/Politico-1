/* eslint-disable no-unused-vars */
/* eslint-disable quotes */

import database from './database';

const { pool } = database;

const {
  users, party, office, candidate, vote, petition
} = database;

const dropTables = 'DROP TABLE IF EXISTS users CASCADE; DROP TABLE IF EXISTS offices CASCADE;DROP TABLE IF EXISTS parties CASCADE; DROP TABLE IF EXISTS candidates CASCADE; DROP TABLE IF EXISTS candidates CASCADE; DROP TABLE IF EXISTS votes CASCADE; DROP TABLE IF EXISTS petitions CASCADE;';

const users1 = `INSERT INTO users(firstname, lastname, username, email, phoneNumber, password, is_admin, passportUrl) VALUES('Ben','John','bendinho','bendinho@gmail.com','+4567899865','$2a$10$uRuYmAhsCNnnIbGGXwcEIOYsUoDC./J1NNAVBeb0/SqeTWVYTjEvK',true,'http://www.locoococcoc/jpg')`;
const users2 = `INSERT INTO users(firstname, lastname, username, email, phoneNumber, password, is_admin, passportUrl) VALUES('Bens','Johns','ben','ben@gmail.com','+4567899865','$2a$10$uRuYmAhsCNnnIbGGXwcEIOYsUoDC./J1NNAVBeb0/SqeTWVYTjEvK',false,'http://www.locoococcoc/jpg')`;
const users3 = `INSERT INTO users(firstname, lastname, username, email, phoneNumber, password, is_admin, passportUrl) VALUES('Love','Peace','Joy','joy@gmail.com','+4567899865','$2a$10$uRuYmAhsCNnnIbGGXwcEIOYsUoDC./J1NNAVBeb0/SqeTWVYTjEvK',false,'http://www.locoococcoc/jpg')`;
const users4 = `INSERT INTO users(firstname, lastname, username, email, phoneNumber, password, is_admin, passportUrl) VALUES('Love','Peace','Joyce','joyce@gmail.com','+4567899865','$2a$10$uRuYmAhsCNnnIbGGXwcEIOYsUoDC./J1NNAVBeb0/SqeTWVYTjEvK',false,'http://www.locoococcoc/jpg')`;
const users5 = `INSERT INTO users(firstname, lastname, username, email, phoneNumber, password, is_admin, passportUrl) VALUES('Love','Peace','Rexben','rexben.rb@gmail.com','+4567899865','$2a$10$uRuYmAhsCNnnIbGGXwcEIOYsUoDC./J1NNAVBeb0/SqeTWVYTjEvK',false,'http://www.locoococcoc/jpg')`;


const office1 = `INSERT INTO offices (name, type) VALUES('Senate(Lagos)','Federal')`;
const office2 = `INSERT INTO offices (name, type) VALUES('Governor(Lagos)','State')`;

const parties1 = `INSERT INTO parties (name, hqAddress, logoUrl) VALUES('People Party','Ikorodu, Lagos','pp.jpg')`;
const parties2 = `INSERT INTO parties (name, hqAddress, logoUrl) VALUES('People Love Party','Borno','plp.jpg')`;
const parties3 = `INSERT INTO parties (name, hqAddress, logoUrl) VALUES('Peace Party','Kano','pps.jpg')`;
const parties4 = `INSERT INTO parties (name, hqAddress, logoUrl) VALUES('Peace Love Congress','Kaduna','plc.jpg')`;

const candidate1 = `INSERT INTO candidates(office, party, createdBy, acceptance) VALUES(1, 3, 3, 'accepted')`;

const candidate2 = `INSERT INTO candidates(office, party, createdBy, acceptance) VALUES(1, 1, 1, 'accepted')`;
const candidate3 = `INSERT INTO candidates(office, party, createdBy, acceptance) VALUES(1, 2, 2, 'pending')`;

const votes1 = `INSERT INTO votes(office, voter, createdOn, candidate) VALUES(1, 1, NOW(), 1)`;
const votes2 = `INSERT INTO votes(office, voter, createdOn, candidate) VALUES(1, 2, NOW(), 1)`;

// const petitions = `INSERT INTO petitions(office, createdOn, createdBy, body, evidence) VALUES(1, NOW(), 1, 'guuiuie.jpg', 'Ballot')`;

const tables = async () => {
  await pool.query(dropTables);
  await users();
  await party();
  await office();
  await candidate();
  await vote();
  await petition();
  await pool.query(`${users1}; ${users2}; ${users3}; ${users4}; ${users5}`);
  await pool.query(`${office1}; ${office2};`);
  await pool.query(`${parties1}; ${parties2}; ${parties3}; ${parties4};`);
  await pool.query(`${candidate1}; ${candidate2}; ${candidate3};`);
  await pool.query(`${votes1}; ${votes2};`);
  // await pool.query(`${petitions};`);
};

tables();
