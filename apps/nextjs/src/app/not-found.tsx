export default function NotFound() {
  const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif", // Modern font
  };

  const boxStyle = {
    background: "linear-gradient(to bottom right, #3f8cff, #6bc1ff)", // Degrading blue
    color: "white",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow for depth
    maxWidth: "400px", // Limit width for readability
  };

  return (
    <div style={centerStyle}>
      <div style={boxStyle}>
        <h1 style={{ marginBottom: "20px" }}>
          Thank you for joining Script Timer!
        </h1>
        <p>Please check your email.</p>
      </div>
    </div>
  );
}
