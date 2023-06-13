import { FC } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { CatalogPage } from "@/pages/CatalogPage";
// import { LivePeerPage } from "@/pages/LivePeerPage";
import { HuddlePage } from "@/pages/HuddlePage";

import { RoomPage } from "@/pages/rooms/RoomPage";
import { RoomsListPage } from "./pages/rooms/RoomsListPage";
import { RoomCreatePage } from "./pages/rooms/RoomCreatePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="catalog" element={<CatalogPage />} />

      <Route path="rooms">
        <Route index element={<RoomsListPage />} />
        <Route path="create" element={<RoomCreatePage />} />
        <Route path=":roomId" element={<RoomPage />} />
      </Route>

      {/* <Route path="peer" element={<LivePeerPage />} /> */}
      <Route path="huddle" element={<HuddlePage />} />
    </Route>
  )
);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
