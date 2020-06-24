import React, { useEffect, useState } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((repositories) => {
      setRepositories(repositories.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      url: 'https://github.com/jonatanflores',
      title: 'Desafio 03 GoStack',
      techs: ['React', 'Node.js'],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );
    const repositoriesTMP = [...repositories];
    repositoriesTMP.splice(repositoryIndex, 1);
    setRepositories(repositoriesTMP);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
