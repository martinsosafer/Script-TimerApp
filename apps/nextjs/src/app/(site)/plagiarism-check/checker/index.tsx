interface CheckerProps {
  userId: string | undefined;
}

export default function Checker({ userId }: CheckerProps) {
  console.log(userId);

  return (
    <div>
      <h1>Checker</h1>
    </div>
  );
}
