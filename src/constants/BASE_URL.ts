const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://blog-project-rose.vercel.app/api';

export default BASE_URL;
