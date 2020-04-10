import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

const Alert = mongoose.model('Alert', new mongoose.Schema({  name: {type: String, required: true},
	namespace: String,
	status: String,
	podIP: String,
	time: {type: String, required: true},}));

const alertData = { name: 'Test String', namespace: 'Kube Namespace', status: 'running', podIP: '0123456', time: 'current time' };

const badAlertData = { name: 'Test String', namespace: 'Kube Namespace', status: 'running', podIP: '0123456', time: 'current time' ,nickkname: 'MyKube'};

const alertMissingField = {name: 'Test String'}


beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) console.error(err);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Pod Alert DB Tests', () => {
	
	it('Create & save alert successfully', async () => {
		const validAlert = await new Alert(alertData);
		const savedAlert = await validAlert.save();
		expect(savedAlert._id).toBeDefined();
		expect(savedAlert.name).toBe(alertData.name);
		expect(savedAlert.namespace).toBe(alertData.namespace);
		expect(savedAlert.status).toBe(alertData.status);
		expect(savedAlert.podIP).toBe(alertData.podIP);
		expect(savedAlert.time).toBe(alertData.time);
	});
	

it('Insert alert successfully, however if input has a field not defined in schema should be undefined', async () => {
	const alertWithInvalidField = await new Alert(badAlertData);
	const savedAlertWithInvalidField = await alertWithInvalidField.save();
	expect(savedAlertWithInvalidField.name).toBeDefined();
	expect(savedAlertWithInvalidField.namespace).toBeDefined();
	expect(savedAlertWithInvalidField.status).toBeDefined();
	expect(savedAlertWithInvalidField.podIP).toBeDefined();
	expect(savedAlertWithInvalidField.time).toBeDefined();
	expect(savedAlertWithInvalidField.nickkname).toBeUndefined();
});

it('create alert without required field should failed', async () => {
	const alertWithoutRequiredField = await new Alert(alertMissingField);
	let err;
	try {
			const savedAlertWithoutRequiredField = await alertWithoutRequiredField.save();
			error = savedAlertWithoutRequiredField;
		} catch (error) {
			err = error
		}
		expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
		expect(err.errors.time).toBeDefined();
	});
});
