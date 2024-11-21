export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/texttovoice",
      permanent: true, // Use true for a permanent redirect (301), false for a temporary one (302)
    },
  };
}

export default function TextToSpeechRedirect() {
  return null; // Optional: You can render a fallback UI before redirect, but null works fine
}
