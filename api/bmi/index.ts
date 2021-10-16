import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import personsData from '../../data/static/json/index.json';

const PersonRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
	server.get('/person', {}, async (request, reply) => {
		try {
			const data = personsData;
			return reply.code(200).send(data);
		} catch (error) {
			request.log.error(error);
			return reply.send(500);
		}
	});

	// server.get<{ Params: blogParams }>('/blogs/:id', {}, async (request, reply) => {
	// 	try {
	// 		const ID = request.params.id;
	// 		const { Blog } = server.db.models;
	// 		const blog = await Blog.findById(ID);

	// 		if (!blog) {
	// 			return reply.send(404);
	// 		}

	// 		return reply.code(200).send(blog);
	// 	} catch (error) {
	// 		request.log.error(error);
	// 		return reply.send(400);
	// 	}
	// });
};

export default fp(PersonRoute);