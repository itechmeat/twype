import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { AuthProtector } from "@/features/auth/AuthProtector/AuthProtector";
import { Content } from "@/features/layout/Content/Content";
import { RoomInfo } from "@/features/room/RoomInfo/RoomInfo";
import { Room, RoomError } from "@/features/room/types";
import { Button } from "@/features/form/Button/Button";
import { RoomUserName } from "@/features/room/RoomUserName/RoomUserName";
import { useUserName } from "@/features/room/hooks/useUserName";

type RoomPageProps = {};

export const RoomPage: FC<RoomPageProps> = () => {
  let { roomId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [roomInfo, setRoomInfo] = useState<Room | null>(null);
  const [roomError, setRoomError] = useState<RoomError | null>(null);
  const { userName, setUserName } = useUserName();

  const getMeetingInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/meeting-details/${roomId}`
      );
      if (response?.data) {
        setRoomInfo(response.data as Room);
      }
    } catch (error) {
      // @ts-ignore
      setRoomError(error?.response?.data as RoomError);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (roomId) {
      getMeetingInfo();
    }
  }, [getMeetingInfo, roomId]);

  const pageTitle = useMemo(() => {
    if (isLoading) {
      return "Room is loading...";
    }
    if (roomError) {
      return "404";
    }
    return roomInfo?.title || "Unnamed Room";
  }, [isLoading, roomError, roomInfo]);

  if (!roomId) return null;

  return (
    <MainLayout>
      <AuthProtector>
        <Content title={pageTitle} size="small">
          {!roomError ? (
            !isLoading && (
              <>
                {roomInfo ? (
                  <RoomInfo data={roomInfo} />
                ) : (
                  <div>
                    <RoomUserName onChange={setUserName} />
                    <Button to="join" disabled={!userName}>
                      Try to join
                    </Button>
                  </div>
                )}
              </>
            )
          ) : (
            <div>
              <p>{roomError.message}</p>
              <p>
                <Button to="..">Back to Rooms list</Button>
              </p>
            </div>
          )}
        </Content>
      </AuthProtector>
    </MainLayout>
  );
};
