const API_URL = 'https://imprensamalakoff-backend.onrender.com/api/posts';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  export const fetchPosts = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao buscar posts');
    const posts = await response.json();
  
    const formattedPosts = posts.map(post => ({
      ...post,
      date: formatDate(post.date), 
    }));
  
    return formattedPosts.reverse();
  };
  
  export const fetchPostById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar post');
    const post = await response.json();
  
    post.date = formatDate(post.date);
  
    return post;
  };
