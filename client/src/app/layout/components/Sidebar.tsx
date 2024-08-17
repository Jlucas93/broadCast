import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  function handleNavigate(url: string) {
    router.push(url);
  }

  async function handleLogout() {
    // signOut();
    console.error('logout');
  }

  return (
    <nav className="flex h-full flex-col justify-between bg-primary-dark p-2">
      <header className="flex flex-col gap-2">
        <button onClick={() => handleNavigate('/contact')} />

        <button onClick={() => handleNavigate('/connections')} />

        <button onClick={() => handleNavigate('/boradcast')} />
      </header>

      <footer className="flex flex-col gap-2">
        <button onClick={() => handleLogout()} />
      </footer>
    </nav>
  );
}
