// 서버에서 데이터를 가져오는 함수
export async function getServerSideProps() {
  const res = await fetch('https://soon9086postgresserver.vercel.app/api/post'); // API 호출
  const data = await res.json();
  console.log("Fetched data from API:", data); // API 응답 확인
  return {
    props: {
      posts: data.post || [], // 데이터를 props로 전달
    },
  };
}