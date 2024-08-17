import { HederContact } from './_components/Header';
import { ContactTable } from './_components/ContactTable';

export default function Contact() {
  return (
    <main className="w-full h-full flex flex-col justify-start items-center bg-primary-base ">
      <HederContact />
      <p>Contatos</p>
      <ContactTable />
    </main>
  );
}
