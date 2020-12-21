/* eslint-disable no-unused-vars */
const Express = require('express');

const server = Express();

server.use(Express.json());

let projects = [
  {
    id: '1',
    title: 'Node.js',
    tasks: ['Nova tarefa'],
  },
];

// Middlewares

server.use((request, response, next) => {
  console.count('Requests');
  return next();
});

function CheckId(request, response, next) {
  const { id } = request.params;
  const projectFounded = projects.find((project) => project.id === id);

  if (!projectFounded) return response.json({ error: 'Project not found' });

  return next();
}

// Routes
server.get('/projects', (request, response) => response.json(projects));

server.post('/projects', (request, response) => {
  const { id, title } = request.body;
  const newProject = {
    id,
    title,
    tasks: [],
  };
  projects.push(newProject);

  return response.json(newProject);
});

server.put('/projects/:id', CheckId, (request, response) => {
  const { id } = request.params;
  const { title } = request.body;

  const updatedProject = projects.find((project) => project.id === id);
  updatedProject.title = title;

  return response.json(updatedProject);
});

server.delete('/projects/:id', CheckId, (request, response) => {
  const { id } = request.params;

  projects = projects.filter((project) => project.id !== id);

  return response.status(204).json({ message: 'Sucess' });
});

server.post('/projects/:id/tasks', CheckId, (request, response) => {
  const { id } = request.params;
  const { title } = request.body;

  const findProject = projects.find((project) => project.id === id);
  findProject.tasks.push(title);

  return response.json(findProject);
});

server.listen(3000, () => console.log('Server is running...'));
