import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepos(response.data);
    })
  }, [])

  async function handleAddRepository() {
    try {
      const response = await api.post('repositories', {
        url: "https://github.com/lukassxp",
        title: `Desafio ${Date.now()}`,
        techs: ["React", "Node.js"],
      });

      const repo = response.data; 

      await setRepos([...repos, repo]);
    } catch(err) {
      console.log(err)
    }
  } 

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      await setRepos( prevState => prevState.filter(repo => repo.id !== id));
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => 
          <li key={repo.id} >
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
