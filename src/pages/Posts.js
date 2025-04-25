import { useEffect, useState } from 'react';

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API 호출
    async function fetchPosts() {
      try {
        const res = await fetch('https://soon9086postgresserver.vercel.app/api/post'); // API 엔드포인트 호출
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        setPosts(data.post || []); // 데이터 설정
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>; // 로딩 상태 표시
  if (error) return <p>Error: {error}</p>; // 에러 메시지 표시

  return (
    <div>
      <h1>Posts</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post, index) => (
            <li key={index}>{post.title}</li> // 각 게시물의 제목 렌더링
          ))}
        </ul>
      ) : (
        <p>No posts available.</p> // 게시물이 없을 경우 메시지 표시
      )}
    </div>
  );
}