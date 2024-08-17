"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/Auth";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import IconButton from "@mui/material/IconButton";

export default function Sidebar() {
  const router = useRouter();
  const { signOut } = useAuth();

  function handleNavigate(url: string) {
    router.push(url);
  }

  async function handleLogout() {
    signOut();
    router.push("/");
  }

  return (
    <nav className="flex h-full flex-col justify-between bg-primary-dark p-2 text-white">
      <header className="flex flex-col gap-2">
        <IconButton
          type="button"
          aria-label="contact"
          onClick={() => handleNavigate("/contact")}
          sx={{ color: "white" }}
        >
          <ContactPageIcon />
        </IconButton>
        <IconButton
          type="button"
          aria-label="contact"
          onClick={() => handleNavigate("/connections")}
          sx={{ color: "white" }}
        >
          <WhatsAppIcon />
        </IconButton>

        <IconButton
          type="button"
          aria-label="contact"
          onClick={() => handleNavigate("/broadcast")}
          sx={{ color: "white" }}
        >
          <PodcastsIcon />
        </IconButton>
      </header>

      <footer className="flex flex-col gap-2">
        <IconButton
          type="button"
          aria-label="contact"
          onClick={() => handleLogout()}
          sx={{ color: "white" }}
        >
          <MeetingRoomIcon />
        </IconButton>
      </footer>
    </nav>
  );
}
