import { useRouter, usePathname } from 'next/navigation';

import { useAuth } from '@/contexts/Auth';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function Sidebar() {
  const router = useRouter();
  const location = usePathname();

  const { signOut } = useAuth();

  function handleNavigate(url: string) {
    router.push(url);
  }

  async function handleLogout() {
    signOut();
    router.push('/');
  }

  return (
    <nav className="flex h-full flex-col justify-between bg-primary-dark p-2 text-white">
      <header className="flex flex-col gap-2">
        <Tooltip title="Conatos">
          <IconButton
            type="button"
            aria-label="Contact"
            onClick={() => handleNavigate('/contact')}
            sx={{ color: 'white' }}
            className={`${location === '/contact' ? 'bg-purple' : ''}`}
          >
            <ContactPageIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Conexões">
          <IconButton
            type="button"
            aria-label="Connections"
            onClick={() => handleNavigate('/connections')}
            sx={{ color: 'white' }}
            className={`${location === '/connections' ? 'bg-purple' : ''}`}
          >
            <WhatsAppIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Listas de transmissão">
          <IconButton
            type="button"
            aria-label="Broadcasts"
            onClick={() => handleNavigate('/broadcast')}
            sx={{ color: 'white' }}
            className={`${location === '/broadcast' ? 'bg-purple' : ''}`}
          >
            <PodcastsIcon />
          </IconButton>
        </Tooltip>
      </header>

      <footer className="flex flex-col gap-2">
        <Tooltip title="Sair">
          <IconButton
            type="button"
            aria-label="Logout"
            onClick={() => handleLogout()}
            sx={{ color: 'white' }}
          >
            <MeetingRoomIcon />
          </IconButton>
        </Tooltip>
      </footer>
    </nav>
  );
}
