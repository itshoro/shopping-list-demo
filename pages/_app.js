import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
