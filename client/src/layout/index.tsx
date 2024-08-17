import { ReactNode } from "react";

import Sidebar from "./Sidebar";

interface IProps {
  children?: ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <div className="flex flex-row w-full h-full p-0 m-0 bg-primary-light">
      <section className="h-full">
        <Sidebar />
      </section>

      <section className="flex flex-col w-full">
        <main className="h-screen w-full overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </section>
    </div>
  );
}
