const Home = async () => {
  console.log("?");
  const res = await fetch("http://localhost:3000/api/", { method: "GET" });
  console.log(res.status);
  return <div>메인</div>;
};

export default Home;
