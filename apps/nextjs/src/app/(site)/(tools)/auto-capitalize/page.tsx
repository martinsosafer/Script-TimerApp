import Capitalizer from "./capitalizer";

export default function AutoCapitalize() {
  return (
    <div className="flex w-[1000px] flex-col items-center">
      <div className="my-8 flex w-full flex-col items-center">
        <h2 className="text-4xl font-bold text-primary">
          Auto capitalize Sentences
        </h2>
        <p className="mt-2 w-[600px] text-center text-lg">
          Easily capitalize every sentence in your script with our hassle-free
          tool. No more tedious manual editing! Save time and improve the
          professional look of your script in seconds.
        </p>
      </div>
      <Capitalizer />
    </div>
  );
}
