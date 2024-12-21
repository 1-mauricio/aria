import mockPosts from './mock.json';

const API_URL = 'http://localhost:8080/api/posts';

export const fetchPosts = async () => {
  return Promise.resolve(mockPosts);
};

export const fetchPostById = async (id) => {
    const post = mockPosts.find((post) => post.id === parseInt(id));
    if (!post) throw new Error('Post não encontrado');
    return Promise.resolve(post);
  };
/*
export const fetchPosts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Erro ao buscar posts');
  return response.json();
};

export const fetchPostById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar post');
  return response.json();
};
*/