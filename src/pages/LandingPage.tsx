import { FC } from "react";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { Accomplishments } from "@/features/landing/Accomplishments/Accomplishments";

type LandingPageProps = {};

export const LandingPage: FC<LandingPageProps> = () => {
  return (
    <MainLayout>
      <Accomplishments data={[]} />
    </MainLayout>
  );
};
