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
			let bmi: number = 0, bmiCategory: string = '';
			let totalObesePeople: number = 0;
			const data: Array<PersonType> = personsData.map((element) => {
				if(element?.HeightCm>0) {
					bmi = (element?.WeightKg/(element?.HeightCm/100));
					if (bmi<18.5) {
						bmiCategory = 'Underweight';
					} else if(bmi>=18.5 && bmi<=24.9) {
						bmiCategory = 'Normal Weight';
					} else if(bmi>=25 && bmi<=29.9) {
						bmiCategory = 'Overweight';
					} else if(bmi>=30 && bmi<=34.9) {
						bmiCategory = 'Moderatley obese';
					} else if(bmi>=35 && bmi<=39.9) {
						bmiCategory = 'Severely obese';
					} else {
						bmiCategory = 'Very Severely obese'
					}
					if(bmi>=30) {
						totalObesePeople += 1;
					}
				}
				person = {
					gender : element?.Gender, 
					weight : element?.WeightKg,
					height : element?.HeightCm,
					bmi: bmi,
					bmiCategory: bmiCategory
				};
				console.log(`person is: ${JSON.stringify(person)}`); 
				return person;
			});
			return reply.code(200).send({data, totalObesePeople});
		} catch (error) {
			request.log.error(error);
			return reply.send(500);
		}
	});

};

export default fp(PersonRoute);