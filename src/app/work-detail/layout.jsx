import ScrollHint from "../common/ScrollHint";

export default function WorkDetailLayout({ children }) {
  return (
    <>
      {children}
      <ScrollHint />
    </>
  );
}
