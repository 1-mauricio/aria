import mockPosts from './mock.json';

const API_URL = 'https://imprensamalakoff-backend.onrender.com/api/posts';
/*
export const fetchPosts = async () => {
  return Promise.resolve(mockPosts);
};

export const fetchPostById = async (id) => {
    const post = mockPosts.find((post) => post.id === parseInt(id));
    if (!post) throw new Error('Post não encontrado');
    return Promise.resolve(post);
  };
  */

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Exibe como dd/mm/yyyy
  };
  
  export const fetchPosts = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao buscar posts');
    const posts = await response.json();
  
    // Formatar as datas dos posts
    const formattedPosts = posts.map(post => ({
      ...post,
      date: formatDate(post.date), // Formata a data
    }));
  
    return formattedPosts;
  };
  
  export const fetchPostById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar post');
    const post = await response.json();
  
    // Formatar a data do post
    post.date = formatDate(post.date);
  
    return post;
  };
