export default function Home() {
  const currentTime = new Date();
  return <h1>Home page {currentTime.getTime()}</h1>;
}
