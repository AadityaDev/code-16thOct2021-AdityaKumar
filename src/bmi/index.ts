import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import personsData from '../data/static/json/index.json';
import { Person, PersonType } from '../models/index';

const PersonRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
	server.get('/person', {}, async (request, reply) => {
		try {
			let person: PersonType;
			const data: Array<PersonType> = personsData.map((element) => {
				person = {
					gender : element?.Gender, 
					weight : element?.WeightKg,
					height : element?.HeightCm
				}; 
				return person;
			});
			return reply.code(200).send(data);
		} catch (error) {
			request.log.error(error);
			return reply.send(500);
		}
	});

    server.get('/person-with-bmi', {}, async (request, reply) => {
		try {
            let person: PersonType;
			const data: Array<PersonType> = personsData.map((element) => {
				person = {
					gender : element?.Gender, 
					weight : element?.WeightKg,
					height : element?.HeightCm
				}; 
				return person;
			});
			return reply.code(200).send(data);
		} catch (error) {
			request.log.error(error);
			return reply.send(500);
		}
	});

};

export default fp(PersonRoute);