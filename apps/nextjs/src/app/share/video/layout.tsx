import DemoNavbar from "~/app/(site)/components/demonavbar";

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <div>
      <DemoNavbar />
      {children}
    </div>
  );
}
